import type { AxiosInstance, RawAxiosRequestHeaders } from 'axios'
import type {
  CursorPaginatedCollectionProp,
  GetAutomationExecutionParams,
  GetSpaceEnvironmentParams,
} from '../../../common-types'
import type {
  AutomationExecutionByDefinitionQueryOptions,
  AutomationExecutionProps,
  AutomationExecutionQueryOptions,
} from '../../../entities/automation-execution'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/automation_executions`

const getAutomationExecutionUrl = (params: GetAutomationExecutionParams) =>
  `${getBaseUrl(params)}/${params.automationExecutionId}`

const getExecutionsByDefinitionUrl = (
  params: GetSpaceEnvironmentParams & { automationDefinitionId: string },
) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/automation_definitions/${params.automationDefinitionId}/automation_executions`

export const get: RestEndpoint<'AutomationExecution', 'get'> = (
  http: AxiosInstance,
  params: GetAutomationExecutionParams,
  headers?: RawAxiosRequestHeaders,
) =>
  raw.get<AutomationExecutionProps>(http, getAutomationExecutionUrl(params), {
    headers,
  })

export const getMany: RestEndpoint<'AutomationExecution', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query?: AutomationExecutionQueryOptions },
  headers?: RawAxiosRequestHeaders,
) =>
  raw.get<CursorPaginatedCollectionProp<AutomationExecutionProps>>(http, getBaseUrl(params), {
    headers,
    params: params.query,
  })

export const getForAutomationDefinition: RestEndpoint<
  'AutomationExecution',
  'getForAutomationDefinition'
> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & {
    automationDefinitionId: string
    query?: AutomationExecutionByDefinitionQueryOptions
  },
  headers?: RawAxiosRequestHeaders,
) =>
  raw.get<CursorPaginatedCollectionProp<AutomationExecutionProps>>(
    http,
    getExecutionsByDefinitionUrl(params),
    {
      headers,
      params: params.query,
    },
  )
