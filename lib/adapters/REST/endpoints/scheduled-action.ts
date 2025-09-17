import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  CollectionProp,
  GetSpaceEnvironmentParams,
  GetSpaceParams,
  QueryParams,
} from '../../../common-types.js'
import type { ScheduledActionProps } from '../../../entities/scheduled-action.js'
import type { RestEndpoint } from '../types.js'
import * as raw from './raw.js'
import { normalizeSelect } from './utils.js'

export const get: RestEndpoint<'ScheduledAction', 'get'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { environmentId: string; scheduledActionId: string },
) => {
  return raw.get<ScheduledActionProps>(
    http,
    `/spaces/${params.spaceId}/scheduled_actions/${params.scheduledActionId}`,
    {
      params: {
        'environment.sys.id': params.environmentId,
      },
    },
  )
}

export const getMany: RestEndpoint<'ScheduledAction', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceParams & QueryParams,
) => {
  return raw.get<CollectionProp<ScheduledActionProps>>(
    http,
    `/spaces/${params.spaceId}/scheduled_actions`,
    {
      params: normalizeSelect(params.query),
    },
  )
}

export const create: RestEndpoint<'ScheduledAction', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceParams,
  data: Omit<ScheduledActionProps, 'sys'>,
) => {
  return raw.post<ScheduledActionProps>(http, `/spaces/${params.spaceId}/scheduled_actions`, data)
}

export const del: RestEndpoint<'ScheduledAction', 'delete'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { scheduledActionId: string },
) => {
  return raw.del(http, `/spaces/${params.spaceId}/scheduled_actions/${params.scheduledActionId}`, {
    params: {
      'environment.sys.id': params.environmentId,
    },
  })
}

export const update: RestEndpoint<'ScheduledAction', 'update'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { scheduledActionId: string; version: number },
  data: Omit<ScheduledActionProps, 'sys'>,
) => {
  return raw.put(
    http,
    `/spaces/${params.spaceId}/scheduled_actions/${params.scheduledActionId}`,
    data,
    {
      params: {
        'environment.sys.id': data.environment?.sys.id,
      },
      headers: {
        'X-Contentful-Version': params.version,
      },
    },
  )
}
