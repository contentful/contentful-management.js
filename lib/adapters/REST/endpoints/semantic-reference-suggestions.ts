import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type { GetSpaceEnvironmentParams } from '../../../common-types'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import type {
  GetSemanticReferenceSuggestionsProps,
  SemanticReferenceSuggestionsProps,
} from '../../../entities/semantic-reference-suggestions'

export const get: RestEndpoint<'SemanticReferenceSuggestions', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  data: GetSemanticReferenceSuggestionsProps,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.post<SemanticReferenceSuggestionsProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/semantic/reference-suggestions`,
    data,
    { headers },
  )
}
