import { AxiosInstance } from 'axios'
import * as raw from './raw'
import cloneDeep from 'lodash/cloneDeep'
import {
  EnvironmentAliasProps,
  CreateEnvironmentAliasProps,
} from '../../entities/environment-alias'
import { CollectionProp, PaginationQueryParams, GetSpaceParams } from './common-types'

type GetSpaceEnvAliasParams = GetSpaceParams & { environmentAliasId: string }

export const get = (http: AxiosInstance, params: GetSpaceEnvAliasParams) => {
  return raw.get<EnvironmentAliasProps>(
    http,
    `/spaces/${params.spaceId}/environment_aliases/${params.environmentAliasId}`
  )
}

export const getMany = (http: AxiosInstance, params: GetSpaceParams & PaginationQueryParams) => {
  return raw.get<CollectionProp<EnvironmentAliasProps>>(
    http,
    `/spaces/${params.spaceId}/environment_aliases`,
    {
      params: params.query,
    }
  )
}

export const createWithId = (
  http: AxiosInstance,
  params: GetSpaceEnvAliasParams,
  rawData: CreateEnvironmentAliasProps,
  headers?: Record<string, unknown>
) => {
  const data = cloneDeep(rawData)
  return raw.put<EnvironmentAliasProps>(
    http,
    `/spaces/${params.spaceId}/environment_aliases/${params.environmentAliasId}`,
    data,
    {
      headers: headers,
    }
  )
}

export const update = (
  http: AxiosInstance,
  params: GetSpaceEnvAliasParams,
  rawData: EnvironmentAliasProps,
  headers?: Record<string, unknown>
) => {
  const data = cloneDeep(rawData)
  delete data.sys
  return raw.put<EnvironmentAliasProps>(
    http,
    `/spaces/${params.spaceId}/environment_aliases/${params.environmentAliasId}`,
    data,
    {
      headers: {
        ...headers,
        'X-Contentful-Version': rawData.sys.version ?? 0,
      },
    }
  )
}

export const del = (http: AxiosInstance, params: GetSpaceEnvAliasParams) => {
  return raw.del(http, `/spaces/${params.spaceId}/environment_aliases/${params.environmentAliasId}`)
}
