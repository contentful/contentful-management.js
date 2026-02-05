import type { AxiosInstance, RawAxiosRequestHeaders } from 'axios'
import type {
  CollectionProp,
  GetAutomationExecutionParams,
  GetSpaceEnvironmentParams,
} from '../../../common-types'
import type {
  AutomationExecutionProps,
  AutomationExecutionQueryOptions,
} from '../../../entities/automation-execution'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/automation_executions`

const getAutomationExecutionUrl = (params: GetAutomationExecutionParams) =>
  `${getBaseUrl(params)}/${params.automationExecutionId}`

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
  raw.get<CollectionProp<AutomationExecutionProps>>(http, getBaseUrl(params), {
    headers,
    params: params.query,
  })
