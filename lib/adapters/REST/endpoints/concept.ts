import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import { RestEndpoint } from '../types'
import {
  CursorPaginatedCollectionProp,
  GetConceptDescendantsParams,
  GetConceptParams,
  GetManyConceptParams,
  GetOrganizationParams,
  UpdateConceptParams,
} from '../../../common-types'
import { ConceptProps, CreateConceptProps } from '../../../entities/concept'
import { isNil, isObject, omitBy } from 'lodash'
import { Patch } from 'json-patch'
import { RawAxiosRequestHeaders } from 'axios'

function conceptBasePath(orgId: string) {
  return `/organizations/${orgId}/taxonomy/concepts`
}

export const create: RestEndpoint<'Concept', 'create'> = (
  http: AxiosInstance,
  params: GetOrganizationParams,
  data: CreateConceptProps
) => {
  return raw.post<ConceptProps>(http, conceptBasePath(params.organizationId), data)
}

export const update: RestEndpoint<'Concept', 'update'> = (
  http: AxiosInstance,
  params: UpdateConceptParams,
  data: Patch,
  headers?: RawAxiosRequestHeaders
) => {
  return raw.patch<ConceptProps>(
    http,
    `${conceptBasePath(params.organizationId)}/${params.query.conceptId}`,
    data,
    {
      headers: {
        'X-Contentful-Version': params.version ?? 0,
        ...headers,
      },
    }
  )
}

export const get: RestEndpoint<'Concept', 'get'> = (
  http: AxiosInstance,
  params: GetConceptParams
) =>
  raw.get<ConceptProps>(http, `${conceptBasePath(params.organizationId)}/${params.query.conceptId}`)

export const del: RestEndpoint<'Concept', 'delete'> = (
  http: AxiosInstance,
  params: GetConceptParams
) => raw.del<void>(http, `${conceptBasePath(params.organizationId)}/${params.query.conceptId}`)

export const getMany: RestEndpoint<'Concept', 'getMany'> = (
  http: AxiosInstance,
  params: GetManyConceptParams
) => {
  const url = getCollectionUrl('?', params)
  return raw.get<CursorPaginatedCollectionProp<ConceptProps>>(http, url)
}

export const getDescendants: RestEndpoint<'Concept', 'getDescendants'> = (
  http: AxiosInstance,
  params: GetConceptDescendantsParams
) => {
  const url = getCollectionUrl('/descendants?', params)
  return raw.get<CursorPaginatedCollectionProp<ConceptProps>>(http, url)
}

export const getTotal: RestEndpoint<'Concept', 'getTotal'> = (
  http: AxiosInstance,
  params: GetOrganizationParams
) => raw.get<{ total: number }>(http, `${conceptBasePath(params.organizationId)}/total`)

function toUrlParams(params: Record<string, string | number> | undefined = {}) {
  const urlQuery = new URLSearchParams()

  Object.entries(sanitizeParams(params)).forEach(([key, value]) => {
    urlQuery.set(key, `${value}`)
  })

  return urlQuery.toString()
}

/*
 * @desc recursively removes nullable values from an object
 */
export function sanitizeParams<T extends Record<string, any>>(params: T): Partial<T> {
  for (const key in params) {
    if (isObject(params[key])) {
      // @ts-expect-error ts(2322) TS is not happy with `any` value type
      params[key] = sanitizeParams(params[key])
    }
  }
  return omitBy(params, isNil) as T
}

function getCollectionUrl(path: string, params: GetOrganizationParams & { query?: any }) {
  const url = conceptBasePath(params.organizationId)
  return params?.query?.pageUrl ?? url.concat(`${path}${toUrlParams(params?.query)}`)
}
