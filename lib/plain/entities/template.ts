import type {
  CursorPaginatedCollectionProp,
  GetSpaceEnvironmentParams,
  GetTemplateParams,
} from '../../common-types'
import type {
  CreateTemplateProps,
  TemplateProps,
  TemplateQueryOptions,
  UpdateTemplateProps,
} from '../../entities/template'
import type { OptionalDefaults } from '../wrappers/wrap'

export type TemplatePlainClientAPI = {
  /**
   * Fetches all templates for a space and environment
   * @param params the space, environment IDs and query options (see {@link TemplateQueryOptions})
   * @returns a collection of templates
   * @throws if the request fails, or the space or environment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const templates = await client.template.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: {
   *     limit: 10,
   *   },
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { query: TemplateQueryOptions }>,
  ): Promise<CursorPaginatedCollectionProp<TemplateProps>>

  /**
   * Fetches a single template by ID
   * @param params the space, environment, and template IDs
   * @returns the template
   * @throws if the request fails, or the space, environment, or template is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const template = await client.template.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   templateId: '<template_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetTemplateParams>): Promise<TemplateProps>

  /**
   * Creates a new template
   * @param params the space and environment IDs
   * @param data the template data
   * @returns the created template
   * @throws if the request fails, or the space or environment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  create(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    data: CreateTemplateProps,
  ): Promise<TemplateProps>

  /**
   * Updates a template (upsert)
   * @param params the space, environment, and template IDs
   * @param data the template data (including sys.version for optimistic locking)
   * @returns the updated template
   * @throws if the request fails, or the space, environment, or template is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  update(
    params: OptionalDefaults<GetTemplateParams>,
    data: UpdateTemplateProps,
  ): Promise<TemplateProps>

  /**
   * Deletes a template
   * @param params the space, environment, and template IDs
   * @throws if the request fails, or the space, environment, or template is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   */
  delete(params: OptionalDefaults<GetTemplateParams>): Promise<void>
}
