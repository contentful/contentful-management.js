import { AxiosInstance } from 'axios'
import * as raw from './raw'
import cloneDeep from 'lodash/cloneDeep'
import { CollectionProp, QueryParams, GetOrganizationParams, GetTeamParams } from './common-types'
import { normalizeSelect } from './utils'
import { CreateTeamMembershipProps, TeamMembershipProps } from '../../entities/team-membership'

type GetTeamMembershipParams = GetTeamParams & { teamMembershipId: string }

const getBaseUrl = (params: GetTeamParams) =>
  `/organizations/${params.organizationId}/teams/${params.teamId}/team_memberships`

const getEntityUrl = (params: GetTeamMembershipParams) =>
  `/organizations/${params.organizationId}/teams/${params.teamId}/team_memberships/${params.teamMembershipId}`

export const get = (http: AxiosInstance, params: GetTeamMembershipParams) =>
  raw.get<TeamMembershipProps>(http, getEntityUrl(params))

export const getManyForOrganization = (
  http: AxiosInstance,
  params: GetOrganizationParams & QueryParams
) =>
  raw.get<CollectionProp<TeamMembershipProps>>(
    http,
    `/organizations/${params.organizationId}/team_memberships`,
    {
      params: normalizeSelect(params.query),
    }
  )

export const getManyForTeam = (http: AxiosInstance, params: GetTeamParams & QueryParams) => {
  return raw.get<CollectionProp<TeamMembershipProps>>(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const create = (
  http: AxiosInstance,
  params: GetTeamParams,
  rawData: CreateTeamMembershipProps,
  headers?: Record<string, unknown>
) => {
  return raw.post<TeamMembershipProps>(http, getBaseUrl(params), rawData, { headers })
}

export const update = (
  http: AxiosInstance,
  params: GetTeamMembershipParams,
  rawData: TeamMembershipProps,
  headers?: Record<string, unknown>
) => {
  const data = cloneDeep(rawData)
  delete data.sys

  return raw.put<TeamMembershipProps>(http, getEntityUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version || 0,
      ...headers,
    },
  })
}

export const del = (http: AxiosInstance, params: GetTeamMembershipParams) =>
  raw.del(http, getEntityUrl(params))
