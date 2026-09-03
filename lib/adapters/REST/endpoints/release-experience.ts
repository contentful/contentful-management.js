import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  GetManyReleaseExperienceParams,
  GetReleaseExperienceParams,
} from '../../../common-types'
import type {
  CreateExperienceProps,
  ReleaseExperience,
  ReleaseExperienceCollection,
  ReleaseExperienceQueryOptions,
  UpsertExperienceProps,
} from '../../../entities/experience'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import { ExperienceAlphaHeaders } from './experience'

const getBaseUrl = (params: GetManyReleaseExperienceParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/experiences`

export const getMany: RestEndpoint<'ReleaseExperience', 'getMany'> = (
  http: AxiosInstance,
  params: GetManyReleaseExperienceParams & { query: ReleaseExperienceQueryOptions },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ReleaseExperienceCollection>(http, getBaseUrl(params), {
    params: params.query,
    headers: {
      ...ExperienceAlphaHeaders,
      ...headers,
    },
  })
}

export const get: RestEndpoint<'ReleaseExperience', 'get'> = (
  http: AxiosInstance,
  params: GetReleaseExperienceParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ReleaseExperience>(http, getBaseUrl(params) + `/${params.experienceId}`, {
    headers: {
      ...ExperienceAlphaHeaders,
      ...headers,
    },
  })
}

export const create: RestEndpoint<'ReleaseExperience', 'create'> = (
  http: AxiosInstance,
  params: GetManyReleaseExperienceParams,
  rawData: CreateExperienceProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.post<ReleaseExperience>(http, getBaseUrl(params), data, {
    headers: {
      ...ExperienceAlphaHeaders,
      ...headers,
    },
  })
}

export const upsert: RestEndpoint<'ReleaseExperience', 'upsert'> = (
  http: AxiosInstance,
  params: GetReleaseExperienceParams,
  rawData: UpsertExperienceProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const { sys, ...body } = copy(rawData)
  return raw.put<ReleaseExperience>(http, getBaseUrl(params) + `/${params.experienceId}`, body, {
    headers: {
      ...ExperienceAlphaHeaders,
      ...(sys.version !== undefined && {
        'X-Contentful-Version': sys.version,
      }),
      ...headers,
    },
  })
}

export const del: RestEndpoint<'ReleaseExperience', 'delete'> = (
  http: AxiosInstance,
  params: GetReleaseExperienceParams,
) => {
  return raw.del(http, getBaseUrl(params) + `/${params.experienceId}`, {
    headers: {
      ...ExperienceAlphaHeaders,
    },
  })
}
