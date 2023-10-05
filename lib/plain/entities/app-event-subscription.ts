import { GetAppDefinitionParams } from '../../common-types'
import {
  AppEventSubscriptionProps,
  CreateAppEventSubscriptionProps,
} from '../../entities/app-event-subscription'
import { OptionalDefaults } from '../wrappers/wrap'

export type AppEventSubscriptionPlainClientAPI = {
  /**
   * Creates or updates an App Event Subscription
   * @param params entity IDs to identify the App that the Event Subscription belongs to
   * @param payload the new or updated Event Subscription
   * @returns the App Event Subscription and its metadata
   * @throws if the request fails, the App or Event Subscription is not found, or the payload is malformed
   * @example
   * ```javascript
   * const eventSubscription = await client.appEventSubscription.upsert({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * }, {
   *   targetUrl: `<target_url>`,
   *   topics: ['<Topic>'],
   * })
   * ```
   */
  upsert(
    params: OptionalDefaults<GetAppDefinitionParams>,
    payload: CreateAppEventSubscriptionProps
  ): Promise<AppEventSubscriptionProps>
  /**
   * Fetches the current App Event Subscription for the given App
   * @param params entity IDs to identify the App that the Event Subscription belongs to
   * @returns the App Event Subscription
   * @throws if the request fails, or the App or the Event Subscription is not found
   * @example
   * ```javascript
   * const eventSubscription = await client.appEventSubscription.get({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * })
   * ```
   */
  get(params: OptionalDefaults<GetAppDefinitionParams>): Promise<AppEventSubscriptionProps>
  /**
   * Removes the current App Event Subscription for the given App
   * @param params entity IDs to identify the App that the Event Subscription belongs to
   * @throws if the request fails, or the App or the Event Subscription is not found
   * @example
   * ```javascript
   * await client.appEventSubscription.delete({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * })
   * ```
   */
  delete(params: OptionalDefaults<GetAppDefinitionParams>): Promise<void>
}
