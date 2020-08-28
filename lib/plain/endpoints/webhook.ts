import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { QueryParams, GetSpaceParams, CollectionProp, PaginationQueryParams } from './common-types'
import { normalizeSelect } from './utils'
import {
  WebhookProps,
  CreateWebhooksProps,
  WebhookHealthProps,
  WebhookCallDetailsProps,
  WebhookCallOverviewProps,
} from '../../entities/webhook'
import { SetOptional } from 'type-fest'

type GetWebhookParams = GetSpaceParams & { webhookDefinitionId: string }

type CreateWebHookParams = SetOptional<GetWebhookParams, 'webhookDefinitionId'>

type GetWebhookCallDetailsUrl = GetWebhookParams & { callId: string }

const getBaseUrl = (params: GetSpaceParams) => `/spaces/${params.spaceId}/webhook_definitions`

const getWebhookCallBaseUrl = (params: GetSpaceParams) => `/spaces/${params.spaceId}/webhooks`

const getWebhookUrl = (params: GetWebhookParams) =>
  `${getBaseUrl(params)}/${params.webhookDefinitionId}`

const getWebhookCallUrl = (params: GetWebhookParams) =>
  `${getWebhookCallBaseUrl(params)}/${params.webhookDefinitionId}/calls`

const getWebhookCallDetailsUrl = (params: GetWebhookCallDetailsUrl) =>
  `${getWebhookCallBaseUrl(params)}/${params.webhookDefinitionId}/calls/${params.callId}`

const getWebhookHealthUrl = (params: GetWebhookParams) =>
  `${getWebhookCallBaseUrl(params)}/${params.webhookDefinitionId}/health`

export const get = (http: AxiosInstance, params: GetWebhookParams) => {
  return raw.get<CollectionProp<WebhookProps>>(http, getWebhookUrl(params))
}

export const getManyCallDetails = (http: AxiosInstance, params: GetWebhookParams & QueryParams) => {
  return raw.get<CollectionProp<WebhookCallOverviewProps>>(http, getWebhookCallUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const getCallDetails = (http: AxiosInstance, params: GetWebhookCallDetailsUrl) => {
  return raw.get<WebhookCallDetailsProps>(http, getWebhookCallDetailsUrl(params))
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
