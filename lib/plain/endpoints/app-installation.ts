import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { GetSpaceEnvironmentParams, CollectionProp, PaginationQueryParams } from './common-types'
import { normalizeSelect } from './utils'
import { AppInstallationProps } from '../../../dist/typings/entities/app-installation'

type GetAppInstallationParams = GetSpaceEnvironmentParams & { appInstallationId: string }

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations`

export const getAppInstallationUrl = (params: GetAppInstallationParams) =>
  getBaseUrl(params) + `/${params.appInstallationId}`

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
  params: GetAppInstallationParams & PaginationQueryParams
) => {
  return raw.get<CollectionProp<AppInstallationProps>>(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })
}
