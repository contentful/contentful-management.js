import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { QueryParams, GetSpaceParams, CollectionProp } from './common-types'
import { normalizeSelect } from './utils'
import { WebhookProps, CreateWebhooksProps } from '../../entities/webhook'
import { SetOptional } from 'type-fest'

type GetWebhookParams = GetSpaceParams & { webhookDefinitionId: string }

type CreateWebHookParams = SetOptional<GetWebhookParams, 'webhookDefinitionId'>

const getBaseUrl = (params: GetSpaceParams) => `/spaces/${params.spaceId}/webhook_definitions`

const getWebhookUrl = (params: GetWebhookParams) =>
  `/spaces/${params.spaceId}/webhook_definitions/${params.webhookDefinitionId}`

export const get = (http: AxiosInstance, params: GetWebhookParams & QueryParams) => {
  return raw.get<CollectionProp<WebhookProps>>(http, getWebhookUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const getMany = (http: AxiosInstance, params: GetSpaceParams & QueryParams) => {
  return raw.get<CollectionProp<WebhookProps>>(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const create = (
  http: AxiosInstance,
  params: CreateWebHookParams,
  rawData: CreateWebhooksProps
) => {
  const { webhookDefinitionId } = params

  return webhookDefinitionId
    ? raw.put<WebhookProps>(http, getWebhookUrl(params as GetWebhookParams), rawData)
    : raw.post<WebhookProps>(http, getBaseUrl(params), rawData)
}

export const del = (http: AxiosInstance, params: GetWebhookParams) => {
  return raw.del(http, getWebhookUrl(params))
}
