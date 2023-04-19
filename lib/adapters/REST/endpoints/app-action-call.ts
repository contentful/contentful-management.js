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

export const create: RestEndpoint<'AppActionCall', 'create'> = async (
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

export const getCallDetails: RestEndpoint<'AppActionCall', 'getCallDetails'> = (
  http: AxiosInstance,
  params: GetAppActionCallDetailsParams
) => {
  return raw.get<AppActionCallResponse>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/actions/${params.appActionId}/calls/${params.callId}`
  )
}

async function callAppActionResult(
  http: AxiosInstance,
  params: GetAppActionCallParams,
  {
    resolve,
    reject,
    retryInterval = 2000,
    retries = 10,
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
    error.name = 'callAppActionResultTimeout'
    error.message = 'App Action Result is taking longer then expected to process.'
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
