import type { AxiosInstance } from 'contentful-sdk-core'
import { CollectionProp } from '../../../common-types'
import { SpaceMemberProps } from '../../../entities/space-member'
import { GetSpaceParams, QueryParams } from '../../../plain/common-types'
import * as raw from './raw'

export const get = (http: AxiosInstance, params: GetSpaceParams & { spaceMemberId: string }) =>
  raw.get<SpaceMemberProps>(http, `/spaces/${params.spaceId}/space_members/${params.spaceMemberId}`)

export const getMany = (http: AxiosInstance, params: GetSpaceParams & QueryParams) =>
  raw.get<CollectionProp<SpaceMemberProps>>(http, `/spaces/${params.spaceId}/space_members`, {
    params: params.query,
  })
