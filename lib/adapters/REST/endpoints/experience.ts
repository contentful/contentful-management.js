import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { GetSpaceEnvironmentParams, GetExperienceParams } from '../../../common-types'
import type {
  CreateExperienceProps,
  UpdateExperienceProps,
  ExperienceLocalePublishPayload,
  ExperienceProps,
  ExperienceQueryOptions,
  ExperienceCollection,
} from '../../../entities/experience'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/experiences`

export const getMany: RestEndpoint<'Experience', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query: ExperienceQueryOptions },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ExperienceCollection>(http, getBaseUrl(params), {
    params: params.query,
    headers,
  })
}

export const get: RestEndpoint<'Experience', 'get'> = (
  http: AxiosInstance,
  params: GetExperienceParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ExperienceProps>(http, getBaseUrl(params) + `/${params.experienceId}`, {
    headers,
  })
}

export const create: RestEndpoint<'Experience', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: CreateExperienceProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.post<ExperienceProps>(http, getBaseUrl(params), data, { headers })
}

export const update: RestEndpoint<'Experience', 'update'> = (
  http: AxiosInstance,
  params: GetExperienceParams,
  rawData: UpdateExperienceProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const { sys, ...body } = copy(rawData)
  return raw.put<ExperienceProps>(http, getBaseUrl(params) + `/${params.experienceId}`, body, {
    headers: {
      'X-Contentful-Version': sys.version ?? 0,
      ...headers,
    },
  })
}

export const del: RestEndpoint<'Experience', 'delete'> = (
  http: AxiosInstance,
  params: GetExperienceParams,
) => {
  return raw.del(http, getBaseUrl(params) + `/${params.experienceId}`)
}

export const publish: RestEndpoint<'Experience', 'publish'> = (
  http: AxiosInstance,
  params: GetExperienceParams & { version: number },
  payload?: ExperienceLocalePublishPayload,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put(http, getBaseUrl(params) + `/${params.experienceId}/published`, payload ?? null, {
    headers: {
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
      'X-Contentful-Version': params.version,
      ...headers,
    },
  })
}
