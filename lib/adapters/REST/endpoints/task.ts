import { AxiosInstance, AxiosRequestHeaders } from 'axios'
import copy from 'fast-copy'
import { SetOptional } from 'type-fest'
import {
  CollectionProp,
  GetEntryParams,
  GetSnapshotForEntryParams,
  GetTaskParams,
  KeyValueMap,
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
import { SnapshotProps } from '../../../entities/snapshot'
import { EntryProps } from '../../../entities/entry'
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

export const getManyForEntry: RestEndpoint<'Task', 'getManyForEntry'> = <
  T extends KeyValueMap = KeyValueMap
>(
  http: AxiosInstance,
  params: GetEntryParams & QueryParams
) => {
  return raw.get<CollectionProp<TaskProps>>(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })
}

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
