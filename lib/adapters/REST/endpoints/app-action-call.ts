import type { AxiosInstance } from 'contentful-sdk-core'
import {
  AppActionCallProps,
  AppActionCallResponse,
  CreateAppActionCallProps,
} from '../../../entities/app-action-call'
import * as raw from './raw'
import { RestEndpoint } from '../types'
import {
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
const APP_ACTION_CALL_RETRIES = 10

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
