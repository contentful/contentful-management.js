import type { AxiosInstance } from 'contentful-sdk-core'
import { Stream } from 'stream'
import {
  GetSpaceAndOptionalEnvironmentParams,
  GetSpaceEnvironmentParams,
  GetSpaceEnvironmentUploadParams,
  GetSpaceParams,
} from '../../../common-types'
import { getUploadHttpClient } from '../../../upload-http-client'
import { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUploadUrl = (params: GetSpaceAndOptionalEnvironmentParams) => {
  const path = `/spaces/${params.spaceId}/environments/master/uploads`
  return path
}

const getEntityUploadUrl = (
  params: GetSpaceAndOptionalEnvironmentParams & { uploadId: string }
) => {
  const path = getBaseUploadUrl(params)
  return path + `/${params.uploadId}`
}

export const create: RestEndpoint<'Upload', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceParams,
  data: { file: string | ArrayBuffer | Stream }
) => {
  const httpUpload = getUploadHttpClient(http)

  const { file } = data
  if (!file) {
    return Promise.reject(new Error('Unable to locate a file to upload.'))
  }
  const path = getBaseUploadUrl(params)
  return raw.post(httpUpload, path, file, {
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  })
}

export const del: RestEndpoint<'Upload', 'delete'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { uploadId: string }
) => {
  const httpUpload = getUploadHttpClient(http)

  const path = getEntityUploadUrl(params)
  return raw.del(httpUpload, path)
}

export const get: RestEndpoint<'Upload', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { uploadId: string }
) => {
  const httpUpload = getUploadHttpClient(http)

  const path = getEntityUploadUrl(params)
  return raw.get(httpUpload, path)
}
