import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { GetManyReleaseFragmentParams, GetReleaseFragmentParams } from '../../../common-types'
import type {
  CreateReleaseFragmentProps,
  ReleaseFragment,
  ReleaseFragmentCollection,
  ReleaseFragmentQueryOptions,
  UpsertReleaseFragmentProps,
} from '../../../entities/fragment'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import { ExperienceAlphaHeaders } from './experience'

const getBaseUrl = (params: GetManyReleaseFragmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/fragments`

export const getMany: RestEndpoint<'ReleaseFragment', 'getMany'> = (
  http: AxiosInstance,
  params: GetManyReleaseFragmentParams & { query: ReleaseFragmentQueryOptions },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ReleaseFragmentCollection>(http, getBaseUrl(params), {
    params: params.query,
    headers: {
      ...ExperienceAlphaHeaders,
      ...headers,
    },
  })
}

export const get: RestEndpoint<'ReleaseFragment', 'get'> = (
  http: AxiosInstance,
  params: GetReleaseFragmentParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ReleaseFragment>(http, getBaseUrl(params) + `/${params.fragmentId}`, {
    headers: {
      ...ExperienceAlphaHeaders,
      ...headers,
    },
  })
}

export const create: RestEndpoint<'ReleaseFragment', 'create'> = (
  http: AxiosInstance,
  params: GetManyReleaseFragmentParams,
  rawData: CreateReleaseFragmentProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.post<ReleaseFragment>(http, getBaseUrl(params), data, {
    headers: {
      ...ExperienceAlphaHeaders,
      ...headers,
    },
  })
}

export const upsert: RestEndpoint<'ReleaseFragment', 'upsert'> = (
  http: AxiosInstance,
  params: GetReleaseFragmentParams,
  rawData: UpsertReleaseFragmentProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const { sys, ...body } = copy(rawData)
  return raw.put<ReleaseFragment>(http, getBaseUrl(params) + `/${params.fragmentId}`, body, {
    headers: {
      ...ExperienceAlphaHeaders,
      ...(sys.version !== undefined && {
        'X-Contentful-Version': sys.version,
      }),
      ...headers,
    },
  })
}

export const del: RestEndpoint<'ReleaseFragment', 'delete'> = (
  http: AxiosInstance,
  params: GetReleaseFragmentParams,
) => {
  return raw.del(http, getBaseUrl(params) + `/${params.fragmentId}`, {
    headers: {
      ...ExperienceAlphaHeaders,
    },
  })
}
