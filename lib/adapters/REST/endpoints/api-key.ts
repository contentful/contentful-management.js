import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import copy from 'fast-copy'
import { GetSpaceParams, QueryParams } from '../../../plain/common-types'
import { ApiKeyProps, CreateApiKeyProps } from '../../../entities/api-key'
import { CollectionProp } from '../../../common-types'

export const get = (http: AxiosInstance, params: GetSpaceParams & { apiKeyId: string }) => {
  return raw.get<ApiKeyProps>(http, `/spaces/${params.spaceId}/api_keys/${params.apiKeyId}`)
}

export const getMany = (http: AxiosInstance, params: GetSpaceParams & QueryParams) => {
  return raw.get<CollectionProp<ApiKeyProps>>(http, `/spaces/${params.spaceId}/api_keys`, {
    params: params.query,
  })
}

export const create = (
  http: AxiosInstance,
  params: GetSpaceParams,
  data: CreateApiKeyProps,
  headers?: Record<string, unknown>
) => {
  return raw.post<ApiKeyProps>(http, `/spaces/${params.spaceId}/api_keys`, data, { headers })
}

export const createWithId = (
  http: AxiosInstance,
  params: GetSpaceParams & { apiKeyId: string },
  data: CreateApiKeyProps,
  headers?: Record<string, unknown>
) => {
  return raw.put<ApiKeyProps>(http, `/spaces/${params.spaceId}/api_keys/${params.apiKeyId}`, data, {
    headers,
  })
}

export const update = (
  http: AxiosInstance,
  params: GetSpaceParams & { apiKeyId: string },
  rawData: ApiKeyProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)
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

export const del = (http: AxiosInstance, params: GetSpaceParams & { apiKeyId: string }) => {
  return raw.del(http, `/spaces/${params.spaceId}/api_keys/${params.apiKeyId}`)
}
