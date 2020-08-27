import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { QueryParams, GetSpaceParams, CollectionProp } from './common-types'
import { normalizeSelect } from './utils'
import { WebhookProps, CreateWebhooksProps } from '../../entities/webhook'

type GetWebhookParams = GetSpaceParams & { webhookDefinitionId: string }

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
  params: GetSpaceParams,
  rawData: CreateWebhooksProps
) => {
  return raw.post<WebhookProps>(http, getBaseUrl(params), rawData)
}
