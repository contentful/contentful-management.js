import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { SetOptional } from 'type-fest'
import {
  CollectionProp,
  GetOrganizationParams,
  GetSpaceMembershipProps,
  GetSpaceParams,
  QueryParams,
} from '../../../common-types'
import {
  CreateSpaceMembershipProps,
  SpaceMembershipProps,
} from '../../../entities/space-membership'
import { RestEndpoint } from '../types'
import * as raw from './raw'

function spaceMembershipDeprecationWarning() {
  console.warn(
    'The user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user)'
  )
}

const getBaseUrl = (params: GetSpaceParams) => `/spaces/${params.spaceId}/space_memberships`
const getEntityUrl = (params: GetSpaceMembershipProps) =>
  `${getBaseUrl(params)}/${params.spaceMembershipId}`

export const get: RestEndpoint<'SpaceMembership', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceMembershipProps
) => {
  spaceMembershipDeprecationWarning()
  return raw.get<SpaceMembershipProps>(http, getEntityUrl(params))
}

export const getMany: RestEndpoint<'SpaceMembership', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceParams & QueryParams
) => {
  spaceMembershipDeprecationWarning()
  return raw.get<CollectionProp<SpaceMembershipProps>>(http, getBaseUrl(params), {
    params: params.query,
  })
}

export const getForOrganization: RestEndpoint<'SpaceMembership', 'getForOrganization'> = (
  http: AxiosInstance,
  params: GetOrganizationParams & { spaceMembershipId: string }
) => {
  return raw.get<SpaceMembershipProps>(
    http,
    `/organizations/${params.organizationId}/space_memberships/${params.spaceMembershipId}`
  )
}

export const getManyForOrganization: RestEndpoint<'SpaceMembership', 'getManyForOrganization'> = (
  http: AxiosInstance,
  params: GetOrganizationParams & QueryParams
) => {
  return raw.get<CollectionProp<SpaceMembershipProps>>(
    http,
    `/organizations/${params.organizationId}/space_memberships`,
    {
      params: params.query,
    }
  )
}

export const create: RestEndpoint<'SpaceMembership', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceParams,
  data: CreateSpaceMembershipProps,
  headers?: Record<string, unknown>
) => {
  spaceMembershipDeprecationWarning()
  return raw.post<SpaceMembershipProps>(http, getBaseUrl(params), data, {
    headers,
  })
}

export const createWithId: RestEndpoint<'SpaceMembership', 'createWithId'> = (
  http: AxiosInstance,
  params: GetSpaceMembershipProps,
  data: CreateSpaceMembershipProps,
  headers?: Record<string, unknown>
) => {
  spaceMembershipDeprecationWarning()
  return raw.put<SpaceMembershipProps>(http, getEntityUrl(params), data, {
    headers,
  })
}

export const update: RestEndpoint<'SpaceMembership', 'update'> = (
  http: AxiosInstance,
  params: GetSpaceMembershipProps,
  rawData: SpaceMembershipProps,
  headers?: Record<string, unknown>
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys
  return raw.put<SpaceMembershipProps>(http, getEntityUrl(params), data, {
    headers: {
      ...headers,
      'X-Contentful-Version': rawData.sys.version ?? 0,
    },
  })
}

export const del: RestEndpoint<'SpaceMembership', 'delete'> = (
  http: AxiosInstance,
  params: GetSpaceMembershipProps
) => {
  return raw.del(http, getEntityUrl(params))
}
