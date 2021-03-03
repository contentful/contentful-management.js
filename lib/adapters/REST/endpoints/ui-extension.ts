import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import { normalizeSelect } from './utils'
import copy from 'fast-copy'
import { CreateUIExtensionProps, UIExtensionProps } from '../../../entities/ui-extension'
import { GetSpaceEnvironmentParams, QueryParams } from '../../../plain/common-types'
import { CollectionProp } from '../../../common-types'

export type GetUiExtensionParams = GetSpaceEnvironmentParams & { extensionId: string }

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/extensions`

export const getUIExtensionUrl = (params: GetUiExtensionParams) =>
  getBaseUrl(params) + `/${params.extensionId}`

export const get = (http: AxiosInstance, params: GetUiExtensionParams & QueryParams) => {
  return raw.get<UIExtensionProps>(http, getUIExtensionUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const getMany = (http: AxiosInstance, params: GetSpaceEnvironmentParams & QueryParams) => {
  return raw.get<CollectionProp<UIExtensionProps>>(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const create = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: CreateUIExtensionProps,
  headers?: Record<string, unknown>
) => {
  return raw.post<UIExtensionProps>(http, getBaseUrl(params), rawData, { headers })
}

export const createWithId = (
  http: AxiosInstance,
  params: GetUiExtensionParams,
  rawData: CreateUIExtensionProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)

  return raw.put<UIExtensionProps>(http, getUIExtensionUrl(params), data, { headers })
}

export const update = async (
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

export const del = (http: AxiosInstance, params: GetUiExtensionParams) => {
  return raw.del(http, getUIExtensionUrl(params))
}
