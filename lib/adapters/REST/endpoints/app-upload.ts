import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import { GetAppUploadParams, GetOrganizationParams } from '../../../common-types'
import { RestEndpoint } from '../types'
import { AppUploadProps } from '../../../entities/app-upload'
import { getUploadHttpClient } from '../../../upload-http-client'

const getBaseUrl = (params: GetOrganizationParams) =>
  `/organizations/${params.organizationId}/app_uploads`

const getAppUploadUrl = (params: GetAppUploadParams) => getBaseUrl(params) + `/${params.uploadId}`

export const get: RestEndpoint<'AppUpload', 'get'> = (
  http: AxiosInstance,
  params: GetAppUploadParams
) => {
  const httpUpload = getUploadHttpClient(http)

  return raw.get<AppUploadProps>(httpUpload, getAppUploadUrl(params))
}

export const del: RestEndpoint<'AppUpload', 'delete'> = (
  http: AxiosInstance,
  params: GetAppUploadParams
) => {
  const httpUpload = getUploadHttpClient(http)

  return raw.del<void>(httpUpload, getAppUploadUrl(params))
}
