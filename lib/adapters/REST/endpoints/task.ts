import { AxiosInstance } from 'axios'
import copy from 'fast-copy'
import {
  CollectionProp,
  GetEntryParams,
  GetSpaceParams,
  GetTaskParams,
} from '../../../common-types'
import {
  CreateTaskParams,
  CreateTaskProps,
  DeleteTaskParams,
  TaskProps,
  UpdateTaskProps,
} from '../../../entities/task'
import { RestEndpoint } from '../types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

const getBaseUrl = (params: GetEntryParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/tasks`
const getTaskUrl = (params: GetTaskParams) => `${getBaseUrl(params)}/${params.taskId}`

export const get: RestEndpoint<'Task', 'get'> = (http: AxiosInstance, params: GetTaskParams) =>
  raw.get<TaskProps>(http, getTaskUrl(params))

export const getAll: RestEndpoint<'Task', 'getAll'> = (
  http: AxiosInstance,
  params: GetEntryParams
) => raw.get<CollectionProp<TaskProps>>(http, getBaseUrl(params))

export const getAllForSpaceAndUser: RestEndpoint<'Task', 'getAllForSpaceAndUser'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { userId: string; includeTeams: boolean }
) =>
  raw.get<CollectionProp<TaskProps>>(http, `/spaces/${params.spaceId}/tasks`, {
    params: normalizeSelect({
      'assignedTo.sys.id': params.userId,
      includeTeams: params.includeTeams,
    }),
  })

export const create: RestEndpoint<'Task', 'create'> = (
  http: AxiosInstance,
  params: CreateTaskParams,
  rawData: CreateTaskProps
) => {
  const data = copy(rawData)
  return raw.post<TaskProps>(http, getBaseUrl(params), data)
}

export const update: RestEndpoint<'Task', 'update'> = (
  http: AxiosInstance,
  params: GetTaskParams,
  rawData: UpdateTaskProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)
  delete data.sys

  return raw.put<TaskProps>(http, getTaskUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del: RestEndpoint<'Task', 'delete'> = (
  http: AxiosInstance,
  { version, ...params }: DeleteTaskParams
) => {
  return raw.del(http, getTaskUrl(params), { headers: { 'X-Contentful-Version': version } })
}
