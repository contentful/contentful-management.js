import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  GetExperienceFragmentVariantParams,
  GetManyExperienceFragmentVariantParams,
} from '../../../common-types'
import type {
  CreateExperienceFragmentVariantProps,
  ExperienceFragmentVariantCollection,
  ExperienceFragmentVariantProps,
  ExperienceFragmentVariantQueryOptions,
  UpsertExperienceFragmentVariantProps,
} from '../../../entities/experience-fragment-variant'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetManyExperienceFragmentVariantParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/experience_fragments/${params.experienceFragmentId}/optimization_variants`

const getVariantUrl = (params: GetExperienceFragmentVariantParams) =>
  `${getBaseUrl(params)}/${params.variantId}`

const actionHeaders = (version: number, headers?: RawAxiosRequestHeaders) => ({
  'X-Contentful-Version': version,
  ...headers,
})

export const getMany: RestEndpoint<'ExperienceFragmentVariant', 'getMany'> = (
  http: AxiosInstance,
  params: GetManyExperienceFragmentVariantParams & {
    query: ExperienceFragmentVariantQueryOptions
  },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ExperienceFragmentVariantCollection>(http, getBaseUrl(params), {
    params: params.query,
    headers,
  })
}

export const get: RestEndpoint<'ExperienceFragmentVariant', 'get'> = (
  http: AxiosInstance,
  params: GetExperienceFragmentVariantParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ExperienceFragmentVariantProps>(http, getVariantUrl(params), { headers })
}

export const create: RestEndpoint<'ExperienceFragmentVariant', 'create'> = (
  http: AxiosInstance,
  params: GetManyExperienceFragmentVariantParams,
  rawData: CreateExperienceFragmentVariantProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.post<ExperienceFragmentVariantProps>(http, getBaseUrl(params), data, { headers })
}

export const upsert: RestEndpoint<'ExperienceFragmentVariant', 'upsert'> = (
  http: AxiosInstance,
  params: GetExperienceFragmentVariantParams,
  rawData: UpsertExperienceFragmentVariantProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const { sys, ...body } = copy(rawData)
  return raw.put<ExperienceFragmentVariantProps>(http, getVariantUrl(params), body, {
    headers: {
      ...(sys?.version !== undefined && {
        'X-Contentful-Version': sys.version,
      }),
      ...headers,
    },
  })
}

export const del: RestEndpoint<'ExperienceFragmentVariant', 'delete'> = (
  http: AxiosInstance,
  params: GetExperienceFragmentVariantParams,
) => {
  return raw.del(http, getVariantUrl(params))
}

export const publish: RestEndpoint<'ExperienceFragmentVariant', 'publish'> = (
  http: AxiosInstance,
  params: GetExperienceFragmentVariantParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put<ExperienceFragmentVariantProps>(http, `${getVariantUrl(params)}/published`, null, {
    headers: actionHeaders(params.version, headers),
  })
}

export const unpublish: RestEndpoint<'ExperienceFragmentVariant', 'unpublish'> = (
  http: AxiosInstance,
  params: GetExperienceFragmentVariantParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del<ExperienceFragmentVariantProps>(http, `${getVariantUrl(params)}/published`, {
    headers: actionHeaders(params.version, headers),
  })
}

export const archive: RestEndpoint<'ExperienceFragmentVariant', 'archive'> = (
  http: AxiosInstance,
  params: GetExperienceFragmentVariantParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put<ExperienceFragmentVariantProps>(http, `${getVariantUrl(params)}/archived`, null, {
    headers: actionHeaders(params.version, headers),
  })
}

export const unarchive: RestEndpoint<'ExperienceFragmentVariant', 'unarchive'> = (
  http: AxiosInstance,
  params: GetExperienceFragmentVariantParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del<ExperienceFragmentVariantProps>(http, `${getVariantUrl(params)}/archived`, {
    headers: actionHeaders(params.version, headers),
  })
}
