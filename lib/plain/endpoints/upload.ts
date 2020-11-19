import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { Stream } from 'stream'
import { GetSpaceEnvironmentParams } from './common-types'

export const create = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  data: { file: string | ArrayBuffer | Stream }
) => {
  const { file } = data
  if (!file) {
    return Promise.reject(new Error('Unable to locate a file to upload.'))
  }
  return raw.post(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/uploads`,
    file,
    {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    }
  )
}

export const del = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { uploadId: string }
) => {
  return raw.del(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/uploads/${params.uploadId}`
  )
}

export const get = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { uploadId: string }
) => {
  return raw.get(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/uploads/${params.uploadId}`
  )
}
