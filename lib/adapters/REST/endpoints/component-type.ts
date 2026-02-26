import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  CollectionProp,
  GetComponentTypeParams,
  GetSpaceEnvironmentParams,
} from '../../../common-types'
import type {
  ComponentTypeProps,
  ComponentTypeQueryOptions,
  CreateComponentTypeProps,
} from '../../../entities/component-type'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/component_types`

export const getMany: RestEndpoint<'ComponentType', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query: ComponentTypeQueryOptions },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<CollectionProp<ComponentTypeProps>>(http, getBaseUrl(params), {
    params: params.query,
    headers,
  })
}

export const get: RestEndpoint<'ComponentType', 'get'> = (
  http: AxiosInstance,
  params: GetComponentTypeParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ComponentTypeProps>(http, getBaseUrl(params) + `/${params.componentTypeId}`, {
    headers,
  })
}

export const publish: RestEndpoint<'ComponentType', 'publish'> = (
  http: AxiosInstance,
  params: GetComponentTypeParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put(http, `${getBaseUrl(params)}/${params.componentTypeId}/published`, null, {
    headers: {
      'X-Contentful-Version': params.version,
      ...headers,
    },
  })
}

export const unpublish: RestEndpoint<'ComponentType', 'unpublish'> = (
  http: AxiosInstance,
  params: GetComponentTypeParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del(http, `${getBaseUrl(params)}/${params.componentTypeId}/published`, {
    headers: {
      'X-Contentful-Version': params.version,
      ...headers,
    },
  })
}

export const del: RestEndpoint<'ComponentType', 'delete'> = (
  http: AxiosInstance,
  params: GetComponentTypeParams,
) => {
  return raw.del(http, getBaseUrl(params) + `/${params.componentTypeId}`)
}

export const create: RestEndpoint<'ComponentType', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: CreateComponentTypeProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.post<ComponentTypeProps>(http, getBaseUrl(params), data, { headers })
}
