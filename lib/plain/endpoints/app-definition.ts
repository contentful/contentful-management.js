import { AxiosInstance } from 'axios'
import * as raw from './raw'
import cloneDeep from 'lodash/cloneDeep'
import { GetOrganizationParams, QueryParams } from './common-types'
import { AppDefinitionProps, CreateAppDefinitionProps } from '../../entities/app-definition'
import { normalizeSelect } from './utils'
import { CollectionProp } from '../../common-types'

type GetAppDefinitionParams = GetOrganizationParams & { appDefinitionId: string }

const getBaseUrl = (params: GetOrganizationParams) =>
  `/organizations/${params.organizationId}/app_definitions`

export const getAppDefinitionUrl = (params: GetAppDefinitionParams) =>
  getBaseUrl(params) + `/${params.appDefinitionId}`

export const get = (http: AxiosInstance, params: GetAppDefinitionParams & QueryParams) => {
  return raw.get<AppDefinitionProps>(http, getAppDefinitionUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const getMany = (http: AxiosInstance, params: GetOrganizationParams & QueryParams) => {
  return raw.get<CollectionProp<AppDefinitionProps>>(http, getBaseUrl(params), {
    params: params.query,
  })
}

export const create = (
  http: AxiosInstance,
  params: GetOrganizationParams,
  rawData: CreateAppDefinitionProps
) => {
  const data = cloneDeep(rawData)

  return raw.post<AppDefinitionProps>(http, getBaseUrl(params), data)
}

export const update = async (
  http: AxiosInstance,
  params: GetAppDefinitionParams,
  rawData: AppDefinitionProps,
  headers?: Record<string, unknown>
) => {
  const data = cloneDeep(rawData)

  delete data.sys

  return raw.put<AppDefinitionProps>(http, getAppDefinitionUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del = (http: AxiosInstance, params: GetAppDefinitionParams) => {
  return raw.del(http, getAppDefinitionUrl(params))
}
