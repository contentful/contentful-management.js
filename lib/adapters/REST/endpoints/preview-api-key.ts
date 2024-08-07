import type { AxiosInstance } from 'contentful-sdk-core'
import type { CollectionProp, GetSpaceParams, QueryParams } from '../../../common-types'
import type { PreviewApiKeyProps } from '../../../entities/preview-api-key'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

export const get: RestEndpoint<'PreviewApiKey', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { previewApiKeyId: string }
) => {
  return raw.get<PreviewApiKeyProps>(
    http,
    `/spaces/${params.spaceId}/preview_api_keys/${params.previewApiKeyId}`
  )
}

export const getMany: RestEndpoint<'PreviewApiKey', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceParams & QueryParams
) => {
  return raw.get<CollectionProp<PreviewApiKeyProps>>(
    http,
    `/spaces/${params.spaceId}/preview_api_keys`,
    {
      params: params.query,
    }
  )
}
