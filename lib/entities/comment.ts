/**
 * @module
 * @category Entities
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import type { Node, Text } from '@contentful/rich-text-types'
import copy from 'fast-copy'
import type {
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

// PROPS //

interface LinkWithReference<T extends string> extends Link<T> {
  sys: Link<T>['sys'] & {
    ref: string
  }
}

/** System metadata properties of a comment. */
export type CommentSysProps = Pick<
  BasicMetaSysProps,
  'id' | 'version' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'
> & {
  type: 'Comment'
  space: SysLink
  environment: SysLink
  parentEntity:
    | Link<'ContentType'>
    | LinkWithReference<'ContentType'>
    | Link<'Entry'>
    | LinkWithReference<'Entry'>
    | VersionedLink<'Workflow'>
  parent: Link<'Comment'> | null
}

/** Identifier for plain-text comment body format. */
export type PlainTextBodyProperty = 'plain-text'
/** Identifier for rich-text comment body format. */
export type RichTextBodyProperty = 'rich-text'

/** Specifies that the comment body should be in rich-text format. */
export type RichTextBodyFormat = { bodyFormat: RichTextBodyProperty }
/** Specifies that the comment body should be in plain-text format (default). */
export type PlainTextBodyFormat = { bodyFormat?: PlainTextBodyProperty }

/** Possible statuses of a comment. */
export type CommentStatus = 'active' | 'resolved'

/** Properties of a Contentful comment. */
export type CommentProps = {
  sys: CommentSysProps
  body: string
  status: CommentStatus
}

/** Properties required to create a new comment. */
export type CreateCommentProps = Omit<CommentProps, 'sys' | 'status'> & { status?: CommentStatus }
/** Properties required to update an existing comment. */
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
/** A mention node referencing a user or team within a rich-text comment. */
export interface Mention {
  nodeType: CommentNode.Mention
  data: { target: Link<'User'> | Link<'Team'> }
  content: Text[]
}

/** A top-level paragraph node in a rich-text comment document. */
export interface RootParagraph extends Node {
  nodeType: CommentNode.Paragraph
  content: (Text | Mention)[]
}

// Add "extends Document" as soon as rich-text-types supports mentions.
/** A rich-text document structure for comment bodies. */
export interface RichTextCommentDocument extends Node {
  nodeType: CommentNode.Document
  content: RootParagraph[]
}

/** Payload containing a rich-text comment body. */
export type RichTextCommentBodyPayload = { body: RichTextCommentDocument }

/** Properties of a comment with a rich-text body. */
export type RichTextCommentProps = Omit<CommentProps, 'body'> & RichTextCommentBodyPayload

// PARAMS //

// We keep this type as explicit as possible until we open up the comments entity further
/** Parameters for identifying the parent entity of a comment. */
export type GetCommentParentEntityParams = GetSpaceEnvironmentParams &
  (
    | {
        parentEntityType: 'ContentType'
        parentEntityId: string
        parentEntityReference?: string
      }
    | {
        parentEntityType: 'Entry'
        parentEntityId: string
        parentEntityReference?: string
      }
    | {
        parentEntityType: 'Workflow'
        parentEntityId: string
        parentEntityVersion?: number
      }
  )

/** Parameters for retrieving multiple comments. */
export type GetManyCommentsParams = (GetEntryParams | GetCommentParentEntityParams) & {
  status?: CommentStatus
}
/** Parameters for creating a new comment. */
export type CreateCommentParams = (GetEntryParams | GetCommentParentEntityParams) & {
  parentCommentId?: string
}
/** Parameters for updating an existing comment. */
export type UpdateCommentParams = GetCommentParams
/** Parameters for deleting a comment, including its version for optimistic locking. */
export type DeleteCommentParams = GetCommentParams & {
  version: number
}

// NESTED CLIENT //

type CommentApi = {
  update(): Promise<Comment | RichTextComment>
  delete(): Promise<void>
}

/** A Contentful plain-text comment with methods for updating and deleting. */
export interface Comment extends CommentProps, DefaultElements<CommentProps>, CommentApi {}

/** A Contentful rich-text comment with methods for updating and deleting. */
export interface RichTextComment
  extends Omit<CommentProps, 'body'>,
    RichTextCommentProps,
    DefaultElements<CommentProps>,
    CommentApi {}

/**
 * @internal
 */
export default function createCommentApi(makeRequest: MakeRequest): CommentApi {
  const getParams = (comment: CommentProps): GetCommentParams => ({
    spaceId: comment.sys.space.sys.id,
    environmentId: comment.sys.environment.sys.id,
    entryId: comment.sys.parentEntity.sys.id,
    commentId: comment.sys.id,
  })

  return {
    update: async function () {
      const raw = this.toPlainObject() as CommentProps

      const data = await makeRequest({
        entityType: 'Comment',
        action: 'update',
        params: getParams(raw),
        payload: raw,
      })
      return wrapComment(makeRequest, data)
    },

    delete: async function () {
      const raw = this.toPlainObject() as CommentProps

      await makeRequest({
        entityType: 'Comment',
        action: 'delete',
        params: {
          ...getParams(raw),
          version: raw.sys.version,
        },
      })
    },
  }
}

/**
 * @internal
 */
export function wrapComment(
  makeRequest: MakeRequest,
  data: CommentProps | RichTextCommentProps,
): Comment | RichTextComment {
  const comment = toPlainObject(copy(data))
  const commentWithMethods = enhanceWithMethods(comment, createCommentApi(makeRequest))
  return freezeSys(commentWithMethods) as Comment | RichTextComment
}

/**
 * @internal
 */
export const wrapCommentCollection = wrapCollection(wrapComment)
