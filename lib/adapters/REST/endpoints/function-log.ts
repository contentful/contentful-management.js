import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw.js'
import type {
  CollectionProp,
  GetFunctionLogParams,
  GetManyFunctionLogParams,
} from '../../../common-types.js'
import type { RestEndpoint } from '../types.js'
import type { FunctionLogProps } from '../../../entities/function-log.js'

const FunctionLogAlphaHeaders = {
  'x-contentful-enable-alpha-feature': 'function-logs',
}

const baseURL = (params: GetManyFunctionLogParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations/${params.appInstallationId}/functions/${params.functionId}/logs`

const getURL = (params: GetFunctionLogParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations/${params.appInstallationId}/functions/${params.functionId}/logs/${params.logId}`

export const get: RestEndpoint<'FunctionLog', 'get'> = (
  http: AxiosInstance,
  params: GetFunctionLogParams
) => {
  return raw.get<FunctionLogProps>(http, getURL(params), {
    headers: {
      ...FunctionLogAlphaHeaders,
    },
  })
}

export const getMany: RestEndpoint<'FunctionLog', 'getMany'> = (
  http: AxiosInstance,
  params: GetManyFunctionLogParams
) => {
  return raw.get<CollectionProp<FunctionLogProps>>(http, baseURL(params), {
    params: params.query,
    headers: {
      ...FunctionLogAlphaHeaders,
    },
  })
}
