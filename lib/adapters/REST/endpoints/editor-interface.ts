import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { SetOptional } from 'type-fest'
import {
  CollectionProp,
  GetEditorInterfaceParams,
  GetSpaceEnvironmentParams,
  QueryParams,
} from '../../../common-types'
import { EditorInterfaceProps } from '../../../entities/editor-interface'
import { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetEditorInterfaceParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/content_types/${params.contentTypeId}/editor_interface`

export const get: RestEndpoint<'EditorInterface', 'get'> = (
  http: AxiosInstance,
  params: GetEditorInterfaceParams
) => {
  return raw.get<EditorInterfaceProps>(http, getBaseUrl(params))
}

export const getMany: RestEndpoint<'EditorInterface', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & QueryParams
) => {
  return raw.get<CollectionProp<EditorInterfaceProps>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/editor_interfaces`
  )
}

export const update: RestEndpoint<'EditorInterface', 'update'> = (
  http: AxiosInstance,
  params: GetEditorInterfaceParams,
  rawData: EditorInterfaceProps,
  headers?: Record<string, unknown>
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys

  return raw.put<EditorInterfaceProps>(http, getBaseUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}
