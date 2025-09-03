import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { SetOptional } from 'type-fest'
import type {
  CollectionProp,
  GetContentTypeParams,
  GetSpaceEnvironmentParams,
  QueryParams,
} from '../../../common-types.js'
import type { ContentTypeProps, CreateContentTypeProps } from '../../../entities/content-type.js'
import type { RestEndpoint } from '../types.js'
import * as raw from './raw.js'
import { normalizeSelect } from './utils.js'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/content_types`

const getContentTypeUrl = (params: GetContentTypeParams) =>
  getBaseUrl(params) + `/${params.contentTypeId}`

export const get: RestEndpoint<'ContentType', 'get'> = (
  http: AxiosInstance,
  params: GetContentTypeParams & QueryParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ContentTypeProps>(http, getContentTypeUrl(params), {
    params: normalizeSelect(params.query),
    headers,
  })
}

export const getMany: RestEndpoint<'ContentType', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & QueryParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<CollectionProp<ContentTypeProps>>(http, getBaseUrl(params), {
    params: params.query,
    headers,
  })
}

export const create: RestEndpoint<'ContentType', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: CreateContentTypeProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)

  return raw.post<ContentTypeProps>(http, getBaseUrl(params), data, { headers })
}

export const createWithId: RestEndpoint<'ContentType', 'createWithId'> = (
  http: AxiosInstance,
  params: GetContentTypeParams,
  rawData: CreateContentTypeProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)

  return raw.put<ContentTypeProps>(http, getContentTypeUrl(params), data, { headers })
}

export const update: RestEndpoint<'ContentType', 'update'> = (
  http: AxiosInstance,
  params: GetContentTypeParams,
  rawData: ContentTypeProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys
  return raw.put<ContentTypeProps>(http, getContentTypeUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del: RestEndpoint<'ContentType', 'delete'> = (
  http: AxiosInstance,
  params: GetContentTypeParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del(http, getContentTypeUrl(params), { headers })
}

export const publish: RestEndpoint<'ContentType', 'publish'> = (
  http: AxiosInstance,
  params: GetContentTypeParams,
  rawData: ContentTypeProps,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put<ContentTypeProps>(http, getContentTypeUrl(params) + '/published', null, {
    headers: {
      'X-Contentful-Version': rawData.sys.version,
      ...headers,
    },
  })
}

export const unpublish: RestEndpoint<'ContentType', 'unpublish'> = (
  http: AxiosInstance,
  params: GetContentTypeParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del<ContentTypeProps>(http, getContentTypeUrl(params) + '/published', { headers })
}
