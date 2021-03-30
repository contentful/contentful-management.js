import type { AxiosInstance } from 'contentful-sdk-core'
import { Stream } from 'stream'
import * as raw from './raw'
import { GetAppUploadParams, GetOrganizationParams } from '../../../common-types'
import { RestEndpoint } from '../types'
import { AppUploadProps } from '../../../entities/app-upload'
import { getUploadHttpClient } from '../../../upload-http-client'

const getBaseUrl = (params: GetOrganizationParams) =>
  `/organizations/${params.organizationId}/app_uploads`

const getAppUploadUrl = (params: GetAppUploadParams) =>
  `${getBaseUrl(params)}/${params.appUploadId}`

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

export const create: RestEndpoint<'AppUpload', 'create'> = async (
  http: AxiosInstance,
  params: GetOrganizationParams,
  payload: { file: string | ArrayBuffer | Stream }
) => {
  const httpUpload = getUploadHttpClient(http)

  const { file } = payload

  if (!file) {
    return Promise.reject(new Error('Unable to locate a file to upload.'))
  }

  return raw.post<AppUploadProps>(httpUpload, getBaseUrl(params), file, {
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  })
}
