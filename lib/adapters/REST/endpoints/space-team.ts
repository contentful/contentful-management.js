import type { AxiosInstance } from 'contentful-sdk-core'
import { CollectionProp, GetSpaceTeamParams, PaginationQueryParams } from '../../../common-types'
import { SpaceTeamProps } from '../../../entities/space-team'
import { RestEndpoint } from '../types'
import * as raw from './raw'

export const get: RestEndpoint<'SpaceTeam', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceTeamParams & { teamId: string }
) => {
  return raw.get<SpaceTeamProps>(http, `/spaces/${params.spaceId}/teams/${params.teamId}`)
}

export const getMany: RestEndpoint<'SpaceTeam', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceTeamParams & PaginationQueryParams
) => {
  return raw.get<CollectionProp<SpaceTeamProps>>(http, `/spaces/${params.spaceId}/teams`, {
    params: params.query,
  })
}
