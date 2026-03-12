import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  CursorPaginatedCollectionProp,
  GetSpaceEnvironmentParams,
} from '../../../common-types'
import type { DataAssemblyProps, DataAssemblyQueryOptions } from '../../../entities/data-assembly'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/data_assemblies_temp`

export const getMany: RestEndpoint<'DataAssembly', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query: DataAssemblyQueryOptions },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<CursorPaginatedCollectionProp<DataAssemblyProps>>(http, getBaseUrl(params), {
    params: params.query,
    headers,
  })
}
