import type { RawAxiosRequestHeaders } from 'axios'
import type {
  CollectionProp,
  GetSpaceParams,
  GetWebhookCallDetailsUrl,
  GetWebhookParams,
  QueryParams,
} from '../../common-types.js'
import type {
  CreateWebhooksProps,
  UpsertWebhookSigningSecretPayload,
  WebhookCallDetailsProps,
  WebhookCallOverviewProps,
  WebhookHealthProps,
  WebhookProps,
  WebhookRetryPolicyPayload,
  WebhookRetryPolicyProps,
  WebhookSigningSecretProps,
} from '../../entities/webhook.js'
import type { OptionalDefaults } from '../wrappers/wrap.js'

export type WebhookPlainClientAPI = {
  // Webhooks
  /**
   * Fetches the Webhook
   * @param params entity IDs to identify the Webhook
   * @returns the Webhook
   * @throws if the request fails, or the Webhook is not found
   * @example
   * ```javascript
   * const webhook = await client.webhook.get({
   *   spaceId: '<space_id>',
   *   webhookDefinitionId: '<webhook_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetWebhookParams>): Promise<WebhookProps>
  /**
   * Fetches all Webhooks for the given Space
   * @param params entity IDs to identify the Space
   * @returns an object containing an array of Webhooks
   * @throws if the request fails, or the Space is not found
   * @example
   * ```javascript
   * const results = await client.webhook.getMany({
   *   spaceId: '<space_id>',
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceParams & QueryParams>
  ): Promise<CollectionProp<WebhookProps>>
  /**
   * Creates a Webhook
   * @param params entity IDs to identify the Space to create the Webhook in
   * @param rawData the Webhook
   * @returns the created Webhook and its metadata
   * @throws if the request fails, the Space is not found, or the payload is malformed
   * @example
   * ```javascript
   * const webhook = await client.webhook.create(
   *   {
   *     spaceId: '<space_id>',
   *   },
   *   {
   *     name: 'My webhook',
   *     url: 'https://www.example.com/test',
   *     topics: ['Entry.create', 'ContentType.create', '*.publish', 'Asset.*'],
   *   }
   * );
   * ```
   */
  create(
    params: OptionalDefaults<GetSpaceParams>,
    rawData: CreateWebhooksProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<WebhookProps>
  /**
   * Creates the Webhook
   * @param params entity IDs to identify the Webhook to update
   * @param rawData the new Webhook configuration
   * @returns the updated Webhook and its metadata
   * @throws if the request fails, the Webhook is not found, or the payload is malformed
   * @example
   * ```javascript
   * const webhook = await client.webhook.update(
   *   {
   *     spaceId: '<space_id>',
   *     webhookDefinitionId: '<webhook_definition_id>',
   *   },
   *   {
   *     ...currentWebhook,
   *     name: 'New webhook name',
   *   }
   * );
   * ```
   */
  update(
    params: OptionalDefaults<GetWebhookParams>,
    rawData: CreateWebhooksProps
  ): Promise<WebhookProps>
  /**
   * Deletes the Webhook
   * @param params entity IDs to identify the Webhook to delete
   * @throws if the request fails, or the Webhook is not found
   * @example
   * ```javascript
   * await client.webhook.delete({
   *   spaceId: '<space_id>',
   *   webhookDefinitionId: '<webhook_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetWebhookParams>): Promise<any>

  // Webhook Health Status & Call Details
  /**
   * Fetches an overview of recently successful webhook calls
   * @param params entity IDs to identify the Webhook
   * @returns an object containing the Webhook and the health overview of recent calls
   * @throws if the request fails, or the Webhook is not found
   * @example
   * ```javascript
   * const webhookHealth = await client.webhook.getHealthStatus({
   *   spaceId: '<space_id>',
   *   webhookDefinitionId: '<webhook_id>',
   * });
   * ```
   */
  getHealthStatus(params: OptionalDefaults<GetWebhookParams>): Promise<WebhookHealthProps>
  /**
   * Fetches the details a specific Webhook call
   * @param params entity IDs to identify the Webhook call
   * @returns details about the outgoing Webhook request and response
   * @throws if the request fails, or the Webhook call is not found
   * @example
   * ```javascript
   * const webhookCall = await client.webhook.getCallDetails({
   *   spaceId: '<space_id>',
   *   webhookDefinitionId: '<webhook_id>',
   *   callId: '<call_id>',
   * });
   * ```
   */
  getCallDetails(
    params: OptionalDefaults<GetWebhookCallDetailsUrl>
  ): Promise<WebhookCallDetailsProps>
  /**
   * Fetches the details the most recent calls for a given Webhook
   * @param params entity IDs to identify the Webhook
   * @returns a list of the most recent webhook calls made, their status, possible errors, and the target URL
   * @throws if the request fails, or the Webhook is not found
   * @example
   * ```javascript
   * const results = await client.webhook.getManyCallDetails({
   *   spaceId: '<space_id>',
   *   webhookDefinitionId: '<webhook_id>',
   * });
   * ```
   */
  getManyCallDetails(
    params: OptionalDefaults<GetWebhookParams & QueryParams>
  ): Promise<CollectionProp<WebhookCallOverviewProps>>

  // Webhook Retry Policies
  /**
   * @deprecated The EAP for this feature has ended. This method will be removed in the next major version.
   */
  getRetryPolicy(params: OptionalDefaults<GetSpaceParams>): Promise<WebhookRetryPolicyProps>
  /**
   * @deprecated The EAP for this feature has ended. This method will be removed in the next major version.
   */
  upsertRetryPolicy(
    params: OptionalDefaults<GetSpaceParams>,
    rawData: WebhookRetryPolicyPayload
  ): Promise<WebhookRetryPolicyProps>
  /**
   * @deprecated The EAP for this feature has ended. This method will be removed in the next major version.
   */
  deleteRetryPolicy(params: OptionalDefaults<GetSpaceParams>): Promise<void>

  // Webhook Signing Secrets
  /**
   * Fetch the redacted webhook signing secret for a given Space
   * @param params entity IDs to identify the Space which the signing secret belongs to
   * @returns the last 4 characters of the redacted signing secret
   * @throws if the request fails, the Space is not found, or the signing secret does not exist
   * @example
   * ```javascript
   * const signingSecret = await client.webhook.getSigningSecret({
   *   spaceId: '<space_id>',
   * });
   */
  getSigningSecret(params: OptionalDefaults<GetSpaceParams>): Promise<WebhookSigningSecretProps>
  /**
   * Creates or updates the webhook signing secret for a given Space
   * @param params entity IDs to identify the Space which the signing secret belongs to
   * @param rawData (optional) the updated 64 character signing secret value if the secret already exists
   * @returns the last 4 characters of the created or updated signing secret
   * @throws if the request fails, the Space is not found, or the payload is malformed
   * @example
   * ```javascript
   * const crypto = require('crypto')
   *
   * const signingSecret = await client.webhook.upsertSigningSecret({
   *   spaceId: '<space_id>',
   * },
   * {
   *   value: crypto.randomBytes(32).toString("hex"),
   * });
   * ```
   */
  upsertSigningSecret(
    params: OptionalDefaults<GetSpaceParams>,
    rawData: UpsertWebhookSigningSecretPayload
  ): Promise<WebhookSigningSecretProps>
  /**
   * Removes the webhook signing secret for a given Space
   * @param params entity IDs to identify the Space which the signing secret belongs to
   * @throws if the request fails, the Space is not found, or the signing secret does not exist
   * @example
   * ```javascript
   * await client.webhook.deleteSigningSecret({
   *  spaceId: '<space_id>',
   * });
   * ```
   */
  deleteSigningSecret(params: OptionalDefaults<GetSpaceParams>): Promise<void>
}
