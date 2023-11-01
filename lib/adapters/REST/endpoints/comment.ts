import { AxiosInstance, RawAxiosRequestHeaders } from 'axios'
import copy from 'fast-copy'
import { SetOptional } from 'type-fest'
import {
  CollectionProp,
  GetEntryParams,
  GetCommentParams,
  GetSpaceEnvironmentParams,
  QueryParams,
} from '../../../common-types'
import {
  CreateCommentParams,
  CreateCommentProps,
  DeleteCommentParams,
  CommentProps,
  UpdateCommentProps,
  GetManyCommentsParams,
  PlainTextBodyFormat,
  RichTextBodyFormat,
  RichTextCommentBodyPayload,
} from '../../../entities/comment'
import { RestEndpoint } from '../types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

const VERSION_HEADER = 'X-Contentful-Version'
const BODY_FORMAT_HEADER = 'x-contentful-comment-body-format'
const PARENT_ENTITY_REFERENCE_HEADER = 'x-contentful-parent-entity-reference'
const PARENT_COMMENT_ID_HEADER = 'x-contentful-parent-id'

const getSpaceEnvBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}`
const getEntityCommentUrl = (params: GetCommentParams) =>
  `${getEntityBaseUrl(params)}/${params.commentId}`

function getParentPlural(parentEntityType: 'ContentType' | 'Entry' | 'Workflow') {
  switch (parentEntityType) {
    case 'ContentType':
      return 'content_types'
    case 'Entry':
      return 'entries'
    case 'Workflow':
      return 'workflows'
  }
}

/**
 * Comments can be added to a content type, an entry, and a workflow. Workflow comments requires a version
 * to be set as part of the URL path. Workflow comments only support `create` (with
 * versionized URL) and `getMany` (without version). The API might support more methods
 * in the future with new use cases being discovered.
 */
const getEntityBaseUrl = (paramsOrg: GetEntryParams | GetManyCommentsParams) => {
  const params: GetManyCommentsParams =
    'entryId' in paramsOrg
      ? {
          spaceId: paramsOrg.spaceId,
          environmentId: paramsOrg.environmentId,
          parentEntityType: 'Entry' as const,
          parentEntityId: paramsOrg.entryId,
        }
      : paramsOrg

  const { parentEntityId, parentEntityType } = params
  const parentPlural = getParentPlural(parentEntityType)
  const versionPath =
    'parentEntityVersion' in params ? `/versions/${params.parentEntityVersion}` : ''
  return `${getSpaceEnvBaseUrl(params)}/${parentPlural}/${parentEntityId}${versionPath}/comments`
}

export const get: RestEndpoint<'Comment', 'get'> = (
  http: AxiosInstance,
  params: GetCommentParams & (PlainTextBodyFormat | RichTextBodyFormat)
) =>
  raw.get<CommentProps>(http, getEntityCommentUrl(params), {
    headers:
      params.bodyFormat === 'rich-text'
        ? {
            [BODY_FORMAT_HEADER]: params.bodyFormat,
          }
        : {},
  })

export const getMany: RestEndpoint<'Comment', 'getMany'> = (
  http: AxiosInstance,
  params: GetManyCommentsParams & QueryParams & (PlainTextBodyFormat | RichTextBodyFormat)
) =>
  raw.get<CollectionProp<CommentProps>>(http, getEntityBaseUrl(params), {
    params: normalizeSelect(params.query),
    headers:
      params.bodyFormat === 'rich-text'
        ? {
            [BODY_FORMAT_HEADER]: params.bodyFormat,
          }
        : {},
  })

export const create: RestEndpoint<'Comment', 'create'> = (
  http: AxiosInstance,
  params: CreateCommentParams,
  rawData: CreateCommentProps | RichTextCommentBodyPayload
) => {
  const data = copy(rawData)
  return raw.post<CommentProps>(http, getEntityBaseUrl(params), data, {
    headers: {
      ...(typeof rawData.body !== 'string' ? { [BODY_FORMAT_HEADER]: 'rich-text' } : {}),
      ...('parentEntityReference' in params && params.parentEntityReference
        ? { [PARENT_ENTITY_REFERENCE_HEADER]: params.parentEntityReference }
        : {}),
      ...(params.parentCommentId ? { [PARENT_COMMENT_ID_HEADER]: params.parentCommentId } : {}),
    },
  })
}

export const update: RestEndpoint<'Comment', 'update'> = (
  http: AxiosInstance,
  params: GetCommentParams,
  rawData: UpdateCommentProps | (Omit<UpdateCommentProps, 'body'> & RichTextCommentBodyPayload),
  headers?: RawAxiosRequestHeaders
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys

  return raw.put<CommentProps>(http, getEntityCommentUrl(params), data, {
    headers: {
      [VERSION_HEADER]: rawData.sys.version ?? 0,
      ...(typeof rawData.body !== 'string' ? { [BODY_FORMAT_HEADER]: 'rich-text' } : {}),
      ...headers,
    },
  })
}

export const del: RestEndpoint<'Comment', 'delete'> = (
  http: AxiosInstance,
  { version, ...params }: DeleteCommentParams
) => {
  return raw.del(http, getEntityCommentUrl(params), {
    headers: { [VERSION_HEADER]: version },
  })
}

// Add a deprecation notice. But `getAll` may never be removed for app compatibility reasons.
/**
 * @deprecated use `getMany` instead.
 */
export const getAll: RestEndpoint<'Comment', 'getAll'> = getMany
