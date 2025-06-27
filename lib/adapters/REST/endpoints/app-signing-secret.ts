import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  CreateAppSigningSecretProps,
  AppSigningSecretProps,
} from '../../../entities/app-signing-secret.js'
import * as raw from './raw.js'
import type { RestEndpoint } from '../types.js'
import type { GetAppDefinitionParams } from '../../../common-types.js'

export const get: RestEndpoint<'AppSigningSecret', 'get'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams
) => {
  return raw.get<AppSigningSecretProps>(
    http,
    `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/signing_secret`
  )
}

export const upsert: RestEndpoint<'AppSigningSecret', 'upsert'> = (
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
