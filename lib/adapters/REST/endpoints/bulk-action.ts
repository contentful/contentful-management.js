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
  params: GetBulkActionParams,
) => {
  return raw.get(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/actions/${params.bulkActionId}`,
  )
}

export const publish: RestEndpoint<'BulkAction', 'publish'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  payload: BulkActionPublishPayload,
): Promise<BulkActionProps<BulkActionPublishPayload>> => {
  return raw.post(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/publish`,
    payload,
  )
}

export const unpublish: RestEndpoint<'BulkAction', 'unpublish'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  payload: BulkActionUnpublishPayload,
): Promise<BulkActionProps<BulkActionUnpublishPayload>> => {
  return raw.post(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/unpublish`,
    payload,
  )
}

export const validate: RestEndpoint<'BulkAction', 'validate'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  payload: BulkActionValidatePayload,
): Promise<BulkActionProps<BulkActionValidatePayload>> => {
  return raw.post(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/validate`,
    payload,
  )
}

export const getV2: RestEndpoint<'BulkAction', 'getV2'> = (
  http: AxiosInstance,
  params: GetBulkActionParams
) => {
  return raw.get(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/${params.bulkActionId}`
  )
}

export const publishV2: RestEndpoint<'BulkAction', 'publishV2'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  payload: PublishBulkActionV2Payload<'add'>
): Promise<BulkActionProps<PublishBulkActionV2Payload<'add'>>> => {
  return raw.post(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions`,
    payload
  )
}

export const unpublishV2: RestEndpoint<'BulkAction', 'unpublishV2'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  payload: PublishBulkActionV2Payload<'remove'> | UnpublishBulkActionV2Payload
): Promise<
  BulkActionProps<PublishBulkActionV2Payload<'remove'> | UnpublishBulkActionV2Payload>
> => {
  return raw.post(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions`,
    payload
  )
}

export const validateV2: RestEndpoint<'BulkAction', 'validateV2'> = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  payload: ValidateBulkActionV2Payload<'add'> | ValidateBulkActionV2Payload<'remove'>
): Promise<
  BulkActionProps<ValidateBulkActionV2Payload<'add'> | ValidateBulkActionV2Payload<'remove'>>
> => {
  return raw.post(
    http,
    `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions`,
    payload
  )
}
