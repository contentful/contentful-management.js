import type { AxiosInstance } from 'contentful-sdk-core'
import type { AppDetailsProps, CreateAppDetailsProps } from '../../../entities/app-details.js'
import * as raw from './raw.js'
import type { RestEndpoint } from '../types.js'
import type { GetAppDefinitionParams } from '../../../common-types.js'

export const get: RestEndpoint<'AppDetails', 'get'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams
) => {
  return raw.get<AppDetailsProps>(
    http,
    `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/details`
  )
}

export const upsert: RestEndpoint<'AppDetails', 'upsert'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams,
  data: CreateAppDetailsProps
) => {
  return raw.put<AppDetailsProps>(
    http,
    `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/details`,
    data
  )
}

export const del: RestEndpoint<'AppDetails', 'delete'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams
) => {
  return raw.del(
    http,
    `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/details`
  )
}
