import type { AxiosInstance } from 'contentful-sdk-core'
import type { Stream } from 'stream'
import type {
  GetSpaceEnvironmentParams,
  GetSpaceEnvironmentUploadParams,
} from '../../../common-types.js'
import { getUploadHttpClient } from '../../../upload-http-client.js'
import type { RestEndpoint } from '../types.js'
import * as raw from './raw.js'

const getBaseUploadUrl = (params: GetSpaceEnvironmentParams) => {
  const spacePath = `/spaces/${params.spaceId}/uploads`
  const environmentPath = `/spaces/${params.spaceId}/environments/${params.environmentId}/uploads`
  const path = params.environmentId ? environmentPath : spacePath
  return path
}

const getEntityUploadUrl = (params: GetSpaceEnvironmentUploadParams) => {
  const path = getBaseUploadUrl(params)
  return path + `/${params.uploadId}`
}

export const create: RestEndpoint<'Upload', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
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
  params: GetSpaceEnvironmentUploadParams
) => {
  const httpUpload = getUploadHttpClient(http)
  const path = getEntityUploadUrl(params)
  return raw.del(httpUpload, path)
}

export const get: RestEndpoint<'Upload', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentUploadParams
) => {
  const httpUpload = getUploadHttpClient(http)
  const path = getEntityUploadUrl(params)
  return raw.get(httpUpload, path)
}
