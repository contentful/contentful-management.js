import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  CollectionProp,
  GetOrganizationParams,
  GetSpaceParams,
  QueryParams,
} from '../../../common-types'
import type {
  SpaceAddOnProps,
  SpaceAddOnOrganizationProps,
  UpdateSpaceAddOnAllocationProps,
} from '../../../entities/space-add-on'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

export const getMany: RestEndpoint<'SpaceAddOn', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceParams & QueryParams,
) => {
  return raw.get<CollectionProp<SpaceAddOnProps>>(http, `/spaces/${params.spaceId}/space_add_ons`, {
    params: normalizeSelect(params.query),
  })
}

export const getManyForOrganization: RestEndpoint<'SpaceAddOn', 'getManyForOrganization'> = (
  http: AxiosInstance,
  params: GetOrganizationParams & QueryParams,
) => {
  return raw.get<CollectionProp<SpaceAddOnOrganizationProps>>(
    http,
    `/organizations/${params.organizationId}/space_add_ons`,
    {
      params: normalizeSelect(params.query),
    },
  )
}

export const updateAllocations: RestEndpoint<'SpaceAddOn', 'updateAllocations'> = (
  http: AxiosInstance,
  params: GetSpaceParams,
  data: UpdateSpaceAddOnAllocationProps[],
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.put<CollectionProp<SpaceAddOnProps>>(
    http,
    `/spaces/${params.spaceId}/space_add_ons`,
    data,
    {
      headers,
    },
  )
}
