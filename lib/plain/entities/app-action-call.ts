import { GetAppActionCallDetailsParams, GetAppActionCallParams } from '../../common-types'
import {
  AppActionCallProps,
  AppActionCallResponse,
  CreateAppActionCallProps,
} from '../../entities/app-action-call'
import { OptionalDefaults } from '../wrappers/wrap'

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
   *     environmentId: "<environement_id>",
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
    payload: CreateAppActionCallProps
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
   *   environmentId: "<environement_id>",
   *   appDefinitionId: "<app_definition_id>",
   *   appActionId: "<app_action_id>",
   * });
   * ```
   */
  getCallDetails(
    params: OptionalDefaults<GetAppActionCallDetailsParams>
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
   *     environmentId: "<environement_id>",
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
    params: OptionalDefaults<GetAppActionCallParams>,
    payload: CreateAppActionCallProps
  ): Promise<AppActionCallResponse>
}
