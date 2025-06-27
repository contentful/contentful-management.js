import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { SetOptional } from 'type-fest'
import type { GetUserUIConfigParams } from '../../../common-types.js'
import type { UserUIConfigProps } from '../../../entities/user-ui-config.js'
import type { RestEndpoint } from '../types.js'
import * as raw from './raw.js'

const getUrl = (params: GetUserUIConfigParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/ui_config/me`

export const get: RestEndpoint<'UserUIConfig', 'get'> = (
  http: AxiosInstance,
  params: GetUserUIConfigParams
) => {
  return raw.get<UserUIConfigProps>(http, getUrl(params))
}

export const update: RestEndpoint<'UserUIConfig', 'update'> = (
  http: AxiosInstance,
  params: GetUserUIConfigParams,
  rawData: UserUIConfigProps
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys
  return raw.put<UserUIConfigProps>(http, getUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
    },
  })
}
