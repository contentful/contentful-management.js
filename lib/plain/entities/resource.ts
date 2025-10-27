import type { OptionalDefaults } from '../wrappers/wrap'
import type { CursorPaginatedCollectionProp, GetResourceParams } from '../../common-types'
import type { ResourceProps, ResourceQueryOptions } from '../../entities/resource'

export type ResourcePlainAPI = {
  /**
   * Fetches all Resources.
   * Supports fetching specific Resources by URNs or searching by a text query.
   * @param params entity IDs to identify the Resources
   * @params optional query params for search or lookup events
   * @returns the Resources collection
   * @throws if the request fails or the Resource Type is not found
   * @example
   * ```javascript
   * // Lookup example
   * const resources = await client.resource.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   resourceTypeId: '<resource_provider_id>:<resource_type_name>',
   *   query: {
   *     'sys.urn[in]': '<resource_urn1>,<resource_urn2>',
   *     limit': <number>,
   *   }
   * });
   *
   * // Search example
   * const resources = await client.resource.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   resourceTypeId: '<resource_provider_id>:<resource_type_name>',
   *   query: {
   *     'query': 'text',
   *     'limit': <number>,
   *   }
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetResourceParams> & { query?: ResourceQueryOptions },
  ): Promise<CursorPaginatedCollectionProp<ResourceProps>>
}
