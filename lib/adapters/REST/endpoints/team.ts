import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import { normalizeSelect } from './utils'
import copy from 'fast-copy'
import { GetOrganizationParams, GetTeamParams, QueryParams } from '../../../plain/common-types'
import { CreateTeamProps, TeamProps } from '../../../entities/team'
import { CollectionProp } from '../../../common-types'

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
  const data = copy(rawData)
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
