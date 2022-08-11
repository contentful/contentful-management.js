import { AxiosInstance, AxiosRequestHeaders } from 'axios'
import copy from 'fast-copy'
import { SetOptional } from 'type-fest'
import {
  CollectionProp,
  GetEntryParams,
  GetTaskParams,
  PaginationQueryOptions,
  QueryParams,
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

export const getMany: RestEndpoint<'Task', 'getMany'> = (
  http: AxiosInstance,
  params: GetEntryParams & QueryParams & PaginationQueryOptions
) =>
  raw.get<CollectionProp<TaskProps>>(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })

/**
 * @deprecated use `getMany` instead. `getAll` may never be removed for app compatibility reasons.
 */
export const getAll: RestEndpoint<'Task', 'getAll'> = getMany

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
  headers?: AxiosRequestHeaders
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
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
