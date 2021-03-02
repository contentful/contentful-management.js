import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import { SpaceProps } from '../../../entities/space'
import copy from 'fast-copy'
import { GetSpaceParams, QueryParams } from '../../../plain/common-types'
import { CollectionProp } from '../../../common-types'

export const get = (http: AxiosInstance, params: GetSpaceParams) =>
  raw.get<SpaceProps>(http, `/spaces/${params.spaceId}`)

export const getMany = (http: AxiosInstance, params: QueryParams) =>
  raw.get<CollectionProp<SpaceProps>>(http, `/spaces`, {
    params: params.query,
  })

export const create = (
  http: AxiosInstance,
  params: { organizationId?: string },
  payload: Omit<SpaceProps, 'sys'>,
  headers?: Record<string, unknown>
) => {
  return raw.post(http, `/spaces`, payload, {
    headers: params.organizationId
      ? { ...headers, 'X-Contentful-Organization': params.organizationId }
      : headers,
  })
}

export const update = (
  http: AxiosInstance,
  params: GetSpaceParams,
  payload: SpaceProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(payload)
  delete data.sys

  return raw.put<SpaceProps>(http, `/spaces/${params.spaceId}`, data, {
    headers: {
      'X-Contentful-Version': payload.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del = (http: AxiosInstance, params: GetSpaceParams) =>
  raw.del(http, `/spaces/${params.spaceId}`)
