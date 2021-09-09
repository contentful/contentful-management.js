import type { AxiosInstance } from 'contentful-sdk-core'
import {
  CreateAppSigningSecretProps,
  AppSigningSecretProps,
} from '../../../entities/app-signing-secret'
import * as raw from './raw'
import { RestEndpoint } from '../types'
import { GetAppDefinitionParams } from '../../../common-types'

export const create: RestEndpoint<'AppSigningSecret', 'create'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams,
  data: CreateAppSigningSecretProps
) => {
  return raw.post<AppSigningSecretProps>(
    http,
    `/organization/${params.organizationId}/app_definitions/${params.appDefinitionId}/signing_secret`,
    data
  )
}
