import { RawAxiosRequestHeaders } from 'axios'
import { CollectionProp, GetCommentParams, QueryParams } from '../../common-types'
import {
  CommentProps,
  CreateCommentParams,
  CreateCommentProps,
  DeleteCommentParams,
  GetManyCommentsParams,
  PlainTextBodyFormat,
  RichTextBodyFormat,
  RichTextCommentBodyPayload,
  RichTextCommentProps,
  UpdateCommentParams,
  UpdateCommentProps,
} from '../../entities/comment'
import { OptionalDefaults } from '../wrappers/wrap'

export type CommentPlainClientAPI = {
  /** Fetches a plain text comment
   *
   * @param params Space ID, Comment ID, Entry ID, Environment ID
   * @returns the plain text comment
   * @throws if the request fails, or the comment is not found
   * @example
   * ```javascript
   * const comment = await client.comment.get({
   *   spaceId: '<space_id>',
   *   commentId: '<comment_id>',
   *   entryId: '<entry_id>',
   *   environmentId: '<environment_id>',
   *   bodyFormat: 'plain-text',
   * });
   * ```
   * */
  get(params: OptionalDefaults<GetCommentParams> & PlainTextBodyFormat): Promise<CommentProps>
  /** Fetches a rich text comment
   *
   * @param params Space ID, Comment ID, Entry ID, Environment ID
   * @returns the rich text comment
   * @throws if the request fails, or the comment is not found
   * @example
   * ```javascript
   * const comment = await client.comment.get({
   *   spaceId: '<space_id>',
   *   commentId: '<comment_id>',
   *   entryId: '<entry_id>',
   *   environmentId: '<environment_id>',
   *   bodyFormat: 'rich-text',
   * });
   * ```
   * */
  get(
    params: OptionalDefaults<GetCommentParams> & RichTextBodyFormat
  ): Promise<RichTextCommentProps>
  /** Fetches all plain text comments on an entry
   *
   * @param params Space ID, Entry ID, Environment ID, and query parameters
   * @returns a collection of plain text comments
   * @throws if the request fails or the comments are not found
   * @example
   * ```javascript
   * const comments = await client.comment.getMany({
   *   spaceId: '<space_id>',
   *   entryId: '<entry_id>',
   *   environmentId: '<environment_id>',
   *   bodyFormat: 'plain-text',
   *   query: {
   *    limit: 100,
   *   }
   * });
   * ```
   * */
  getMany(
    params: OptionalDefaults<GetManyCommentsParams & PlainTextBodyFormat & QueryParams>
  ): Promise<CollectionProp<CommentProps>>
  /** Fetches all rich text comments on an entry
   *
   * @param params Space ID, Entry ID, Environment ID, and query parameters
   * @returns a collection of rich text comments
   * @throws if the request fails or the comments are not found
   * @example
   * ```javascript
   * const comments = await client.comment.getMany({
   *   spaceId: '<space_id>',
   *   entryId: '<entry_id>',
   *   environmentId: '<environment_id>',
   *   bodyFormat: 'rich-text',
   *   query: {
   *    limit: 100,
   *   }
   * });
   * ```
   * */
  getMany(
    params: OptionalDefaults<GetManyCommentsParams & QueryParams & RichTextBodyFormat>
  ): Promise<CollectionProp<RichTextCommentProps>>
  /** Creates a plain text comment
   *
   * @param params
   * @returns a plain text comment
   * @throws if the request fails, the entry is not found, or the payload is malformed
   * @example
   * ```javascript
   * const comment = await client.comment.create(
   *   {
   *     spaceId: '<space_id>',
   *     entryId: '<entry_id>',
   *     environmentId: '<environment_id>',
   *     bodyFormat: 'plain-text',
   *   },
   *   {
   *     body: 'Looks good to me!',
   *     status: 'active',
   *   }
   * );
   * ```
   */
  create(
    params: OptionalDefaults<CreateCommentParams>,
    rawData: CreateCommentProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<CommentProps>
  /** Creates a rich text comment
   *
   * @param params
   * @returns a rich text comment
   * @throws if the request fails, the entry is not found, or the payload is malformed
   * @example
   * ```javascript
   * const comment = await client.comment.create(
   *   {
   *     spaceId: '<space_id>',
   *     entryId: '<entry_id>',
   *     environmentId: '<environment_id>',
   *     bodyFormat: 'rich-text',
   *   },
   *   {
   *     body: 'Looks good to me!',
   *     status: 'active',
   *   }
   * );
   * ```
   */
  create(
    params: OptionalDefaults<CreateCommentParams>,
    rawData: RichTextCommentBodyPayload,
    headers?: RawAxiosRequestHeaders
  ): Promise<RichTextCommentProps>
  /** Updates a plain text comment
   *
   * @param params
   * @returns a plain text comment
   * @throws if the request fails, the comment is not found, or the payload is malformed
   * @example
   * ```javascript
   * let comment = await client.comment.get({
   *   spaceId: '<space_id>',
   *   commentId: '<comment_id>',
   *   entryId: '<entry_id>',
   *   environmentId: '<environment_id>',
   *   bodyFormat: 'plain-text',
   * });
   *
   * comment = await client.comment.update(
   *   {
   *     spaceId: '<space_id>',
   *     commentId: '<comment_id>',
   *     entryId: '<entry_id>',
   *     environmentId: '<environment_id>',
   *   },
   *   {
   *     ...comment,
   *     text: 'This is a new comment.',
   *   }
   * );
   * ```
   */
  update(
    params: OptionalDefaults<UpdateCommentParams>,
    rawData: UpdateCommentProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<CommentProps>
  /** Updates a plain text comment
   *
   * @param params
   * @returns a rich text comment
   * @throws if the request fails, the comment is not found, or the payload is malformed
   * @example
   * ```javascript
   * let comment = await client.comment.get({
   *   spaceId: '<space_id>',
   *   commentId: '<comment_id>',
   *   entryId: '<entry_id>',
   *   environmentId: '<environment_id>',
   *   bodyFormat: 'rich-text',
   * });
   *
   * comment = await client.comment.update(
   *   {
   *     spaceId: '<space_id>',
   *     commentId: '<comment_id>',
   *     entryId: '<entry_id>',
   *     environmentId: '<environment_id>',
   *   },
   *   {
   *     ...comment,
   *     text: 'This is a new comment.',
   *   }
   * );
   * ```
   */
  update(
    params: OptionalDefaults<UpdateCommentParams>,
    rawData: Omit<UpdateCommentProps, 'body'> & RichTextCommentBodyPayload,
    headers?: RawAxiosRequestHeaders
  ): Promise<RichTextCommentProps>
  /** Deletes a comment
   *
   * @param params
   * @returns void
   * @throws if the request fails, or the comment is not found
   * @example
   * ```javascript
   * await client.comment.delete({
   *   spaceId: '<space_id>',
   *   commentId: '<comment_id>',
   *   entryId: '<entry_id>',
   *   environmentId: '<environment_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<DeleteCommentParams>): Promise<void>
}
