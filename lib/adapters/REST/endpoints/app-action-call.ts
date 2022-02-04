import type { AxiosInstance } from 'contentful-sdk-core'
import { CreateAppActionCallProps, AppActionCallProps } from '../../../entities/app-action-call'
import * as raw from './raw'
import { RestEndpoint } from '../types'
import { GetAppActionCallParams } from '../../../common-types'

export const create: RestEndpoint<'AppActionCall', 'create'> = (
  http: AxiosInstance,
  params: GetAppActionCallParams,
  data: CreateAppActionCallProps
) => {
  return raw.post<AppActionCallProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations/${params.appDefinitionId}/actions/${params.appActionId}/calls`,
    data
  )
}
