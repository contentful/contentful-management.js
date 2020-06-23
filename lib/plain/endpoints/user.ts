import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { CollectionProp, QueryParams } from './common-types'
import { UserProps } from '../../entities/user'
import { GetSpaceParams } from './space'

export type GetManyUsersParams = GetSpaceParams & QueryParams

export const getManyForSpace = (http: AxiosInstance, params: GetManyUsersParams) => {
  return raw.get<CollectionProp<UserProps>>(http, `/spaces/${params.spaceId}/users`, {
    params: params.query,
  })
}
