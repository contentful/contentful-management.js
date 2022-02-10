import { AxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { SetOptional } from 'type-fest'
import { CollectionProp, GetSpaceParams, QueryParams } from '../../../common-types'
import { SpaceProps } from '../../../entities/space'
import { RestEndpoint } from '../types'
import * as raw from './raw'

export const get: RestEndpoint<'Space', 'get'> = (http: AxiosInstance, params: GetSpaceParams) =>
  raw.get<SpaceProps>(http, `/spaces/${params.spaceId}`)

export const getMany: RestEndpoint<'Space', 'getMany'> = (
  http: AxiosInstance,
  params: QueryParams
) =>
  raw.get<CollectionProp<SpaceProps>>(http, `/spaces`, {
    params: params.query,
  })

export const create: RestEndpoint<'Space', 'create'> = (
  http: AxiosInstance,
  params: { organizationId?: string },
  payload: Omit<SpaceProps, 'sys'>,
  headers?: AxiosRequestHeaders
) => {
  return raw.post(http, `/spaces`, payload, {
    headers: params.organizationId
      ? { ...headers, 'X-Contentful-Organization': params.organizationId }
      : headers,
  })
}

export const update: RestEndpoint<'Space', 'update'> = (
  http: AxiosInstance,
  params: GetSpaceParams,
  rawData: SpaceProps,
  headers?: AxiosRequestHeaders
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys

  return raw.put<SpaceProps>(http, `/spaces/${params.spaceId}`, data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del: RestEndpoint<'Space', 'delete'> = (http: AxiosInstance, params: GetSpaceParams) =>
  raw.del(http, `/spaces/${params.spaceId}`)
