import { AxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import { normalizeSelect } from './utils'
import copy from 'fast-copy'
import {
  GetAppInstallationParams,
  GetSpaceEnvironmentParams,
  PaginationQueryParams,
  GetAppInstallationsForOrgParams,
} from '../../../common-types'
import {
  AppInstallationProps,
  CreateAppInstallationProps,
} from '../../../entities/app-installation'
import { AppInstallationsForOrganizationProps } from '../../../entities/app-definition'
import { CollectionProp } from '../../../common-types'
import { RestEndpoint } from '../types'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations`

const getBaseUrlForOrgInstallations = (params: GetAppInstallationsForOrgParams) =>
  `/app_definitions/${params.appDefinitionId}/app_installations?sys.organization.sys.id[in]=${
    params.organizationId || ''
  }${params.spaceId ? '&sys.space.sys.id[in]=' + params.spaceId : ''}`

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
  params: GetAppInstallationParams & { acceptAllTerms?: boolean },
  rawData: CreateAppInstallationProps,
  headers?: AxiosRequestHeaders
) => {
  const data = copy(rawData)

  return raw.put<AppInstallationProps>(http, getAppInstallationUrl(params), data, {
    headers: {
      ...headers,
      ...(params.acceptAllTerms && {
        'X-Contentful-Marketplace':
          'i-accept-end-user-license-agreement,i-accept-marketplace-terms-of-service,i-accept-privacy-policy',
      }),
    },
  })
}

export const del: RestEndpoint<'AppInstallation', 'delete'> = (
  http: AxiosInstance,
  params: GetAppInstallationParams
) => {
  return raw.del(http, getAppInstallationUrl(params))
}

export const getForOrganization: RestEndpoint<'AppInstallation', 'getForOrganization'> = (
  http: AxiosInstance,
  params: GetAppInstallationsForOrgParams & PaginationQueryParams
) => {
  return raw.get<AppInstallationsForOrganizationProps>(
    http,
    getBaseUrlForOrgInstallations(params),
    {
      params: normalizeSelect(params.query),
    }
  )
}
