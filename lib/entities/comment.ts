import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  BasicMetaSysProps,
  DefaultElements,
  GetCommentParams,
  GetEntryParams,
  GetSpaceEnvironmentParams,
  Link,
  MakeRequest,
  PaginationQueryOptions,
  SysLink,
} from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'

export interface LinkWithRef<T extends string> {
  sys: {
    type: 'Link'
    linkType: T
    id: string
    // Selected `ref` over explicit `version` for the future (e.g. `fields.de-DE.foo`)
    ref?: `version.${number}`
  }
}

export type CommentSysProps = Pick<
  BasicMetaSysProps,
  'id' | 'version' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'
> & {
  type: 'Comment'
  space: SysLink
  environment: SysLink
  parentEntity: Link<'Entry'> | LinkWithRef<'Workflow'>
}

export type CommentProps = {
  sys: CommentSysProps
  body: string
}

export type CreateCommentProps = Omit<CommentProps, 'sys'>
export type UpdateCommentProps = Omit<CommentProps, 'sys'> & {
  sys: Pick<CommentSysProps, 'version'>
}

// We keep this type as explicit as possible until we open up the comments entity further
export type GetCommentParentEntityParams = GetSpaceEnvironmentParams &
  (
    | {
        parentEntityType: 'Entry'
        parentEntityId: string
      }
    | {
        parentEntityType: 'Workflow'
        parentEntityId: string
        parentEntityVersion?: number
      }
  )
export type GetManyCommentsParams = GetEntryParams | GetCommentParentEntityParams
export type CreateCommentParams = GetEntryParams | GetCommentParentEntityParams
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
