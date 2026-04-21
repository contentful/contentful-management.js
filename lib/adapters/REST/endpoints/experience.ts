import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { SetOptional } from 'type-fest'
import type {
  CursorPaginatedCollectionProp,
  GetSpaceEnvironmentParams,
  GetExperienceParams,
} from '../../../common-types'
import type {
  CreateExperienceProps,
  UpdateExperienceProps,
  ExperienceLocalePublishPayload,
  ExperienceProps,
  ExperienceQueryOptions,
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
  return raw.get<CursorPaginatedCollectionProp<ExperienceProps>>(http, getBaseUrl(params), {
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
  const data: SetOptional<typeof rawData, 'sys'> & { componentTypeId?: string } = copy(rawData)
  data.componentTypeId = rawData.sys.componentType.sys.id
  delete data.sys
  return raw.put<ExperienceProps>(http, getBaseUrl(params) + `/${params.experienceId}`, data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
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
