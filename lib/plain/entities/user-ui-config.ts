import { GetUserUIConfigParams } from '../../common-types'
import { UserUIConfigProps } from '../../entities/user-ui-config'
import { OptionalDefaults } from '../wrappers/wrap'

export type UserUIConfigPlainClientAPI = {
  /**
   * Fetch the UI Config for the current user in a given Space and Environment
   * @param params entity IDs to identify the UI Config
   * @returns the UI Config
   * @throws if the request fails, or the UI Config is not found
   * @example
   * ```javascript
   * const uiConfig = await client.userUIConfig.get({
   *   spaceId: "<space_id>",
   *   environmentId: "<environment_id>",
   * });
   * ```
   */
  get(params: OptionalDefaults<GetUserUIConfigParams>): Promise<UserUIConfigProps>
  /**
   * Update the UI Config for for the current user in a given Space and Environment
   * @param params entity IDs to identify the UI Config
   * @param rawData the UI Config update
   * @returns the updated UI Config
   * @throws if the request fails, the UI Config is not found, or the update payload is malformed
   * @example
   * ```javascript
   * await client.userUIConfig.update({
   *   spaceId: "<space_id>",
   *   environmentId: "<environment_id>",
   * }, {
   *   ...existingUIConfig,
   *   entryListViews: [
   *     ...existingUIConfig.entryListViews,
   *     {
   *       id: 'newFolder',
   *       title: 'New Folder',
   *       views: []
   *     }
   *   ],
   * });
   * ```
   */
  update(
    params: OptionalDefaults<GetUserUIConfigParams>,
    rawData: UserUIConfigProps
  ): Promise<UserUIConfigProps>
}
