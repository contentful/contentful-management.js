import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  GetExperienceVariantParams,
  GetManyExperienceVariantParams,
} from '../../../common-types'
import type {
  CreateExperienceVariantProps,
  ExperienceVariantCollection,
  ExperienceVariantProps,
  ExperienceVariantQueryOptions,
  UpsertExperienceVariantProps,
} from '../../../entities/experience-variant'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import { ExperienceAlphaHeaders } from './experience'

const getBaseUrl = (params: GetManyExperienceVariantParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/experiences/${params.experienceId}/optimization_variants`

const getVariantUrl = (params: GetExperienceVariantParams) =>
  `${getBaseUrl(params)}/${params.variantId}`

const actionHeaders = (version: number, headers?: RawAxiosRequestHeaders) => ({
  ...ExperienceAlphaHeaders,
  'X-Contentful-Version': version,
  ...headers,
})

export const getMany: RestEndpoint<'ExperienceVariant', 'getMany'> = (
  http: AxiosInstance,
  params: GetManyExperienceVariantParams & {
    query: ExperienceVariantQueryOptions
  },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ExperienceVariantCollection>(http, getBaseUrl(params), {
    params: params.query,
    headers: {
      ...ExperienceAlphaHeaders,
      ...headers,
    },
  })
}

export const get: RestEndpoint<'ExperienceVariant', 'get'> = (
  http: AxiosInstance,
  params: GetExperienceVariantParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ExperienceVariantProps>(http, getVariantUrl(params), {
    headers: {
      ...ExperienceAlphaHeaders,
      ...headers,
    },
  })
}

export const create: RestEndpoint<'ExperienceVariant', 'create'> = (
  http: AxiosInstance,
  params: GetManyExperienceVariantParams,
  rawData: CreateExperienceVariantProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.post<ExperienceVariantProps>(http, getBaseUrl(params), data, {
    headers: {
      ...ExperienceAlphaHeaders,
      ...headers,
    },
  })
}

export const upsert: RestEndpoint<'ExperienceVariant', 'upsert'> = (
  http: AxiosInstance,
  params: GetExperienceVariantParams,
  rawData: UpsertExperienceVariantProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const { sys, ...body } = copy(rawData)
  return raw.put<ExperienceVariantProps>(http, getVariantUrl(params), body, {
    headers: {
      ...ExperienceAlphaHeaders,
      ...(sys.version !== undefined && {
        'X-Contentful-Version': sys.version,
      }),
      ...headers,
    },
  })
}

export const del: RestEndpoint<'ExperienceVariant', 'delete'> = (
  http: AxiosInstance,
  params: GetExperienceVariantParams,
) => {
  return raw.del(http, getVariantUrl(params), {
    headers: {
      ...ExperienceAlphaHeaders,
    },
  })
}

export const publish: RestEndpoint<'ExperienceVariant', 'publish'> = (
  http: AxiosInstance,
  params: GetExperienceVariantParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put<ExperienceVariantProps>(http, `${getVariantUrl(params)}/published`, null, {
    headers: actionHeaders(params.version, headers),
  })
}

export const unpublish: RestEndpoint<'ExperienceVariant', 'unpublish'> = (
  http: AxiosInstance,
  params: GetExperienceVariantParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del<ExperienceVariantProps>(http, `${getVariantUrl(params)}/published`, {
    headers: actionHeaders(params.version, headers),
  })
}

export const archive: RestEndpoint<'ExperienceVariant', 'archive'> = (
  http: AxiosInstance,
  params: GetExperienceVariantParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put<ExperienceVariantProps>(http, `${getVariantUrl(params)}/archived`, null, {
    headers: actionHeaders(params.version, headers),
  })
}

export const unarchive: RestEndpoint<'ExperienceVariant', 'unarchive'> = (
  http: AxiosInstance,
  params: GetExperienceVariantParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del<ExperienceVariantProps>(http, `${getVariantUrl(params)}/archived`, {
    headers: actionHeaders(params.version, headers),
  })
}
