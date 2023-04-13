import type { AxiosInstance } from 'contentful-sdk-core'
import { CreateAppActionCallProps, FetchAppActionResponse } from '../../../entities/app-action-call'
import { WebhookCallDetailsProps } from '../../../entities/webhook'
import * as raw from './raw'
import { RestEndpoint } from '../types'
import { GetAppActionCallDetailsParams, GetAppActionCallParams } from '../../../common-types'

export const create: RestEndpoint<'AppActionCall', 'create'> = async (
  http: AxiosInstance,
  {
    options: { retries, retryInterval } = {},
    ...params
  }: GetAppActionCallParams & { options?: FetchAppActionResponse },
  data: CreateAppActionCallProps
) => {
  const createResponse = await raw.post<WebhookCallDetailsProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations/${params.appDefinitionId}/actions/${params.appActionId}/calls`,
    data
  )

  const callId = createResponse.sys.id

  return new Promise<WebhookCallDetailsProps>((resolve, reject) =>
    callAppActionResult(http, params, {
      resolve,
      reject,
      retryInterval,
      retries,
      callId,
    })
  )
}

export const getCallDetails: RestEndpoint<'AppActionCall', 'getCallDetails'> = (
  http: AxiosInstance,
  params: GetAppActionCallDetailsParams
) => {
  return raw.get<WebhookCallDetailsProps>(
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
    resolve: (appActionResponse: WebhookCallDetailsProps) => unknown
    reject: (err: Error) => unknown
    callId: string
  }
) {
  const appActionResponse = await raw.get<WebhookCallDetailsProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/actions/${params.appActionId}/calls/${callId}`
  )

  if (appActionResponse && appActionResponse.sys && appActionResponse.sys.id) {
    resolve(appActionResponse)
  } else if (checkCount === retries) {
    const error = new Error()
    error.name = 'AssetProcessingTimeout'
    error.message = 'Asset is taking longer then expected to process.'
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
