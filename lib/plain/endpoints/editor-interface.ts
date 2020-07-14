import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { EnvironmentProps } from '../../entities/environment'
import cloneDeep from 'lodash/cloneDeep'
import { EditorInterfaceProps } from '../../entities/editor-interface'
import { GetSpaceParams, GetEnvironmentParams } from './common-types'

type GetEditorInterfaceParams = GetSpaceParams & GetEnvironmentParams & { contentTypeId: string }

const getBaseUrl = (params: GetEditorInterfaceParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/content_types/${params.contentTypeId}/editor_interface`

export const get = (http: AxiosInstance, params: GetEditorInterfaceParams) => {
  return raw.get<EditorInterfaceProps>(http, getBaseUrl(params))
}

export const update = (
  http: AxiosInstance,
  params: GetEditorInterfaceParams,
  rawData: EditorInterfaceProps,
  headers?: Record<string, unknown>
) => {
  const data = cloneDeep(rawData)
  delete data.sys

  return raw.put<EnvironmentProps>(http, getBaseUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}
