import type { AxiosInstance } from 'contentful-sdk-core'
import { CollectionProp, GetSpaceParams, QueryParams } from '../../../common-types'
import { SpaceMemberProps } from '../../../entities/space-member'
import { RestEndpoint } from '../types'
import * as raw from './raw'

export const get: RestEndpoint<'SpaceMember', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { spaceMemberId: string }
) =>
  raw.get<SpaceMemberProps>(http, `/spaces/${params.spaceId}/space_members/${params.spaceMemberId}`)

export const getMany: RestEndpoint<'SpaceMember', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceParams & QueryParams
) =>
  raw.get<CollectionProp<SpaceMemberProps>>(http, `/spaces/${params.spaceId}/space_members`, {
    params: params.query,
  })
