import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { GetSpaceEnvironmentParams, CollectionProp, PaginationQueryParams } from './common-types'
import { normalizeSelect } from './utils'
import { AppInstallationProps, CreateAppInstallationProps } from '../../entities/app-installation'
import { cloneDeep } from 'lodash'

type GetAppInstallationParams = GetSpaceEnvironmentParams & { appDefinitionId: string }

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations`

export const getAppInstallationUrl = (params: GetAppInstallationParams) =>
  getBaseUrl(params) + `/${params.appDefinitionId}`

export const get = (
  http: AxiosInstance,
  params: GetAppInstallationParams & PaginationQueryParams
) => {
  return raw.get<CollectionProp<AppInstallationProps>>(http, getAppInstallationUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const getMany = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & PaginationQueryParams
) => {
  return raw.get<CollectionProp<AppInstallationProps>>(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const upsert = (
  http: AxiosInstance,
  params: GetAppInstallationParams,
  rawData: CreateAppInstallationProps,
  headers?: Record<string, unknown>
) => {
  const data = cloneDeep(rawData)

  return raw.put<AppInstallationProps>(http, getAppInstallationUrl(params), data, {
    ...headers,
  })
}

export const del = (http: AxiosInstance, params: GetAppInstallationParams) => {
  return raw.del(http, getAppInstallationUrl(params))
}
