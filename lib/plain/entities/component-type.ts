import type {
  GetSpaceEnvironmentParams,
  GetComponentTypeParams,
  CollectionProp,
} from '../../common-types'
import type {
  ComponentTypeQueryOptions,
  ComponentTypeProps,
  CreateComponentTypeProps,
} from '../../entities/component-type'
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
   * @returns the component type
   * @throws if the request fails, or the space, environment, or component type is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const componentType = await client.componentType.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   componentTypeId: '<component_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetComponentTypeParams>): Promise<ComponentTypeProps>

  /**
   * Creates a new component type
   * @param params the space and environment IDs
   * @param rawData the component type data to create
   * @returns the created component type
   * @throws if the request fails
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const componentType = await client.componentType.create({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * }, {
   *   name: 'My Component',
   *   description: 'A new component type',
   *   viewports: [],
   *   contentProperties: [],
   *   designProperties: [],
   *   dimensionKeyMap: { designProperties: {} },
   * });
   * ```
   */
  create(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    rawData: CreateComponentTypeProps,
  ): Promise<ComponentTypeProps>

  /**
   * Deletes a single component type
   * @param params the space, environment, and component type IDs
   * @throws if the request fails, or the component type is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * await client.componentType.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   componentTypeId: '<component_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetComponentTypeParams>): Promise<void>

  /**
   * Publishes a component type
   * @param params the space, environment, and component type IDs, and the version number
   * @returns the published component type
   * @throws if the request fails, or the component type is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const componentType = await client.componentType.publish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   componentTypeId: '<component_type_id>',
   *   version: <version>,
   * });
   * ```
   */
  publish(
    params: OptionalDefaults<GetComponentTypeParams & { version: number }>,
  ): Promise<ComponentTypeProps>

  /**
   * Unpublishes a component type
   * @param params the space, environment, and component type IDs, and the version number
   * @returns the unpublished component type
   * @throws if the request fails, or the component type is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const componentType = await client.componentType.unpublish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   componentTypeId: '<component_type_id>',
   *   version: <version>,
   * });
   * ```
   */
  unpublish(
    params: OptionalDefaults<GetComponentTypeParams & { version: number }>,
  ): Promise<ComponentTypeProps>
}
