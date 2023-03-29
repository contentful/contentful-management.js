import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import { Node, Text } from '@contentful/rich-text-types'
import copy from 'fast-copy'
import {
  BasicMetaSysProps,
  DefaultElements,
  GetCommentParams,
  GetEntryParams,
  GetSpaceEnvironmentParams,
  Link,
  MakeRequest,
  SysLink,
  VersionedLink,
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
  parentEntity: Link<'Entry'> | VersionedLink<'Workflow'>
  parent: Link<'Comment'> | null
}

export type PlainTextBodyProperty = 'plain-text'
export type RichTextBodyProperty = 'rich-text'

export type RichTextBodyFormat = { bodyFormat: RichTextBodyProperty }
export type PlainTextBodyFormat = { bodyFormat?: PlainTextBodyProperty }

export type CommentProps = {
  sys: CommentSysProps
  body: string
}

export type CreateCommentProps = Omit<CommentProps, 'sys'>
export type UpdateCommentProps = Omit<CommentProps, 'sys'> & {
  sys: Pick<CommentSysProps, 'version'>
}

// Remove and replace with BLOCKS as soon as rich-text-types supports mentions
export enum CommentNode {
  Document = 'document',
  Paragraph = 'paragraph',
  Mention = 'mention',
}

// Add "extends Block" as soon as rich-text-types supports mentions
export interface Mention {
  nodeType: CommentNode.Mention
  data: { target: Link<'User'> }
  content: Text[]
}

export interface RootParagraph extends Node {
  nodeType: CommentNode.Paragraph
  content: (Text | Mention)[]
}

// Add "extends Document" as soon as rich-text-types supports mentions.
export interface RichTextCommentDocument extends Node {
  nodeType: CommentNode.Document
  content: RootParagraph[]
}

export type RichTextCommentBodyPayload = { body: RichTextCommentDocument }

export type RichTextCommentProps = Omit<CommentProps, 'body'> & RichTextCommentBodyPayload

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
  update(): Promise<Comment | RichTextComment>
  delete(): Promise<void>
}

export interface Comment extends CommentProps, DefaultElements<CommentProps>, CommentApi {}

export interface RichTextComment
  extends Omit<CommentProps, 'body'>,
    RichTextCommentProps,
    DefaultElements<CommentProps>,
    CommentApi {}

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
export function wrapComment(
  makeRequest: MakeRequest,
  data: CommentProps | RichTextCommentProps
): Comment | RichTextComment {
  const comment = toPlainObject(copy(data))
  const commentWithMethods = enhanceWithMethods(comment, createCommentApi(makeRequest))
  return freezeSys(commentWithMethods) as Comment | RichTextComment
}

/**
 * @private
 */
export const wrapCommentCollection = wrapCollection(wrapComment)
