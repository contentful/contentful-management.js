import type {
  GetAppActionCallDetailsParams,
  GetAppActionCallParams,
  GetAppActionCallParamsWithId,
  CreateWithResponseParams,
  CreateWithResultParams,
} from '../../common-types.js'
import type {
  AppActionCallProps,
  AppActionCallResponse,
  AppActionCallRawResponseProps,
  CreateAppActionCallProps,
} from '../../entities/app-action-call.js'
import type { OptionalDefaults } from '../wrappers/wrap.js'

export type AppActionCallPlainClientAPI = {
  /**
   * Calls (triggers) an App Action
   * @param params entity IDs to identify the App Action to call
   * @param payload the payload to be sent to the App Action
   * @returns basic metadata about the App Action Call
   * @throws if the request fails, or the App Action is not found
   * @example
   * ```javascript
   * await client.appActionCall.create(
   *   {
   *     spaceId: "<space_id>",
   *     environmentId: "<environment_id>",
   *     appDefinitionId: "<app_definition_id>",
   *     appActionId: "<app_action_id>",
   *   },
   *   {
   *     parameters: { // ... },
   *   }
   * );
   * ```
   */
  create(
    params: OptionalDefaults<GetAppActionCallParams>,
    payload: CreateAppActionCallProps,
  ): Promise<AppActionCallProps>
  /**
   * Fetches the details of an App Action Call
   * @param params entity IDs to identify the App Action Call
   * @returns detailed metadata about the App Action Call
   * @throws if the request fails, or the App Action is not found
   * @example
   * ```javascript
   * const appActionCall = await client.appActionCall.getCallDetails({
   *   spaceId: "<space_id>",
   *   environmentId: "<environment_id>",
   *   appDefinitionId: "<app_definition_id>",
   *   appActionId: "<app_action_id>",
   * });
   * ```
   */
  getCallDetails(
    params: OptionalDefaults<GetAppActionCallDetailsParams>,
  ): Promise<AppActionCallResponse>
  /**
   * Calls (triggers) an App Action
   * @param params entity IDs to identify the App Action to call
   * @param payload the payload to be sent to the App Action
   * @returns detailed metadata about the App Action Call
   * @throws if the request fails, or the App Action is not found
   * @example
   * ```javascript
   * const appActionCall = await client.appActionCall.createWithResponse(
   *   {
   *     spaceId: "<space_id>",
   *     environmentId: "<environment_id>",
   *     appDefinitionId: "<app_definition_id>",
   *     appActionId: "<app_action_id>",
   *   },
   *   {
   *     parameters: { // ... },
   *   }
   * );
   * ```
   */
  createWithResponse(
    params: OptionalDefaults<CreateWithResponseParams>,
    payload: CreateAppActionCallProps,
  ): Promise<AppActionCallResponse>

  /**
   * Fetches a structured App Action Call by id.
   *
   * Returns the RFC-aligned shape for an app action invocation including
   * `status` ("processing" | "succeeded" | "failed"), and either
   * `result` (on success) or `error` (on failure).
   *
   * @param params Entity IDs to identify the App Action Call
   * @returns A structured `AppActionCall` object with `status`, `result` or `error`
   * @throws if the request fails, or the App Action Call is not found
   * @example
   * ```javascript
   * const call = await client.appActionCall.get({
   *   spaceId: "<space_id>",
   *   environmentId: "<environment_id>",
   *   appDefinitionId: "<app_definition_id>",
   *   appActionId: "<app_action_id>",
   *   callId: "<call_id>",
   * });
   * if (call.status === 'succeeded') {
   *   console.log(call.result);
   * } else if (call.status === 'failed') {
   *   console.error(call.error);
   * }
   * ```
   */
  get(params: OptionalDefaults<GetAppActionCallParamsWithId>): Promise<AppActionCallProps>

  /**
   * Calls (triggers) an App Action and resolves with the structured result.
   *
   * This method abstracts away polling. It creates an app action call and then
   * polls the structured call route until `status` becomes either
   * `"succeeded"` (returns with `result`) or `"failed"` (returns with `error`).
   * If the call does not complete within the default retry policy, it rejects.
   *
   * @param params Entity IDs to identify the App Action to call
   * @param payload Parameters to send to the App Action
   * @returns A completed structured `AppActionCall` with `status`, `result` or `error`
   * @throws if the request fails, or the call does not complete in time
   * @example
   * ```javascript
   * const call = await client.appActionCall.createWithResult(
   *   {
   *     spaceId: "<space_id>",
   *     environmentId: "<environment_id>",
   *     appDefinitionId: "<app_definition_id>",
   *     appActionId: "<app_action_id>",
   *   },
   *   {
   *     parameters: { // your inputs },
   *   }
   * );
   * if (call.status === 'succeeded') {
   *   console.log(call.result);
   * } else {
   *   console.error(call.error);
   * }
   * ```
   */
  createWithResult(
    params: OptionalDefaults<CreateWithResultParams>,
    payload: CreateAppActionCallProps,
  ): Promise<AppActionCallProps>

  /**
   * Fetches the raw response (headers/body) for a completed App Action Call.
   *
   * Use this when you need access to the unparsed executor response. For most
   * use cases, prefer the structured call via `get` or `createWithResult`.
   *
   * @param params Entity IDs to identify the App Action Call
   * @returns The raw response including serialized `body` and optional `headers`
   * @throws if the request fails, or the App Action Call is not found
   * @example
   * ```javascript
   * const raw = await client.appActionCall.getResponse({
   *   spaceId: "<space_id>",
   *   environmentId: "<environment_id>",
   *   appDefinitionId: "<app_definition_id>",
   *   appActionId: "<app_action_id>",
   *   callId: "<call_id>",
   * });
   * console.log(raw.response.body);
   * ```
   */
  getResponse(
    params: OptionalDefaults<GetAppActionCallParamsWithId>,
  ): Promise<AppActionCallRawResponseProps>
}
