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
  /** Fetches a comment
   *
   * @param params Space ID, Comment ID, Entry ID, Environment ID
   * @returns the comment
   * @throws if the request fails, or the comment is not found
   * @example
   * ```javascript
   * const comment = await client.comment.get({
   *  spaceId: '<space_id>',
   *  commentId: '<comment_id>',
   *  entryId: '<entry_id>',
   *  environmentId: '<environment_id>',
   *  bodyFormat: 'plain-text',
   * });
   * ```
   * */
  get(params: OptionalDefaults<GetCommentParams> & PlainTextBodyFormat): Promise<CommentProps>
  /** Fetches a comment
   *
   * @param params Space ID, Comment ID, Entry ID, Environment ID
   * @returns the comment
   * @throws if the request fails, or the comment is not found
   * @example
   * ```javascript
   * const comment = await client.comment.get({
   *  spaceId: '<space_id>',
   *  commentId: '<comment_id>',
   *  entryId: '<entry_id>',
   *  environmentId: '<environment_id>',
   *  bodyFormat: 'rich-text',
   * });
   * ```
   * */
  get(
    params: OptionalDefaults<GetCommentParams> & RichTextBodyFormat
  ): Promise<RichTextCommentProps>
  /** Fetches all comments
   *
   * @param params Space ID, Entry ID, Environment ID, and query parameters
   * @returns a collection of comments
   * @throws if the request fails or the comments are not found
   * @example
   * ```javascript
   * const comments = await client.comment.getMany({
   *  spaceId: '<space_id>',
   *  entryId: '<entry_id>',
   *  environmentId: '<environment_id>',
   *  bodyFormat: 'plain-text',
   *  query: {
   *   limit: 100,
   *  }
   * });
   * ```
   * */
  getMany(
    params: OptionalDefaults<GetManyCommentsParams & PlainTextBodyFormat & QueryParams>
  ): Promise<CollectionProp<CommentProps>>
  /** Fetches all comments
   *
   * @param params Space ID, Entry ID, Environment ID, and query parameters
   * @returns a collection of comments
   * @throws if the request fails or the comments are not found
   * @example
   * ```javascript
   * const comments = await client.comment.getMany({
   *  spaceId: '<space_id>',
   *  entryId: '<entry_id>',
   *  environmentId: '<environment_id>',
   *  bodyFormat: 'rich-text',
   *  query: {
   *   limit: 100,
   *  }
   * });
   * ```
   * */
  getMany(
    params: OptionalDefaults<GetManyCommentsParams & QueryParams & RichTextBodyFormat>
  ): Promise<CollectionProp<RichTextCommentProps>>
  /** Creates a comment
   *
   * @param params
   * @returns a comment
   * @throws if the request fails, the entry is not found, or the payload is malformed
   * @example
   * ```javascript
   * const comment = await client.comment.create({
   *  spaceId: '<space_id>',
   *  entryId: '<entry_id>',
   *  environmentId: '<environment_id>',
   *  bodyFormat: 'plain-text',
   * },
   * {
   *  body: 'Looks good to me!',
   *  status: 'active',
   * });
   * ```
   */
  create(
    params: OptionalDefaults<CreateCommentParams>,
    rawData: CreateCommentProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<CommentProps>
  /** Creates a comment
   *
   * @param params
   * @returns a comment
   * @throws if the request fails, the entry is not found, or the payload is malformed
   * @example
   * ```javascript
   * const comment = await client.comment.create({
   *  spaceId: '<space_id>',
   *  entryId: '<entry_id>',
   *  environmentId: '<environment_id>',
   *  bodyFormat: 'rich-text',
   * },
   * {
   *  body: 'Looks good to me!',
   *  status: 'active',
   * });
   * ```
   */
  create(
    params: OptionalDefaults<CreateCommentParams>,
    rawData: RichTextCommentBodyPayload,
    headers?: RawAxiosRequestHeaders
  ): Promise<RichTextCommentProps>
  /** Updates a comment
   *
   * @param params
   * @returns a comment
   * @throws if the request fails, the comment is not found, or the payload is malformed
   * @example
   * ```javascript
   * const comment = await client.comment.update({
   *  spaceId: '<space_id>',
   *  commentId: '<comment_id>',
   *  entryId: '<entry_id>',
   *  environmentId: '<environment_id>',
   *  bodyFormat: 'plain-text',
   * },
   * {
   *  body: 'Looks good to me!',
   *  status: 'active',
   * });
   * ```
   */
  update(
    params: OptionalDefaults<UpdateCommentParams>,
    rawData: UpdateCommentProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<CommentProps>
  /** Updates a comment
   *
   * @param params
   * @returns a comment
   * @throws if the request fails, the comment is not found, or the payload is malformed
   * @example
   * ```javascript
   * const comment = await client.comment.update({
   *  spaceId: '<space_id>',
   *  commentId: '<comment_id>',
   *  entryId: '<entry_id>',
   *  environmentId: '<environment_id>',
   *  bodyFormat: 'rich-text',
   * },
   * {
   *  body: 'Looks good to me!',
   *  status: 'active',
   * });
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
   * @throws if the request fails, or the comment is not found
   * @example
   * ```javascript
   * await client.comment.delete({
   *  spaceId: '<space_id>',
   *  commentId: '<comment_id>',
   *  entryId: '<entry_id>',
   *  environmentId: '<environment_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<DeleteCommentParams>): Promise<void>
}
