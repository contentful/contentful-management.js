import type { AxiosInstance } from 'contentful-sdk-core'
import type { CollectionProp, GetSpaceParams, QueryParams } from '../../../common-types.js'
import type { SpaceMemberProps } from '../../../entities/space-member.js'
import type { RestEndpoint } from '../types.js'
import * as raw from './raw.js'

export const get: RestEndpoint<'SpaceMember', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { spaceMemberId: string },
) =>
  raw.get<SpaceMemberProps>(http, `/spaces/${params.spaceId}/space_members/${params.spaceMemberId}`)

export const getMany: RestEndpoint<'SpaceMember', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceParams & QueryParams,
) =>
  raw.get<CollectionProp<SpaceMemberProps>>(http, `/spaces/${params.spaceId}/space_members`, {
    params: params.query,
  })
