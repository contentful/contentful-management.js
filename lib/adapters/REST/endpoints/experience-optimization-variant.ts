import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  GetExperienceOptimizationVariantParams,
  GetManyExperienceOptimizationVariantParams,
} from '../../../common-types'
import type {
  CreateExperienceOptimizationVariantProps,
  ExperienceOptimizationVariantCollection,
  ExperienceOptimizationVariantProps,
  ExperienceOptimizationVariantQueryOptions,
  UpsertExperienceOptimizationVariantProps,
} from '../../../entities/experience-optimization-variant'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import { ExperienceAlphaHeaders } from './experience'

const getBaseUrl = (params: GetManyExperienceOptimizationVariantParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/experiences/${params.experienceId}/optimization_variants`

const getVariantUrl = (params: GetExperienceOptimizationVariantParams) =>
  `${getBaseUrl(params)}/${params.variantId}`

const actionHeaders = (version: number, headers?: RawAxiosRequestHeaders) => ({
  ...ExperienceAlphaHeaders,
  'X-Contentful-Version': version,
  ...headers,
})

export const getMany: RestEndpoint<'ExperienceOptimizationVariant', 'getMany'> = (
  http: AxiosInstance,
  params: GetManyExperienceOptimizationVariantParams & {
    query: ExperienceOptimizationVariantQueryOptions
  },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ExperienceOptimizationVariantCollection>(http, getBaseUrl(params), {
    params: params.query,
    headers: {
      ...ExperienceAlphaHeaders,
      ...headers,
    },
  })
}

export const get: RestEndpoint<'ExperienceOptimizationVariant', 'get'> = (
  http: AxiosInstance,
  params: GetExperienceOptimizationVariantParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ExperienceOptimizationVariantProps>(http, getVariantUrl(params), {
    headers: {
      ...ExperienceAlphaHeaders,
      ...headers,
    },
  })
}

export const create: RestEndpoint<'ExperienceOptimizationVariant', 'create'> = (
  http: AxiosInstance,
  params: GetManyExperienceOptimizationVariantParams,
  rawData: CreateExperienceOptimizationVariantProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.post<ExperienceOptimizationVariantProps>(http, getBaseUrl(params), data, {
    headers: {
      ...ExperienceAlphaHeaders,
      ...headers,
    },
  })
}

export const upsert: RestEndpoint<'ExperienceOptimizationVariant', 'upsert'> = (
  http: AxiosInstance,
  params: GetExperienceOptimizationVariantParams,
  rawData: UpsertExperienceOptimizationVariantProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const { sys, ...body } = copy(rawData)
  return raw.put<ExperienceOptimizationVariantProps>(http, getVariantUrl(params), body, {
    headers: {
      ...ExperienceAlphaHeaders,
      ...(sys.version !== undefined && {
        'X-Contentful-Version': sys.version,
      }),
      ...headers,
    },
  })
}

export const del: RestEndpoint<'ExperienceOptimizationVariant', 'delete'> = (
  http: AxiosInstance,
  params: GetExperienceOptimizationVariantParams,
) => {
  return raw.del(http, getVariantUrl(params), {
    headers: {
      ...ExperienceAlphaHeaders,
    },
  })
}

export const publish: RestEndpoint<'ExperienceOptimizationVariant', 'publish'> = (
  http: AxiosInstance,
  params: GetExperienceOptimizationVariantParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put<ExperienceOptimizationVariantProps>(
    http,
    `${getVariantUrl(params)}/published`,
    null,
    { headers: actionHeaders(params.version, headers) },
  )
}

export const unpublish: RestEndpoint<'ExperienceOptimizationVariant', 'unpublish'> = (
  http: AxiosInstance,
  params: GetExperienceOptimizationVariantParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del<ExperienceOptimizationVariantProps>(http, `${getVariantUrl(params)}/published`, {
    headers: actionHeaders(params.version, headers),
  })
}

export const archive: RestEndpoint<'ExperienceOptimizationVariant', 'archive'> = (
  http: AxiosInstance,
  params: GetExperienceOptimizationVariantParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put<ExperienceOptimizationVariantProps>(
    http,
    `${getVariantUrl(params)}/archived`,
    null,
    { headers: actionHeaders(params.version, headers) },
  )
}

export const unarchive: RestEndpoint<'ExperienceOptimizationVariant', 'unarchive'> = (
  http: AxiosInstance,
  params: GetExperienceOptimizationVariantParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del<ExperienceOptimizationVariantProps>(http, `${getVariantUrl(params)}/archived`, {
    headers: actionHeaders(params.version, headers),
  })
}
