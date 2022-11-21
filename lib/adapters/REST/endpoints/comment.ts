import { AxiosInstance, AxiosRequestHeaders } from 'axios'
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
} from '../../../entities/comment'
import { RestEndpoint } from '../types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

const getSpaceEnvBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}`
const getEntryBaseUrl = (params: GetEntryParams) =>
  `${getSpaceEnvBaseUrl(params)}/entries/${params.entryId}/comments`
const getEntryCommentUrl = (params: GetCommentParams) =>
  `${getEntryBaseUrl(params)}/${params.commentId}`

/**
 * Comments can be added to either an entry or a workflow. The latter one requires a version
 * to be set as part of the URL path. Workflow comments only support `create` (with
 * versionized URL) and `getMany` (without version). The API might support more methods
 * in the future with new use cases being discovered.
 */
const getEntityBaseUrl = (params: GetEntryParams | GetManyCommentsParams) => {
  if ('entryId' in params) {
    return getEntryBaseUrl(params)
  }
  const { parentEntityId, parentEntityType } = params
  // No need for mapping or switch-case as long as there are only two supported cases
  const parentPlural = parentEntityType === 'Workflow' ? 'workflows' : 'entries'
  const versionPath =
    'parentEntityVersion' in params ? `/version/${params.parentEntityVersion}` : ''
  return `${getSpaceEnvBaseUrl(params)}/${parentPlural}/${parentEntityId}${versionPath}/comments`
}

export const get: RestEndpoint<'Comment', 'get'> = (
  http: AxiosInstance,
  params: GetCommentParams
) => raw.get<CommentProps>(http, getEntryCommentUrl(params))

export const getMany: RestEndpoint<'Comment', 'getMany'> = (
  http: AxiosInstance,
  params: GetManyCommentsParams & QueryParams
) =>
  raw.get<CollectionProp<CommentProps>>(http, getEntityBaseUrl(params), {
    params: normalizeSelect(params.query),
  })

export const create: RestEndpoint<'Comment', 'create'> = (
  http: AxiosInstance,
  params: CreateCommentParams,
  rawData: CreateCommentProps
) => {
  const data = copy(rawData)
  return raw.post<CommentProps>(http, getEntityBaseUrl(params), data)
}

export const update: RestEndpoint<'Comment', 'update'> = (
  http: AxiosInstance,
  params: GetCommentParams,
  rawData: UpdateCommentProps,
  headers?: AxiosRequestHeaders
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys

  return raw.put<CommentProps>(http, getEntryCommentUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del: RestEndpoint<'Comment', 'delete'> = (
  http: AxiosInstance,
  { version, ...params }: DeleteCommentParams
) => {
  return raw.del(http, getEntryCommentUrl(params), { headers: { 'X-Contentful-Version': version } })
}

// Add a deprecation notive. But `getAll` may never be removed for app compatibility reasons.
/**
 * @deprecated use `getMany` instead.
 */
export const getAll: RestEndpoint<'Comment', 'getAll'> = getMany
