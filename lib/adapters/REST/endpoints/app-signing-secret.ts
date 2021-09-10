import type { AxiosInstance } from 'contentful-sdk-core'
import {
  CreateAppSigningSecretProps,
  AppSigningSecretProps,
} from '../../../entities/app-signing-secret'
import * as raw from './raw'
import { RestEndpoint } from '../types'
import { GetAppDefinitionParams } from '../../../common-types'

export const get: RestEndpoint<'AppSigningSecret', 'get'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams
) => {
  return raw.get<AppSigningSecretProps>(
    http,
    `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/signing_secret`
  )
}

export const create: RestEndpoint<'AppSigningSecret', 'create'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams,
  data: CreateAppSigningSecretProps
) => {
  return raw.put<AppSigningSecretProps>(
    http,
    `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/signing_secret`,
    data
  )
}
export const update: RestEndpoint<'AppSigningSecret', 'update'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams,
  data: CreateAppSigningSecretProps
) => {
  return raw.put<AppSigningSecretProps>(
    http,
    `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/signing_secret`,
    data
  )
}

export const del: RestEndpoint<'AppSigningSecret', 'delete'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams
) => {
  return raw.del(
    http,
    `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/signing_secret`
  )
}
