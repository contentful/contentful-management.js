import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
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
  params: GetContentTypeParams & QueryParams
) => {
  return raw.get<ContentTypeProps>(http, getContentTypeUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const getMany: RestEndpoint<'ContentType', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & QueryParams
) => {
  return raw.get<CollectionProp<ContentTypeProps>>(http, getBaseUrl(params), {
    params: params.query,
  })
}

export const create: RestEndpoint<'ContentType', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: CreateContentTypeProps
) => {
  const data = copy(rawData)

  return raw.post<ContentTypeProps>(http, getBaseUrl(params), data)
}

export const createWithId: RestEndpoint<'ContentType', 'createWithId'> = (
  http: AxiosInstance,
  params: GetContentTypeParams,
  rawData: CreateContentTypeProps
) => {
  const data = copy(rawData)

  return raw.put<ContentTypeProps>(http, getContentTypeUrl(params), data)
}

export const update: RestEndpoint<'ContentType', 'update'> = (
  http: AxiosInstance,
  params: GetContentTypeParams,
  rawData: ContentTypeProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)
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
  params: GetContentTypeParams
) => {
  return raw.del(http, getContentTypeUrl(params))
}

export const publish: RestEndpoint<'ContentType', 'publish'> = (
  http: AxiosInstance,
  params: GetContentTypeParams,
  rawData: ContentTypeProps
) => {
  return raw.put<ContentTypeProps>(http, getContentTypeUrl(params) + '/published', null, {
    headers: {
      'X-Contentful-Version': rawData.sys.version,
    },
  })
}

export const unpublish: RestEndpoint<'ContentType', 'unpublish'> = (
  http: AxiosInstance,
  params: GetContentTypeParams
) => {
  return raw.del<ContentTypeProps>(http, getContentTypeUrl(params) + '/published')
}
