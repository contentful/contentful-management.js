import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw.js'
import copy from 'fast-copy'
import type {
  BasicCursorPaginationOptions,
  CursorPaginatedCollectionProp,
  GetResourceTypeParams,
  CollectionProp,
  GetSpaceEnvironmentParams,
} from '../../../common-types.js'
import type { RestEndpoint } from '../types.js'
import type {
  ResourceTypeProps,
  SpaceEnvResourceTypeProps,
  UpsertResourceTypeProps,
} from '../../../entities/resource-type.js'

const getBaseUrl = (
  params: GetResourceTypeParams | Omit<GetResourceTypeParams, 'resourceTypeId'>
) =>
  `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/resource_provider/resource_types`

const getEntityUrl = (params: GetResourceTypeParams) =>
  `${getBaseUrl(params)}/${params.resourceTypeId}`

const getSpaceEnvUrl = (
  params: GetSpaceEnvironmentParams & { query?: BasicCursorPaginationOptions }
) => `/spaces/${params.spaceId}/environments/${params.environmentId}/resource_types`

export const get: RestEndpoint<'ResourceType', 'get'> = (
  http: AxiosInstance,
  params: GetResourceTypeParams
) => {
  return raw.get<ResourceTypeProps>(http, getEntityUrl(params))
}

export const upsert: RestEndpoint<'ResourceType', 'upsert'> = (
  http: AxiosInstance,
  params: GetResourceTypeParams,
  rawData: UpsertResourceTypeProps,
  headers?: RawAxiosRequestHeaders
) => {
  const data = copy(rawData)

  return raw.put<ResourceTypeProps>(http, getEntityUrl(params), data, { headers })
}

export const del: RestEndpoint<'ResourceType', 'delete'> = (
  http: AxiosInstance,
  params: GetResourceTypeParams
) => {
  return raw.del(http, getEntityUrl(params))
}

export const getMany: RestEndpoint<'ResourceType', 'getMany'> = (
  http: AxiosInstance,
  params: Omit<GetResourceTypeParams, 'resourceTypeId'>
) => {
  return raw.get<CollectionProp<ResourceTypeProps>>(http, getBaseUrl(params))
}

export const getForEnvironment: RestEndpoint<'ResourceType', 'getForEnvironment'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query?: BasicCursorPaginationOptions }
) => {
  return raw.get<CursorPaginatedCollectionProp<SpaceEnvResourceTypeProps>>(
    http,
    getSpaceEnvUrl(params)
  )
}
