import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  CollectionProp,
  GetOrganizationParams,
  GetSpaceParams,
  GetTeamSpaceMembershipParams,
  QueryParams,
} from '../../../common-types'
import {
  CreateTeamSpaceMembershipProps,
  TeamSpaceMembershipProps,
} from '../../../entities/team-space-membership'
import { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceParams) => `/spaces/${params.spaceId}/team_space_memberships`

const getEntityUrl = (params: GetTeamSpaceMembershipParams) =>
  `${getBaseUrl(params)}/${params.teamSpaceMembershipId}`

export const get: RestEndpoint<'TeamSpaceMembership', 'get'> = (
  http: AxiosInstance,
  params: GetTeamSpaceMembershipParams
) => raw.get<TeamSpaceMembershipProps>(http, getEntityUrl(params))

export const getMany: RestEndpoint<'TeamSpaceMembership', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceParams & QueryParams
) =>
  raw.get<CollectionProp<TeamSpaceMembershipProps>>(http, getBaseUrl(params), {
    params: params.query,
  })

export const getForOrganization: RestEndpoint<'TeamSpaceMembership', 'getForOrganization'> = (
  http: AxiosInstance,
  params: GetOrganizationParams & { teamSpaceMembershipId: string }
) => {
  return raw.get<TeamSpaceMembershipProps>(
    http,
    `/organizations/${params.organizationId}/team_space_memberships/${params.teamSpaceMembershipId}`
  )
}

export const getManyForOrganization: RestEndpoint<'TeamSpaceMembership', 'getManyForOrganization'> =
  (http: AxiosInstance, params: GetOrganizationParams & QueryParams & { teamId?: string }) => {
    const query = params.query || {}
    if (params.teamId) {
      query['sys.team.sys.id'] = params.teamId
    }
    return raw.get<CollectionProp<TeamSpaceMembershipProps>>(
      http,
      `/organizations/${params.organizationId}/team_space_memberships`,
      {
        params: params.query,
      }
    )
  }

export const create: RestEndpoint<'TeamSpaceMembership', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { teamId: string },
  rawData: CreateTeamSpaceMembershipProps,
  headers?: Record<string, unknown>
) => {
  return raw.post<TeamSpaceMembershipProps>(http, getBaseUrl(params), rawData, {
    headers: {
      'x-contentful-team': params.teamId,
      ...headers,
    },
  })
}

export const update: RestEndpoint<'TeamSpaceMembership', 'update'> = (
  http: AxiosInstance,
  params: GetTeamSpaceMembershipParams,
  rawData: TeamSpaceMembershipProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)
  delete data.sys

  return raw.put<TeamSpaceMembershipProps>(http, getEntityUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version || 0,
      'x-contentful-team': rawData.sys.team.sys.id,
      ...headers,
    },
  })
}

export const del: RestEndpoint<'TeamSpaceMembership', 'delete'> = (
  http: AxiosInstance,
  params: GetTeamSpaceMembershipParams
) => {
  return raw.del(http, getEntityUrl(params))
}
