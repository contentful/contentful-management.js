import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { SpaceMemberProps } from '../../entities/space-member'
import { CollectionProp, QueryParams, GetSpaceParams } from './common-types'

export const get = (http: AxiosInstance, params: GetSpaceParams & { spaceMemberId: string }) =>
  raw.get<SpaceMemberProps>(http, `/spaces/${params.spaceId}/space_members/${params.spaceMemberId}`)

export const getMany = (http: AxiosInstance, params: GetSpaceParams & QueryParams) =>
  raw.get<CollectionProp<SpaceMemberProps>>(http, `/spaces/${params.spaceId}/space_members`, {
    params: params.query,
  })
