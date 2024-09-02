import type { RawAxiosRequestHeaders } from 'axios'

import type { OptionalDefaults } from '../wrappers/wrap'
import type { GetResourceTypeParams } from '../../common-types'
import type { ResourceTypeProps, UpsertResourceTypeProps } from '../../export-types'

export type ResourceTypePlainClientAPI = {
  /*
   * Fetch a Resource Type
   * @param params entity IDs to identify the Resource Type
   * @returns the Resource Type
   * @throws if the request fails, or the Resource Type is not found
   * @example
   * ```javascript
   * const resourceType = await client.resourceType.get({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   *   resourceTypeId: '<resource_type_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetResourceTypeParams>): Promise<ResourceTypeProps>

  /*
   * Creates or updates a Resource Type
   * @param params entity IDs to identify the Resource Type
   * @param rawData the ResourceType
   * @returns the created or updated Resource Type
   * @throws if the request fails, the App Definition or Resource Type is not found, or the payload is malformed
   * @example
   * ```javascript
   * // You need a valid AppDefinition with an activated AppBundle that has a contentful function configured
   * const resourceType = await client.resourceType.upsert(
   *   {
   *     organizationId: '<organization_id>',
   *     appDefinitionId: '<app_definition_id>',
   *     resourceTypeId: '<resource_type_id>',
   *   }
   * );
   * ```
   */
  upsert(
    params: OptionalDefaults<GetResourceTypeParams>,
    rawData: UpsertResourceTypeProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<ResourceTypeProps>

  /*
   * Delete a ResourceType
   * @param params entity IDs to identify the Resource Type
   * @throws if the request fails, or the Resource Type is not found
   * @example
   * ```javascript
   * await client.resourceType.delete({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   *   resourceTypeId: '<resource_type_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetResourceTypeParams>): Promise<any>
}
