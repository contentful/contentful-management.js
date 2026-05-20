import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { GetComponentTypeParams, GetSpaceEnvironmentParams } from '../../../common-types'
import type {
  ComponentTypeCollection,
  ComponentTypeProps,
  ComponentTypeQueryOptions,
  CreateComponentTypeProps,
  ComponentTypeUpsertProps,
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
  return raw.get<ComponentTypeCollection>(http, getBaseUrl(params), {
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

export const create: RestEndpoint<'ComponentType', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: CreateComponentTypeProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.post<ComponentTypeProps>(http, getBaseUrl(params), data, { headers })
}

export const upsert: RestEndpoint<'ComponentType', 'upsert'> = (
  http: AxiosInstance,
  params: GetComponentTypeParams & { version?: number },
  rawData: ComponentTypeUpsertProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.put<ComponentTypeProps>(
    http,
    getBaseUrl(params) + `/${params.componentTypeId}`,
    data,
    {
      headers: {
        ...(params.version !== undefined && {
          'X-Contentful-Version': params.version,
        }),
        ...headers,
      },
    },
  )
}

export const del: RestEndpoint<'ComponentType', 'delete'> = (
  http: AxiosInstance,
  params: GetComponentTypeParams,
) => {
  return raw.del(http, getBaseUrl(params) + `/${params.componentTypeId}`)
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
