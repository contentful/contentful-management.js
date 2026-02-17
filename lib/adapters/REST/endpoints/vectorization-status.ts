import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type { GetOrganizationParams } from '../../../common-types'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import type {
  UpdateVectorizationStatusProps,
  VectorizationStatusProps,
} from '../../../entities/vectorization-status'

export const get: RestEndpoint<'VectorizationStatus', 'get'> = (
  http: AxiosInstance,
  params: GetOrganizationParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<VectorizationStatusProps>(
    http,
    `/organizations/${params.organizationId}/semantic/vectorization-status`,
    {
      headers,
    },
  )
}

export const update: RestEndpoint<'VectorizationStatus', 'update'> = (
  http: AxiosInstance,
  params: GetOrganizationParams,
  data: UpdateVectorizationStatusProps,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.post<VectorizationStatusProps>(
    http,
    `/organizations/${params.organizationId}/semantic/vectorization-status`,
    data,
    {
      headers,
    },
  )
}
