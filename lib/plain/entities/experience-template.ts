import type {
  ExoCursorPaginatedCollectionProp,
  GetExperienceTemplateParams,
  GetSpaceEnvironmentParams,
} from '../../common-types'
import type {
  CreateExperienceTemplateProps,
  ExperienceTemplateProps,
  ExperienceTemplateQueryOptions,
  UpsertExperienceTemplateProps,
} from '../../entities/experience-template'
import type { OptionalDefaults } from '../wrappers/wrap'

export type ExperienceTemplatePlainClientAPI = {
  /**
   * Fetches all experience templates for a space and environment
   * @param params the space, environment IDs and query options (see {@link ExperienceTemplateQueryOptions})
   * @returns a collection of experience templates
   * @throws if the request fails, or the space or environment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const experienceTemplates = await client.experienceTemplate.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: {
   *     limit: 10,
   *   },
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { query: ExperienceTemplateQueryOptions }>,
  ): Promise<ExoCursorPaginatedCollectionProp<ExperienceTemplateProps>>

  /**
   * Fetches a single experience template by ID
   * @param params the space, environment, and experience template IDs
   * @returns the experience template
   * @throws if the request fails, or the space, environment, or experience template is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const experienceTemplate = await client.experienceTemplate.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   experienceTemplateId: '<experience_template_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetExperienceTemplateParams>): Promise<ExperienceTemplateProps>

  /**
   * Creates a new experience template
   * @param params the space and environment IDs
   * @param data the experience template data
   * @returns the created experience template
   * @throws if the request fails, or the space or environment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const experienceTemplate = await client.experienceTemplate.create({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * }, {
   *   name: 'My Experience Template',
   *   description: 'A new experience template',
   *   viewports: [],
   *   contentProperties: [],
   *   designProperties: [],
   * });
   * ```
   */
  create(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    data: CreateExperienceTemplateProps,
  ): Promise<ExperienceTemplateProps>

  /**
   * Upserts an experience template (creates or updates via PUT)
   * @param params the space, environment, and experience template IDs
   * @param data the experience template data to upsert (include sys.version for updates, omit for creates)
   * @returns the upserted experience template
   * @throws if the request fails
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const current = await client.experienceTemplate.get({ experienceTemplateId: '<experience_template_id>' });
   * const updated = await client.experienceTemplate.upsert({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   experienceTemplateId: '<experience_template_id>',
   * }, {
   *   sys: { id: current.sys.id, type: 'ExperienceTemplate', version: current.sys.version },
   *   name: 'Updated Experience Template',
   *   ...otherFields,
   * });
   * ```
   */
  upsert(
    params: OptionalDefaults<GetExperienceTemplateParams>,
    data: UpsertExperienceTemplateProps,
  ): Promise<ExperienceTemplateProps>

  /**
   * Deletes an experience template
   * @param params the space, environment, and experience template IDs
   * @throws if the request fails, or the space, environment, or experience template is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * await client.experienceTemplate.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   experienceTemplateId: '<experience_template_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetExperienceTemplateParams>): Promise<void>

  /**
   * Publishes an experience template
   * @param params the space, environment, and experience template IDs, plus the current version
   * @returns the published experience template
   * @throws if the request fails, or the space, environment, or experience template is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const experienceTemplate = await client.experienceTemplate.publish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   experienceTemplateId: '<experience_template_id>',
   *   version: 1,
   * });
   * ```
   */
  publish(
    params: OptionalDefaults<GetExperienceTemplateParams & { version: number }>,
  ): Promise<ExperienceTemplateProps>

  /**
   * Unpublishes an experience template
   * @param params the space, environment, and experience template IDs, plus the current version
   * @returns the unpublished experience template
   * @throws if the request fails, or the space, environment, or experience template is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const experienceTemplate = await client.experienceTemplate.unpublish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   experienceTemplateId: '<experience_template_id>',
   *   version: 2,
   * });
   * ```
   */
  unpublish(
    params: OptionalDefaults<GetExperienceTemplateParams & { version: number }>,
  ): Promise<ExperienceTemplateProps>
}
