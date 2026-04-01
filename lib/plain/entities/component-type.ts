import type {
  GetSpaceEnvironmentParams,
  GetComponentTypeParams,
  CursorPaginatedCollectionProp,
} from '../../common-types'
import type {
  ComponentTypeQueryOptions,
  ComponentTypeProps,
  CreateComponentTypeProps,
  UpdateComponentTypeProps,
} from '../../entities/component-type'
import type { OptionalDefaults } from '../wrappers/wrap'

export type ComponentTypePlainClientAPI = {
  /**
   * Fetches all component types for a space and environment
   * @param params the space and environment IDs and query parameters
   * @param params.query.limit the maximum number of component types to return
   * @param params.query.pageNext cursor token for the next page
   * @param params.query.pagePrev cursor token for the previous page
   * @returns a collection of component types
   * @throws if the request fails, or the space, environment, or experience component type is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const componentTypes = await client.componentType.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: {
   *     limit: 10,
   *   },
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { query: ComponentTypeQueryOptions }>,
  ): Promise<CursorPaginatedCollectionProp<ComponentTypeProps>>

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
   * Updates a component type
   * @param params the space, environment, and component type IDs
   * @param rawData the component type data to update (must include sys.version)
   * @returns the updated component type
   * @throws if the request fails, or the component type is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const componentType = await client.componentType.update({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   componentTypeId: '<component_id>',
   * }, componentTypeData);
   * ```
   */
  update(
    params: OptionalDefaults<GetComponentTypeParams>,
    rawData: UpdateComponentTypeProps,
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
