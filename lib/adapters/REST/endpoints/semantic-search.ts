import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type { GetSpaceEnvironmentParams } from '../../../common-types'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import type { GetSemanticSearchProps, SemanticSearchProps } from '../../../entities/semantic-search'

export const get: RestEndpoint<'SemanticSearch', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  data: GetSemanticSearchProps,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.post<SemanticSearchProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/semantic/search`,
    data,
    { headers },
  )
}
