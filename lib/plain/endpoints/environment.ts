import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import { EnvironmentProps, CreateEnvironmentProps } from '../../entities/environment'
import cloneDeep from 'lodash/cloneDeep'
import {
  CollectionProp,
  PaginationQueryParams,
  GetSpaceParams,
  GetSpaceEnvironmentParams,
} from './common-types'

export const get = (http: AxiosInstance, params: GetSpaceEnvironmentParams) => {
  return raw.get<EnvironmentProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}`
  )
}

export const getMany = (http: AxiosInstance, params: GetSpaceParams & PaginationQueryParams) => {
  return raw.get<CollectionProp<EnvironmentProps>>(http, `/spaces/${params.spaceId}/environments`, {
    params: params.query,
  })
}

export const update = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: EnvironmentProps,
  headers?: Record<string, unknown>
) => {
  const data = cloneDeep(rawData)
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

export const del = (http: AxiosInstance, params: GetSpaceEnvironmentParams) => {
  return raw.del(http, `/spaces/${params.spaceId}/environments/${params.environmentId}`)
}

export const create = (
  http: AxiosInstance,
  params: GetSpaceParams,
  rawData: CreateEnvironmentProps,
  headers?: Record<string, unknown>
) => {
  const data = cloneDeep(rawData)
  return raw.post<EnvironmentProps>(http, `/spaces/${params.spaceId}/environments`, data, {
    headers,
  })
}

export const createWithId = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { sourceEnvironmentId?: string },
  rawData: CreateEnvironmentProps,
  headers?: Record<string, unknown>
) => {
  const data = cloneDeep(rawData)
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
