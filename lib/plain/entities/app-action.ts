import {
  CollectionProp,
  GetAppActionParams,
  GetAppActionsForEnvParams,
  GetAppDefinitionParams,
  QueryParams,
} from '../../common-types'
import { AppActionProps, CreateAppActionProps } from '../../entities/app-action'
import { OptionalDefaults } from '../wrappers/wrap'

export type AppActionPlainClientAPI = {
  /**
   * Fetches the given App Action.
   * @param params entity IDs to identify the App Action
   * @returns the App Action
   * @throws if the request fails, or the App Action is not found
   * @example
   * ```javascript
   * const appAction = await client.appAction.get({
   *   organizationId: "<org_id>",
   *   appDefinitionId: "<app_definition_id>",
   *   appActionId: "<app_action_id>",
   * });
   * ```
   */
  get(params: OptionalDefaults<GetAppActionParams>): Promise<AppActionProps>
  /**
   * Fetches all App Actions for the given App
   * @param params entity IDs to identify the App
   * @returns an object containing an array of App Actions
   * @throws if the request fails, or the App is not found
   * @example
   * ```javascript
   * const appActions = await client.appAction.getMany({
   *   organizationId: "<org_id>",
   *   appDefinitionId: "<app_definition_id>",
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetAppDefinitionParams & QueryParams>
  ): Promise<CollectionProp<AppActionProps>>
  /**
   * Fetches all App Actions for the given environment
   * @param params entity IDs to identify the Environment
   * @returns an object containing an array of App Actions
   * @throws if the request fails, or the Environment is not found
   * @example
   * ```javascript
   * const appActions = await client.appAction.getManyForEnvironment({
   *   spaceId: "<space_id>",
   *   environmentId: "<environment_id>",
   * });
   * ```
   */
  getManyForEnvironment(
    params: OptionalDefaults<GetAppActionsForEnvParams & QueryParams>
  ): Promise<CollectionProp<AppActionProps>>
  /**
   * Deletes the given App Action
   * @param params entity IDs to identify the App Action to delete
   * @returns void
   * @throws if the request fails, or the App Action is not found
   * @example
   * ```javascript
   * await client.appAction.delete({
   *   organizationId: "<org_id>",
   *   appDefinitionId: "<app_definition_id>",
   *   appActionId: "<app_action_id>",
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetAppActionParams>): Promise<void>
  /**
   * Creates an App Action
   * @param params entity IDs to scope where to create the App Action
   * @param payload the App Action details
   * @returns the created App Action and its metadata
   * @throws if the request fails, an entity is not found, or the payload is malformed
   * @example
   * ```javascript
   * const appAction = await client.appAction.create(
   *   {
   *     organizationId: "<org_id>",
   *     appDefinitionId: "<app_definition_id>",
   *     appActionId: "<app_action_id>",
   *   },
   *   {
   *     category: "Notification.v1.0",
   *     url: "https://www.somewhere-else.com/action",
   *     description: "sends a notification",
   *     name: "My Notification",
   *   }
   * );
   * ```
   */
  create(
    params: OptionalDefaults<GetAppDefinitionParams>,
    payload: CreateAppActionProps
  ): Promise<AppActionProps>
  /**
   * Updates an App Action
   * @param params entity IDs to identify the App Action
   * @param payload the App Action update
   * @returns the updated App Action and its metadata
   * @throws if the request fails, the App Action is not found, or the payload is malformed
   * @example
   * ```javascript
   * const appAction = await client.appAction.update(
   *   {
   *     organizationId: "<org_id>",
   *     appDefinitionId: "<app_definition_id>",
   *     appActionId: "<app_action_id>",
   *   },
   *   {
   *     category: "Notification.v1.0",
   *     url: "https://www.somewhere-else.com/action",
   *     description: "sends a notification",
   *     name: "My Notification",
   *   }
   * );
   * ```
   */
  update(
    params: OptionalDefaults<GetAppActionParams>,
    payload: CreateAppActionProps
  ): Promise<AppActionProps>
}
