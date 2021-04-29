import type { AxiosInstance } from 'contentful-sdk-core'
import {
  CollectionProp,
  GetOrganizationParams,
  GetSpaceParams,
  QueryParams,
} from '../../../common-types'
import { UserProps } from '../../../entities/user'
import { RestEndpoint } from '../types'
import * as raw from './raw'

export const getForSpace: RestEndpoint<'User', 'getForSpace'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { userId: string }
) => {
  return raw.get<UserProps>(http, `/spaces/${params.spaceId}/users/${params.userId}`)
}

export const getCurrent: RestEndpoint<'User', 'getCurrent'> = <T = UserProps>(
  http: AxiosInstance,
  params?: QueryParams
) => raw.get<T>(http, `/users/me`, { params: params?.query })

export const getManyForSpace: RestEndpoint<'User', 'getManyForSpace'> = (
  http: AxiosInstance,
  params: GetSpaceParams & QueryParams
) => {
  return raw.get<CollectionProp<UserProps>>(http, `/spaces/${params.spaceId}/users`, {
    params: params.query,
  })
}

export const getForOrganization: RestEndpoint<'User', 'getForOrganization'> = (
  http: AxiosInstance,
  params: GetOrganizationParams & { userId: string }
) => {
  return raw.get<UserProps>(http, `/organizations/${params.organizationId}/users/${params.userId}`)
}

export const getManyForOrganization: RestEndpoint<'User', 'getManyForOrganization'> = (
  http: AxiosInstance,
  params: GetOrganizationParams & QueryParams
) => {
  return raw.get<CollectionProp<UserProps>>(http, `/organizations/${params.organizationId}/users`, {
    params: params.query,
  })
}
