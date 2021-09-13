import type { AxiosInstance } from 'contentful-sdk-core'
import {
  CreateAppSignedRequestProps,
  AppSignedRequestProps,
} from '../../../entities/app-signed-request'
import * as raw from './raw'
import { RestEndpoint } from '../types'
import { GetAppInstallationParams } from '../../../common-types'

export const create: RestEndpoint<'AppSignedRequest', 'create'> = (
  http: AxiosInstance,
  params: GetAppInstallationParams,
  data: CreateAppSignedRequestProps
) => {
  return raw.post<AppSignedRequestProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations/${params.appDefinitionId}/signed_requests`,
    data
  )
}
