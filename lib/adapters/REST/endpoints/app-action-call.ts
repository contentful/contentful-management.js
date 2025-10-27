import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  AppActionCallProps,
  AppActionCallResponse,
  AppActionCallRawResponseProps,
  CreateAppActionCallProps,
} from '../../../entities/app-action-call'
import * as raw from './raw'
import type { RestEndpoint } from '../types'
import type {
  CreateWithResponseParams,
  CreateWithResultParams,
  GetAppActionCallDetailsParams,
  GetAppActionCallParams,
  GetAppActionCallParamsWithId,
} from '../../../common-types'
import { isSuccessful, shouldRePoll, waitFor } from '../../../common-utils'

export const create: RestEndpoint<'AppActionCall', 'create'> = (
  http: AxiosInstance,
  params: GetAppActionCallParams,
  data: CreateAppActionCallProps,
) => {
  return raw.post<AppActionCallProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations/${params.appDefinitionId}/actions/${params.appActionId}/calls`,
    data,
  )
}

export const getCallDetails: RestEndpoint<'AppActionCall', 'getCallDetails'> = (
  http: AxiosInstance,
  params: GetAppActionCallDetailsParams,
) => {
  return raw.get<AppActionCallResponse>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/actions/${params.appActionId}/calls/${params.callId}`,
  )
}

const APP_ACTION_CALL_RETRY_INTERVAL = 2000
const APP_ACTION_CALL_RETRIES = 15

async function callAppActionResult(
  http: AxiosInstance,
  params: CreateWithResponseParams,
  {
    callId,
  }: {
    callId: string
  },
): Promise<AppActionCallResponse> {
  let checkCount = 1
  const retryInterval = params.retryInterval || APP_ACTION_CALL_RETRY_INTERVAL
  const retries = params.retries || APP_ACTION_CALL_RETRIES

  return new Promise((resolve, reject) => {
    const poll = async () => {
      try {
        const result = await getCallDetails(http, { ...params, callId: callId })
        // The lambda failed or returned a 404, so we shouldn't re-poll anymore
        if (result?.response?.statusCode && !isSuccessful(result?.response?.statusCode)) {
          const error = new Error('App action not found or lambda fails')
          reject(error)
        } else if (isSuccessful(result.statusCode)) {
          resolve(result)
        }

        // The logs are not ready yet. Continue waiting for them
        else if (shouldRePoll(result.statusCode) && checkCount < retries) {
          checkCount++
          await waitFor(retryInterval)
          poll()
        }

        // If the response status code is not successful and is not a status code that should be repolled, reject with an error immediately
        else {
          const error = new Error(
            'The app action response is taking longer than expected to process.',
          )
          reject(error)
        }
      } catch (error) {
        checkCount++

        if (checkCount > retries) {
          reject(new Error('The app action response is taking longer than expected to process.'))
          return
        }
        // If `appActionCalls.getCallDetails` throws, we re-poll as it might mean that the lambda result is not available in the webhook logs yet
        await waitFor(retryInterval)
        poll()
      }
    }

    poll()
  })
}

export const createWithResponse: RestEndpoint<'AppActionCall', 'createWithResponse'> = async (
  http: AxiosInstance,
  params: CreateWithResponseParams,
  data: CreateAppActionCallProps,
) => {
  const createResponse = await raw.post<AppActionCallProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations/${params.appDefinitionId}/actions/${params.appActionId}/calls`,
    data,
  )

  const callId = createResponse.sys.id

  return callAppActionResult(http, params, { callId })
}

// Get structured AppActionCall (status/result/error) via new route that includes app installation context
export const get: RestEndpoint<'AppActionCall', 'get'> = (
  http: AxiosInstance,
  params: GetAppActionCallParamsWithId,
) => {
  return raw.get<AppActionCallProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations/${params.appDefinitionId}/actions/${params.appActionId}/calls/${params.callId}`,
  )
}

// Get raw AppActionCall response (headers/body) for a completed call
export const getResponse: RestEndpoint<'AppActionCall', 'getResponse'> = (
  http: AxiosInstance,
  params: GetAppActionCallParamsWithId,
) => {
  return raw.get<AppActionCallRawResponseProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations/${params.appDefinitionId}/actions/${params.appActionId}/calls/${params.callId}/response`,
  )
}

async function pollStructuredAppActionCall(
  http: AxiosInstance,
  params: CreateWithResultParams,
  { callId }: { callId: string },
): Promise<AppActionCallProps> {
  let checkCount = 1
  const retryInterval = params.retryInterval || APP_ACTION_CALL_RETRY_INTERVAL
  const retries = params.retries || APP_ACTION_CALL_RETRIES

  return new Promise((resolve, reject) => {
    const poll = async () => {
      try {
        const result = await get(http, { ...params, callId })

        // If backend has not yet written the record, keep polling up to retries
        // Otherwise, resolve when status is terminal
        if (result?.sys.status === 'succeeded' || result?.sys.status === 'failed') {
          resolve(result)
        } else if (result?.sys.status === 'processing' && checkCount < retries) {
          checkCount++
          await waitFor(retryInterval)
          poll()
        } else {
          // Status not terminal and no more retries
          reject(new Error('The app action result is taking longer than expected to process.'))
        }
      } catch (error: any) {
        checkCount++

        if (checkCount > retries) {
          reject(new Error('The app action result is taking longer than expected to process.'))
          return
        }

        // Similar to legacy behavior: transient errors (e.g., 404 during propagation) → re-poll
        await waitFor(retryInterval)
        poll()
      }
    }

    poll()
  })
}

// Create and poll the structured AppActionCall until completion (succeeded/failed)
export const createWithResult: RestEndpoint<'AppActionCall', 'createWithResult'> = async (
  http: AxiosInstance,
  params: CreateWithResultParams,
  data: CreateAppActionCallProps,
) => {
  const createResponse = await raw.post<AppActionCallProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations/${params.appDefinitionId}/actions/${params.appActionId}/calls`,
    data,
  )

  const callId = createResponse.sys.id

  return pollStructuredAppActionCall(http, params, { callId })
}
