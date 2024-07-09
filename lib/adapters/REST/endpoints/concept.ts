import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import { RestEndpoint } from '../types'
import {
  CursorPaginatedCollectionProp,
  DeleteConceptParams,
  GetConceptDescendantsParams,
  GetConceptParams,
  GetManyConceptParams,
  GetOrganizationParams,
  UpdateConceptParams,
} from '../../../common-types'
import { ConceptProps, CreateConceptProps } from '../../../entities/concept'
import { OpPatch } from 'json-patch'
import { RawAxiosRequestHeaders } from 'axios'

function basePath(organizationId: string) {
  return `/organizations/${organizationId}/taxonomy/concepts`
}

export const create: RestEndpoint<'Concept', 'create'> = (
  http: AxiosInstance,
  params: GetOrganizationParams,
  data: CreateConceptProps
) => {
  return raw.post<ConceptProps>(http, basePath(params.organizationId), data)
}

export const update: RestEndpoint<'Concept', 'update'> = (
  http: AxiosInstance,
  params: UpdateConceptParams,
  data: OpPatch[],
  headers?: RawAxiosRequestHeaders
) => {
  return raw.patch<ConceptProps>(
    http,
    `${basePath(params.organizationId)}/${params.conceptId}`,
    data,
    {
      headers: {
        'X-Contentful-Version': params.version ?? 0,
        'Content-Type': 'application/json-patch+json',
        ...headers,
      },
    }
  )
}

export const get: RestEndpoint<'Concept', 'get'> = (
  http: AxiosInstance,
  params: GetConceptParams
) => raw.get<ConceptProps>(http, `${basePath(params.organizationId)}/${params.conceptId}`)

export const del: RestEndpoint<'Concept', 'delete'> = (
  http: AxiosInstance,
  params: DeleteConceptParams,
  headers?: RawAxiosRequestHeaders
) =>
  raw.del<void>(http, `${basePath(params.organizationId)}/${params.conceptId}`, {
    headers: {
      'X-Contentful-Version': params.version ?? 0,
      ...headers,
    },
  })

export const getMany: RestEndpoint<'Concept', 'getMany'> = (
  http: AxiosInstance,
  params: GetManyConceptParams
) => {
  const { url, queryParams } = cursorBasedCollection('', params)
  return raw.get<CursorPaginatedCollectionProp<ConceptProps>>(http, url, {
    params: queryParams,
  })
}

export const getDescendants: RestEndpoint<'Concept', 'getDescendants'> = (
  http: AxiosInstance,
  params: GetConceptDescendantsParams
) => {
  const { url, queryParams } = cursorBasedCollection(`/${params.conceptId}/descendants`, params)
  return raw.get<CursorPaginatedCollectionProp<ConceptProps>>(http, url, { params: queryParams })
}

export const getAncestors: RestEndpoint<'Concept', 'getAncestors'> = (
  http: AxiosInstance,
  params: GetConceptDescendantsParams
) => {
  const { url, queryParams } = cursorBasedCollection(`/${params.conceptId}/ancestors`, params)
  return raw.get<CursorPaginatedCollectionProp<ConceptProps>>(http, url, { params: queryParams })
}

export const getTotal: RestEndpoint<'Concept', 'getTotal'> = (
  http: AxiosInstance,
  params: GetOrganizationParams
) => raw.get<{ total: number }>(http, `${basePath(params.organizationId)}/total`)

function cursorBasedCollection(
  path: string,
  params: {
    organizationId: string
    query?: Record<string, string | number> & { pageUrl?: string }
  }
): { url: string; queryParams: Record<string, string | number> } {
  return params.query?.pageUrl
    ? { url: params.query?.pageUrl, queryParams: {} }
    : {
        url: `${basePath(params.organizationId)}${path}`,
        queryParams: params.query || {},
      }
}
