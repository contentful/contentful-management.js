import type { AxiosInstance } from 'contentful-sdk-core'
import type { GetSpaceEnvironmentParams } from '../../../common-types'
import { getUploadHttpClient } from '../../../upload-http-client'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) => {
  const defaultPath = `/spaces/${params.spaceId}/environments/master/upload_credentials`
  const environmentPath = `/spaces/${params.spaceId}/environments/${params.environmentId}/upload_credentials`
  const path = params.environmentId ? environmentPath : defaultPath
  return path
}

export const create: RestEndpoint<'UploadCredential', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams
) => {
  const httpUpload = getUploadHttpClient(http)

  const path = getBaseUrl(params)
  return raw.post(httpUpload, path)
}
