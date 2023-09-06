import { GetUIConfigParams } from '../../common-types'
import { UIConfigProps } from '../../entities/ui-config'
import { OptionalDefaults } from '../wrappers/wrap'

export type UIConfigPlainClientAPI = {
  /**
   * Fetch the UI Config for a given Space and Environment
   * @param params entity IDs to identify the UI Config
   * @returns the UI Config
   * @throws if the request fails, or the UI Config is not found
   * @example
   * ```javascript
   * const uiConfig = await client.uiConfig.get({
   *   spaceId: "<space_id>",
   *   environmentId: "<environment_id>",
   * });
   * ```
   */
  get(params: OptionalDefaults<GetUIConfigParams>): Promise<UIConfigProps>
  /**
   * Update the UI Config for a given Space and Environment
   * @param params entity IDs to identify the UI Config
   * @param rawData the UI Config update
   * @returns the updated UI Config
   * @throws if the request fails, the UI Config is not found, or the update payload is malformed
   * @example
   * ```javascript
   * await client.uiConfig.update({
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
    params: OptionalDefaults<GetUIConfigParams>,
    rawData: UIConfigProps
  ): Promise<UIConfigProps>
}
