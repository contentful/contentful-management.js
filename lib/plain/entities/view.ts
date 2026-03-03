import type {
  CursorPaginatedCollectionProp,
  GetSpaceEnvironmentParams,
  GetViewParams,
} from '../../common-types'
import type { ViewProps, ViewQueryOptions } from '../../entities/view'
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
   *     _experienceCtId: '<experience_ct_id>',
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
   * @param params the space, environment, and view IDs
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
}
