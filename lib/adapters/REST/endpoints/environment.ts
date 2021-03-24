import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  CollectionProp,
  GetSpaceEnvironmentParams,
  GetSpaceParams,
  PaginationQueryParams,
} from '../../../common-types'
import { CreateEnvironmentProps, EnvironmentProps } from '../../../entities/environment'
import { RestEndpoint } from '../types'
import * as raw from './raw'

export const get: RestEndpoint<'Environment', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams
) => {
  return raw.get<EnvironmentProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}`
  )
}

export const getMany: RestEndpoint<'Environment', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceParams & PaginationQueryParams
) => {
  return raw.get<CollectionProp<EnvironmentProps>>(http, `/spaces/${params.spaceId}/environments`, {
    params: params.query,
  })
}

export const update: RestEndpoint<'Environment', 'update'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: EnvironmentProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)
  delete data.sys

  return raw.put<EnvironmentProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}`,
    data,
    {
      headers: {
        ...headers,
        'X-Contentful-Version': rawData.sys.version ?? 0,
      },
    }
  )
}

export const del: RestEndpoint<'Environment', 'delete'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams
) => {
  return raw.del(http, `/spaces/${params.spaceId}/environments/${params.environmentId}`)
}

export const create: RestEndpoint<'Environment', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceParams,
  rawData: CreateEnvironmentProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)
  return raw.post<EnvironmentProps>(http, `/spaces/${params.spaceId}/environments`, data, {
    headers,
  })
}

export const createWithId: RestEndpoint<'Environment', 'createWithId'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { sourceEnvironmentId?: string },
  rawData: CreateEnvironmentProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)
  return raw.put<EnvironmentProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}`,
    data,
    {
      headers: {
        ...headers,
        ...(params.sourceEnvironmentId
          ? {
              'X-Contentful-Source-Environment': params.sourceEnvironmentId,
            }
          : {}),
      },
    }
  )
}
