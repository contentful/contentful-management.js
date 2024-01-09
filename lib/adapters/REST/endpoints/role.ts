import { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { SetOptional } from 'type-fest'
import {
  CollectionProp,
  GetOrganizationParams,
  GetSpaceParams,
  QueryParams,
} from '../../../common-types'
import { CreateRoleProps, RoleProps } from '../../../entities/role'
import { RestEndpoint } from '../types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

export const get: RestEndpoint<'Role', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { roleId: string }
) => {
  return raw.get<RoleProps>(http, `/spaces/${params.spaceId}/roles/${params.roleId}`)
}

export const getMany: RestEndpoint<'Role', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceParams & QueryParams
) => {
  return raw.get<CollectionProp<RoleProps>>(http, `/spaces/${params.spaceId}/roles`, {
    params: normalizeSelect(params.query),
  })
}

export const getManyForOrganization: RestEndpoint<'Role', 'getManyForOrganization'> = (
  http: AxiosInstance,
  params: GetOrganizationParams & QueryParams
) => {
  return raw.get<CollectionProp<RoleProps>>(http, `/organizations/${params.organizationId}/roles`, {
    params: normalizeSelect(params.query),
  })
}

export const create: RestEndpoint<'Role', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceParams,
  data: CreateRoleProps,
  headers?: RawAxiosRequestHeaders
) => {
  return raw.post<RoleProps>(http, `/spaces/${params.spaceId}/roles`, data, {
    headers,
  })
}

export const createWithId: RestEndpoint<'Role', 'createWithId'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { roleId: string },
  data: CreateRoleProps,
  headers?: RawAxiosRequestHeaders
) => {
  return raw.put<RoleProps>(http, `/spaces/${params.spaceId}/roles/${params.roleId}`, data, {
    headers,
  })
}

export const update: RestEndpoint<'Role', 'update'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { roleId: string },
  rawData: RoleProps,
  headers?: RawAxiosRequestHeaders
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys
  return raw.put<RoleProps>(http, `/spaces/${params.spaceId}/roles/${params.roleId}`, data, {
    headers: {
      ...headers,
      'X-Contentful-Version': rawData.sys.version ?? 0,
    },
  })
}

export const del = (http: AxiosInstance, params: GetSpaceParams & { roleId: string }) => {
  return raw.del(http, `/spaces/${params.spaceId}/roles/${params.roleId}`)
}
