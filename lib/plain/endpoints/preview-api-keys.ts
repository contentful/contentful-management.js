import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { PreviewApiKeyProps } from '../../entities/preview-api-key'
import { CollectionProp, QueryParams, GetSpaceParams } from './common-types'

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
