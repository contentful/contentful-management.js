import { RawAxiosRequestHeaders } from 'axios'
import {
  CollectionProp,
  GetExtensionParams,
  GetSpaceEnvironmentParams,
  QueryParams,
} from '../../common-types'
import { CreateExtensionProps, ExtensionProps } from '../../entities/extension'
import { OptionalDefaults } from '../wrappers/wrap'

export type ExtensionPlainClientAPI = {
  /**
   * Fetches the Extension
   * @param params entity IDs to identify the Extension
   * @returns the Extension and its metadata
   * @throws if the request fails, or the Extension is not found
   * @example
   * ```javascript
   * const uiExtension = await client.extension.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   extensionId: '<extension_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetExtensionParams & QueryParams>): Promise<ExtensionProps>
  /**
   * Fetches all Extensions of a Space
   * @param params entity IDs to identify the Environment from which to fetch Extensions
   * @returns an object containing the array of Extensions
   * @throws if the request fails, or the Space/Environment is not found
   * @example
   * ```javascript
   * const results = await client.extension.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>
  ): Promise<CollectionProp<ExtensionProps>>
  /**
   * Creates a new Extension with an auto-generated ID
   * @param params entity IDs to identify the Environment in which to create the Extension
   * @param rawData the Extension
   * @returns the created Extension and its metadata
   * @throws if the request fails, or the Space/Environment is not found
   * @example
   * ```javascript
   * const rawData = {
   *   extension: {
   *     name: 'My extension',
   *     src: 'https://www.example.com',
   *     fieldTypes: [
   *       {
   *         type: 'Symbol',
   *       },
   *     ],
   *     sidebar: false,
   *   }
   * };
   * const uiExtension = await client.extension.create(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *   },
   *   rawData
   * );
   * ```
   */
  create(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    rawData: CreateExtensionProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<ExtensionProps>
  /**
   * Creates a new Extension with a given ID
   * @param params entity IDs to identify the Environment in which to create the Extension
   * @param rawData the Extension
   * @returns the created Extension and its metadata
   * @throws if the request fails, or the Space/Environment is not found
   * @example
   * ```javascript
   * const rawData = {
   *   extension: {
   *     name: 'My extension',
   *     src: 'https://www.example.com',
   *     fieldTypes: [
   *       {
   *         type: 'Symbol',
   *       },
   *     ],
   *     sidebar: false,
   *   }
   * };
   * const uiExtension = await client.extension.createWithId(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     extensionId: '<extension_id>',
   *   },
   *   rawData
   * );
   * ```
   */
  createWithId(
    params: OptionalDefaults<GetExtensionParams>,
    rawData: CreateExtensionProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<ExtensionProps>
  /**
   * Updates an Extension
   * @param params entity IDs to identify the Extension
   * @param rawData the Extension update
   * @param headers when updating an existing Extension, use the 'X-Contentful-Version' header to specify the last version of the Extension you are updating
   * @returns the updated Extension and its metadata
   * @throws if the request fails, or the Space/Environment is not found
   * @example
   * ```javascript
   * // Create Extension
   * let uiExtension = await client.extension.create(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *   },
   *   {
   *     extension: {
   *       name: 'My extension',
   *       src: 'https://www.example.com',
   *       fieldTypes: [
   *         {
   *           type: 'Symbol',
   *         },
   *       ],
   *       sidebar: false,
   *     },
   *   }
   * );
   *
   * // Update Extension
   * uiExtension = await client.extension.update(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     extensionId: '<extension_id>',
   *   },
   *   {
   *     sys: uiExtension.sys,
   *     extension: {
   *       ...uiExtension.extension,
   *       name: 'Even more awesome extension',
   *     },
   *   }
   * );
   * ```
   */
  update(
    params: OptionalDefaults<GetExtensionParams>,
    rawData: ExtensionProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<ExtensionProps>
  /**
   * Deletes the Extension
   * @param params entity IDs to identity the Extension
   * @throws if the request fails, or the Extension is not found
   * @example
   * ```javascript
   * await client.extension.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   extensionId: '<extension_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetExtensionParams>): Promise<any>
}
