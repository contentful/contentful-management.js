import type { RawAxiosRequestHeaders } from 'axios'
import type { GetResourceProviderParams } from '../../common-types.js'
import type {
  UpsertResourceProviderProps,
  ResourceProviderProps,
} from '../../entities/resource-provider.js'
import type { OptionalDefaults } from '../wrappers/wrap.js'

export type ResourceProviderPlainClientAPI = {
  /**
   * Fetches a Resource Provider
   * @param params entity IDs to identify the Resource Provider
   * @returns the Resource Provider
   * @throws if the request fails or the Resource Provider is not found
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
   * Creates a Resource Provider
   * @param params entity IDs to identify the Resource Provider
   * @param rawData the Resource Provider data
   * @returns the created Resource Provider
   * @throws if the request fails, the App Definition is not found,
   * a Resource Provider associated with the organization and app definition already exists,
   * or the payload is malformed
   * @example
   * ```javascript
   * // You need a valid AppDefinition with an activated AppBundle that has a configured Contentful function
   * const resourceProvider = await client.resourceProvider.upsert(
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
    headers?: RawAxiosRequestHeaders,
  ): Promise<ResourceProviderProps>

  /**
   * Deletes a ResourceProvider
   * @param params entity IDs to identify the Resource Provider
   * @throws if the request fails, the Resource Provider is not found
   * or the Resource Provider is associated with an existing Resource Type
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
