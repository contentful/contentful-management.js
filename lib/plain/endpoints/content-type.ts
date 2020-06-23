import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { ContentTypeProps } from '../../entities/content-type'
import { GetEnvironmentParams } from './environment'
import { CollectionProp, QueryParams } from './common-types'

export type GetManyContentTypesParams = GetEnvironmentParams & QueryParams

export const getMany = (http: AxiosInstance, params: GetManyContentTypesParams) => {
  return raw.get<CollectionProp<ContentTypeProps>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/content_types`,
    {
      params: params.query,
    }
  )
}
