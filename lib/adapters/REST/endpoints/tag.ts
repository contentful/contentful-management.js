import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { SetOptional } from 'type-fest'
import {
  CollectionProp,
  GetSpaceEnvironmentParams,
  GetTagParams,
  QueryParams,
} from '../../../common-types'
import { CreateTagProps, DeleteTagParams, TagProps, UpdateTagProps } from '../../../entities/tag'
import { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/tags`

const getTagUrl = (params: GetTagParams) => getBaseUrl(params) + `/${params.tagId}`

export const get: RestEndpoint<'Tag', 'get'> = (http: AxiosInstance, params: GetTagParams) =>
  raw.get<TagProps>(http, getTagUrl(params))

export const getMany: RestEndpoint<'Tag', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & QueryParams
) =>
  raw.get<CollectionProp<TagProps>>(http, getBaseUrl(params), {
    params: params.query,
  })

export const createWithId: RestEndpoint<'Tag', 'createWithId'> = (
  http: AxiosInstance,
  params: GetTagParams,
  rawData: CreateTagProps
) => {
  const data = copy(rawData)
  return raw.put<TagProps>(http, getTagUrl(params), data, {
    headers: { 'X-Contentful-Tag-Visibility': rawData.sys.visibility ?? 'private' },
  })
}

export const update: RestEndpoint<'Tag', 'update'> = (
  http: AxiosInstance,
  params: GetTagParams,
  rawData: UpdateTagProps,
  headers?: Record<string, unknown>
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys

  return raw.put<TagProps>(http, getTagUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del: RestEndpoint<'Tag', 'delete'> = (
  http: AxiosInstance,
  { version, ...params }: DeleteTagParams
) => {
  return raw.del(http, getTagUrl(params), { headers: { 'X-Contentful-Version': version } })
}
