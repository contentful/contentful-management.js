import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { CollectionProp, GetSpaceParams } from '../../../common-types'
import { SpaceProps } from '../../../entities/space'
import { RestEndpoint } from '../types'
import * as raw from './raw'

export const get: RestEndpoint<'Space', 'get'> = (http, params) =>
  raw.get<SpaceProps>(http, `/spaces/${params.spaceId}`)

export const getMany: RestEndpoint<'Space', 'getMany'> = (http, params) =>
  raw.get<CollectionProp<SpaceProps>>(http, `/spaces`, {
    params: params.query,
  })

export const create: RestEndpoint<'Space', 'create'> = (
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

export const update: RestEndpoint<'Space', 'update'> = (
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

export const del: RestEndpoint<'Space', 'delete'> = (http: AxiosInstance, params: GetSpaceParams) =>
  raw.del(http, `/spaces/${params.spaceId}`)
