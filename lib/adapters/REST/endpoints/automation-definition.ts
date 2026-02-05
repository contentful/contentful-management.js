import type { AxiosInstance, RawAxiosRequestHeaders } from 'axios'
import copy from 'fast-copy'
import type { SetOptional } from 'type-fest'
import type {
  CursorPaginatedCollectionProp,
  GetAutomationDefinitionParams,
  GetSpaceEnvironmentParams,
} from '../../../common-types'
import type {
  AutomationDefinitionProps,
  AutomationDefinitionQueryOptions,
  CreateAutomationDefinitionProps,
  UpdateAutomationDefinitionProps,
} from '../../../entities/automation-definition'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/automation_definitions`

const getAutomationDefinitionUrl = (params: GetAutomationDefinitionParams) =>
  `${getBaseUrl(params)}/${params.automationDefinitionId}`

export const get: RestEndpoint<'AutomationDefinition', 'get'> = (
  http: AxiosInstance,
  params: GetAutomationDefinitionParams,
  headers?: RawAxiosRequestHeaders,
) =>
  raw.get<AutomationDefinitionProps>(http, getAutomationDefinitionUrl(params), {
    headers,
  })

export const getMany: RestEndpoint<'AutomationDefinition', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query?: AutomationDefinitionQueryOptions },
  headers?: RawAxiosRequestHeaders,
) =>
  raw.get<CursorPaginatedCollectionProp<AutomationDefinitionProps>>(http, getBaseUrl(params), {
    headers,
    params: params.query,
  })

export const create: RestEndpoint<'AutomationDefinition', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: CreateAutomationDefinitionProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data = copy(rawData)
  return raw.post<AutomationDefinitionProps>(http, getBaseUrl(params), data, {
    headers,
  })
}

export const update: RestEndpoint<'AutomationDefinition', 'update'> = (
  http: AxiosInstance,
  params: GetAutomationDefinitionParams,
  rawData: UpdateAutomationDefinitionProps,
  headers?: RawAxiosRequestHeaders,
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys

  return raw.put<AutomationDefinitionProps>(http, getAutomationDefinitionUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del: RestEndpoint<'AutomationDefinition', 'delete'> = (
  http: AxiosInstance,
  params: GetAutomationDefinitionParams & { version: number },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.del(http, getAutomationDefinitionUrl(params), {
    headers: { 'X-Contentful-Version': params.version, ...headers },
  })
}
