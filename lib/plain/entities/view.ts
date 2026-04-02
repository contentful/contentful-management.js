import type {
  CursorPaginatedCollectionProp,
  GetSpaceEnvironmentParams,
  GetViewParams,
} from '../../common-types'
import type {
  CreateViewProps,
  UpdateViewProps,
  ViewLocalePublishPayload,
  ViewProps,
  ViewQueryOptions,
} from '../../entities/view'
import type { OptionalDefaults } from '../wrappers/wrap'

export type ViewPlainClientAPI = {
  /**
   * Fetches all views for a space and environment
   * @param params the space, environment IDs and query options (see {@link ViewQueryOptions})
   * @returns a collection of views
   * @throws if the request fails, or the space or environment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const views = await client.view.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: {
   *     limit: 10,
   *   },
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { query: ViewQueryOptions }>,
  ): Promise<CursorPaginatedCollectionProp<ViewProps>>

  /**
   * Fetches a single view by ID
   * @param params the space ID, environment ID, and view ID
   * @returns the view
   * @throws if the request fails, or the space, environment, or view is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const view = await client.view.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   viewId: '<view_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetViewParams>): Promise<ViewProps>

  /**
   * Creates a new view
   * @param params the space ID and environment ID
   * @param rawData the view data to create
   * @returns the created view
   * @throws if the request fails
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const view = await client.view.create({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * }, {
   *   name: 'My View',
   *   description: 'A new view',
   *   componentTypeId: '<component_type_id>',
   *   viewports: [],
   *   contentProperties: {},
   *   designProperties: {},
   *   dimensionKeyMap: { designProperties: {} },
   * });
   * ```
   */
  create(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    rawData: CreateViewProps,
  ): Promise<ViewProps>

  /**
   * Updates a view
   * @param params the space ID, environment ID, and view ID
   * @param rawData the view data to update (must include sys.version)
   * @returns the updated view
   * @throws if the request fails, or the view is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const view = await client.view.update({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   viewId: '<view_id>',
   * }, viewData);
   * ```
   */
  update(params: OptionalDefaults<GetViewParams>, rawData: UpdateViewProps): Promise<ViewProps>

  /**
   * Deletes a view
   * @param params the space ID, environment ID, and view ID
   * @returns void
   * @throws if the request fails, or the view is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * await client.view.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   viewId: '<view_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetViewParams>): Promise<void>

  /**
   * Publishes a view, optionally targeting specific locales.
   *
   * When called without a payload, the view is fully published across all locales.
   * Pass `{ add: ['en-US'] }` to publish specific locales, or `{ remove: ['de-DE'] }`
   * to remove specific locales from an already-published view.
   * The payload is a union — only `add` or `remove` can be sent per request, not both.
   *
   * @param params the space ID, environment ID, view ID, and the version number
   * @param payload optional locale-based publish payload
   * @returns the published view
   * @throws if the request fails, or the view is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * // Full publish (all locales)
   * const view = await client.view.publish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   viewId: '<view_id>',
   *   version: 1,
   * });
   *
   * // Publish specific locales
   * const view = await client.view.publish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   viewId: '<view_id>',
   *   version: 1,
   * }, { add: ['en-US', 'de-DE'] });
   *
   * // Remove specific locales from publishing
   * const view = await client.view.publish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   viewId: '<view_id>',
   *   version: 1,
   * }, { remove: ['de-DE'] });
   * ```
   */
  publish(
    params: OptionalDefaults<GetViewParams & { version: number }>,
    payload?: ViewLocalePublishPayload,
  ): Promise<ViewProps>

  /**
   * Unpublishes a view
   * @param params the space ID, environment ID, view ID, and the version number
   * @returns the unpublished view
   * @throws if the request fails, or the view is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const view = await client.view.unpublish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   viewId: '<view_id>',
   *   version: <version>,
   * });
   * ```
   */
  unpublish(params: OptionalDefaults<GetViewParams & { version: number }>): Promise<ViewProps>
}
