import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { GetExperienceTemplateParams, GetSpaceEnvironmentParams } from '../../../common-types'
import type {
  CreateExperienceTemplateProps,
  ExperienceTemplateProps,
  ExperienceTemplateQueryOptions,
  UpsertExperienceTemplateProps,
  ExperienceTemplateCollection,
} from '../../../entities/experience-template'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/experience_templates`

export const getMany: RestEndpoint<'ExperienceTemplate', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query: ExperienceTemplateQueryOptions },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ExperienceTemplateCollection>(http, getBaseUrl(params), {
    params: params.query,
    headers,
  })
}

export const get: RestEndpoint<'ExperienceTemplate', 'get'> = (
  http: AxiosInstance,
  params: GetExperienceTemplateParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ExperienceTemplateProps>(
    http,
    getBaseUrl(params) + `/${params.experienceTemplateId}`,
    { headers },
  )
}

export const create: RestEndpoint<'ExperienceTemplate', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: CreateExperienceTemplateProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.post<ExperienceTemplateProps>(http, getBaseUrl(params), data, { headers })
}

export const upsert: RestEndpoint<'ExperienceTemplate', 'upsert'> = (
  http: AxiosInstance,
  params: GetExperienceTemplateParams,
  rawData: UpsertExperienceTemplateProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const { sys, ...body } = copy(rawData)
  return raw.put<ExperienceTemplateProps>(
    http,
    getBaseUrl(params) + `/${params.experienceTemplateId}`,
    body,
    {
      headers: {
        ...(sys.version !== undefined && {
          'X-Contentful-Version': sys.version,
        }),
        ...headers,
      },
    },
  )
}

export const del: RestEndpoint<'ExperienceTemplate', 'delete'> = (
  http: AxiosInstance,
  params: GetExperienceTemplateParams,
) => {
  return raw.del(http, getBaseUrl(params) + `/${params.experienceTemplateId}`)
}

export const publish: RestEndpoint<'ExperienceTemplate', 'publish'> = (
  http: AxiosInstance,
  params: GetExperienceTemplateParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put<ExperienceTemplateProps>(
    http,
    getBaseUrl(params) + `/${params.experienceTemplateId}/published`,
    null,
    {
      headers: {
        'X-Contentful-Version': params.version,
        ...headers,
      },
    },
  )
}

export const unpublish: RestEndpoint<'ExperienceTemplate', 'unpublish'> = (
  http: AxiosInstance,
  params: GetExperienceTemplateParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del<ExperienceTemplateProps>(
    http,
    getBaseUrl(params) + `/${params.experienceTemplateId}/published`,
    {
      headers: {
        'X-Contentful-Version': params.version,
        ...headers,
      },
    },
  )
}
