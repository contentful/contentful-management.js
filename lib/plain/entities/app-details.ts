import type { GetAppDefinitionParams } from '../../common-types'
import type { AppDetailsProps, CreateAppDetailsProps } from '../../entities/app-details'
import type { OptionalDefaults } from '../wrappers/wrap'

export type AppDetailsPlainClientAPI = {
  /**
   * Creates or updates an App Detail
   * @param params entity IDs to identify the App Definition or App Details
   * @param payload the App Detail upsert
   * @returns the updated App Detail and its metadata
   * @throws if the request fails, an entity is not found, or the payload is malformed
   * @example
   * ```javascript
   * const appDetails = await client.appDetails.upsert(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     appDefinitionId: '<app_definition_id>',
   *   },
   *   {
   *     icon: {
   *       type: 'base64',
   *       value: 'base-64-value'
   *     }
   *   }
   * );
   * ```
   */
  upsert(
    params: OptionalDefaults<GetAppDefinitionParams>,
    payload: CreateAppDetailsProps
  ): Promise<AppDetailsProps>
  /**
   * Fetches the App Detail
   * @param params entity IDs to identify the App Detail
   * @returns the App Detail
   * @throws if the request fails, or the App Detail is not found
   * @example
   * ```javascript
   * const appDetails = await client.appDetails.get({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetAppDefinitionParams>): Promise<AppDetailsProps>
  /**
   * Fetches the App Detail
   * @param params entity IDs to identify the App Detail
   * @throws if the request fails, or the App Detail is not found
   * @example
   * ```javascript
   * await client.appDetails.delete({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetAppDefinitionParams>): Promise<void>
}
