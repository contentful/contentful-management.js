import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { SpaceProps } from '../../entities/space'
import cloneDeep from 'lodash/cloneDeep'

export type GetSpaceParams = { spaceId: string }

export const get = (http: AxiosInstance, params: GetSpaceParams) =>
  raw.get<SpaceProps>(http, `/spaces/${params.spaceId}`)

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
