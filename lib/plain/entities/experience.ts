import type {
  ExoCursorPaginatedCollectionProp,
  GetSpaceEnvironmentParams,
  GetExperienceParams,
} from '../../common-types'
import type {
  CreateExperienceProps,
  UpsertExperienceProps,
  ExperienceLocalePublishPayload,
  ExperienceProps,
  ExperienceQueryOptions,
} from '../../entities/experience'
import type { OptionalDefaults } from '../wrappers/wrap'

export type ExperiencePlainClientAPI = {
  /**
   * Fetches all experiences for a space and environment
   * @param params the space, environment IDs and query options (see {@link ExperienceQueryOptions})
   * @returns a collection of experiences
   * @throws if the request fails, or the space or environment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const experiences = await client.experience.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: {
   *     limit: 10,
   *   },
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { query: ExperienceQueryOptions }>,
  ): Promise<ExoCursorPaginatedCollectionProp<ExperienceProps>>

  /**
   * Fetches a single experience by ID
   * @param params the space ID, environment ID, and experience ID
   * @returns the experience
   * @throws if the request fails, or the space, environment, or experience is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const experience = await client.experience.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   experienceId: '<experience_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetExperienceParams>): Promise<ExperienceProps>

  /**
   * Creates a new experience
   * @param params the space ID and environment ID
   * @param rawData the experience data to create
   * @returns the created experience
   * @throws if the request fails
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const experience = await client.experience.create({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * }, {
   *   name: 'My Experience',
   *   description: 'A new experience',
   *   template: { sys: { type: 'Link', linkType: 'Template', id: '<template_id>' } },
   *   viewports: [],
   *   contentProperties: {},
   *   designProperties: {},
   *   dimensionKeyMap: { designProperties: {} },
   * });
   * ```
   */
  create(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    rawData: CreateExperienceProps,
  ): Promise<ExperienceProps>

  /**
   * Upserts an experience (creates or updates via PUT)
   * @param params the space ID, environment ID, and experience ID
   * @param rawData the experience data to upsert (include sys.version for updates, omit for creates)
   * @returns the upserted experience
   * @throws if the request fails
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const current = await client.experience.get({ experienceId: '<experience_id>' });
   * const updated = await client.experience.upsert({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   experienceId: '<experience_id>',
   * }, {
   *   sys: { id: current.sys.id, type: 'Experience', version: current.sys.version },
   *   name: 'Updated Experience',
   *   ...otherFields,
   * });
   * ```
   */
  upsert(
    params: OptionalDefaults<GetExperienceParams>,
    rawData: UpsertExperienceProps,
  ): Promise<ExperienceProps>

  /**
   * Deletes an experience
   * @param params the space ID, environment ID, and experience ID
   * @returns void
   * @throws if the request fails, or the experience is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * await client.experience.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   experienceId: '<experience_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetExperienceParams>): Promise<void>

  /**
   * Publishes an experience, optionally targeting specific locales.
   *
   * When called without a payload, the experience is fully published across all locales.
   * Pass `{ add: ['en-US'] }` to publish specific locales, or `{ remove: ['de-DE'] }`
   * to remove specific locales from an already-published experience.
   * The payload is a union — only `add` or `remove` can be sent per request, not both.
   *
   * @param params the space ID, environment ID, experience ID, and the version number
   * @param payload optional locale-based publish payload
   * @returns the published experience
   * @throws if the request fails, or the experience is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * // Full publish (all locales)
   * const experience = await client.experience.publish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   experienceId: '<experience_id>',
   *   version: 1,
   * });
   *
   * // Publish specific locales
   * const experience = await client.experience.publish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   experienceId: '<experience_id>',
   *   version: 1,
   * }, { add: ['en-US', 'de-DE'] });
   *
   * // Remove specific locales from publishing
   * const experience = await client.experience.publish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   experienceId: '<experience_id>',
   *   version: 1,
   * }, { remove: ['de-DE'] });
   * ```
   */
  publish(
    params: OptionalDefaults<GetExperienceParams & { version: number }>,
    payload?: ExperienceLocalePublishPayload,
  ): Promise<ExperienceProps>

  /**
   * Unpublishes an experience
   * @param params the space ID, environment ID, experience ID, and the version number
   * @returns the unpublished experience
   * @throws if the request fails, or the experience is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const experience = await client.experience.unpublish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   experienceId: '<experience_id>',
   *   version: <version>,
   * });
   * ```
   */
  unpublish(
    params: OptionalDefaults<GetExperienceParams & { version: number }>,
  ): Promise<ExperienceProps>
}
