import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  CursorPaginatedCollectionProp,
  GetSpaceEnvironmentParams,
  GetTemplateParams,
} from '../../../common-types'
import type { TemplateProps, TemplateQueryOptions } from '../../../entities/template'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/templates`

export const getMany: RestEndpoint<'Template', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query: TemplateQueryOptions },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<CursorPaginatedCollectionProp<TemplateProps>>(http, getBaseUrl(params), {
    params: params.query,
    headers,
  })
}

export const get: RestEndpoint<'Template', 'get'> = (
  http: AxiosInstance,
  params: GetTemplateParams,
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<TemplateProps>(http, getBaseUrl(params) + `/${params.templateId}`, { headers })
}
