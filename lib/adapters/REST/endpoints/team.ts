import { AxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { SetOptional } from 'type-fest'
import {
  CollectionProp,
  GetOrganizationParams,
  GetSpaceParams,
  GetTeamParams,
  QueryParams,
} from '../../../common-types'
import { CreateTeamProps, TeamProps } from '../../../entities/team'
import { RestEndpoint } from '../types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

const getBaseUrl = (params: GetOrganizationParams) =>
  `/organizations/${params.organizationId}/teams`

const getEntityUrl = (params: GetTeamParams) => `${getBaseUrl(params)}/${params.teamId}`

export const get: RestEndpoint<'Team', 'get'> = (http: AxiosInstance, params: GetTeamParams) =>
  raw.get<TeamProps>(http, getEntityUrl(params))

export const getMany: RestEndpoint<'Team', 'getMany'> = (
  http: AxiosInstance,
  params: GetOrganizationParams & QueryParams
) =>
  raw.get<CollectionProp<TeamProps>>(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })

export const getManyForSpace: RestEndpoint<'Team', 'getManyForSpace'> = (
  http: AxiosInstance,
  params: GetSpaceParams & QueryParams
) => {
  return raw.get<CollectionProp<TeamProps>>(http, `/spaces/${params.spaceId}/teams`, {
    params: normalizeSelect(params.query),
  })
}

export const create: RestEndpoint<'Team', 'create'> = (
  http: AxiosInstance,
  params: GetOrganizationParams,
  rawData: CreateTeamProps,
  headers?: AxiosRequestHeaders
) => {
  return raw.post(http, getBaseUrl(params), rawData, { headers })
}

export const update: RestEndpoint<'Team', 'update'> = (
  http: AxiosInstance,
  params: GetTeamParams,
  rawData: TeamProps,
  headers?: AxiosRequestHeaders
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys

  return raw.put<TeamProps>(http, getEntityUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del: RestEndpoint<'Team', 'delete'> = (http: AxiosInstance, params: GetTeamParams) =>
  raw.del(http, getEntityUrl(params))
