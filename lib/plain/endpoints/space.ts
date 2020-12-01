import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import { SpaceProps } from '../../entities/space'
import cloneDeep from 'lodash/cloneDeep'
import { CollectionProp, QueryParams, GetSpaceParams } from './common-types'

export const get = (http: AxiosInstance, params: GetSpaceParams) =>
  raw.get<SpaceProps>(http, `/spaces/${params.spaceId}`)

export const getMany = (http: AxiosInstance, params: QueryParams) =>
  raw.get<CollectionProp<SpaceProps>>(http, `/spaces`, {
    params: params.query,
  })

export const create = (
  http: AxiosInstance,
  params: { organizationId?: string },
  rawData: Omit<SpaceProps, 'sys'>,
  headers?: Record<string, unknown>
) => {
  return raw.post(http, `/spaces`, rawData, {
    headers: params.organizationId
      ? { ...headers, 'X-Contentful-Organization': params.organizationId }
      : headers,
  })
}

export const update = (
  http: AxiosInstance,
  params: GetSpaceParams,
  rawData: SpaceProps,
  headers?: Record<string, unknown>
) => {
  const data = cloneDeep(rawData)
  delete data.sys

  return raw.put<SpaceProps>(http, `/spaces/${params.spaceId}`, data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del = (http: AxiosInstance, params: GetSpaceParams) =>
  raw.del(http, `/spaces/${params.spaceId}`)
