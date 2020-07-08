import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { CollectionProp, QueryParams } from './common-types'
import { UserProps } from '../../entities/user'
import { GetSpaceParams } from './space'

export const getForSpace = (http: AxiosInstance, params: GetSpaceParams & { userId: string }) => {
  return raw.get<UserProps>(http, `/spaces/${params.spaceId}/users/${params.userId}`)
}

export const getCurrent = (http: AxiosInstance) => raw.get<UserProps>(http, `/users/me`)

export const getManyForSpace = (http: AxiosInstance, params: GetSpaceParams & QueryParams) => {
  return raw.get<CollectionProp<UserProps>>(http, `/spaces/${params.spaceId}/users`, {
    params: params.query,
  })
}
