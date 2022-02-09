import { AxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import { normalizeSelect } from './utils'
import copy from 'fast-copy'
import {
  GetAppInstallationParams,
  GetSpaceEnvironmentParams,
  PaginationQueryParams,
} from '../../../common-types'
import {
  AppInstallationProps,
  CreateAppInstallationProps,
} from '../../../entities/app-installation'
import { CollectionProp } from '../../../common-types'
import { RestEndpoint } from '../types'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations`

export const getAppInstallationUrl = (params: GetAppInstallationParams) =>
  getBaseUrl(params) + `/${params.appDefinitionId}`

export const get: RestEndpoint<'AppInstallation', 'get'> = (
  http: AxiosInstance,
  params: GetAppInstallationParams & PaginationQueryParams
) => {
  return raw.get<AppInstallationProps>(http, getAppInstallationUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const getMany: RestEndpoint<'AppInstallation', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & PaginationQueryParams
) => {
  return raw.get<CollectionProp<AppInstallationProps>>(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const upsert: RestEndpoint<'AppInstallation', 'upsert'> = (
  http: AxiosInstance,
  params: GetAppInstallationParams,
  rawData: CreateAppInstallationProps,
  headers?: AxiosRequestHeaders
) => {
  const data = copy(rawData)

  return raw.put<AppInstallationProps>(http, getAppInstallationUrl(params), data, {
    ...headers,
  })
}

export const del: RestEndpoint<'AppInstallation', 'delete'> = (
  http: AxiosInstance,
  params: GetAppInstallationParams
) => {
  return raw.del(http, getAppInstallationUrl(params))
}
