import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type { CollectionProp, GetSpaceEnvironmentParams } from '../../../common-types'
import type {
  ComponentTypeProps,
  ComponentTypeQueryOptions,
} from '../../../entities/component-type'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/component_types`

export const getMany: RestEndpoint<'ComponentType', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query: ComponentTypeQueryOptions },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<CollectionProp<ComponentTypeProps>>(http, getBaseUrl(params), {
    params: params.query,
    headers,
  })
}

export const get: RestEndpoint<'ComponentType', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { componentId: string },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<ComponentTypeProps>(http, getBaseUrl(params) + `/${params.componentId}`, {
    headers,
  })
}

export const del: RestEndpoint<'ComponentType', 'delete'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { componentId: string },
) => {
  return raw.del(http, getBaseUrl(params) + `/${params.componentId}`)
}
