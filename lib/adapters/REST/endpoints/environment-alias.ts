import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import copy from 'fast-copy'
import { GetSpaceParams, PaginationQueryParams } from '../../../plain/common-types'
import {
  CreateEnvironmentAliasProps,
  EnvironmentAliasProps,
} from '../../../entities/environment-alias'
import { CollectionProp } from '../../../common-types'

export type GetSpaceEnvAliasParams = GetSpaceParams & { environmentAliasId: string }

/**
 * Urls
 */

const getBaseUrl = (params: GetSpaceParams) => `/spaces/${params.spaceId}/environment_aliases`

const getEnvironmentAliasUrl = (params: GetSpaceEnvAliasParams) =>
  getBaseUrl(params) + `/${params.environmentAliasId}`

/**
 * Endpoints
 */

export const get = (http: AxiosInstance, params: GetSpaceEnvAliasParams) => {
  return raw.get<EnvironmentAliasProps>(http, getEnvironmentAliasUrl(params))
}

export const getMany = (http: AxiosInstance, params: GetSpaceParams & PaginationQueryParams) => {
  return raw.get<CollectionProp<EnvironmentAliasProps>>(http, getBaseUrl(params), {
    params: params.query,
  })
}

export const createWithId = (
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

export const update = (
  http: AxiosInstance,
  params: GetSpaceEnvAliasParams,
  rawData: EnvironmentAliasProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)
  delete data.sys
  return raw.put<EnvironmentAliasProps>(http, getEnvironmentAliasUrl(params), data, {
    headers: {
      ...headers,
      'X-Contentful-Version': rawData.sys.version ?? 0,
    },
  })
}

export const del = (http: AxiosInstance, params: GetSpaceEnvAliasParams) => {
  return raw.del(http, getEnvironmentAliasUrl(params))
}
