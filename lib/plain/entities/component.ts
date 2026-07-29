import type {
  GetSpaceEnvironmentParams,
  GetComponentParams,
  ExoCursorPaginatedCollectionProp,
} from '../../common-types'
import type {
  ComponentQueryOptions,
  ComponentProps,
  CreateComponentProps,
  UpsertComponentProps,
} from '../../entities/component'
import type { OptionalDefaults } from '../wrappers/wrap'

export type ComponentPlainClientAPI = {
  /**
   * Fetches all components for a space and environment
   * @param params the space and environment IDs and query parameters
   * @param params.query.limit the maximum number of components to return
   * @param params.query.pageNext cursor token for the next page
   * @param params.query.pagePrev cursor token for the previous page
   * @returns a collection of components
   * @throws if the request fails, or the space or environment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const components = await client.component.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: {
   *     limit: 10,
   *   },
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { query: ComponentQueryOptions }>,
  ): Promise<ExoCursorPaginatedCollectionProp<ComponentProps>>

  /**
   * Fetches a single component by ID
   * @param params the space, environment, and component IDs
   * @returns the component
   * @throws if the request fails, or the space, environment, or component is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const component = await client.component.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   componentId: '<component_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetComponentParams>): Promise<ComponentProps>

  /**
   * Creates a new component
   * @param params the space and environment IDs
   * @param rawData the component data to create
   * @returns the created component
   * @throws if the request fails
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const component = await client.component.create({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * }, {
   *   name: 'My Component',
   *   description: 'A new component',
   *   viewports: [],
   *   contentProperties: [],
   *   designProperties: [],
   * });
   * ```
   */
  create(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    rawData: CreateComponentProps,
  ): Promise<ComponentProps>

  /**
   * Upserts a component (creates or updates via PUT)
   * @param params the space, environment, and component IDs
   * @param rawData the component data to upsert (include sys.version for updates, omit for creates)
   * @returns the upserted component
   * @throws if the request fails
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const current = await client.component.get({ componentId: '<component_id>' });
   * const updated = await client.component.upsert({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   componentId: '<component_id>',
   * }, {
   *   sys: { id: current.sys.id, type: 'Component', version: current.sys.version },
   *   name: 'Updated Component',
   *   ...otherFields,
   * });
   * ```
   */
  upsert(
    params: OptionalDefaults<GetComponentParams>,
    rawData: UpsertComponentProps,
  ): Promise<ComponentProps>

  /**
   * Deletes a single component
   * @param params the space, environment, and component IDs
   * @throws if the request fails, or the component is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * await client.component.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   componentId: '<component_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetComponentParams>): Promise<void>

  /**
   * Publishes a component
   * @param params the space, environment, and component IDs, and the version number
   * @returns the published component
   * @throws if the request fails, or the component is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const component = await client.component.publish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   componentId: '<component_id>',
   *   version: <version>,
   * });
   * ```
   */
  publish(
    params: OptionalDefaults<GetComponentParams & { version: number }>,
  ): Promise<ComponentProps>

  /**
   * Unpublishes a component
   * @param params the space, environment, and component IDs, and the version number
   * @returns the unpublished component
   * @throws if the request fails, or the component is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const component = await client.component.unpublish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   componentId: '<component_id>',
   *   version: <version>,
   * });
   * ```
   */
  unpublish(
    params: OptionalDefaults<GetComponentParams & { version: number }>,
  ): Promise<ComponentProps>
}
