import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  GetContentSemanticsIndexParams,
  GetManyContentSemanticsIndexParams,
  GetManyContentSemanticsIndexForEnvironmentParams,
  GetOrganizationParams,
} from '../../../common-types'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import type {
  ContentSemanticsIndexProps,
  ContentSemanticsIndexCollectionProps,
  CreateContentSemanticsIndexProps,
} from '../../../entities/content-semantics-index'

export const get: RestEndpoint<'ContentSemanticsIndex', 'get'> = (
  http: AxiosInstance,
  params: GetContentSemanticsIndexParams,
) => {
  return raw.get<ContentSemanticsIndexProps>(
    http,
    `/organizations/${params.organizationId}/semantic/search-index/${params.indexId}`,
  )
}

export const getMany: RestEndpoint<'ContentSemanticsIndex', 'getMany'> = (
  http: AxiosInstance,
  params: GetManyContentSemanticsIndexParams,
) => {
  return raw.get<ContentSemanticsIndexCollectionProps>(
    http,
    `/organizations/${params.organizationId}/semantic/search-index`,
    { params: params.status ? { status: params.status } : undefined },
  )
}

export const getManyForEnvironment: RestEndpoint<
  'ContentSemanticsIndex',
  'getManyForEnvironment'
> = (http: AxiosInstance, params: GetManyContentSemanticsIndexForEnvironmentParams) => {
  return raw.get<ContentSemanticsIndexCollectionProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/semantic/search-index`,
    { params: params.status ? { status: params.status } : undefined },
  )
}

export const create: RestEndpoint<'ContentSemanticsIndex', 'create'> = (
  http: AxiosInstance,
  params: GetOrganizationParams,
  data: CreateContentSemanticsIndexProps,
) => {
  return raw.post<ContentSemanticsIndexProps>(
    http,
    `/organizations/${params.organizationId}/semantic/search-index`,
    data,
  )
}

export const del: RestEndpoint<'ContentSemanticsIndex', 'delete'> = (
  http: AxiosInstance,
  params: GetContentSemanticsIndexParams,
) => {
  return raw.del<void>(
    http,
    `/organizations/${params.organizationId}/semantic/search-index/${params.indexId}`,
  )
}
