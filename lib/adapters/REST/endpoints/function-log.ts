import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import type {
  CollectionProp,
  GetFunctionLogParams,
  GetAllFunctionLogParams,
} from '../../../common-types'
import type { RestEndpoint } from '../types'
import type { FunctionLogProps } from '../../../entities/function-log'

const FunctionLogAlphaHeaders = {
  'x-contentful-enable-alpha-feature': 'function-logs',
}

const baseURL = (params: GetAllFunctionLogParams) =>
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
  params: GetAllFunctionLogParams
) => {
  return raw.get<CollectionProp<FunctionLogProps>>(http, baseURL(params), {
    params: params.query,
    headers: {
      ...FunctionLogAlphaHeaders,
    },
  })
}
