import type { AxiosInstance, RawAxiosRequestHeaders } from 'axios'
import copy from 'fast-copy'
import type { SetOptional } from 'type-fest'
import type {
  CollectionProp,
  GetEntryParams,
  GetSpaceEnvironmentParams,
  GetTaskParentEntityParams,
  GetTaskParams,
  PaginationQueryOptions,
  QueryParams,
} from '../../../common-types'
import type {
  CreateTaskParams,
  CreateTaskProps,
  DeleteTaskParams,
  TaskParentEntityPath,
  TaskParentEntityType,
  TaskProps,
  UpdateTaskProps,
} from '../../../entities/task'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

const getSpaceEnvBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}`

function getParentPlural(parentEntityType: TaskParentEntityType): TaskParentEntityPath {
  switch (parentEntityType) {
    case 'Entry':
      return 'entries'
    case 'Experience':
      return 'experiences'
    case 'Fragment':
      return 'fragments'
    case 'Template':
      return 'templates'
    case 'ComponentType':
      return 'component_types'
  }
}

const normalizeTaskParentParams = (
  paramsOrg: GetEntryParams | GetTaskParentEntityParams,
): GetTaskParentEntityParams =>
  'entryId' in paramsOrg
    ? {
        spaceId: paramsOrg.spaceId,
        environmentId: paramsOrg.environmentId,
        parentEntityType: 'Entry' as const,
        parentEntityId: paramsOrg.entryId,
      }
    : paramsOrg

const getBaseUrl = (paramsOrg: GetEntryParams | GetTaskParentEntityParams) => {
  const params = normalizeTaskParentParams(paramsOrg)
  const parentPlural = getParentPlural(params.parentEntityType)

  return `${getSpaceEnvBaseUrl(params)}/${parentPlural}/${params.parentEntityId}/tasks`
}
const getTaskUrl = (params: GetTaskParams) => `${getBaseUrl(params)}/${params.taskId}`

export const get: RestEndpoint<'Task', 'get'> = (http: AxiosInstance, params: GetTaskParams) =>
  raw.get<TaskProps>(http, getTaskUrl(params))

export const getMany: RestEndpoint<'Task', 'getMany'> = (
  http: AxiosInstance,
  params: (GetEntryParams | GetTaskParentEntityParams) & QueryParams & PaginationQueryOptions,
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
  rawData: CreateTaskProps,
) => {
  const data = copy(rawData)
  return raw.post<TaskProps>(http, getBaseUrl(params), data)
}

export const update: RestEndpoint<'Task', 'update'> = (
  http: AxiosInstance,
  params: GetTaskParams,
  rawData: UpdateTaskProps,
  headers?: RawAxiosRequestHeaders,
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
  { version, ...params }: DeleteTaskParams,
) => {
  return raw.del(http, getTaskUrl(params), { headers: { 'X-Contentful-Version': version } })
}
