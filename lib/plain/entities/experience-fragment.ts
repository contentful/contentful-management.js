import type {
  ExoCursorPaginatedCollectionProp,
  GetExperienceFragmentParams,
  GetSpaceEnvironmentParams,
} from '../../common-types'
import type {
  CreateExperienceFragmentProps,
  ExperienceFragmentProps,
  ExperienceFragmentQueryOptions,
  UpsertExperienceFragmentProps,
} from '../../entities/experience-fragment'
import type { OptionalDefaults } from '../wrappers/wrap'

export type ExperienceFragmentPlainClientAPI = {
  /**
   * Fetches all experience fragments for a space and environment
   * @param params the space, environment IDs and query options (see {@link ExperienceFragmentQueryOptions})
   * @returns a collection of experience fragments
   * @throws if the request fails, or the space or environment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const experienceFragments = await client.experienceFragment.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: {
   *     limit: 10,
   *   },
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<
      GetSpaceEnvironmentParams & { query: ExperienceFragmentQueryOptions }
    >,
  ): Promise<ExoCursorPaginatedCollectionProp<ExperienceFragmentProps>>

  /**
   * Fetches a single experience fragment by ID
   * @param params the space, environment, and experience fragment IDs
   * @returns the experience fragment
   * @throws if the request fails, or the space, environment, or experience fragment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const experienceFragment = await client.experienceFragment.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   experienceFragmentId: '<experience_fragment_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetExperienceFragmentParams>): Promise<ExperienceFragmentProps>

  /**
   * Creates a new experience fragment
   * @param params the space and environment IDs
   * @param data the experience fragment data
   * @returns the created experience fragment
   * @throws if the request fails, or the space or environment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const experienceFragment = await client.experienceFragment.create({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * }, {
   *   name: 'My Experience Fragment',
   *   description: 'A new experience fragment',
   *   component: { sys: { type: 'ResourceLink', linkType: 'Contentful:Component', urn: '<component_urn>' } },
   *   viewports: [],
   *   designProperties: {},
   * });
   * ```
   */
  create(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    data: CreateExperienceFragmentProps,
  ): Promise<ExperienceFragmentProps>

  /**
   * Upserts an experience fragment (creates or updates via PUT)
   * @param params the space, environment, and experience fragment IDs
   * @param data the experience fragment data to upsert (include sys.version for updates, omit for creates)
   * @returns the upserted experience fragment
   * @throws if the request fails, or the space, environment, or experience fragment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const experienceFragment = await client.experienceFragment.upsert({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   experienceFragmentId: '<experience_fragment_id>',
   * }, experienceFragmentData);
   * ```
   */
  upsert(
    params: OptionalDefaults<GetExperienceFragmentParams>,
    data: UpsertExperienceFragmentProps,
  ): Promise<ExperienceFragmentProps>

  /**
   * Deletes an experience fragment
   * @param params the space, environment, and experience fragment IDs
   * @throws if the request fails, or the space, environment, or experience fragment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * await client.experienceFragment.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   experienceFragmentId: '<experience_fragment_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetExperienceFragmentParams>): Promise<void>

  /**
   * Publishes an experience fragment
   * @param params the space, environment, and experience fragment IDs, plus the current version
   * @returns the published experience fragment
   * @throws if the request fails, or the space, environment, or experience fragment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const experienceFragment = await client.experienceFragment.publish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   experienceFragmentId: '<experience_fragment_id>',
   *   version: 1,
   * });
   * ```
   */
  publish(
    params: OptionalDefaults<GetExperienceFragmentParams & { version: number }>,
  ): Promise<ExperienceFragmentProps>

  /**
   * Unpublishes an experience fragment
   * @param params the space, environment, and experience fragment IDs, plus the current version
   * @returns the unpublished experience fragment
   * @throws if the request fails, or the space, environment, or experience fragment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const experienceFragment = await client.experienceFragment.unpublish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   experienceFragmentId: '<experience_fragment_id>',
   *   version: 2,
   * });
   * ```
   */
  unpublish(
    params: OptionalDefaults<GetExperienceFragmentParams & { version: number }>,
  ): Promise<ExperienceFragmentProps>
}
