import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import * as raw from './raw'
import { SpaceMembershipProps, CreateSpaceMembershipProps } from '../../entities/space-membership'
import { CollectionProp, QueryParams, GetSpaceParams, GetOrganizationParams } from './common-types'

function spaceMembershipDeprecationWarning() {
  console.warn(
    'The user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user)'
  )
}

type GetSpaceMembershipProps = GetSpaceParams & { spaceMembershipId: string }

const getBaseUrl = (params: GetSpaceParams) => `/spaces/${params.spaceId}/space_memberships`
const getEntityUrl = (params: GetSpaceMembershipProps) =>
  `${getBaseUrl(params)}/${params.spaceMembershipId}`

export const get = (http: AxiosInstance, params: GetSpaceMembershipProps) => {
  spaceMembershipDeprecationWarning()
  return raw.get<SpaceMembershipProps>(http, getEntityUrl(params))
}

export const getMany = (http: AxiosInstance, params: GetSpaceParams & QueryParams) => {
  spaceMembershipDeprecationWarning()
  return raw.get<CollectionProp<SpaceMembershipProps>>(http, getBaseUrl(params), {
    params: params.query,
  })
}

export const getForOrganization = (
  http: AxiosInstance,
  params: GetOrganizationParams & { spaceMembershipId: string }
) => {
  return raw.get<SpaceMembershipProps>(
    http,
    `/organizations/${params.organizationId}/space_memberships/${params.spaceMembershipId}`
  )
}

export const getManyForOrganization = (
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

export const create = (
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

export const createWithId = (
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

export const update = (
  http: AxiosInstance,
  params: GetSpaceMembershipProps,
  rawData: SpaceMembershipProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)
  delete data.sys
  return raw.put<SpaceMembershipProps>(http, getEntityUrl(params), data, {
    headers: {
      ...headers,
      'X-Contentful-Version': rawData.sys.version ?? 0,
    },
  })
}

export const del = (http: AxiosInstance, params: GetSpaceMembershipProps) => {
  return raw.del(http, getEntityUrl(params))
}
