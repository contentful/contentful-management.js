import type { RawAxiosRequestHeaders } from 'axios'

import type { OptionalDefaults } from '../wrappers/wrap'
import type {
  BasicCursorPaginationOptions,
  CollectionProp,
  CursorPaginatedCollectionProp,
  GetResourceProviderParams,
  GetResourceTypeParams,
  GetSpaceEnvironmentParams,
} from '../../common-types'
import type { ResourceTypeProps, UpsertResourceTypeProps } from '../../export-types'
import type { SpaceEnvResourceTypeProps } from '../../entities/resource-type'

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
   * @throws if the request fails, the App Definition or Resource Provider is not found, or the payload is malformed
   * @example
   * ```javascript
   * // You need a valid AppDefinition with an activated AppBundle that has a contentful function configured
   * const resourceType = await client.resourceType.upsert(
   *   {
   *     organizationId: '<organization_id>',
   *     appDefinitionId: '<app_definition_id>',
   *     resourceTypeId: '<resource_type_id>',
   *   },
   * rawData: {
   *  name: '<resource_type_name>',
   *  defaultFieldMapping: {
   *    title: '<field_id>',
   *  },
   * }
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

  /*
   * Fetch all Resource Types for an environment
   * @param params entity IDs to identify the Resource Type
   * @params Optional query params for cursor pagination
   * @returns all Resource Types based on the last NER app installed in the environment
   * @throws if the request fails, or no Resource Type is found
   * @example
   * ```javascript
   * const resourceTypes = await client.resourceType.getForEnvironment({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * });
   * ```
   */
  getForEnvironment(
    params: OptionalDefaults<GetSpaceEnvironmentParams> & { query?: BasicCursorPaginationOptions }
  ): Promise<CursorPaginatedCollectionProp<SpaceEnvResourceTypeProps>>

  /*
   * Fetch all Resource Types
   * @returns all Resource Types
   * @example
   * ```javascript
   * const resourceTypes = await client.resourceType.getMany({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetResourceProviderParams>
  ): Promise<CollectionProp<ResourceTypeProps>>
}
