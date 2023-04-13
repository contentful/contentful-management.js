import type { AxiosInstance } from 'contentful-sdk-core'
import { CreateAppActionCallProps, waitFor } from '../../../entities/app-action-call'
import { WebhookCallDetailsProps } from '../../../entities/webhook'
import * as raw from './raw'
import { RestEndpoint } from '../types'
import { GetAppActionCallDetailsParams, GetAppActionCallParams } from '../../../common-types'

export const create: RestEndpoint<'AppActionCall', 'create'> = async (
  http: AxiosInstance,
  params: GetAppActionCallParams,
  data: CreateAppActionCallProps
) => {
  const createResponse = await raw.post<WebhookCallDetailsProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations/${params.appDefinitionId}/actions/${params.appActionId}/calls`,
    data
  )

  const callId = createResponse.sys.id

  let result: WebhookCallDetailsProps | undefined
  let retries = 0

  while (!result && retries < 5) {
    result = await raw.get<WebhookCallDetailsProps>(
      http,
      `/spaces/${params.spaceId}/environments/${params.environmentId}/actions/${params.appActionId}/calls/${callId}`
    )

    if (result) break
    await waitFor(1000)
    retries++
  }

  return result as WebhookCallDetailsProps
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
