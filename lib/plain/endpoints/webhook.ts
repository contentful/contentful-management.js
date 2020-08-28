import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { QueryParams, GetSpaceParams, CollectionProp } from './common-types'
import { normalizeSelect } from './utils'
import { WebhookProps, CreateWebhooksProps, WebhookHealthProps } from '../../entities/webhook'
import { SetOptional } from 'type-fest'

type GetWebhookParams = GetSpaceParams & { webhookDefinitionId: string }

type GetWebhookCallDetailsUrl = GetWebhookParams & { callId: string }

type CreateWebHookParams = SetOptional<GetWebhookParams, 'webhookDefinitionId'>

const getBaseUrl = (params: GetSpaceParams) => `/spaces/${params.spaceId}/webhook_definitions`

const getWebhookUrl = (params: GetWebhookParams) =>
  `${getBaseUrl(params)}/${params.webhookDefinitionId}`

const getWebhooCallUrl = (params: GetWebhookParams) => `${getWebhookUrl(params)}/calls`

const getWebhooCallDetailsUrl = (params: GetWebhookCallDetailsUrl) =>
  `${getWebhookUrl(params)}/calls/${params.callId}`

const getWebhookHealthUrl = (params: GetWebhookParams) => `${getWebhookUrl(params)}/health`

export const get = (http: AxiosInstance, params: GetWebhookParams & QueryParams) => {
  return raw.get<CollectionProp<WebhookProps>>(http, getWebhookUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const getManyCallDetails = (http: AxiosInstance, params: GetWebhookParams & QueryParams) => {
  return raw.get(http, getWebhooCallUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const getCallDetails = (http: AxiosInstance, params: GetWebhookCallDetailsUrl) => {
  return raw.get(http, getWebhooCallDetailsUrl(params))
}

export const getHealthStatus = (http: AxiosInstance, params: GetWebhookParams) => {
  return raw.get<WebhookHealthProps>(http, getWebhookHealthUrl(params))
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

export const update = (
  http: AxiosInstance,
  params: GetWebhookParams,
  rawData: CreateWebhooksProps
) => {
  return raw.put<WebhookProps>(http, getWebhookUrl(params), rawData)
}

export const del = (http: AxiosInstance, params: GetWebhookParams) => {
  return raw.del(http, getWebhookUrl(params))
}
