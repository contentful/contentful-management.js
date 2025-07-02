import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  AppActionCallProps,
  AppActionCallResponse,
  CreateAppActionCallProps,
  AppActionCallStructuredResult,
} from '../../../entities/app-action-call'
import * as raw from './raw'
import type { RestEndpoint } from '../types'
import type {
  CreateWithResponseParams,
  GetAppActionCallDetailsParams,
  GetAppActionCallParams,
} from '../../../common-types'
import { isSuccessful, shouldRePoll, waitFor } from '../../../common-utils'

export const create: RestEndpoint<'AppActionCall', 'create'> = (
  http: AxiosInstance,
  params: GetAppActionCallParams,
  data: CreateAppActionCallProps
) => {
  return raw.post<AppActionCallProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations/${params.appDefinitionId}/actions/${params.appActionId}/calls`,
    data
  )
}

export const getCallDetails: RestEndpoint<'AppActionCall', 'getCallDetails'> = (
  http: AxiosInstance,
  params: GetAppActionCallDetailsParams
) => {
  return raw.get<AppActionCallResponse>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/actions/${params.appActionId}/calls/${params.callId}`
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
  }
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
            'The app action response is taking longer than expected to process.'
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
  data: CreateAppActionCallProps
) => {
  const createResponse = await raw.post<AppActionCallProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations/${params.appDefinitionId}/actions/${params.appActionId}/calls`,
    data
  )

  const callId = createResponse.sys.id

  return callAppActionResult(http, params, { callId })
}

export const createWithResult: RestEndpoint<'AppActionCall', 'createWithResult'> = async (
  http: AxiosInstance,
  params: CreateWithResponseParams,
  data: CreateAppActionCallProps
) => {
  const createResponse = await raw.post<AppActionCallProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations/${params.appDefinitionId}/actions/${params.appActionId}/calls`,
    data
  )

  const callId = createResponse.sys.id

  return callAppActionStructuredResult(http, params, { callId })
}

async function callAppActionStructuredResult(
  http: AxiosInstance,
  params: CreateWithResponseParams,
  {
    callId,
  }: {
    callId: string
  }
): Promise<AppActionCallStructuredResult> {
  let checkCount = 1
  const retryInterval = params.retryInterval || APP_ACTION_CALL_RETRY_INTERVAL
  const retries = params.retries || APP_ACTION_CALL_RETRIES

  return new Promise((resolve, reject) => {
    const poll = async () => {
      try {
        // Use format=structured to get AppActionCall format instead of raw webhook logs
        const result = await raw.get<AppActionCallStructuredResult>(
          http,
          `/spaces/${params.spaceId}/environments/${params.environmentId}/actions/${params.appActionId}/calls/${callId}?format=structured`
        )
        
        // Check if the app action call is completed
        if (result.sys.status === 'succeeded' || result.sys.status === 'failed') {
          resolve(result)
        }
        // The call is still processing, continue polling
        else if (result.sys.status === 'processing' && checkCount < retries) {
          checkCount++
          await waitFor(retryInterval)
          poll()
        }
        // Timeout - the processing is taking too long
        else {
          const error = new Error(
            'The app action response is taking longer than expected to process.'
          )
          reject(error)
        }
      } catch (error) {
        checkCount++

        if (checkCount > retries) {
          reject(new Error('The app action response is taking longer than expected to process.'))
          return
        }
        // If the call throws, we re-poll as it might mean that the result is not available yet
        await waitFor(retryInterval)
        poll()
      }
    }

    poll()
  })
}
