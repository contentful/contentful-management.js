import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import copy from 'fast-copy'
import { EditorInterfaceProps } from '../../entities/editor-interface'
import { CollectionProp, GetSpaceEnvironmentParams, QueryParams } from './common-types'

type GetEditorInterfaceParams = GetSpaceEnvironmentParams & { contentTypeId: string }

const getBaseUrl = (params: GetEditorInterfaceParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/content_types/${params.contentTypeId}/editor_interface`

export const get = (http: AxiosInstance, params: GetEditorInterfaceParams) => {
  return raw.get<EditorInterfaceProps>(http, getBaseUrl(params))
}

export const getMany = (http: AxiosInstance, params: GetSpaceEnvironmentParams & QueryParams) => {
  return raw.get<CollectionProp<EditorInterfaceProps>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/editor_interfaces`
  )
}

export const update = (
  http: AxiosInstance,
  params: GetEditorInterfaceParams,
  rawData: EditorInterfaceProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)
  delete data.sys

  return raw.put<EditorInterfaceProps>(http, getBaseUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}
