import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { CollectionProp } from '../../../common-types'
import { CreateRoleProps, RoleProps } from '../../../entities/role'
import { GetSpaceParams, QueryParams } from '../../../plain/common-types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

export const get = (http: AxiosInstance, params: GetSpaceParams & { roleId: string }) => {
  return raw.get<RoleProps>(http, `/spaces/${params.spaceId}/roles/${params.roleId}`)
}

export const getMany = (http: AxiosInstance, params: GetSpaceParams & QueryParams) => {
  return raw.get<CollectionProp<RoleProps>>(http, `/spaces/${params.spaceId}/roles`, {
    params: normalizeSelect(params.query),
  })
}

export const create = (
  http: AxiosInstance,
  params: GetSpaceParams,
  data: CreateRoleProps,
  headers?: Record<string, unknown>
) => {
  return raw.post<RoleProps>(http, `/spaces/${params.spaceId}/roles`, data, {
    headers,
  })
}

export const createWithId = (
  http: AxiosInstance,
  params: GetSpaceParams & { roleId: string },
  data: CreateRoleProps,
  headers?: Record<string, unknown>
) => {
  return raw.put<RoleProps>(http, `/spaces/${params.spaceId}/roles/${params.roleId}`, data, {
    headers,
  })
}

export const update = (
  http: AxiosInstance,
  params: GetSpaceParams & { roleId: string },
  rawData: RoleProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)
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
