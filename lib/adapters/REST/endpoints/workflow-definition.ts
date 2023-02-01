import { AxiosInstance, AxiosRequestHeaders } from 'axios'
import copy from 'fast-copy'
import { SetOptional } from 'type-fest'
import {
  CollectionProp,
  GetSpaceEnvironmentParams,
  GetWorkflowDefinitionParams,
} from '../../../common-types'
import {
  CreateWorkflowDefinitionParams,
  CreateWorkflowDefinitionProps,
  DeleteWorkflowDefinitionParams,
  UpdateWorkflowDefinitionProps,
  WorkflowDefinitionProps,
  WorkflowDefinitionQueryOptions,
} from '../../../entities/workflow-definition'
import { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/workflow_definitions`
const getWorkflowDefinitionUrl = (params: GetWorkflowDefinitionParams) =>
  `${getBaseUrl(params)}/${params.workflowDefinitionId}`

export const get: RestEndpoint<'WorkflowDefinition', 'get'> = (
  http: AxiosInstance,
  params: GetWorkflowDefinitionParams,
  headers?: AxiosRequestHeaders
) =>
  raw.get<WorkflowDefinitionProps>(http, getWorkflowDefinitionUrl(params), {
    headers,
  })

export const getMany: RestEndpoint<'WorkflowDefinition', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query?: WorkflowDefinitionQueryOptions },
  headers?: AxiosRequestHeaders
) =>
  raw.get<CollectionProp<WorkflowDefinitionProps>>(http, getBaseUrl(params), {
    headers,
    params: params.query,
  })

export const create: RestEndpoint<'WorkflowDefinition', 'create'> = (
  http: AxiosInstance,
  params: CreateWorkflowDefinitionParams,
  rawData: CreateWorkflowDefinitionProps,
  headers?: AxiosRequestHeaders
) => {
  const data = copy(rawData)
  return raw.post<WorkflowDefinitionProps>(http, getBaseUrl(params), data, {
    headers,
  })
}

export const update: RestEndpoint<'WorkflowDefinition', 'update'> = (
  http: AxiosInstance,
  params: GetWorkflowDefinitionParams,
  rawData: UpdateWorkflowDefinitionProps,
  headers?: AxiosRequestHeaders
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys

  return raw.put<WorkflowDefinitionProps>(http, getWorkflowDefinitionUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del: RestEndpoint<'WorkflowDefinition', 'delete'> = (
  http: AxiosInstance,
  { version, ...params }: DeleteWorkflowDefinitionParams,
  headers?: AxiosRequestHeaders
) => {
  return raw.del(http, getWorkflowDefinitionUrl(params), {
    headers: { 'X-Contentful-Version': version, ...headers },
  })
}
