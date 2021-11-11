import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { SetOptional } from 'type-fest'
import {
  CollectionProp,
  GetSpaceEnvAliasParams,
  GetSpaceParams,
  PaginationQueryParams,
} from '../../../common-types'
import {
  CreateEnvironmentAliasProps,
  EnvironmentAliasProps,
} from '../../../entities/environment-alias'
import { RestEndpoint } from '../types'
import * as raw from './raw'

/**
 * Urls
 */

const getBaseUrl = (params: GetSpaceParams) => `/spaces/${params.spaceId}/environment_aliases`

const getEnvironmentAliasUrl = (params: GetSpaceEnvAliasParams) =>
  getBaseUrl(params) + `/${params.environmentAliasId}`

/**
 * Endpoints
 */

export const get: RestEndpoint<'EnvironmentAlias', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceEnvAliasParams
) => {
  return raw.get<EnvironmentAliasProps>(http, getEnvironmentAliasUrl(params))
}

export const getMany: RestEndpoint<'EnvironmentAlias', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceParams & PaginationQueryParams
) => {
  return raw.get<CollectionProp<EnvironmentAliasProps>>(http, getBaseUrl(params), {
    params: params.query,
  })
}

export const createWithId: RestEndpoint<'EnvironmentAlias', 'createWithId'> = (
  http: AxiosInstance,
  params: GetSpaceEnvAliasParams,
  rawData: CreateEnvironmentAliasProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)
  return raw.put<EnvironmentAliasProps>(http, getEnvironmentAliasUrl(params), data, {
    headers: headers,
  })
}

export const update: RestEndpoint<'EnvironmentAlias', 'update'> = (
  http: AxiosInstance,
  params: GetSpaceEnvAliasParams,
  rawData: EnvironmentAliasProps,
  headers?: Record<string, unknown>
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys
  return raw.put<EnvironmentAliasProps>(http, getEnvironmentAliasUrl(params), data, {
    headers: {
      ...headers,
      'X-Contentful-Version': rawData.sys.version ?? 0,
    },
  })
}

export const del: RestEndpoint<'EnvironmentAlias', 'delete'> = (
  http: AxiosInstance,
  params: GetSpaceEnvAliasParams
) => {
  return raw.del(http, getEnvironmentAliasUrl(params))
}
