import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import { Stream } from 'stream'
import { GetSpaceParams } from '../../../plain/common-types'
import { getUploadHttpClient } from '../../../upload-http-client'

export const create = (
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
  })
}

export const del = (http: AxiosInstance, params: GetSpaceParams & { uploadId: string }) => {
  const httpUpload = getUploadHttpClient(http)

  return raw.del(httpUpload, `/spaces/${params.spaceId}/uploads/${params.uploadId}`)
}

export const get = (http: AxiosInstance, params: GetSpaceParams & { uploadId: string }) => {
  const httpUpload = getUploadHttpClient(http)

  return raw.get(httpUpload, `/spaces/${params.spaceId}/uploads/${params.uploadId}`)
}
