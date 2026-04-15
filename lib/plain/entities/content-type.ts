/**
 * @module content-type
 * @category Plain Client
 */
import type { RawAxiosRequestHeaders } from 'axios'
import type {
  CollectionProp,
  CursorBasedParams,
  CursorPaginatedCollectionProp,
  GetContentTypeParams,
  GetSpaceEnvironmentParams,
  QueryParams,
} from '../../common-types'
import type { ContentTypeProps, CreateContentTypeProps } from '../../entities/content-type'
import type { OptionalDefaults } from '../wrappers/wrap'

export type ContentTypeAPI = {
  /**
   * Fetch a single content type by ID
   * @param params the content type ID, space and environment IDs, and optional query parameters
   * @returns the content type
   * @throws if the space, environment, or content type are not found
   * @example
   * ```javascript
   * const contentType = await client.contentType.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   contentTypeId: '<content_type_id>',
   * })
   * ```
   */
  get(params: OptionalDefaults<GetContentTypeParams & QueryParams>): Promise<ContentTypeProps>
  /**
   * Fetch all content types in an environment, using offset/limit pagination.
   * Use {@link getManyWithCursor} when you need cursor-based pagination over large result sets.
   * @param params the space and environment IDs, along with optional query parameters to filter results
   * @returns a collection of content types
   * @throws if the space or environment are not found
   * @example
   * ```javascript
   * const contentTypes = await client.contentType.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * })
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>,
  ): Promise<CollectionProp<ContentTypeProps>>
  /**
   * Fetch all content types in an environment, using cursor-based pagination.
   * Prefer this over {@link getMany} when iterating through large result sets,
   * as cursor pagination is more stable under concurrent writes.
   * @param params the space and environment IDs, along with cursor-based pagination parameters
   * @returns a cursor-paginated collection of content types
   * @throws if the space or environment are not found
   * @example
   * ```javascript
   * const contentTypes = await client.contentType.getManyWithCursor({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   * })
   * ```
   */
  getManyWithCursor(
    params: OptionalDefaults<GetSpaceEnvironmentParams & CursorBasedParams>,
  ): Promise<CursorPaginatedCollectionProp<ContentTypeProps>>
  /**
   * Update a content type by replacing its full field set.
   * Requires the content type's current `sys.version` in `rawData` for optimistic concurrency.
   * @param params the content type ID, space and environment IDs
   * @param rawData the complete updated content type data including the current `sys.version`
   * @returns the updated content type
   * @throws if the space, environment, or content type are not found, the version is stale, or `rawData` is invalid
   * @example
   * ```javascript
   * let contentType = await client.contentType.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   contentTypeId: '<content_type_id>',
   * })
   *
   * contentType = await client.contentType.update(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     contentTypeId: '<content_type_id>',
   *   },
   *   {
   *     ...contentType,
   *     name: 'Updated name',
   *   }
   * )
   * ```
   */
  update(
    params: OptionalDefaults<GetContentTypeParams>,
    rawData: ContentTypeProps,
    headers?: RawAxiosRequestHeaders,
  ): Promise<ContentTypeProps>
  /**
   * Delete a content type
   * @param params the content type ID, space and environment IDs
   * @throws if the space, environment, or content type are not found, or the content type is still published
   * @example
   * ```javascript
   * await client.contentType.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   contentTypeId: '<content_type_id>',
   * })
   * ```
   */
  delete(params: OptionalDefaults<GetContentTypeParams>): Promise<any>
  /**
   * Publish a content type, making it available for use in entries.
   * @param params the content type ID, space and environment IDs
   * @param rawData the current content type data (used for version validation)
   * @returns the published content type
   * @throws if the space, environment, or content type are not found, or validation fails
   * @example
   * ```javascript
   * const contentType = await client.contentType.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   contentTypeId: '<content_type_id>',
   * })
   *
   * const published = await client.contentType.publish(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     contentTypeId: '<content_type_id>',
   *   },
   *   contentType
   * )
   * ```
   */
  publish(
    params: OptionalDefaults<GetContentTypeParams>,
    rawData: ContentTypeProps,
  ): Promise<ContentTypeProps>
  /**
   * Unpublish a content type, preventing it from being used in new entries.
   * A content type cannot be unpublished if entries using it still exist.
   * @param params the content type ID, space and environment IDs
   * @returns the unpublished content type
   * @throws if the space, environment, or content type are not found, or entries still reference this content type
   * @example
   * ```javascript
   * const contentType = await client.contentType.unpublish({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   contentTypeId: '<content_type_id>',
   * })
   * ```
   */
  unpublish(params: OptionalDefaults<GetContentTypeParams>): Promise<ContentTypeProps>
  /**
   * Create a new content type with a system-generated ID
   * @param params the space and environment IDs
   * @param rawData the content type definition (name, description, fields)
   * @returns the created content type
   * @throws if the space or environment are not found, or `rawData` is invalid
   * @example
   * ```javascript
   * const contentType = await client.contentType.create(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *   },
   *   {
   *     name: 'Blog Post',
   *     fields: [
   *       { id: 'title', name: 'Title', type: 'Symbol', required: true },
   *       { id: 'body', name: 'Body', type: 'Text' },
   *     ],
   *   }
   * )
   * ```
   */
  create(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    rawData: CreateContentTypeProps,
  ): Promise<ContentTypeProps>
  /**
   * Create a new content type with a specific user-supplied ID
   * @param params the space and environment IDs and the desired content type ID
   * @param rawData the content type definition (name, description, fields)
   * @returns the created content type
   * @throws if the space or environment are not found, a content type with that ID already exists, or `rawData` is invalid
   * @example
   * ```javascript
   * const contentType = await client.contentType.createWithId(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     contentTypeId: 'blogPost',
   *   },
   *   {
   *     name: 'Blog Post',
   *     fields: [
   *       { id: 'title', name: 'Title', type: 'Symbol', required: true },
   *     ],
   *   }
   * )
   * ```
   */
  createWithId(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { contentTypeId: string }>,
    rawData: CreateContentTypeProps,
  ): Promise<ContentTypeProps>
  /**
   * Omit a field from a content type and then delete it in a single operation.
   * This is a convenience wrapper that handles the two-step omit-then-delete process
   * required by the CMA when removing a field that has existing entry data.
   * @param params the content type ID, space and environment IDs
   * @param contentType the current content type data
   * @param fieldId the ID of the field to omit and delete
   * @returns the updated content type with the field removed
   * @throws if the space, environment, content type, or field are not found
   * @example
   * ```javascript
   * const contentType = await client.contentType.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   contentTypeId: '<content_type_id>',
   * })
   *
   * const updated = await client.contentType.omitAndDeleteField(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     contentTypeId: '<content_type_id>',
   *   },
   *   contentType,
   *   'fieldToRemove'
   * )
   * ```
   */
  omitAndDeleteField(
    params: OptionalDefaults<GetContentTypeParams>,
    contentType: ContentTypeProps,
    fieldId: string,
  ): Promise<ContentTypeProps>
}
