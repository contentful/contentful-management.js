import { AxiosInstance, AxiosRequestHeaders } from 'axios'
import copy from 'fast-copy'
import { SetOptional } from 'type-fest'
import {
  CollectionProp,
  GetEntryParams,
  GetCommentParams,
  QueryParams,
} from '../../../common-types'
import {
  CreateCommentParams,
  CreateCommentProps,
  DeleteCommentParams,
  CommentProps,
  UpdateCommentProps,
} from '../../../entities/comment'
import { RestEndpoint } from '../types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

const getBaseUrl = (params: GetEntryParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/comments`
const getCommentUrl = (params: GetCommentParams) => `${getBaseUrl(params)}/${params.commentId}`

export const get: RestEndpoint<'Comment', 'get'> = (
  http: AxiosInstance,
  params: GetCommentParams
) => raw.get<CommentProps>(http, getCommentUrl(params))

export const getMany: RestEndpoint<'Comment', 'getMany'> = (
  http: AxiosInstance,
  params: GetEntryParams & QueryParams
) =>
  raw.get<CollectionProp<CommentProps>>(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })

/**
 * @deprecated use `getMany` instead. `getAll` may never be removed for app compatibility reasons.
 */
export const getAll: RestEndpoint<'Comment', 'getAll'> = getMany

export const create: RestEndpoint<'Comment', 'create'> = (
  http: AxiosInstance,
  params: CreateCommentParams,
  rawData: CreateCommentProps
) => {
  const data = copy(rawData)
  return raw.post<CommentProps>(http, getBaseUrl(params), data)
}

export const update: RestEndpoint<'Comment', 'update'> = (
  http: AxiosInstance,
  params: GetCommentParams,
  rawData: UpdateCommentProps,
  headers?: AxiosRequestHeaders
) => {
  const data: SetOptional<typeof rawData, 'sys'> = copy(rawData)
  delete data.sys

  return raw.put<CommentProps>(http, getCommentUrl(params), data, {
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
  return raw.del(http, getCommentUrl(params), { headers: { 'X-Contentful-Version': version } })
}
