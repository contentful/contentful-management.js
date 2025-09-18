import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { SetOptional } from 'type-fest'
import type { CollectionProp, GetSpaceParams, QueryParams } from '../../../common-types'
import type { ApiKeyProps, CreateApiKeyProps } from '../../../entities/api-key'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

export const get: RestEndpoint<'ApiKey', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { apiKeyId: string },
) => {
  return raw.get<ApiKeyProps>(http, `/spaces/${params.spaceId}/api_keys/${params.apiKeyId}`)
}

export const getMany: RestEndpoint<'ApiKey', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceParams & QueryParams,
) => {
  return raw.get<CollectionProp<ApiKeyProps>>(http, `/spaces/${params.spaceId}/api_keys`, {
    params: params.query,
  })
}

export const create: RestEndpoint<'ApiKey', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceParams,
  data: CreateApiKeyProps,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.post<ApiKeyProps>(http, `/spaces/${params.spaceId}/api_keys`, data, { headers })
}

export const createWithId: RestEndpoint<'ApiKey', 'createWithId'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { apiKeyId: string },
  data: CreateApiKeyProps,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put<ApiKeyProps>(http, `/spaces/${params.spaceId}/api_keys/${params.apiKeyId}`, data, {
    headers,
  })
}

export const update: RestEndpoint<'ApiKey', 'update'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { apiKeyId: string },
  rawData: ApiKeyProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data: SetOptional<typeof rawData, 'accessToken' | 'preview_api_key' | 'policies' | 'sys'> =
    copy(rawData)
  if ('accessToken' in data) {
    delete data.accessToken
  }
  if ('preview_api_key' in data) {
    delete data.preview_api_key
  }
  if ('policies' in data) {
    delete data.policies
  }
  delete data.sys
  return raw.put<ApiKeyProps>(http, `/spaces/${params.spaceId}/api_keys/${params.apiKeyId}`, data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del: RestEndpoint<'ApiKey', 'delete'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { apiKeyId: string },
) => {
  return raw.del(http, `/spaces/${params.spaceId}/api_keys/${params.apiKeyId}`)
}
