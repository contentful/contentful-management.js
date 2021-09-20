import type { AxiosInstance } from 'contentful-sdk-core'
import { AppMetadataProps, CreateAppMetadataProps } from '../../../entities/app-metadata'
import * as raw from './raw'
import { RestEndpoint } from '../types'
import { GetAppDefinitionParams } from '../../../common-types'

export const get: RestEndpoint<'AppMetadata', 'get'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams
) => {
  return raw.get<AppMetadataProps>(
    http,
    `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/app_metadata`
  )
}

export const upsert: RestEndpoint<'AppMetadata', 'upsert'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams,
  data: CreateAppMetadataProps
) => {
  return raw.put<AppMetadataProps>(
    http,
    `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/app_metadata`,
    data
  )
}

export const del: RestEndpoint<'AppMetadata', 'delete'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams
) => {
  return raw.del(
    http,
    `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/app_metadata`
  )
}
