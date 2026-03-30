import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  CursorPaginatedCollectionProp,
  GetDataAssemblyParams,
  GetSpaceEnvironmentParams,
} from '../../../common-types'
import type {
  CreateDataAssemblyProps,
  DataAssemblyProps,
  DataAssemblyQueryOptions,
  UpdateDataAssemblyProps,
} from '../../../entities/data-assembly'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/data_assemblies`

const getPublicUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/public/data_assemblies`

export const getMany: RestEndpoint<'DataAssembly', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query: DataAssemblyQueryOptions },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<CursorPaginatedCollectionProp<DataAssemblyProps>>(http, getBaseUrl(params), {
    params: params.query,
    headers,
  })
}

export const get: RestEndpoint<'DataAssembly', 'get'> = (
  http: AxiosInstance,
  params: GetDataAssemblyParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<DataAssemblyProps>(http, getBaseUrl(params) + `/${params.dataAssemblyId}`, {
    headers,
  })
}

export const create: RestEndpoint<'DataAssembly', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: CreateDataAssemblyProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.post<DataAssemblyProps>(http, getBaseUrl(params), data, { headers })
}

export const update: RestEndpoint<'DataAssembly', 'update'> = (
  http: AxiosInstance,
  params: GetDataAssemblyParams,
  rawData: UpdateDataAssemblyProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.put<DataAssemblyProps>(http, getBaseUrl(params) + `/${params.dataAssemblyId}`, data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del: RestEndpoint<'DataAssembly', 'delete'> = (
  http: AxiosInstance,
  params: GetDataAssemblyParams,
) => {
  return raw.del(http, getBaseUrl(params) + `/${params.dataAssemblyId}`)
}

export const publish: RestEndpoint<'DataAssembly', 'publish'> = (
  http: AxiosInstance,
  params: GetDataAssemblyParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put(http, `${getBaseUrl(params)}/${params.dataAssemblyId}/published`, null, {
    headers: {
      'X-Contentful-Version': params.version,
      ...headers,
    },
  })
}

export const getPublished: RestEndpoint<'DataAssembly', 'getPublished'> = (
  http: AxiosInstance,
  params: GetDataAssemblyParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<DataAssemblyProps>(http, getPublicUrl(params) + `/${params.dataAssemblyId}`, {
    headers,
  })
}

export const getManyPublished: RestEndpoint<'DataAssembly', 'getManyPublished'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query: DataAssemblyQueryOptions },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<CursorPaginatedCollectionProp<DataAssemblyProps>>(http, getPublicUrl(params), {
    params: params.query,
    headers,
  })
}

export const unpublish: RestEndpoint<'DataAssembly', 'unpublish'> = (
  http: AxiosInstance,
  params: GetDataAssemblyParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del(http, `${getBaseUrl(params)}/${params.dataAssemblyId}/published`, {
    headers: {
      'X-Contentful-Version': params.version,
      ...headers,
    },
  })
}
