import {
  CollectionProp,
  GetAppBundleParams,
  GetAppDefinitionParams,
  QueryParams,
} from '../../common-types'
import { AppBundleProps, CreateAppBundleProps } from '../../entities/app-bundle'
import { OptionalDefaults } from '../wrappers/wrap'

export type AppBundlePlainClientAPI = {
  /**
   * Fetches the given App Bundle
   * @param params entity IDs to identify the App Bundle
   * @returns the App Bundle
   * @throws if the request fails, or the App Bundle is not found
   * @example
   * ```javascript
   * const appBundle = await client.appBundle.get({
   *   appDefinitionId: '<app_definition_id>',
   *   appBundleId: '<app_bundle_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetAppBundleParams>): Promise<AppBundleProps>
  /**
   * Fetches all App Bundles for the given App
   * @param params entity IDs to identify the App
   * @returns an object containing an array of App Bundles
   * @throws if the request fails, or the App is not found
   * @example
   * ```javascript
   * const results = await client.appBundle.getMany({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetAppDefinitionParams & QueryParams>
  ): Promise<CollectionProp<AppBundleProps>>
  /**
   * Deletes the given App Bundle
   * @param params entity IDs to identify the App Bundle
   * @throws if the request fails, or the App Bundle is not found
   * @example
   * ```javascript
   * await client.appBundle.delete({
   *   appDefinitionId: '<app_definition_id>',
   *   appBundleId: '<app_bundle_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetAppBundleParams>): Promise<void>
  /**
   * Creates an App Bundle
   * @param params entity IDs to scope where to create the App Bundle
   * @param payload the App Bundle details
   * @returns the created App Bundle and its metadata
   * @throws if the request fails, the associated App is not found, or the payload is malformed
   * @example
   * ```javascript
   * const appBundle = await client.appBundle.create(
   *   {
   *     appDefinitionId: '<app_definition_id>',
   *     appBundleId: '<app_bundle_id>',
   *   },
   *   {
   *     appUploadId: '<app_upload_id>',
   *     comment: 'a bundle comment',
   *   }
   * );
   * ```
   */
  create(
    params: OptionalDefaults<GetAppDefinitionParams>,
    payload: CreateAppBundleProps
  ): Promise<AppBundleProps>
}
