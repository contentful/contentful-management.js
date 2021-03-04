import type { AxiosInstance } from 'contentful-sdk-core'
import { CollectionProp } from '../../../common-types'
import { PreviewApiKeyProps } from '../../../entities/preview-api-key'
import { GetSpaceParams, QueryParams } from '../../../plain/common-types'
import * as raw from './raw'

export const get = (http: AxiosInstance, params: GetSpaceParams & { previewApiKeyId: string }) => {
  return raw.get<PreviewApiKeyProps>(
    http,
    `/spaces/${params.spaceId}/preview_api_keys/${params.previewApiKeyId}`
  )
}

export const getMany = (http: AxiosInstance, params: GetSpaceParams & QueryParams) => {
  return raw.get<CollectionProp<PreviewApiKeyProps>>(
    http,
    `/spaces/${params.spaceId}/preview_api_keys`,
    {
      params: params.query,
    }
  )
}
