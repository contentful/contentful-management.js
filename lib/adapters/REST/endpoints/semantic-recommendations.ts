import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type { GetSpaceEnvironmentParams } from '../../../common-types'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import type {
  GetSemanticRecommendationsProps,
  SemanticRecommendationsProps,
} from '../../../entities/semantic-recommendations'

export const get: RestEndpoint<'SemanticRecommendations', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  data: GetSemanticRecommendationsProps,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.post<SemanticRecommendationsProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/semantic/recommendations`,
    data,
    { headers },
  )
}
