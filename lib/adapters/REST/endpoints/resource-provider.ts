import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import type { GetResourceProviderParams } from '../../../common-types'
import type { RestEndpoint } from '../types'
import type {
  ResourceProviderProps,
  UpsertResourceProviderProps,
} from '../../../entities/resource-provider'

const getBaseUrl = (params: GetResourceProviderParams) =>
  `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/resource_provider`

export const get: RestEndpoint<'ResourceProvider', 'get'> = (
  http: AxiosInstance,
  params: GetResourceProviderParams
) => {
  return raw.get<ResourceProviderProps>(http, getBaseUrl(params))
}

export const upsert: RestEndpoint<'ResourceProvider', 'upsert'> = (
  http: AxiosInstance,
  params: GetResourceProviderParams,
  rawData: UpsertResourceProviderProps,
  headers?: RawAxiosRequestHeaders
) => {
  return raw.put<ResourceProviderProps>(http, getBaseUrl(params), rawData, { headers })
}

export const del: RestEndpoint<'ResourceProvider', 'delete'> = (
  http: AxiosInstance,
  params: GetResourceProviderParams
) => {
  return raw.del(http, getBaseUrl(params))
}
