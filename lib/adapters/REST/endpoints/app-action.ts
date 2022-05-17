import { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import { normalizeSelect } from './utils'
import {
  CollectionProp,
  GetAppActionCallParams,
  GetAppActionParams,
  GetAppDefinitionParams,
  GetSpaceEnvironmentParams,
  GetSpaceParams,
  QueryParams,
} from '../../../common-types'
import { RestEndpoint } from '../types'
import { AppActionProps, CreateAppActionProps } from '../../../entities/app-action'

const getBaseUrl = (params: GetAppDefinitionParams) =>
  `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/actions`

const getAppActionUrl = (params: GetAppActionParams) =>
  `${getBaseUrl(params)}/${params.appActionId}`

const getAppActionsEnvUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/actions`

export const get: RestEndpoint<'AppAction', 'get'> = (
  http: AxiosInstance,
  params: GetAppActionParams
) => {
  return raw.get<AppActionProps>(http, getAppActionUrl(params))
}

export const getMany: RestEndpoint<'AppAction', 'getMany'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams & QueryParams
) => {
  return raw.get<CollectionProp<AppActionProps>>(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const getManyForEnvironment: RestEndpoint<'AppAction', 'getManyForEnvironment'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & QueryParams
) => {
  return raw.get<CollectionProp<AppActionProps>>(http, getAppActionsEnvUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const del: RestEndpoint<'AppAction', 'delete'> = (
  http: AxiosInstance,
  params: GetAppActionParams
) => {
  return raw.del<void>(http, getAppActionUrl(params))
}

export const create: RestEndpoint<'AppAction', 'create'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams,
  data: CreateAppActionProps
) => {
  return raw.post<AppActionProps>(http, getBaseUrl(params), data)
}

export const update: RestEndpoint<'AppAction', 'update'> = (
  http: AxiosInstance,
  params: GetAppActionParams,
  data: CreateAppActionProps
) => {
  return raw.put<AppActionProps>(http, getAppActionUrl(params), data)
}
