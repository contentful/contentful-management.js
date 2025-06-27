import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { SetOptional } from 'type-fest'
import type {
  GetSpaceParams,
  GetWebhookCallDetailsUrl,
  GetWebhookParams,
  QueryParams,
} from '../../../common-types.js'
import type {
  CreateWebhooksProps,
  UpsertWebhookSigningSecretPayload,
  WebhookProps,
  WebhookRetryPolicyPayload,
  WebhookRetryPolicyProps,
  WebhookSigningSecretProps,
} from '../../../entities/webhook.js'
import type { RestEndpoint } from '../types.js'
import * as raw from './raw.js'
import { normalizeSelect } from './utils.js'

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

const getWebhookSettingsUrl = (params: GetSpaceParams) =>
  `/spaces/${params.spaceId}/webhook_settings`

const getWebhookSigningSecretUrl = (params: GetSpaceParams) =>
  `${getWebhookSettingsUrl(params)}/signing_secret`

const getWebhookRetryPolicyUrl = (params: GetSpaceParams) =>
  `${getWebhookSettingsUrl(params)}/retry_policy`

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

export const getSigningSecret: RestEndpoint<'Webhook', 'getSigningSecret'> = (
  http: AxiosInstance,
  params: GetSpaceParams
) => {
  return raw.get(http, getWebhookSigningSecretUrl(params))
}

/**
 * @deprecated The EAP for this feature has ended. This method will be removed in the next major version.
 */
export const getRetryPolicy: RestEndpoint<'Webhook', 'getRetryPolicy'> = (
  http: AxiosInstance,
  params: GetSpaceParams
) => {
  return raw.get(http, getWebhookRetryPolicyUrl(params))
}

export const create: RestEndpoint<'Webhook', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceParams,
  rawData: CreateWebhooksProps,
  headers?: RawAxiosRequestHeaders
) => {
  const data = copy(rawData)

  return raw.post<WebhookProps>(http, getBaseUrl(params), data, { headers })
}

export const createWithId = (
  http: AxiosInstance,
  params: GetWebhookParams,
  rawData: CreateWebhooksProps,
  headers?: RawAxiosRequestHeaders
) => {
  const data = copy(rawData)

  return raw.put<WebhookProps>(http, getWebhookUrl(params), data, { headers })
}

export const update: RestEndpoint<'Webhook', 'update'> = async (
  http: AxiosInstance,
  params: GetWebhookParams,
  rawData: WebhookProps,
  headers?: RawAxiosRequestHeaders
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

export const upsertSigningSecret: RestEndpoint<'Webhook', 'upsertSigningSecret'> = async (
  http: AxiosInstance,
  params: GetSpaceParams,
  rawData: UpsertWebhookSigningSecretPayload
) => {
  const data = copy(rawData)

  return raw.put<WebhookSigningSecretProps>(http, getWebhookSigningSecretUrl(params), data)
}

/**
 * @deprecated The EAP for this feature has ended. This method will be removed in the next major version.
 */
export const upsertRetryPolicy: RestEndpoint<'Webhook', 'upsertRetryPolicy'> = async (
  http: AxiosInstance,
  params: GetSpaceParams,
  rawData: WebhookRetryPolicyPayload
) => {
  const data = copy(rawData)

  return raw.put<WebhookRetryPolicyProps>(http, getWebhookRetryPolicyUrl(params), data)
}

export const del: RestEndpoint<'Webhook', 'delete'> = (
  http: AxiosInstance,
  params: GetWebhookParams
) => {
  return raw.del(http, getWebhookUrl(params))
}

export const deleteSigningSecret: RestEndpoint<'Webhook', 'deleteSigningSecret'> = async (
  http: AxiosInstance,
  params: GetSpaceParams
) => {
  return raw.del<void>(http, getWebhookSigningSecretUrl(params))
}

/**
 * @deprecated The EAP for this feature has ended. This method will be removed in the next major version.
 */
export const deleteRetryPolicy: RestEndpoint<'Webhook', 'deleteRetryPolicy'> = async (
  http: AxiosInstance,
  params: GetSpaceParams
) => {
  return raw.del<void>(http, getWebhookRetryPolicyUrl(params))
}
