import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  CollectionProp,
  GetSpaceEnvironmentParams,
  GetUiExtensionParams,
  QueryParams,
} from '../../../common-types'
import { CreateUIExtensionProps, UIExtensionProps } from '../../../entities/ui-extension'
import { RestEndpoint } from '../types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/extensions`

export const getUIExtensionUrl = (params: GetUiExtensionParams) =>
  getBaseUrl(params) + `/${params.extensionId}`

export const get: RestEndpoint<'Extension', 'get'> = (
  http: AxiosInstance,
  params: GetUiExtensionParams & QueryParams
) => {
  return raw.get<UIExtensionProps>(http, getUIExtensionUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const getMany: RestEndpoint<'Extension', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & QueryParams
) => {
  return raw.get<CollectionProp<UIExtensionProps>>(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const create: RestEndpoint<'Extension', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: CreateUIExtensionProps,
  headers?: Record<string, unknown>
) => {
  return raw.post<UIExtensionProps>(http, getBaseUrl(params), rawData, { headers })
}

export const createWithId: RestEndpoint<'Extension', 'createWithId'> = (
  http: AxiosInstance,
  params: GetUiExtensionParams,
  rawData: CreateUIExtensionProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)

  return raw.put<UIExtensionProps>(http, getUIExtensionUrl(params), data, { headers })
}

export const update: RestEndpoint<'Extension', 'update'> = async (
  http: AxiosInstance,
  params: GetUiExtensionParams,
  rawData: UIExtensionProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)

  delete data.sys

  return raw.put<UIExtensionProps>(http, getUIExtensionUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del: RestEndpoint<'Extension', 'delete'> = (
  http: AxiosInstance,
  params: GetUiExtensionParams
) => {
  return raw.del(http, getUIExtensionUrl(params))
}
