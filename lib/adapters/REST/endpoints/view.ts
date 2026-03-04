import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  CursorPaginatedCollectionProp,
  GetSpaceEnvironmentParams,
  GetViewParams,
} from '../../../common-types'
import type { ViewProps, ViewQueryOptions } from '../../../entities/view'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/views`

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

export const del: RestEndpoint<'View', 'delete'> = (http: AxiosInstance, params: GetViewParams) => {
  return raw.del(http, getBaseUrl(params) + `/${params.viewId}`)
}
