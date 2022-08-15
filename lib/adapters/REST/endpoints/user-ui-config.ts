import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { SetOptional } from 'type-fest'
import { GetUserUIConfigParams } from '../../../common-types'
import { UserUIConfigProps } from '../../../entities/user-ui-config'
import { RestEndpoint } from '../types'
import * as raw from './raw'

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
