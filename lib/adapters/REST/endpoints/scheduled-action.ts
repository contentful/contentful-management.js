import type { AxiosInstance } from 'contentful-sdk-core'
import { CollectionProp, GetSpaceParams, QueryParams } from '../../../common-types'
import { ScheduledActionProps } from '../../../entities/scheduled-action'
import { RestEndpoint } from '../types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

export const getMany: RestEndpoint<'ScheduledAction', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceParams & QueryParams
) => {
  return raw.get<CollectionProp<ScheduledActionProps>>(
    http,
    `/spaces/${params.spaceId}/scheduled_actions`,
    {
      params: normalizeSelect(params.query),
    }
  )
}

export const create: RestEndpoint<'ScheduledAction', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceParams,
  data: Omit<ScheduledActionProps, 'sys'>
) => {
  return raw.post<ScheduledActionProps>(http, `/spaces/${params.spaceId}/scheduled_actions`, data)
}

export const del: RestEndpoint<'ScheduledAction', 'delete'> = (
  http: AxiosInstance,
  params: GetSpaceParams & { scheduledActionId: string }
) => {
  return raw.del(http, `/spaces/${params.spaceId}/scheduled_actions/${params.scheduledActionId}`)
}
