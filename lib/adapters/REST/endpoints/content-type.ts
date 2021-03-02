import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'

import { normalizeSelect } from './utils'
import copy from 'fast-copy'
import { ContentTypeProps, CreateContentTypeProps } from '../../../entities/content-type'
import { GetSpaceEnvironmentParams, QueryParams } from '../../../plain/common-types'
import { CollectionProp } from '../../../common-types'

export type GetContentTypeParams = GetSpaceEnvironmentParams & { contentTypeId: string }

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/content_types`

const getContentTypeUrl = (params: GetContentTypeParams) =>
  getBaseUrl(params) + `/${params.contentTypeId}`

export const get = (http: AxiosInstance, params: GetContentTypeParams & QueryParams) => {
  return raw.get<ContentTypeProps>(http, getContentTypeUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export const getMany = (http: AxiosInstance, params: GetSpaceEnvironmentParams & QueryParams) => {
  return raw.get<CollectionProp<ContentTypeProps>>(http, getBaseUrl(params), {
    params: params.query,
  })
}

export const create = (
  http: AxiosInstance,
  params: GetSpaceEnvironmentParams,
  rawData: CreateContentTypeProps
) => {
  const data = copy(rawData)

  return raw.post<ContentTypeProps>(http, getBaseUrl(params), data)
}

export const createWithId = (
  http: AxiosInstance,
  params: GetContentTypeParams,
  rawData: CreateContentTypeProps
) => {
  const data = copy(rawData)

  return raw.put<ContentTypeProps>(http, getContentTypeUrl(params), data)
}

export const update = (
  http: AxiosInstance,
  params: GetContentTypeParams,
  rawData: ContentTypeProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)
  delete data.sys
  return raw.put<ContentTypeProps>(http, getContentTypeUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del = (http: AxiosInstance, params: GetContentTypeParams) => {
  return raw.del(http, getContentTypeUrl(params))
}

export const publish = (
  http: AxiosInstance,
  params: GetContentTypeParams,
  rawData: ContentTypeProps
) => {
  return raw.put<ContentTypeProps>(http, getContentTypeUrl(params) + '/published', null, {
    headers: {
      'X-Contentful-Version': rawData.sys.version,
    },
  })
}

export const unpublish = (http: AxiosInstance, params: GetContentTypeParams) => {
  return raw.del<ContentTypeProps>(http, getContentTypeUrl(params) + '/published')
}

type OmitOrDelete = 'omitted' | 'deleted'

/**
 * @private
 * @param id - unique ID of the field
 * @param key - the attribute on the field to change
 * @param value - the value to set the attribute to
 */
const findAndUpdateField = function (
  contentType: ContentTypeProps,
  fieldId: string,
  omitOrDelete: OmitOrDelete
) {
  const field = contentType.fields.find((field) => field.id === fieldId)
  if (!field) {
    return Promise.reject(
      new Error(
        `Tried to omitAndDeleteField on a nonexistent field, ${fieldId}, on the content type ${contentType.name}.`
      )
    )
  }
  // @ts-expect-error
  field[omitOrDelete] = true

  return Promise.resolve(contentType)
}

export const omitAndDeleteField = (
  http: AxiosInstance,
  params: GetContentTypeParams,
  contentType: ContentTypeProps,
  fieldId: string
) => {
  return findAndUpdateField(contentType, fieldId, 'omitted')
    .then((newContentType) => {
      return update(http, params, newContentType)
    })
    .then((newContentType) => {
      return findAndUpdateField(newContentType, fieldId, 'deleted')
    })
    .then((newContentType) => {
      return update(http, params, newContentType)
    })
}
