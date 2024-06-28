import type { AxiosInstance } from 'contentful-sdk-core'
import type { CreateAppKeyProps, AppKeyProps } from '../../../entities/app-key'
import * as raw from './raw'
import type { RestEndpoint } from '../types'
import type { CollectionProp, GetAppDefinitionParams, GetAppKeyParams } from '../../../common-types'

export const get: RestEndpoint<'AppKey', 'get'> = (
  http: AxiosInstance,
  params: GetAppKeyParams
) => {
  return raw.get<AppKeyProps>(
    http,
    `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/keys/${params.fingerprint}`
  )
}

export const getMany: RestEndpoint<'AppKey', 'getMany'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams
) => {
  return raw.get<CollectionProp<AppKeyProps>>(
    http,
    `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/keys`
  )
}

export const create: RestEndpoint<'AppKey', 'create'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams,
  data: CreateAppKeyProps
) => {
  return raw.post<AppKeyProps>(
    http,
    `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/keys`,
    data
  )
}

export const del: RestEndpoint<'AppKey', 'delete'> = (
  http: AxiosInstance,
  params: GetAppKeyParams
) => {
  return raw.del(
    http,
    `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/keys/${params.fingerprint}`
  )
}
