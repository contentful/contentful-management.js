import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { SetOptional } from 'type-fest'
import type {
  CursorPaginatedCollectionProp,
  GetSpaceEnvironmentParams,
  GetViewParams,
} from '../../../common-types'
import type {
  CreateViewProps,
  UpdateViewProps,
  ViewLocalePublishPayload,
  ViewProps,
  ViewQueryOptions,
} from '../../../entities/view'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/experiences`

export const getMany: RestEndpoint<'View', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query: ViewQueryOptions },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<CursorPaginatedCollectionProp<ViewProps>>(http, getBaseUrl(params), {
    params: params.query,
    headers,
  })
}

export const get: RestEndpoint<'View', 'get'> = (
  http: AxiosInstance,
  params: GetViewParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ViewProps>(http, getBaseUrl(params) + `/${params.viewId}`, {
    headers,
  })
}

export const create: RestEndpoint<'View', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: CreateViewProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.post<ViewProps>(http, getBaseUrl(params), data, { headers })
}

export const update: RestEndpoint<'View', 'update'> = (
  http: AxiosInstance,
  params: GetViewParams,
  rawData: UpdateViewProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data: SetOptional<typeof rawData, 'sys'> & { componentTypeId?: string } = copy(rawData)
  data.componentTypeId = rawData.sys.componentType.sys.id
  delete data.sys
  return raw.put<ViewProps>(http, getBaseUrl(params) + `/${params.viewId}`, data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del: RestEndpoint<'View', 'delete'> = (http: AxiosInstance, params: GetViewParams) => {
  return raw.del(http, getBaseUrl(params) + `/${params.viewId}`)
}

export const publish: RestEndpoint<'View', 'publish'> = (
  http: AxiosInstance,
  params: GetViewParams & { version: number },
  payload?: ViewLocalePublishPayload,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put(http, getBaseUrl(params) + `/${params.viewId}/published`, payload ?? null, {
    headers: {
      'X-Contentful-Version': params.version,
      ...headers,
    },
  })
}

export const unpublish: RestEndpoint<'View', 'unpublish'> = (
  http: AxiosInstance,
  params: GetViewParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del(http, getBaseUrl(params) + `/${params.viewId}/published`, {
    headers: {
      'X-Contentful-Version': params.version,
      ...headers,
    },
  })
}
