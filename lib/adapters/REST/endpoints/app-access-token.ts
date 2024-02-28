import type { AxiosInstance } from 'contentful-sdk-core'
import { AppAccessTokenProps, CreateAppAccessTokenProps } from '../../../entities/app-access-token'
import * as raw from './raw'
import { RestEndpoint } from '../types'
import { GetAppInstallationParams } from '../../../common-types'

export const create: RestEndpoint<'AppAccessToken', 'create'> = (
  http: AxiosInstance,
  params: GetAppInstallationParams,
  data: CreateAppAccessTokenProps
) => {
  return raw.post<AppAccessTokenProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations/${params.appDefinitionId}/access_tokens`,
    undefined,
    { headers: { Authorization: `Bearer ${data.jwt}` } }
  )
}
