import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type { GetOrganizationParams } from '../../../common-types'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import type { VectorizationStatusProps } from '../../../entities/vectorization-status'

export const get: RestEndpoint<'VectorizationStatus', 'get'> = (http: AxiosInstance, params: GetOrganizationParams, headers?: RawAxiosRequestHeaders) => {
  return raw.get<VectorizationStatusProps>(http, `/organizations/${params.organizationId}/semantic/vectorization-status`, {
    headers,
  })
}