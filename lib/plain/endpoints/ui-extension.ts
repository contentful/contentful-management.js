import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { QueryParams, GetSpaceEnvironmentParams, CollectionProp } from './common-types'
import { AppDefinitionProps } from '../../entities/app-definition'
import { normalizeSelect } from './utils'
import { UIExtensionProps, CreateUIExtensionProps } from '../../entities/ui-extension'
import { cloneDeep } from 'lodash'
import { SetOptional } from 'type-fest'

type GetUiExtensionParams = GetSpaceEnvironmentParams & { extensionId: string }

type CreateUiExtensionParams = SetOptional<GetUiExtensionParams, 'extensionId'>

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
  return raw.get<CollectionProp<AppDefinitionProps>>(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const create = (
  http: AxiosInstance,
  params: CreateUiExtensionParams,
  rawData: CreateUIExtensionProps
) => {
  const data = cloneDeep(rawData)
  const { extensionId } = params

  return extensionId
    ? raw.put<UIExtensionProps>(http, getUIExtensionUrl(params as GetUiExtensionParams), data)
    : raw.post<UIExtensionProps>(http, getBaseUrl(params as GetSpaceEnvironmentParams), data)
}

export const update = (
  http: AxiosInstance,
  params: GetUiExtensionParams,
  rawData: UIExtensionProps,
  headers?: Record<string, unknown>
) => {
  const data = cloneDeep(rawData)

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
