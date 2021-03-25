import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import { GetAppUploadParams, GetOrganizationParams } from '../../../common-types'
import { RestEndpoint } from '../types'
import { AppUploadProps } from '../../../entities/app-upload'

const getBaseUrl = (params: GetOrganizationParams) =>
  `/organizations/${params.organizationId}/app_uploads`

const getAppUploadUrl = (params: GetAppUploadParams) => getBaseUrl(params) + `${params.uploadId}`

export const get: RestEndpoint<'AppUpload', 'get'> = (
  http: AxiosInstance,
  params: GetAppUploadParams
) => {
  return raw.get<AppUploadProps>(http, getAppUploadUrl(params))
}
