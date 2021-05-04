import type { AxiosInstance } from 'contentful-sdk-core'
import { Stream } from 'stream'
import { GetSpaceParams } from '../../../common-types'
import { getUploadHttpClient } from '../../../upload-http-client'
import { RestEndpoint } from '../types'
import * as raw from './raw'

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
  return raw.post(httpUpload, `/spaces/${params.spaceId}/uploads`, file, {
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    //TODO: remove the line below when CreateHttpClientParams
    //from sdk-core supports maxContentLength
    maxBodyLength: http.defaults.maxContentLength,
  })
}

export const del: RestEndpoint<'Upload', 'delete'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { uploadId: string }
) => {
  const httpUpload = getUploadHttpClient(http)

  return raw.del(httpUpload, `/spaces/${params.spaceId}/uploads/${params.uploadId}`)
}

export const get: RestEndpoint<'Upload', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { uploadId: string }
) => {
  const httpUpload = getUploadHttpClient(http)

  return raw.get(httpUpload, `/spaces/${params.spaceId}/uploads/${params.uploadId}`)
}
