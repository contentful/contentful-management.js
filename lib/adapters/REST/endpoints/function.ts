import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw.js'
import type {
  CollectionProp,
  GetFunctionForEnvParams,
  GetFunctionParams,
  GetManyFunctionParams,
} from '../../../common-types.js'
import type { RestEndpoint } from '../types.js'
import type { FunctionProps } from '../../../entities/function.js'

// Base URL
const getManyUrl = (params: GetManyFunctionParams) =>
  `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/functions`

const getFunctionUrl = (params: GetFunctionParams) => `${getManyUrl(params)}/${params.functionId}`

const getFunctionsEnvURL = (params: GetFunctionForEnvParams) => {
  return `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations/${params.appInstallationId}/functions`
}

export const get: RestEndpoint<'Function', 'get'> = (
  http: AxiosInstance,
  params: GetFunctionParams,
) => {
  return raw.get<FunctionProps>(http, getFunctionUrl(params))
}

export const getMany: RestEndpoint<'Function', 'getMany'> = (
  http: AxiosInstance,
  params: GetManyFunctionParams,
) => {
  return raw.get<CollectionProp<FunctionProps>>(http, getManyUrl(params), { params: params.query })
}

export const getManyForEnvironment: RestEndpoint<'Function', 'getManyForEnvironment'> = (
  http: AxiosInstance,
  params: GetFunctionForEnvParams,
) => {
  return raw.get<CollectionProp<FunctionProps>>(http, getFunctionsEnvURL(params), {
    params: params.query,
  })
}
