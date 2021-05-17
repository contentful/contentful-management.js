import type { AxiosInstance } from 'contentful-sdk-core'
import { CollectionProp, GetSpaceEnvironmentParams, QueryParams } from '../../../common-types'
import { ScheduledActionProps } from '../../../entities/scheduled-action'
import { RestEndpoint } from '../types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

const getMany: RestEndpoint<'ScheduledAction', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & QueryParams
) => {
  return raw.get<CollectionProp<ScheduledActionProps>>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/scheduled_actions`,
    {
      params: normalizeSelect(params.query),
    }
  )
}

const create: RestEndpoint<'ScheduledAction', 'create'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  data: Omit<ScheduledActionProps, 'sys'>
) => {
  return raw.post<ScheduledActionProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/scheduled_actions`,
    data
  )
}

const del: RestEndpoint<'ScheduledAction', 'delete'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams & { scheduledActionId: string }
) => {
  return raw.del(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/scheduled_actions/${params.scheduledActionId}`
  )
}

export { getMany, create, del }
