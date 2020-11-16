import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { CollectionProp, QueryParams, GetOrganizationParams, GetTeamParams } from './common-types'
import { CreateTeamProps, TeamProps } from '../../entities/team'
import { normalizeSelect } from './utils'
import cloneDeep from 'lodash/cloneDeep'

const getBaseUrl = (params: GetOrganizationParams) =>
  `/organizations/${params.organizationId}/teams`

const getEntityUrl = (params: GetTeamParams) => `${getBaseUrl(params)}/${params.teamId}`

export const get = (http: AxiosInstance, params: GetTeamParams) =>
  raw.get<TeamProps>(http, getEntityUrl(params))

export const getMany = (http: AxiosInstance, params: GetOrganizationParams & QueryParams) =>
  raw.get<CollectionProp<TeamProps>>(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })

export const create = (
  http: AxiosInstance,
  params: GetOrganizationParams,
  rawData: CreateTeamProps,
  headers?: Record<string, unknown>
) => {
  return raw.post(http, getBaseUrl(params), rawData, { headers })
}

export const update = (
  http: AxiosInstance,
  params: GetTeamParams,
  rawData: TeamProps,
  headers?: Record<string, unknown>
) => {
  const data = cloneDeep(rawData)
  delete data.sys

  return raw.put<TeamProps>(http, getEntityUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del = (http: AxiosInstance, params: GetTeamParams) =>
  raw.del(http, getEntityUrl(params))
