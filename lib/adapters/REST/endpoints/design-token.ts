import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { GetDesignTokenParams, GetSpaceEnvironmentParams } from '../../../common-types'
import type {
  DesignTokenCollection,
  DesignTokenProps,
  DesignTokenQueryOptions,
  UpsertDesignTokenProps,
} from '../../../entities/design-token'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/design_tokens`

export const getMany: RestEndpoint<'DesignToken', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query: DesignTokenQueryOptions },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<DesignTokenCollection>(http, getBaseUrl(params), {
    params: params.query,
    headers,
  })
}

export const get: RestEndpoint<'DesignToken', 'get'> = (
  http: AxiosInstance,
  params: GetDesignTokenParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<DesignTokenProps>(http, getBaseUrl(params) + `/${params.designTokenId}`, {
    headers,
  })
}

export const upsert: RestEndpoint<'DesignToken', 'upsert'> = (
  http: AxiosInstance,
  params: GetDesignTokenParams,
  rawData: UpsertDesignTokenProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const { sys, ...body } = copy(rawData)
  return raw.put<DesignTokenProps>(http, getBaseUrl(params) + `/${params.designTokenId}`, body, {
    headers: {
      ...(sys.version !== undefined && {
        'X-Contentful-Version': sys.version,
      }),
      ...headers,
    },
  })
}

export const del: RestEndpoint<'DesignToken', 'delete'> = (
  http: AxiosInstance,
  params: GetDesignTokenParams,
) => {
  return raw.del(http, getBaseUrl(params) + `/${params.designTokenId}`)
}
