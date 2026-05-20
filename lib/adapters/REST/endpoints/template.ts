import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { GetSpaceEnvironmentParams, GetTemplateParams } from '../../../common-types'
import type {
  CreateTemplateProps,
  TemplateProps,
  TemplateQueryOptions,
  UpsertTemplateProps,
  TemplateCollection,
} from '../../../entities/template'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/templates`

export const getMany: RestEndpoint<'Template', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query: TemplateQueryOptions },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<TemplateCollection>(http, getBaseUrl(params), {
    params: params.query,
    headers,
  })
}

export const get: RestEndpoint<'Template', 'get'> = (
  http: AxiosInstance,
  params: GetTemplateParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<TemplateProps>(http, getBaseUrl(params) + `/${params.templateId}`, { headers })
}

export const create: RestEndpoint<'Template', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: CreateTemplateProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.post<TemplateProps>(http, getBaseUrl(params), data, { headers })
}

export const upsert: RestEndpoint<'Template', 'upsert'> = (
  http: AxiosInstance,
  params: GetTemplateParams & { version?: number },
  rawData: UpsertTemplateProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.put<TemplateProps>(http, getBaseUrl(params) + `/${params.templateId}`, data, {
    headers: {
      ...(params.version !== undefined && {
        'X-Contentful-Version': params.version,
      }),
      ...headers,
    },
  })
}

export const del: RestEndpoint<'Template', 'delete'> = (
  http: AxiosInstance,
  params: GetTemplateParams,
) => {
  return raw.del(http, getBaseUrl(params) + `/${params.templateId}`)
}

export const publish: RestEndpoint<'Template', 'publish'> = (
  http: AxiosInstance,
  params: GetTemplateParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put<TemplateProps>(
    http,
    getBaseUrl(params) + `/${params.templateId}/published`,
    null,
    {
      headers: {
        'X-Contentful-Version': params.version,
        ...headers,
      },
    },
  )
}

export const unpublish: RestEndpoint<'Template', 'unpublish'> = (
  http: AxiosInstance,
  params: GetTemplateParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del<TemplateProps>(http, getBaseUrl(params) + `/${params.templateId}/published`, {
    headers: {
      'X-Contentful-Version': params.version,
      ...headers,
    },
  })
}
