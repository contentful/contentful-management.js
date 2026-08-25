import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  GetFragmentOptimizationVariantParams,
  GetManyFragmentOptimizationVariantParams,
} from '../../../common-types'
import type {
  CreateFragmentOptimizationVariantProps,
  FragmentOptimizationVariantCollection,
  FragmentOptimizationVariantProps,
  FragmentOptimizationVariantQueryOptions,
  UpsertFragmentOptimizationVariantProps,
} from '../../../entities/fragment-optimization-variant'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetManyFragmentOptimizationVariantParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/fragments/${params.fragmentId}/optimization_variants`

const getVariantUrl = (params: GetFragmentOptimizationVariantParams) =>
  `${getBaseUrl(params)}/${params.variantId}`

const actionHeaders = (version: number, headers?: RawAxiosRequestHeaders) => ({
  'X-Contentful-Version': version,
  ...headers,
})

export const getMany: RestEndpoint<'FragmentOptimizationVariant', 'getMany'> = (
  http: AxiosInstance,
  params: GetManyFragmentOptimizationVariantParams & {
    query: FragmentOptimizationVariantQueryOptions
  },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<FragmentOptimizationVariantCollection>(http, getBaseUrl(params), {
    params: params.query,
    headers,
  })
}

export const get: RestEndpoint<'FragmentOptimizationVariant', 'get'> = (
  http: AxiosInstance,
  params: GetFragmentOptimizationVariantParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<FragmentOptimizationVariantProps>(http, getVariantUrl(params), { headers })
}

export const create: RestEndpoint<'FragmentOptimizationVariant', 'create'> = (
  http: AxiosInstance,
  params: GetManyFragmentOptimizationVariantParams,
  rawData: CreateFragmentOptimizationVariantProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.post<FragmentOptimizationVariantProps>(http, getBaseUrl(params), data, { headers })
}

export const upsert: RestEndpoint<'FragmentOptimizationVariant', 'upsert'> = (
  http: AxiosInstance,
  params: GetFragmentOptimizationVariantParams,
  rawData: UpsertFragmentOptimizationVariantProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const { sys, ...body } = copy(rawData)
  return raw.put<FragmentOptimizationVariantProps>(http, getVariantUrl(params), body, {
    headers: {
      ...(sys?.version !== undefined && {
        'X-Contentful-Version': sys.version,
      }),
      ...headers,
    },
  })
}

export const del: RestEndpoint<'FragmentOptimizationVariant', 'delete'> = (
  http: AxiosInstance,
  params: GetFragmentOptimizationVariantParams,
) => {
  return raw.del(http, getVariantUrl(params))
}

export const publish: RestEndpoint<'FragmentOptimizationVariant', 'publish'> = (
  http: AxiosInstance,
  params: GetFragmentOptimizationVariantParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put<FragmentOptimizationVariantProps>(
    http,
    `${getVariantUrl(params)}/published`,
    null,
    { headers: actionHeaders(params.version, headers) },
  )
}

export const unpublish: RestEndpoint<'FragmentOptimizationVariant', 'unpublish'> = (
  http: AxiosInstance,
  params: GetFragmentOptimizationVariantParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del<FragmentOptimizationVariantProps>(http, `${getVariantUrl(params)}/published`, {
    headers: actionHeaders(params.version, headers),
  })
}

export const archive: RestEndpoint<'FragmentOptimizationVariant', 'archive'> = (
  http: AxiosInstance,
  params: GetFragmentOptimizationVariantParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put<FragmentOptimizationVariantProps>(
    http,
    `${getVariantUrl(params)}/archived`,
    null,
    { headers: actionHeaders(params.version, headers) },
  )
}

export const unarchive: RestEndpoint<'FragmentOptimizationVariant', 'unarchive'> = (
  http: AxiosInstance,
  params: GetFragmentOptimizationVariantParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del<FragmentOptimizationVariantProps>(http, `${getVariantUrl(params)}/archived`, {
    headers: actionHeaders(params.version, headers),
  })
}
