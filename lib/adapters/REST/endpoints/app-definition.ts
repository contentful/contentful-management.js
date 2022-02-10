import { AxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import copy from 'fast-copy'
import { normalizeSelect } from './utils'
import { GetAppDefinitionParams, GetOrganizationParams, QueryParams } from '../../../common-types'
import { AppDefinitionProps, CreateAppDefinitionProps } from '../../../entities/app-definition'
import { RestEndpoint } from '../types'
import { SetOptional } from 'type-fest'

const getBaseUrl = (params: GetOrganizationParams) =>
  `/organizations/${params.organizationId}/app_definitions`

export const getAppDefinitionUrl = (params: GetAppDefinitionParams) =>
  getBaseUrl(params) + `/${params.appDefinitionId}`

export const get: RestEndpoint<'AppDefinition', 'get'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams & QueryParams
) => {
  return raw.get(http, getAppDefinitionUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const getMany: RestEndpoint<'AppDefinition', 'getMany'> = (
  http: AxiosInstance,
  params: GetOrganizationParams & QueryParams
) => {
  return raw.get(http, getBaseUrl(params), {
    params: params.query,
  })
}

export const create: RestEndpoint<'AppDefinition', 'create'> = (
  http: AxiosInstance,
  params: GetOrganizationParams,
  rawData: CreateAppDefinitionProps
) => {
  const data = copy(rawData)

  return raw.post(http, getBaseUrl(params), data)
}

export const update: RestEndpoint<'AppDefinition', 'update'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams,
  rawData: AppDefinitionProps,
  headers?: AxiosRequestHeaders
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)

  delete data.sys

  return raw.put(http, getAppDefinitionUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del: RestEndpoint<'AppDefinition', 'delete'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams
) => {
  return raw.del(http, getAppDefinitionUrl(params))
}
