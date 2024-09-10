import type { CursorPaginatedCollectionProp, GetResourceParams } from '../../../common-types'
import type { RestEndpoint } from '../types'
import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import type { ResourceProps, ResourceQueryOptions } from '../../../entities/resource'

const getBaseUrl = (params: GetResourceParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/resource_types/${params.resourceTypeId}/resources`

export const getMany: RestEndpoint<'Resource', 'getMany'> = (
  http: AxiosInstance,
  params: GetResourceParams & { query: ResourceQueryOptions }
) =>
  raw.get<CursorPaginatedCollectionProp<ResourceProps>>(http, getBaseUrl(params), {
    params: params.query,
  })
