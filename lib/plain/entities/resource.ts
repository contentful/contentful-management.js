import type { OptionalDefaults } from '../wrappers/wrap'
import type { CursorPaginatedCollectionProp, GetResourceParams } from '../../common-types'
import type { ResourceProps, ResourceQueryOptions } from '../../entities/resource'

export type ResourcePlainAPI = {
  /**
   * Fetch Resources
   * @param params entity IDs to identify the Resources
   * @returns the App Definition config
   * @throws if the request fails, or the Resource Type is not found
   * @example
   * ```javascript
   * // Lookup example
   * const resourceProvider = await client.resource.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   resourceTypeId: '<resource_type_id>',
   *   query: {
   *     'sys.urn[in]': '<resource_urn1>,<resource_urn2>',
   *     limit': <number>,
   *   }
   * });
   *
   * // Search example
   * const resourceProvider = await client.resource.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   resourceTypeId: '<resource_type_id>',
   *   query: {
   *     'query': 'text',
   *     'limit': <number>,
   *   }
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetResourceParams> & { query?: ResourceQueryOptions }
  ): Promise<CursorPaginatedCollectionProp<ResourceProps>>
}
