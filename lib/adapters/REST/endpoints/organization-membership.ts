import { AxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { SetOptional } from 'type-fest'
import {
  CollectionProp,
  GetOrganizationMembershipParams,
  GetOrganizationParams,
  QueryParams,
} from '../../../common-types'
import { OrganizationMembershipProps } from '../../../entities/organization-membership'
import { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetOrganizationParams) =>
  `/organizations/${params.organizationId}/organization_memberships`

const getEntityUrl = (params: GetOrganizationMembershipParams) =>
  `${getBaseUrl(params)}/${params.organizationMembershipId}`

export const get: RestEndpoint<'OrganizationMembership', 'get'> = (
  http: AxiosInstance,
  params: GetOrganizationMembershipParams
) => {
  return raw.get<OrganizationMembershipProps>(http, getEntityUrl(params))
}

export const getMany: RestEndpoint<'OrganizationMembership', 'getMany'> = (
  http: AxiosInstance,
  params: GetOrganizationParams & QueryParams
) => {
  return raw.get<CollectionProp<OrganizationMembershipProps>>(http, getBaseUrl(params), {
    params: params.query,
  })
}

export const update: RestEndpoint<'OrganizationMembership', 'update'> = (
  http: AxiosInstance,
  params: GetOrganizationMembershipParams,
  rawData: OrganizationMembershipProps,
  headers?: AxiosRequestHeaders
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
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

export const del: RestEndpoint<'OrganizationMembership', 'delete'> = (
  http: AxiosInstance,
  params: GetOrganizationMembershipParams
) => {
  return raw.del(http, getEntityUrl(params))
}
