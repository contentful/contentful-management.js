import type { AxiosInstance } from 'contentful-sdk-core'
import { AppDetailsProps, CreateAppDetailsProps } from '../../../entities/app-details'
import * as raw from './raw'
import { RestEndpoint } from '../types'
import { GetAppDefinitionParams } from '../../../common-types'

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
