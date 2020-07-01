import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { EnvironmentProps, CreateEnvironmentProps } from '../../entities/environment'
import cloneDeep from 'lodash/cloneDeep'
import { GetSpaceParams } from './space'
import { CollectionProp } from './common-types'

export type GetEnvironmentParams = GetSpaceParams & { environmentId: string }

export const get = (http: AxiosInstance, params: GetEnvironmentParams) => {
  return raw.get<EnvironmentProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}`
  )
}

export const getAll = (http: AxiosInstance, params: GetSpaceParams) => {
  return raw.get<CollectionProp<EnvironmentProps>>(http, `/spaces/${params.spaceId}/environments`)
}

export const update = (
  http: AxiosInstance,
  params: GetEnvironmentParams,
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
        'X-Contentful-Version': rawData.sys.version ?? 0,
        ...headers,
      },
    }
  )
}

export const del = (http: AxiosInstance, params: GetEnvironmentParams) => {
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
  params: GetEnvironmentParams,
  rawData: CreateEnvironmentProps,
  headers?: Record<string, unknown>
) => {
  const { spaceId, environmentId } = params
  return create(http, { spaceId }, rawData, {
    ...headers,
    'X-Contentful-Source-Environment': environmentId,
  })
}
