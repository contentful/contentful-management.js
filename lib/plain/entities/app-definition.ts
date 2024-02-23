import { RawAxiosRequestHeaders } from 'axios'
import {
  CollectionProp,
  GetAppDefinitionParams,
  GetOrganizationParams,
  QueryParams,
} from '../../common-types'
import {
  AppDefinitionProps,
  AppInstallationsForOrganizationProps,
  CreateAppDefinitionProps,
} from '../../entities/app-definition'
import { OptionalDefaults } from '../wrappers/wrap'

export type AppDefinitionPlainClientAPI = {
  /**
   * Fetch an App Definition
   * @param params entity IDs to identify the App Definition
   * @returns the App Definition config
   * @throws if the request fails, or the App Definition is not found
   * @example
   * ```javascript
   * const appDefinition = await client.appDefinition.get({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * });
   * ```
   */
  get(
    params: OptionalDefaults<GetOrganizationParams & { appDefinitionId: string } & QueryParams>
  ): Promise<AppDefinitionProps>
  /**
   * Fetch all App Definitions for the given Organization
   * @param params entity IDs to identify the Organization from which to fetch App Definitions
   * @returns an object containing an array of App Definitions
   * @throws if the request fails, or the Organization is not found
   * @example
   * ```javascript
   * const results = await client.appDefinition.getMany({
   *   organizationId: '<organization_id>',
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetOrganizationParams & QueryParams>
  ): Promise<CollectionProp<AppDefinitionProps>>
  /**
   * Create an App Definition
   * @param params entity IDs to identify the Organization where the App Definition will be created
   * @param rawData the new App Definition
   * @returns the new App Definition
   * @throws if the request fails, the Organization is not found, or the update payload is malformed
   * @example
   * ```javascript
   * const appDefinition = await client.appDefinition.create(
   *   {
   *     organizationId: '<organization_id>',
   *   },
   *   {
   *     name: "Hello world!",
   *     parameters: {},
   *     src: "https://example.com/app.html",
   *     locations: [
   *       {
   *         location: "entry-sidebar",
   *       },
   *     ],
   *   }
   * );
   * ```
   */
  create: (
    params: OptionalDefaults<GetOrganizationParams>,
    rawData: CreateAppDefinitionProps,
    headers?: RawAxiosRequestHeaders
  ) => Promise<AppDefinitionProps>
  /**
   * Update an App Definition
   * @param params entity IDs to identify the App Definition
   * @param rawData the updated App Definition config
   * @returns the updated App Definition config
   * @throws if the request fails, the App Definition is not found, or the update payload is malformed
   * @example
   * ```javascript
   * const updatedAppDefinition = await client.appDefinition.update(
   *   {
   *     organizationId: '<organization_id>',
   *     appDefinitionId: '<app_definition_id>',
   *   },
   *   {
   *     ...currentAppDefinition,
   *     name: "New App Definition name",
   *   }
   * );
   * ```
   */
  update: (
    params: OptionalDefaults<GetAppDefinitionParams>,
    rawData: AppDefinitionProps,
    headers?: RawAxiosRequestHeaders
  ) => Promise<AppDefinitionProps>
  /**
   * Delete an App Definition
   * @param params entity IDs to identify the App Definition
   * @throws if the request fails, or the App Definition is not found
   * @example
   * ```javascript
   * await client.appDefinition.delete({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetAppDefinitionParams>): Promise<any>
  /**
   * @deprecated
   * Please use please use appInstallations.getForOrganization instead
   */
  getInstallationsForOrg(
    params: OptionalDefaults<GetAppDefinitionParams>
  ): Promise<AppInstallationsForOrganizationProps>
}
