import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  CursorPaginatedCollectionProp,
  GetFragmentParams,
  GetSpaceEnvironmentParams,
} from '../../../common-types'
import type { FragmentProps, FragmentQueryOptions } from '../../../entities/fragment'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/fragments`

export const getMany: RestEndpoint<'Fragment', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query: FragmentQueryOptions },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<CursorPaginatedCollectionProp<FragmentProps>>(http, getBaseUrl(params), {
    params: params.query,
    headers,
  })
}

export const get: RestEndpoint<'Fragment', 'get'> = (
  http: AxiosInstance,
  params: GetFragmentParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<FragmentProps>(http, getBaseUrl(params) + `/${params.fragmentId}`, { headers })
}
