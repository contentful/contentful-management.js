import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { SetOptional } from 'type-fest'
import type {
  CursorPaginatedCollectionProp,
  GetFragmentParams,
  GetSpaceEnvironmentParams,
} from '../../../common-types'
import type {
  CreateFragmentProps,
  FragmentProps,
  FragmentQueryOptions,
  UpdateFragmentProps,
} from '../../../entities/fragment'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/fragments`

export const getMany: RestEndpoint<'Fragment', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query: FragmentQueryOptions },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<CursorPaginatedCollectionProp<FragmentProps>>(http, getBaseUrl(params), {
    params: params.query,
    headers,
  })
}

export const get: RestEndpoint<'Fragment', 'get'> = (
  http: AxiosInstance,
  params: GetFragmentParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<FragmentProps>(http, getBaseUrl(params) + `/${params.fragmentId}`, { headers })
}

export const create: RestEndpoint<'Fragment', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: CreateFragmentProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.post<FragmentProps>(http, getBaseUrl(params), data, { headers })
}

export const update: RestEndpoint<'Fragment', 'update'> = (
  http: AxiosInstance,
  params: GetFragmentParams,
  rawData: UpdateFragmentProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys
  return raw.put<FragmentProps>(http, getBaseUrl(params) + `/${params.fragmentId}`, data, {
    headers: {
      ...(rawData.sys?.version !== undefined && {
        'X-Contentful-Version': rawData.sys.version,
      }),
      ...headers,
    },
  })
}

export const del: RestEndpoint<'Fragment', 'delete'> = (
  http: AxiosInstance,
  params: GetFragmentParams,
) => {
  return raw.del(http, getBaseUrl(params) + `/${params.fragmentId}`)
}

export const publish: RestEndpoint<'Fragment', 'publish'> = (
  http: AxiosInstance,
  params: GetFragmentParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put<FragmentProps>(
    http,
    getBaseUrl(params) + `/${params.fragmentId}/published`,
    null,
    {
      headers: {
        'X-Contentful-Version': params.version,
        ...headers,
      },
    },
  )
}

export const unpublish: RestEndpoint<'Fragment', 'unpublish'> = (
  http: AxiosInstance,
  params: GetFragmentParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del<FragmentProps>(http, getBaseUrl(params) + `/${params.fragmentId}/published`, {
    headers: {
      'X-Contentful-Version': params.version,
      ...headers,
    },
  })
}
