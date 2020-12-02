import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import copy from 'fast-copy'
import { CollectionProp, GetOrganizationParams, QueryParams } from './common-types'
import { OrganizationMembershipProps } from '../../entities/organization-membership'

type GetOrganizationMembershipProps = GetOrganizationParams & { organizationMembershipId: string }

const getBaseUrl = (params: GetOrganizationParams) =>
  `/organizations/${params.organizationId}/organization_memberships`

const getEntityUrl = (params: GetOrganizationMembershipProps) =>
  `${getBaseUrl(params)}/${params.organizationMembershipId}`

export const get = (http: AxiosInstance, params: GetOrganizationMembershipProps) => {
  return raw.get<OrganizationMembershipProps>(http, getEntityUrl(params))
}

export const getMany = (http: AxiosInstance, params: GetOrganizationParams & QueryParams) => {
  return raw.get<CollectionProp<OrganizationMembershipProps>>(http, getBaseUrl(params))
}

export const update = (
  http: AxiosInstance,
  params: GetOrganizationMembershipProps,
  rawData: OrganizationMembershipProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)
  delete data.sys

  const { role } = data
  return raw.put<OrganizationMembershipProps>(
    http,
    getEntityUrl(params),
    { role },
    {
      headers: {
        ...headers,
        'X-Contentful-Version': rawData.sys.version ?? 0,
      },
    }
  )
}

export const del = (http: AxiosInstance, params: GetOrganizationMembershipProps) => {
  return raw.del(http, getEntityUrl(params))
}
