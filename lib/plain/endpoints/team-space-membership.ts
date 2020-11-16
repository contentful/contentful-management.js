import { AxiosInstance } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import * as raw from './raw'
import { GetSpaceParams, QueryParams, CollectionProp } from './common-types'
import {
  TeamSpaceMembershipProps,
  CreateTeamSpaceMembershipProps,
} from '../../entities/team-space-membership'

type GetTeamSpaceMembershipParams = GetSpaceParams & { teamSpaceMembershipId: string }

const getBaseUrl = (params: GetSpaceParams) => `/spaces/${params.spaceId}/team_space_memberships`

const getEntityUrl = (params: GetTeamSpaceMembershipParams) =>
  `${getBaseUrl(params)}/${params.teamSpaceMembershipId}`

export const get = (http: AxiosInstance, params: GetTeamSpaceMembershipParams) =>
  raw.get<TeamSpaceMembershipProps>(http, getEntityUrl(params))

export const getMany = (http: AxiosInstance, params: GetSpaceParams & QueryParams) =>
  raw.get<CollectionProp<TeamSpaceMembershipProps>>(http, getBaseUrl(params), {
    params: params.query,
  })

export const create = (
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

export const update = (
  http: AxiosInstance,
  params: GetTeamSpaceMembershipParams,
  rawData: TeamSpaceMembershipProps,
  headers?: Record<string, unknown>
) => {
  const data = cloneDeep(rawData)
  delete data.sys

  return raw.put<TeamSpaceMembershipProps>(http, getEntityUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version || 0,
      'x-contentful-team': rawData.sys.team.sys.id,
      ...headers,
    },
  })
}

export const del = (http: AxiosInstance, params: GetTeamSpaceMembershipParams) => {
  return raw.del(http, getEntityUrl(params))
}
