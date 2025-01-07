import type { RawAxiosRequestHeaders } from 'axios'
import type {
  CollectionProp,
  GetAppDefinitionParams,
  GetAppInstallationParams,
  GetSpaceEnvironmentParams,
  PaginationQueryParams,
  SpaceQueryParams,
} from '../../common-types'
import type { AppInstallationsForOrganizationProps } from '../../entities/app-definition'
import type {
  AppInstallationProps,
  CreateAppInstallationProps,
} from '../../entities/app-installation'
import type { OptionalDefaults } from '../wrappers/wrap'

export type AppInstallationPlainClientAPI = {
  /**
   * Fetches the App Installation
   * @param params entity IDs to identify the App Installation
   * @returns the App Installation
   * @throws if the request fails, or the App Installation is not found
   * @example
   * ```javascript
   * const appInstallation = await client.appInstallation.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   appDefinitionId: '<app_definition_id>'
   * });
   * ```
   */
  get(params: OptionalDefaults<GetAppInstallationParams>): Promise<AppInstallationProps>
  /**
   * Fetches all App Installations for the given App
   * @param params entity IDs to identify the App
   * @returns an object containing an array of App Installations
   * @throws if the request fails, or the App is not found
   * @example
   * ```javascript
   * const results = await client.appInstallation.getMany({
   *   organizationId: "<org_id>",
   *   appDefinitionId: "<app_definition_id>",
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & PaginationQueryParams>
  ): Promise<CollectionProp<AppInstallationProps>>
  /**
   * Fetches all App Installations for the given Organization
   * @param params entity IDs to identify the Organization
   * @returns an object containing an array of App Installations
   * @throws if the request fails, or the Organization is not found
   * @example
   * ```javascript
   * const results = await client.appInstallation.getForOrganization({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * });
   * ```
   */
  getForOrganization(
    params: OptionalDefaults<GetAppDefinitionParams & SpaceQueryParams>
  ): Promise<AppInstallationsForOrganizationProps>
  /**
   * Creates or updates an App Installation
   * @param params entity IDs to identify the App Installation to update, or the App to install
   * @param rawData the App Installation
   * @returns the created or updated App Installation and its metadata
   * @throws if the request fails, the App or App Installation is not found, or the payload is malformed
   * @example
   * ```javascript
   * const appInstallation = await client.appInstallation.upsert(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     appDefinitionId: '<app_definition_id>',
   *   },
   *   {
   *     parameters: {
   *       // freeform parameters
   *     },
   *   }
   * );
   * ```
   */
  upsert(
    params: OptionalDefaults<GetAppInstallationParams>,
    rawData: CreateAppInstallationProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<AppInstallationProps>
  /**
   * Uninstalls the App
   * @param params entity IDs to identify the App to uninstall
   * @throws if the request fails, or the App Installation is not found
   * @example
   * ```javascript
   * await client.appInstallation.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   appDefinitionId: '<app_definition_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetAppInstallationParams>): Promise<any>
}
