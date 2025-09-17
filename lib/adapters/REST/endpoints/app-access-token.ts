import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  AppAccessTokenProps,
  CreateAppAccessTokenProps,
} from '../../../entities/app-access-token.js'
import * as raw from './raw.js'
import type { RestEndpoint } from '../types.js'
import type { GetAppInstallationParams } from '../../../common-types.js'

export const create: RestEndpoint<'AppAccessToken', 'create'> = (
  http: AxiosInstance,
  params: GetAppInstallationParams,
  data: CreateAppAccessTokenProps,
) => {
  return raw.post<AppAccessTokenProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations/${params.appDefinitionId}/access_tokens`,
    undefined,
    { headers: { Authorization: `Bearer ${data.jwt}` } },
  )
}
