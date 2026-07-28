import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { GetSpaceEnvironmentParams, GetExperienceParams } from '../../../common-types'
import type {
  CreateExperienceProps,
  UpsertExperienceProps,
  ExperienceLocalePublishPayload,
  ExperienceProps,
  ExperienceQueryOptions,
  ExperienceCollection,
} from '../../../entities/experience'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/experiences`

// Opts into the renamed ("new ExO entity types") Experience shape: sys.experienceTemplate
// instead of sys.template, and ExperienceFragment slot nodes. The renamed family shares the
// `/experiences` URLs with the legacy routes and is discriminated server-side on this header.
const ExperienceAlphaHeaders = {
  'x-contentful-enable-alpha-feature': 'new-exo-entity-types',
}

export const getMany: RestEndpoint<'Experience', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query: ExperienceQueryOptions },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ExperienceCollection>(http, getBaseUrl(params), {
    params: params.query,
    headers: {
      ...ExperienceAlphaHeaders,
      ...headers,
    },
  })
}

export const get: RestEndpoint<'Experience', 'get'> = (
  http: AxiosInstance,
  params: GetExperienceParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ExperienceProps>(http, getBaseUrl(params) + `/${params.experienceId}`, {
    headers: {
      ...ExperienceAlphaHeaders,
      ...headers,
    },
  })
}

export const create: RestEndpoint<'Experience', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: CreateExperienceProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.post<ExperienceProps>(http, getBaseUrl(params), data, {
    headers: {
      ...ExperienceAlphaHeaders,
      ...headers,
    },
  })
}

export const upsert: RestEndpoint<'Experience', 'upsert'> = (
  http: AxiosInstance,
  params: GetExperienceParams,
  rawData: UpsertExperienceProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const { sys, ...body } = copy(rawData)
  return raw.put<ExperienceProps>(http, getBaseUrl(params) + `/${params.experienceId}`, body, {
    headers: {
      ...ExperienceAlphaHeaders,
      ...(sys.version !== undefined && {
        'X-Contentful-Version': sys.version,
      }),
      ...headers,
    },
  })
}

export const del: RestEndpoint<'Experience', 'delete'> = (
  http: AxiosInstance,
  params: GetExperienceParams,
) => {
  return raw.del(http, getBaseUrl(params) + `/${params.experienceId}`, {
    headers: {
      ...ExperienceAlphaHeaders,
    },
  })
}

export const publish: RestEndpoint<'Experience', 'publish'> = (
  http: AxiosInstance,
  params: GetExperienceParams & { version: number },
  payload?: ExperienceLocalePublishPayload,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put(http, getBaseUrl(params) + `/${params.experienceId}/published`, payload ?? null, {
    headers: {
      ...ExperienceAlphaHeaders,
      'X-Contentful-Version': params.version,
      ...headers,
    },
  })
}

export const unpublish: RestEndpoint<'Experience', 'unpublish'> = (
  http: AxiosInstance,
  params: GetExperienceParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del(http, getBaseUrl(params) + `/${params.experienceId}/published`, {
    headers: {
      ...ExperienceAlphaHeaders,
      'X-Contentful-Version': params.version,
      ...headers,
    },
  })
}
