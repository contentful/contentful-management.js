import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  CreateAppSignedRequestProps,
  AppSignedRequestProps,
} from '../../../entities/app-signed-request.js'
import * as raw from './raw.js'
import type { RestEndpoint } from '../types.js'
import type { GetAppInstallationParams } from '../../../common-types.js'

export const create: RestEndpoint<'AppSignedRequest', 'create'> = (
  http: AxiosInstance,
  params: GetAppInstallationParams,
  data: CreateAppSignedRequestProps,
) => {
  return raw.post<AppSignedRequestProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations/${params.appDefinitionId}/signed_requests`,
    data,
  )
}
