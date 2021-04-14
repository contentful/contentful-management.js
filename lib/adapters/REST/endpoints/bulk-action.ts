/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosInstance } from 'contentful-sdk-core'
import { GetBulkActionParams, GetSpaceEnvironmentParams } from '../../../common-types'
import { BulkActionProps } from '../../../entities/bulk-action'
import { RestEndpoint } from '../types'
import * as raw from './raw'

export const get: RestEndpoint<'BulkAction', 'get'> = (
  http: AxiosInstance,
  params: GetBulkActionParams
) => {
  return raw.get<BulkActionProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/actions/${params.bulkActionId}`
  )
}

export const publish: RestEndpoint<'BulkAction', 'publish'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  payload: any
) => {
  return raw.post<BulkActionProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/publish`,
    payload
  )
}

export const unpublish: RestEndpoint<'BulkAction', 'unpublish'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  payload: any
) => {
  return raw.post<BulkActionProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/unpublish`,
    payload
  )
}

export const validate: RestEndpoint<'BulkAction', 'validate'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  payload: any
) => {
  return raw.post<BulkActionProps>(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/validate`,
    payload
  )
}
