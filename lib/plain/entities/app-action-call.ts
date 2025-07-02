import type { GetAppActionCallDetailsParams, GetAppActionCallParams, CreateWithResponseParams } from '../../common-types'
import type {
  AppActionCallProps,
  AppActionCallResponse,
  AppActionCallStructuredResult,
  CreateAppActionCallProps,
} from '../../entities/app-action-call'
import type { OptionalDefaults } from '../wrappers/wrap'
import type { RawAxiosRequestHeaders } from 'axios'

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
    headers?: RawAxiosRequestHeaders
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
    params: OptionalDefaults<GetAppActionCallDetailsParams>
  ): Promise<AppActionCallResponse>
  /**
   * Calls (triggers) an App Action and returns raw webhook log format
   * @param params entity IDs to identify the App Action to call
   * @param payload the payload to be sent to the App Action
   * @returns detailed metadata about the App Action Call (raw webhook log format)
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
    headers?: RawAxiosRequestHeaders
  ): Promise<AppActionCallResponse>
  /**
   * Calls (triggers) an App Action and returns structured AppActionCall format
   * @param params entity IDs to identify the App Action to call  
   * @param payload the payload to be sent to the App Action
   * @returns structured AppActionCall with result/error fields
   * @throws if the request fails, or the App Action is not found
   * @example
   * ```javascript
   * const appActionCall = await client.appActionCall.createWithResult(
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
   * 
   * if (appActionCall.sys.status === 'succeeded') {
   *   console.log('Result:', appActionCall.result);
   * } else if (appActionCall.sys.status === 'failed') {
   *   console.log('Error:', appActionCall.error);
   * }
   * ```
   */
  createWithResult(
    params: OptionalDefaults<CreateWithResponseParams>,
    payload: CreateAppActionCallProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<AppActionCallStructuredResult>
}
