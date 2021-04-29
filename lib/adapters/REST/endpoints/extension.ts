import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  CollectionProp,
  GetSpaceEnvironmentParams,
  GetExtensionParams,
  QueryParams,
} from '../../../common-types'
import { CreateExtensionProps, ExtensionProps } from '../../../entities/extension'
import { RestEndpoint } from '../types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/extensions`

export const getExtensionUrl = (params: GetExtensionParams) =>
  getBaseUrl(params) + `/${params.extensionId}`

export const get: RestEndpoint<'Extension', 'get'> = (
  http: AxiosInstance,
  params: GetExtensionParams & QueryParams
) => {
  return raw.get<ExtensionProps>(http, getExtensionUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const getMany: RestEndpoint<'Extension', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & QueryParams
) => {
  return raw.get<CollectionProp<ExtensionProps>>(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const create: RestEndpoint<'Extension', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: CreateExtensionProps,
  headers?: Record<string, unknown>
) => {
  return raw.post<ExtensionProps>(http, getBaseUrl(params), rawData, { headers })
}

export const createWithId: RestEndpoint<'Extension', 'createWithId'> = (
  http: AxiosInstance,
  params: GetExtensionParams,
  rawData: CreateExtensionProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)

  return raw.put<ExtensionProps>(http, getExtensionUrl(params), data, { headers })
}

export const update: RestEndpoint<'Extension', 'update'> = async (
  http: AxiosInstance,
  params: GetExtensionParams,
  rawData: ExtensionProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)

  delete data.sys

  return raw.put<ExtensionProps>(http, getExtensionUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del: RestEndpoint<'Extension', 'delete'> = (
  http: AxiosInstance,
  params: GetExtensionParams
) => {
  return raw.del(http, getExtensionUrl(params))
}
