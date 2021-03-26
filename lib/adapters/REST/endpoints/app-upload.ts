import type { AxiosInstance } from 'contentful-sdk-core'
import fs from 'fs'
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

export const create: RestEndpoint<'AppUpload', 'create'> = async (
  http: AxiosInstance,
  params: GetOrganizationParams,
  data: { file: File }
) => {
  const httpUpload = getUploadHttpClient(http)

  const { file } = data

  if (!file) {
    return Promise.reject(new Error('Unable to locate a file to upload.'))
  }

  const data = fs.readFileSync(file)

  const binary: string | ArrayBuffer | null = await new Promise((res) => {
    const reader = new FileReader()
    reader.onload = () => {
      res(reader.result)
    }
    reader.readAsArrayBuffer(file)
  })

  return raw.post<AppUploadProps>(httpUpload, getBaseUrl(params), binary, {
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  })
}
