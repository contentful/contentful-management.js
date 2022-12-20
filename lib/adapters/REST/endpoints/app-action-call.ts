import type { AxiosInstance } from 'contentful-sdk-core'
import { CreateAppActionCallProps, AppActionCallProps } from '../../../entities/app-action-call'
import { WebhookCallDetailsProps } from '../../../entities/webhook'
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
  return raw.get<WebhookCallDetailsProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/actions/${params.appActionId}/calls/${params.callId}`
  )
}
