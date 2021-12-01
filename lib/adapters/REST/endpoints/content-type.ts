import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { SetOptional } from 'type-fest'
import {
  CollectionProp,
  GetContentTypeParams,
  GetSpaceEnvironmentParams,
  QueryParams,
} from '../../../common-types'
import { ContentTypeProps, CreateContentTypeProps } from '../../../entities/content-type'
import { RestEndpoint } from '../types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/content_types`

const getContentTypeUrl = (params: GetContentTypeParams) =>
  getBaseUrl(params) + `/${params.contentTypeId}`

export const get: RestEndpoint<'ContentType', 'get'> = (
  http: AxiosInstance,
  params: GetContentTypeParams & QueryParams,
  headers?: Record<string, unknown>
) => {
  return raw.get<ContentTypeProps>(http, getContentTypeUrl(params), {
    params: normalizeSelect(params.query),
    headers,
  })
}

export const getMany: RestEndpoint<'ContentType', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & QueryParams,
  headers?: Record<string, unknown>
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
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)

  return raw.post<ContentTypeProps>(http, getBaseUrl(params), data, { headers })
}

export const createWithId: RestEndpoint<'ContentType', 'createWithId'> = (
  http: AxiosInstance,
  params: GetContentTypeParams,
  rawData: CreateContentTypeProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)

  return raw.put<ContentTypeProps>(http, getContentTypeUrl(params), data, { headers })
}

export const update: RestEndpoint<'ContentType', 'update'> = (
  http: AxiosInstance,
  params: GetContentTypeParams,
  rawData: ContentTypeProps,
  headers?: Record<string, unknown>
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
  headers?: Record<string, unknown>
) => {
  return raw.del(http, getContentTypeUrl(params), { headers })
}

export const publish: RestEndpoint<'ContentType', 'publish'> = (
  http: AxiosInstance,
  params: GetContentTypeParams,
  rawData: ContentTypeProps,
  headers?: Record<string, unknown>
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
  headers?: Record<string, unknown>
) => {
  return raw.del<ContentTypeProps>(http, getContentTypeUrl(params) + '/published', { headers })
}
