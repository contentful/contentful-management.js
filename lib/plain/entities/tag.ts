import type { RawAxiosRequestHeaders } from 'axios'
import type {
  GetTagParams,
  GetSpaceEnvironmentParams,
  QueryParams,
  CollectionProp,
} from '../../common-types'
import type { UpdateTagProps, DeleteTagParams } from '../../entities/tag'
import type { TagProps, CreateTagProps } from '../../export-types'
import type { OptionalDefaults } from '../wrappers/wrap'

export type TagPlainClientAPI = {
  /**
   * Fetch a single tag by ID
   * @param params the tag ID and the IDs of the space and environment
   * @returns the tag
   * @throws if the space, environment, or tag are not found
   * @example
   * ```javascript
   * const tag = await client.tag.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   tagId: '<tag_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetTagParams>): Promise<TagProps>
  /**
   * Fetch all tags in a space and environment
   * @param params the space and environment IDs, along with optional query parameters to filter results
   * @returns a collection of tags
   * @throws if the space or environment are not found
   * @example
   * ```javascript
   * const tags = await client.tag.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: {
   *     limit: 10,
   *   },
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>,
  ): Promise<CollectionProp<TagProps>>
  /**
   * Create a new tag
   * @param params the space and environment ID to create the tag in
   * @param data the tag data
   * @returns the created tag
   * @throws if the space or environment are not found or the payload is malformed
   * @example
   * ```javascript
   * const tag = await client.tag.createWithId({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   tagId: '<tag_id>'
   * }, {
   *   name: '<tag_name>',
   *   sys: {
   *     visibility: "public",
   *   }
   * });
   * ```
   */
  createWithId(params: OptionalDefaults<GetTagParams>, rawData: CreateTagProps): Promise<TagProps>
  /**
   * Update a tag
   * @param params the space, environment, and tag IDs
   * @param rawData the updated tag data
   * @returns the updated tag
   * @throws if the space, environment, or tag are not found, or the payload is malformed
   * @example
   * ```javascript
   * let tag = await client.tag.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   tagId: '<tag_id>',
   * });
   *
   * tag = await client.tag.update(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     tagId: '<tag_id>',
   *   },
   *   {
   *     ...tag,
   *     name: 'New Name',
   *   }
   * );
   * ```
   */
  update(
    params: OptionalDefaults<GetTagParams>,
    rawData: UpdateTagProps,
    headers?: RawAxiosRequestHeaders,
  ): Promise<TagProps>
  /**
   * Delete a single tag by ID and version
   * @param params the tag ID, version, and the IDs of the space and environment
   * @throws if the space, environment, tag, or tag version are not found
   * @example
   * ```javascript
   * await client.tag.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   tagId: '<tag_id>',
   *   version: <tag_version>,
   * });
   * ```
   */
  delete(params: OptionalDefaults<DeleteTagParams>): Promise<any>
}
