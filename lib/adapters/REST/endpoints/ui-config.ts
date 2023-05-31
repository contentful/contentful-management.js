import type { AxiosInstance } from 'contentful-sdk-core'
import { SetOptional } from 'type-fest'
import { GetUIConfigParams } from '../../../common-types'
import { UIConfigProps } from '../../../entities/ui-config'
import { RestEndpoint } from '../types'
import * as raw from './raw'
import copy from 'fast-copy'

const getUrl = (params: GetUIConfigParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/ui_config`

export const get: RestEndpoint<'UIConfig', 'get'> = (
  http: AxiosInstance,
  params: GetUIConfigParams
) => {
  return raw.get<UIConfigProps>(http, getUrl(params))
}

export const update: RestEndpoint<'UIConfig', 'update'> = (
  http: AxiosInstance,
  params: GetUIConfigParams,
  rawData: UIConfigProps
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys
  return raw.put<UIConfigProps>(http, getUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
    },
  })
}
