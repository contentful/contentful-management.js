import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  CreateAppEventSubscriptionProps,
  AppEventSubscriptionProps,
} from '../../../entities/app-event-subscription.js'
import * as raw from './raw.js'
import type { RestEndpoint } from '../types.js'
import type { GetAppDefinitionParams } from '../../../common-types.js'

export const get: RestEndpoint<'AppEventSubscription', 'get'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams,
) => {
  return raw.get<AppEventSubscriptionProps>(
    http,
    `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/event_subscription`,
  )
}

export const upsert: RestEndpoint<'AppEventSubscription', 'upsert'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams,
  data: CreateAppEventSubscriptionProps,
) => {
  return raw.put<AppEventSubscriptionProps>(
    http,
    `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/event_subscription`,
    data,
  )
}

export const del: RestEndpoint<'AppEventSubscription', 'delete'> = (
  http: AxiosInstance,
  params: GetAppDefinitionParams,
) => {
  return raw.del(
    http,
    `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/event_subscription`,
  )
}
