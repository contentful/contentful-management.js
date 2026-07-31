import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { GetComponentParams, GetSpaceEnvironmentParams } from '../../../common-types'
import type {
  ComponentCollection,
  ComponentProps,
  ComponentQueryOptions,
  CreateComponentProps,
  UpsertComponentProps,
} from '../../../entities/component'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/components`

export const getMany: RestEndpoint<'Component', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query: ComponentQueryOptions },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ComponentCollection>(http, getBaseUrl(params), {
    params: params.query,
    headers,
  })
}

export const get: RestEndpoint<'Component', 'get'> = (
  http: AxiosInstance,
  params: GetComponentParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ComponentProps>(http, getBaseUrl(params) + `/${params.componentId}`, {
    headers,
  })
}

export const create: RestEndpoint<'Component', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: CreateComponentProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.post<ComponentProps>(http, getBaseUrl(params), data, { headers })
}

export const upsert: RestEndpoint<'Component', 'upsert'> = (
  http: AxiosInstance,
  params: GetComponentParams,
  rawData: UpsertComponentProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const { sys, ...body } = copy(rawData)
  return raw.put<ComponentProps>(http, getBaseUrl(params) + `/${params.componentId}`, body, {
    headers: {
      ...(sys.version !== undefined && {
        'X-Contentful-Version': sys.version,
      }),
      ...headers,
    },
  })
}

export const del: RestEndpoint<'Component', 'delete'> = (
  http: AxiosInstance,
  params: GetComponentParams,
) => {
  return raw.del(http, getBaseUrl(params) + `/${params.componentId}`)
}

export const publish: RestEndpoint<'Component', 'publish'> = (
  http: AxiosInstance,
  params: GetComponentParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put(http, `${getBaseUrl(params)}/${params.componentId}/published`, null, {
    headers: {
      'X-Contentful-Version': params.version,
      ...headers,
    },
  })
}

export const unpublish: RestEndpoint<'Component', 'unpublish'> = (
  http: AxiosInstance,
  params: GetComponentParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del(http, `${getBaseUrl(params)}/${params.componentId}/published`, {
    headers: {
      'X-Contentful-Version': params.version,
      ...headers,
    },
  })
}
