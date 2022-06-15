import { AxiosInstance, AxiosRequestHeaders } from 'axios'
import copy from 'fast-copy'
import { SetOptional } from 'type-fest'
import { CollectionProp, GetSpaceEnvironmentParams, GetWorkflowParams } from '../../../common-types'
import {
  CompleteWorkflowParams,
  CreateWorkflowParams,
  CreateWorkflowProps,
  DeleteWorkflowParams,
  UpdateWorkflowParams,
  UpdateWorkflowProps,
  WorkflowProps,
  WorkflowQueryOptions,
} from '../../../entities/workflow'
import { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/workflows`

const getWorkflowUrl = (params: GetWorkflowParams) => `${getBaseUrl(params)}/${params.workflowId}`

const completeWorkflowUrl = (params: GetWorkflowParams) => `${getWorkflowUrl(params)}/complete`

export const getMany: RestEndpoint<'Workflow', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { query?: WorkflowQueryOptions },
  headers?: AxiosRequestHeaders
) =>
  raw.get<CollectionProp<WorkflowProps>>(http, getBaseUrl(params), {
    headers,
    params: params.query,
  })

export const create: RestEndpoint<'Workflow', 'create'> = (
  http: AxiosInstance,
  params: CreateWorkflowParams,
  rawData: CreateWorkflowProps,
  headers?: AxiosRequestHeaders
) => {
  const data = copy(rawData)
  return raw.post<WorkflowProps>(http, getBaseUrl(params), data, {
    headers,
  })
}

export const update: RestEndpoint<'Workflow', 'update'> = (
  http: AxiosInstance,
  params: UpdateWorkflowParams,
  rawData: UpdateWorkflowProps,
  headers?: AxiosRequestHeaders
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys

  return raw.put<WorkflowProps>(http, getWorkflowUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del: RestEndpoint<'Workflow', 'delete'> = (
  http: AxiosInstance,
  { version, ...params }: DeleteWorkflowParams,
  headers?: AxiosRequestHeaders
) => {
  return raw.del(http, getWorkflowUrl(params), {
    headers: { 'X-Contentful-Version': version, ...headers },
  })
}

export const complete: RestEndpoint<'Workflow', 'complete'> = (
  http: AxiosInstance,
  { version, ...params }: CompleteWorkflowParams,
  headers?: AxiosRequestHeaders
) => {
  return raw.put(http, completeWorkflowUrl(params), null, {
    headers: { 'X-Contentful-Version': version, ...headers },
  })
}
