import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { SetOptional } from 'type-fest'
import {
  GetSpaceParams,
  GetWebhookCallDetailsUrl,
  GetWebhookParams,
  QueryParams,
} from '../../../common-types'
import { CreateWebhooksProps, WebhookProps } from '../../../entities/webhook'
import { RestEndpoint } from '../types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

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

export const get: RestEndpoint<'Webhook', 'get'> = (
  http: AxiosInstance,
  params: GetWebhookParams
) => {
  return raw.get(http, getWebhookUrl(params))
}

export const getManyCallDetails: RestEndpoint<'Webhook', 'getManyCallDetails'> = (
  http: AxiosInstance,
  params: GetWebhookParams & QueryParams
) => {
  return raw.get(http, getWebhookCallUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const getCallDetails: RestEndpoint<'Webhook', 'getCallDetails'> = (
  http: AxiosInstance,
  params: GetWebhookCallDetailsUrl
) => {
  return raw.get(http, getWebhookCallDetailsUrl(params))
}

export const getHealthStatus: RestEndpoint<'Webhook', 'getHealthStatus'> = (
  http: AxiosInstance,
  params: GetWebhookParams
) => {
  return raw.get(http, getWebhookHealthUrl(params))
}

export const getMany: RestEndpoint<'Webhook', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceParams & QueryParams
) => {
  return raw.get(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const create: RestEndpoint<'Webhook', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceParams,
  rawData: CreateWebhooksProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)

  return raw.post<WebhookProps>(http, getBaseUrl(params), data, { headers })
}

export const createWithId = (
  http: AxiosInstance,
  params: GetWebhookParams,
  rawData: CreateWebhooksProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)

  return raw.put<WebhookProps>(http, getWebhookUrl(params), data, { headers })
}

export const update: RestEndpoint<'Webhook', 'update'> = async (
  http: AxiosInstance,
  params: GetWebhookParams,
  rawData: WebhookProps,
  headers?: Record<string, unknown>
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)

  delete data.sys

  return raw.put(http, getWebhookUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del: RestEndpoint<'Webhook', 'delete'> = (
  http: AxiosInstance,
  params: GetWebhookParams
) => {
  return raw.del(http, getWebhookUrl(params))
}
