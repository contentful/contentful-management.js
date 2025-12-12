import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type { GetSpaceEnvironmentParams } from '../../../common-types'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import type {
  GetSemanticDuplicatesProps,
  SemanticDuplicatesProps,
} from '../../../entities/semantic-duplicates'

export const get: RestEndpoint<'SemanticDuplicates', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  data: GetSemanticDuplicatesProps,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.post<SemanticDuplicatesProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/semantic/duplicates`,
    data,
    { headers },
  )
}
