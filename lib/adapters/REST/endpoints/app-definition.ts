import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import copy from 'fast-copy'
import { normalizeSelect } from './utils'
import { GetAppDefinitionParams, GetOrganizationParams, QueryParams } from '../../../common-types'
import { AppDefinitionProps, CreateAppDefinitionProps } from '../../../entities/app-definition'
import { CollectionProp } from '../../../common-types'
import { RestEndpoint } from '../types'

const getBaseUrl = (params: GetOrganizationParams) =>
  `/organizations/${params.organizationId}/app_definitions`

export const getAppDefinitionUrl = (params: GetAppDefinitionParams) =>
  getBaseUrl(params) + `/${params.appDefinitionId}`

export const get: RestEndpoint<'AppDefinition', 'get'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams & QueryParams
) => {
  return raw.get<AppDefinitionProps>(http, getAppDefinitionUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const getMany: RestEndpoint<'AppDefinition', 'getMany'> = (
  http: AxiosInstance,
  params: GetOrganizationParams & QueryParams
) => {
  return raw.get<CollectionProp<AppDefinitionProps>>(http, getBaseUrl(params), {
    params: params.query,
  })
}

export const create: RestEndpoint<'AppDefinition', 'create'> = (
  http: AxiosInstance,
  params: GetOrganizationParams,
  rawData: CreateAppDefinitionProps
) => {
  const data = copy(rawData)

  return raw.post<AppDefinitionProps>(http, getBaseUrl(params), data)
}

export const update: RestEndpoint<'AppDefinition', 'update'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams,
  rawData: AppDefinitionProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)

  delete data.sys

  return raw.put<AppDefinitionProps>(http, getAppDefinitionUrl(params), data, {
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
