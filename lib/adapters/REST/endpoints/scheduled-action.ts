import type { AxiosInstance } from 'contentful-sdk-core'
import { CollectionProp } from '../../../common-types'
import { ScheduledActionProps } from '../../../entities/scheduled-action'
import { GetSpaceParams, QueryParams } from '../../../plain/common-types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

export const getMany = (http: AxiosInstance, params: GetSpaceParams & QueryParams) => {
  return raw.get<CollectionProp<ScheduledActionProps>>(
    http,
    `/spaces/${params.spaceId}/scheduled_actions`,
    {
      params: normalizeSelect(params.query),
    }
  )
}

export const create = (
  http: AxiosInstance,
  params: GetSpaceParams,
  data: Omit<ScheduledActionProps, 'sys'>
) => {
  return raw.post<ScheduledActionProps>(http, `/spaces/${params.spaceId}/scheduled_actions`, data)
}

export const del = (
  http: AxiosInstance,
  params: GetSpaceParams & { scheduledActionId: string }
) => {
  return raw.del(http, `/spaces/${params.spaceId}/scheduled_actions/${params.scheduledActionId}`)
}
