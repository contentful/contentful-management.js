import type { RawAxiosRequestHeaders } from 'axios'
import type { GetResourceProviderParams } from '../../common-types'
import type {
  UpsertResourceProviderProps,
  ResourceProviderProps,
} from '../../entities/resource-provider'
import type { OptionalDefaults } from '../wrappers/wrap'

export type ResourceProviderPlainClientAPI = {
  /**
   * Fetch a Resource Provider
   * @param params entity IDs to identify the Resource Provider
   * @returns the App Definition config
   * @throws if the request fails, or the Resource Provider is not found
   * @example
   * ```javascript
   * const resourceProvider = await client.resourceProvider.get({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetResourceProviderParams>): Promise<ResourceProviderProps>

  /**
   * Creates or updates a Resource Provider
   * @param params entity IDs to identify the Resource Provider
   * @param rawData the ResourceProvider
   * @returns the created or updated Resource Provider
   * @throws if the request fails, the App Definition or Resource Provider is not found, or the payload is malformed
   * @example
   * ```javascript
   * // You need a valid AppDefinition with an activated AppBundle that has a contentful function configured
   * const appInstallation = await client.resourceProvider.upsert(
   *   {
   *     organizationId: '<organization_id>',
   *     appDefinitionId: '<app_definition_id>',
   *   },
   *   {
   *      sys: { id: '<resource_provider_id>' },
   *      type: 'function',
   *      function: { sys: { id: '<contentful_function_id>', type: 'Link', linkType: 'Function' } },
   *   }
   * );
   * ```
   */
  upsert(
    params: OptionalDefaults<GetResourceProviderParams>,
    rawData: UpsertResourceProviderProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<ResourceProviderProps>

  /**
   * Delete a ResourceProvider
   * @param params entity IDs to identify the Resource Provider
   * @throws if the request fails, or the Resource Provider is not found
   * @example
   * ```javascript
   * await client.resourceProvider.delete({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetResourceProviderParams>): Promise<any>
}
