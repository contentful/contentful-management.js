import type { GetSpaceEnvironmentParams, CollectionProp } from '../../common-types'
import type { ComponentTypeQueryOptions, ComponentTypeProps } from '../../entities/component-type'
import type { OptionalDefaults } from '../wrappers/wrap'

export type ComponentTypePlainClientAPI = {
  /**
   * Fetches all component types for a space and environment
   * @param params the space and environment IDs and query parameters
   * @param params.query.experienceCtId the experience component type ID
   * @param params.query.limit the maximum number of component types to return
   * @param params.query.skip the number of component types to skip
   * @returns a collection of component types
   * @throws if the request fails, or the space, environment, or experience component type is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const componentTypes = await client.componentType.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: {
   *     _experienceCtId: '<experience_ct_id>',
   *     limit: 10,
   *     skip: 0,
   *   },
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { query: ComponentTypeQueryOptions }>,
  ): Promise<CollectionProp<ComponentTypeProps>>

  /**
   * Fetches a single component type by ID
   * @param params the space, environment, and component type IDs
   * @param params.componentId the component type ID
   * @returns the component type
   * @throws if the request fails, or the space, environment, or component type is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const componentType = await client.componentType.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   componentId: '<component_id>',
   * });
   * ```
   */
  get(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { componentId: string }>,
  ): Promise<ComponentTypeProps>
}
