import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { ContentTypeProps, CreateContentTypeProps } from '../../entities/content-type'
import { GetEnvironmentParams } from './environment'
import { CollectionProp, QueryParams } from './common-types'
import { normalizeSelect } from './utils'
import cloneDeep from 'lodash/cloneDeep'

export type GetContentTypeParams = GetEnvironmentParams & { contentTypeId: string }

const getBaseUrl = (params: GetEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/content_types`

const getContentTypeUrl = (params: GetContentTypeParams) =>
  getBaseUrl(params) + `/${params.contentTypeId}`

export const get = (http: AxiosInstance, params: GetContentTypeParams & QueryParams) => {
  return raw.get<ContentTypeProps>(http, getContentTypeUrl(params), {
    params: normalizeSelect(params.query),
  })
}

export type GetManyContentTypesParams = GetEnvironmentParams & QueryParams

export const getMany = (http: AxiosInstance, params: GetManyContentTypesParams) => {
  return raw.get<CollectionProp<ContentTypeProps>>(http, getBaseUrl(params), {
    params: params.query,
  })
}

export const create = (
  http: AxiosInstance,
  params: GetEnvironmentParams,
  rawData: CreateContentTypeProps
) => {
  const data = cloneDeep(rawData)

  return raw.post<ContentTypeProps>(http, getBaseUrl(params), data)
}

export const createWithId = (
  http: AxiosInstance,
  params: GetContentTypeParams,
  rawData: CreateContentTypeProps
) => {
  const data = cloneDeep(rawData)

  return raw.put<ContentTypeProps>(http, getContentTypeUrl(params), data)
}

export const update = (
  http: AxiosInstance,
  params: GetContentTypeParams,
  rawData: ContentTypeProps,
  headers?: Record<string, unknown>
) => {
  const data = cloneDeep(rawData)
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
      'X-Contentful-Version': rawData.sys.version ?? 0,
    },
  })
}

export const unpublish = (http: AxiosInstance, params: GetContentTypeParams) => {
  return raw.del<ContentTypeProps>(http, getContentTypeUrl(params) + '/published')
}

type OmitOrDelete = 'omitted' | 'deleted'
const findAndUpdateField = (
  contentType: ContentTypeProps,
  fieldId: string,
  omitOrDelete: OmitOrDelete
) => {
  const field = contentType.fields.find((field) => field.id === fieldId)
  if (!field) {
    throw new Error(
      `Tried to omitAndDeleteField on a nonexistent field, ${fieldId}, on the content type ${contentType.name}.`
    )
  }

  // @ts-expect-error
  field[omitOrDelete] = true

  return contentType
}

export const omitAndDeleteField = async (
  http: AxiosInstance,
  params: GetContentTypeParams,
  contentType: ContentTypeProps,
  fieldId: string
) => {
  return update(
    http,
    params,
    findAndUpdateField(contentType, fieldId, 'omitted')
  ).then((withOmitted) => update(http, params, findAndUpdateField(withOmitted, fieldId, 'deleted')))
}
