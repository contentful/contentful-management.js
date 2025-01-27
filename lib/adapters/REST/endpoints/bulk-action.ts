import type { AxiosInstance } from 'contentful-sdk-core'
import type { GetBulkActionParams, GetSpaceEnvironmentParams } from '../../../common-types'
import type {
  BulkActionProps,
  BulkActionPublishPayload,
  BulkActionUnpublishPayload,
  BulkActionValidatePayload,
  PublishBulkActionV2Payload,
  UnpublishBulkActionV2Payload,
  ValidateBulkActionV2Payload,
} from '../../../entities/bulk-action'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

export const get: RestEndpoint<'BulkAction', 'get'> = (
  http: AxiosInstance,
  params: GetBulkActionParams
) => {
  return raw.get(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/actions/${params.bulkActionId}`
  )
}

type PublishPayload = BulkActionPublishPayload | PublishBulkActionV2Payload<'add'>
type UnpublishPayload = BulkActionUnpublishPayload | UnpublishBulkActionV2Payload
type ValidatePayload = BulkActionValidatePayload | ValidateBulkActionV2Payload<'add'>

export async function publish(http: AxiosInstance, params: GetSpaceEnvironmentParams, payload: BulkActionPublishPayload): Promise<BulkActionProps<BulkActionPublishPayload>>
export async function publish(http: AxiosInstance, params: GetSpaceEnvironmentParams, payload: PublishBulkActionV2Payload<'add'>): Promise<BulkActionProps<PublishBulkActionV2Payload<'add'>>>
export async function publish(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  payload: PublishPayload,
): Promise<BulkActionProps<PublishPayload>> {
  const url = 'action' in payload && payload.action === 'publish'
    ? `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions`
    : `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/publish`

  return raw.post(http, url, payload)
}

export async function unpublish(http: AxiosInstance, params: GetSpaceEnvironmentParams, payload: BulkActionUnpublishPayload): Promise<BulkActionProps<BulkActionUnpublishPayload>>
export async function unpublish(http: AxiosInstance, params: GetSpaceEnvironmentParams, payload: UnpublishBulkActionV2Payload): Promise<BulkActionProps<UnpublishBulkActionV2Payload>>
export async function unpublish(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  payload: UnpublishPayload
): Promise<BulkActionProps<UnpublishPayload>> {
  const url = 'action' in payload && payload.action === 'unpublish'
    ? `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions`
    : `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/unpublish`

  return raw.post(http, url, payload)
}
export async function validate(http: AxiosInstance, params: GetSpaceEnvironmentParams, payload: BulkActionValidatePayload): Promise<BulkActionProps<BulkActionValidatePayload>>
export async function validate(http: AxiosInstance, params: GetSpaceEnvironmentParams, payload: ValidateBulkActionV2Payload<'add'>): Promise<BulkActionProps<ValidateBulkActionV2Payload<'add'>>>
export async function validate(
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  payload: ValidatePayload
): Promise<BulkActionProps<ValidatePayload>> {
  const url = 'action' in payload && payload.action === 'validate'
    ? `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions`
    : `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/validate`

  return raw.post(http, url, payload)
}
