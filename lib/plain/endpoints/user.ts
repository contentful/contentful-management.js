import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import { CollectionProp, QueryParams, GetSpaceParams, GetOrganizationParams } from './common-types'
import { UserProps } from '../../entities/user'

export const getForSpace = (http: AxiosInstance, params: GetSpaceParams & { userId: string }) => {
  return raw.get<UserProps>(http, `/spaces/${params.spaceId}/users/${params.userId}`)
}

export const getCurrent = <T = UserProps>(http: AxiosInstance, params?: QueryParams) =>
  raw.get<T>(http, `/users/me`, { params: params?.query })

export const getManyForSpace = (http: AxiosInstance, params: GetSpaceParams & QueryParams) => {
  return raw.get<CollectionProp<UserProps>>(http, `/spaces/${params.spaceId}/users`, {
    params: params.query,
  })
}

export const getForOrganization = (
  http: AxiosInstance,
  params: GetOrganizationParams & { userId: string }
) => {
  return raw.get<UserProps>(http, `/organizations/${params.organizationId}/users/${params.userId}`)
}

export const getManyForOrganization = (
  http: AxiosInstance,
  params: GetOrganizationParams & QueryParams
) => {
  return raw.get<CollectionProp<UserProps>>(http, `/organizations/${params.organizationId}/users`, {
    params: params.query,
  })
}
