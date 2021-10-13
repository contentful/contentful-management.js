import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  BasicMetaSysProps,
  DefaultElements,
  GetCommentParams,
  GetEntryParams,
  Link,
  MakeRequest,
  SysLink,
} from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'

export type CommentSysProps = Pick<
  BasicMetaSysProps,
  'id' | 'version' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'
> & {
  type: 'Comment'
  space: SysLink
  environment: SysLink
  parentEntity: Link<'Entry'>
}

export type CommentProps = {
  sys: CommentSysProps
  body: string
}

export type CreateCommentProps = Omit<CommentProps, 'sys'>
export type UpdateCommentProps = Omit<CommentProps, 'sys'> & {
  sys: Pick<CommentSysProps, 'version'>
}

export type CreateCommentParams = GetEntryParams
export type UpdateCommentParams = GetCommentParams
export type DeleteCommentParams = GetCommentParams & { version: number }

type CommentApi = {
  update(): Promise<Comment>
  delete(): Promise<void>
}

export interface Comment extends CommentProps, DefaultElements<CommentProps>, CommentApi {}

/**
 * @private
 */
export default function createCommentApi(makeRequest: MakeRequest): CommentApi {
  const getParams = (comment: CommentProps): GetCommentParams => ({
    spaceId: comment.sys.space.sys.id,
    environmentId: comment.sys.environment.sys.id,
    entryId: comment.sys.parentEntity.sys.id,
    commentId: comment.sys.id,
  })

  return {
    update: function () {
      const raw = this.toPlainObject() as CommentProps

      return makeRequest({
        entityType: 'Comment',
        action: 'update',
        params: getParams(raw),
        payload: raw,
      }).then((data) => wrapComment(makeRequest, data))
    },

    delete: function () {
      const raw = this.toPlainObject() as CommentProps

      return makeRequest({
        entityType: 'Comment',
        action: 'delete',
        params: {
          ...getParams(raw),
          version: raw.sys.version,
        },
      }).then(() => {
        // noop
      })
    },
  }
}

/**
 * @private
 */
export function wrapComment(makeRequest: MakeRequest, data: CommentProps): Comment {
  const comment = toPlainObject(copy(data))
  const commentWithMethods = enhanceWithMethods(comment, createCommentApi(makeRequest))
  return freezeSys(commentWithMethods)
}

/**
 * @private
 */
export const wrapCommentCollection = wrapCollection(wrapComment)
