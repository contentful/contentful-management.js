import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { GetExperienceFragmentParams, GetSpaceEnvironmentParams } from '../../../common-types'
import type {
  CreateExperienceFragmentProps,
  ExperienceFragmentProps,
  ExperienceFragmentQueryOptions,
  UpsertExperienceFragmentProps,
  ExperienceFragmentCollection,
} from '../../../entities/experience-fragment'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/experienceFragments`

// Opts into the renamed ("new ExO entity types") ExperienceFragment shape: sys.component
// instead of sys.componentType, and ExperienceFragment slot nodes. The renamed family is
// discriminated server-side on this header.
const ExperienceFragmentAlphaHeaders = {
  'x-contentful-enable-alpha-feature': 'new-exo-entity-types',
}

export const getMany: RestEndpoint<'ExperienceFragment', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query: ExperienceFragmentQueryOptions },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ExperienceFragmentCollection>(http, getBaseUrl(params), {
    params: params.query,
    headers: {
      ...ExperienceFragmentAlphaHeaders,
      ...headers,
    },
  })
}

export const get: RestEndpoint<'ExperienceFragment', 'get'> = (
  http: AxiosInstance,
  params: GetExperienceFragmentParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ExperienceFragmentProps>(
    http,
    getBaseUrl(params) + `/${params.experienceFragmentId}`,
    {
      headers: {
        ...ExperienceFragmentAlphaHeaders,
        ...headers,
      },
    },
  )
}

export const create: RestEndpoint<'ExperienceFragment', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: CreateExperienceFragmentProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.post<ExperienceFragmentProps>(http, getBaseUrl(params), data, {
    headers: {
      ...ExperienceFragmentAlphaHeaders,
      ...headers,
    },
  })
}

export const upsert: RestEndpoint<'ExperienceFragment', 'upsert'> = (
  http: AxiosInstance,
  params: GetExperienceFragmentParams,
  rawData: UpsertExperienceFragmentProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const { sys, ...body } = copy(rawData)
  return raw.put<ExperienceFragmentProps>(
    http,
    getBaseUrl(params) + `/${params.experienceFragmentId}`,
    body,
    {
      headers: {
        ...ExperienceFragmentAlphaHeaders,
        ...(sys?.version !== undefined && {
          'X-Contentful-Version': sys.version,
        }),
        ...headers,
      },
    },
  )
}

export const del: RestEndpoint<'ExperienceFragment', 'delete'> = (
  http: AxiosInstance,
  params: GetExperienceFragmentParams,
) => {
  return raw.del(http, getBaseUrl(params) + `/${params.experienceFragmentId}`, {
    headers: {
      ...ExperienceFragmentAlphaHeaders,
    },
  })
}

export const publish: RestEndpoint<'ExperienceFragment', 'publish'> = (
  http: AxiosInstance,
  params: GetExperienceFragmentParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put<ExperienceFragmentProps>(
    http,
    getBaseUrl(params) + `/${params.experienceFragmentId}/published`,
    null,
    {
      headers: {
        ...ExperienceFragmentAlphaHeaders,
        'X-Contentful-Version': params.version,
        ...headers,
      },
    },
  )
}

export const unpublish: RestEndpoint<'ExperienceFragment', 'unpublish'> = (
  http: AxiosInstance,
  params: GetExperienceFragmentParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del<ExperienceFragmentProps>(
    http,
    getBaseUrl(params) + `/${params.experienceFragmentId}/published`,
    {
      headers: {
        ...ExperienceFragmentAlphaHeaders,
        'X-Contentful-Version': params.version,
        ...headers,
      },
    },
  )
}
