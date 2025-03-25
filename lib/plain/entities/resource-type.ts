import type { RawAxiosRequestHeaders } from 'axios'

import type { OptionalDefaults } from '../wrappers/wrap'
import type {
  BasicCursorPaginationOptions,
  CollectionProp,
  CursorPaginatedCollectionProp,
  GetResourceTypeParams,
  GetSpaceEnvironmentParams,
} from '../../common-types'
import type {
  SpaceEnvResourceTypeProps,
  ResourceTypeProps,
  UpsertResourceTypeProps,
} from '../../entities/resource-type'

export type ResourceTypePlainClientAPI = {
  /*
   * Fetches a Resource Type
   * @param params entity IDs to identify the Resource Type
   * @returns the Resource Type
   * @throws if the request fails or the Resource Type is not found
   * @example
   * ```javascript
   * const resourceType = await client.resourceType.get({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   *   resourceTypeId: '<resource_provider_id>:<resource_type_name>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetResourceTypeParams>): Promise<ResourceTypeProps>

  /*
   * Creates or updates a Resource Type
   * @param params entity IDs to identify the Resource Type
   * @param rawData the Resource Type data
   * @returns the created or updated Resource Type
   * @throws if the request fails, the App Definition or Resource Provider is not found,
   * default field mapping has invalid properties or the payload is malformed
   * @example
   * ```javascript
   * // You need a valid AppDefinition with an activated AppBundle that has a configured Contentful function
   * const resourceType = await client.resourceType.upsert(
   *   {
   *     organizationId: '<organization_id>',
   *     appDefinitionId: '<app_definition_id>',
   *     resourceTypeId: '<resource_provider_id>:<resource_type_name>',
   *   },
   * rawData: {
   *  name: '<resource_type_name>',
   *      defaultFieldMapping: {
   *        externalUrl: '{ /externalUrl }',
   *        title: '{ /name }',
   *        subtitle: 'Entity ID: { /urn }',
   *        image: {
   *          altText: '{ /name }',
   *          url: '{ /image/url }'
   *        }
   *     },
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
   * Deletes a ResourceType
   * @param params entity IDs to identify the Resource Type
   * @throws if the request fails or the Resource Type is not found
   * @example
   * ```javascript
   * await client.resourceType.delete({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   *   resourceTypeId: '<resource_provider_id>:<resource_type_name>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetResourceTypeParams>): Promise<any>

  /*
   * Fetches all Resource Types for an environment, based on the most recent installed NER app
   * @param params entity IDs to identify the Resource Type collection
   * @params optional query params for cursor pagination
   * @returns Resource Types collection
   * @throws if the request fails or there are no apps installed in the environment
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
   * Fetches all Resource Types
   * @param params entity IDs to identify the Resource Type collection
   * @returns Resource Type collection
   * @throws if the request fails
   * @example
   * ```javascript
   * const resourceTypes = await client.resourceType.getMany({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<Omit<GetResourceTypeParams, 'resourceTypeId'>>
  ): Promise<CollectionProp<ResourceTypeProps>>
}
