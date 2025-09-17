import type { AxiosInstance } from 'contentful-sdk-core'
import type { Stream } from 'stream'
import * as raw from './raw.js'
import type { GetAppUploadParams, GetOrganizationParams } from '../../../common-types.js'
import type { RestEndpoint } from '../types.js'
import type { AppUploadProps } from '../../../entities/app-upload.js'
import { getUploadHttpClient } from '../../../upload-http-client.js'

const getBaseUrl = (params: GetOrganizationParams) =>
  `/organizations/${params.organizationId}/app_uploads`

const getAppUploadUrl = (params: GetAppUploadParams) =>
  `${getBaseUrl(params)}/${params.appUploadId}`

export const get: RestEndpoint<'AppUpload', 'get'> = (
  http: AxiosInstance,
  params: GetAppUploadParams,
) => {
  const httpUpload = getUploadHttpClient(http)

  return raw.get<AppUploadProps>(httpUpload, getAppUploadUrl(params))
}

export const del: RestEndpoint<'AppUpload', 'delete'> = (
  http: AxiosInstance,
  params: GetAppUploadParams,
) => {
  const httpUpload = getUploadHttpClient(http)

  return raw.del<void>(httpUpload, getAppUploadUrl(params))
}

export const create: RestEndpoint<'AppUpload', 'create'> = (
  http: AxiosInstance,
  params: GetOrganizationParams,
  payload: { file: string | ArrayBuffer | Stream },
) => {
  const httpUpload = getUploadHttpClient(http)

  const { file } = payload

  return raw.post<AppUploadProps>(httpUpload, getBaseUrl(params), file, {
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  })
}
