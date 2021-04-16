/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosInstance } from 'contentful-sdk-core'
import { GetBulkActionParams, GetSpaceEnvironmentParams } from '../../../common-types'
import {
  BulkActionPayload,
  BulkActionProps,
  BulkActionPublishPayload,
  BulkActionUnpublishPayload,
  BulkActionValidatePayload,
} from '../../../entities/bulk-action'
import { RestEndpoint } from '../types'
import * as raw from './raw'

export const get: RestEndpoint<'BulkAction', 'get'> = (
  http: AxiosInstance,
  params: GetBulkActionParams
): Promise<BulkActionProps<BulkActionPayload>> => {
  return raw.get(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/actions/${params.bulkActionId}`
  )
}

export const publish: RestEndpoint<'BulkAction', 'publish'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  payload: BulkActionPublishPayload
): Promise<BulkActionProps<BulkActionPublishPayload>> => {
  return raw.post(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/publish`,
    payload
  )
}

export const unpublish: RestEndpoint<'BulkAction', 'unpublish'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  payload: BulkActionUnpublishPayload
): Promise<BulkActionProps<BulkActionUnpublishPayload>> => {
  return raw.post(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/unpublish`,
    payload
  )
}

export const validate: RestEndpoint<'BulkAction', 'validate'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  payload: BulkActionValidatePayload
): Promise<BulkActionProps<BulkActionValidatePayload>> => {
  return raw.post(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/validate`,
    payload
  )
}
