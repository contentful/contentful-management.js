import type { AxiosInstance } from 'contentful-sdk-core'
import {
  AppActionCallProps,
  AppActionCallResponse,
  CreateAppActionCallProps,
  FetchAppActionResponse,
} from '../../../entities/app-action-call'
import * as raw from './raw'
import { RestEndpoint } from '../types'
import { GetAppActionCallDetailsParams, GetAppActionCallParams } from '../../../common-types'

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
  params: GetAppActionCallParams,
  {
    resolve,
    reject,
    retryInterval = APP_ACTION_CALL_RETRY_INTERVAL,
    retries = APP_ACTION_CALL_RETRIES,
    checkCount = 0,
    callId,
  }: FetchAppActionResponse & {
    resolve: (appActionResponse: AppActionCallResponse) => unknown
    reject: (err: Error) => unknown
    callId: string
  }
) {
  const appActionResponse = await getCallDetails(http, { ...params, callId })

  if (appActionResponse && appActionResponse.sys && appActionResponse.sys.id) {
    resolve(appActionResponse)
  } else if (checkCount === retries) {
    const error = new Error()
    error.message = 'The app action response is taking longer than expected to process.'
    reject(error)
  } else {
    checkCount++
    setTimeout(
      () =>
        callAppActionResult(http, params, {
          resolve,
          reject,
          retryInterval,
          retries,
          checkCount,
          callId,
        }),
      retryInterval
    )
  }
}

export const createWithResponse: RestEndpoint<'AppActionCall', 'createWithResponse'> = async (
  http: AxiosInstance,
  params: GetAppActionCallParams,
  data: CreateAppActionCallProps
) => {
  const createResponse = await raw.post<AppActionCallProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations/${params.appDefinitionId}/actions/${params.appActionId}/calls`,
    data
  )

  const callId = createResponse.sys.id

  return new Promise<AppActionCallResponse>((resolve, reject) =>
    callAppActionResult(http, params, {
      resolve,
      reject,
      callId,
    })
  )
}
