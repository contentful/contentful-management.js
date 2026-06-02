import type {
  ExoCursorPaginatedCollectionProp,
  GetFragmentParams,
  GetSpaceEnvironmentParams,
} from '../../common-types'
import type {
  CreateFragmentProps,
  FragmentProps,
  FragmentQueryOptions,
  UpsertFragmentProps,
} from '../../entities/fragment'
import type { OptionalDefaults } from '../wrappers/wrap'

export type FragmentPlainClientAPI = {
  /**
   * Fetches all fragments for a space and environment
   * @param params the space, environment IDs and query options (see {@link FragmentQueryOptions})
   * @returns a collection of fragments
   * @throws if the request fails, or the space or environment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const fragments = await client.fragment.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: {
   *     limit: 10,
   *   },
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { query: FragmentQueryOptions }>,
  ): Promise<ExoCursorPaginatedCollectionProp<FragmentProps>>

  /**
   * Fetches a single fragment by ID
   * @param params the space, environment, and fragment IDs
   * @returns the fragment
   * @throws if the request fails, or the space, environment, or fragment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const fragment = await client.fragment.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   fragmentId: '<fragment_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetFragmentParams>): Promise<FragmentProps>

  /**
   * Creates a new fragment
   * @param params the space and environment IDs
   * @param data the fragment data
   * @returns the created fragment
   * @throws if the request fails, or the space or environment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const fragment = await client.fragment.create({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * }, {
   *   name: 'My Fragment',
   *   description: 'A new fragment',
   *   componentType: { sys: { type: 'Link', linkType: 'ComponentType', id: '<component_type_id>' } },
   *   viewports: [],
   *   designProperties: {},
   *   dimensionKeyMap: { designProperties: {} },
   * });
   * ```
   */
  create(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    data: CreateFragmentProps,
  ): Promise<FragmentProps>

  /**
   * Upserts a fragment (creates or updates via PUT)
   * @param params the space, environment, and fragment IDs
   * @param data the fragment data to upsert (include sys.version for updates, omit for creates)
   * @returns the upserted fragment
   * @throws if the request fails, or the space, environment, or fragment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const fragment = await client.fragment.upsert({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   fragmentId: '<fragment_id>',
   * }, fragmentData);
   * ```
   */
  upsert(
    params: OptionalDefaults<GetFragmentParams>,
    data: UpsertFragmentProps,
  ): Promise<FragmentProps>

  /**
   * Deletes a fragment
   * @param params the space, environment, and fragment IDs
   * @throws if the request fails, or the space, environment, or fragment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * await client.fragment.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   fragmentId: '<fragment_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetFragmentParams>): Promise<void>

  /**
   * Publishes a fragment
   * @param params the space, environment, and fragment IDs, plus the current version
   * @returns the published fragment
   * @throws if the request fails, or the space, environment, or fragment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const fragment = await client.fragment.publish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   fragmentId: '<fragment_id>',
   *   version: 1,
   * });
   * ```
   */
  publish(params: OptionalDefaults<GetFragmentParams & { version: number }>): Promise<FragmentProps>

  /**
   * Unpublishes a fragment
   * @param params the space, environment, and fragment IDs, plus the current version
   * @returns the unpublished fragment
   * @throws if the request fails, or the space, environment, or fragment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const fragment = await client.fragment.unpublish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   fragmentId: '<fragment_id>',
   *   version: 2,
   * });
   * ```
   */
  unpublish(
    params: OptionalDefaults<GetFragmentParams & { version: number }>,
  ): Promise<FragmentProps>
}
