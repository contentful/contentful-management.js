import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type { OpPatch } from 'json-patch'
import type {
  CursorPaginatedCollectionProp,
  DeleteConceptParams,
  GetConceptDescendantsParams,
  GetConceptParams,
  GetManyConceptParams,
  GetOrganizationParams,
  UpdateConceptParams,
  Link,
} from '../../../common-types.js'
import type { ConceptProps, CreateConceptProps } from '../../../entities/concept.js'
import type { RestEndpoint } from '../types.js'
import * as raw from './raw.js'

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

export const createWithId: RestEndpoint<'Concept', 'createWithId'> = (
  http: AxiosInstance,
  params: GetConceptParams,
  data: CreateConceptProps
) => {
  return raw.put<ConceptProps>(http, `${basePath(params.organizationId)}/${params.conceptId}`, data)
}

export const patch: RestEndpoint<'Concept', 'patch'> = (
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
        'X-Contentful-Version': params.version,
        'Content-Type': 'application/json-patch+json',
        ...headers,
      },
    }
  )
}

export const update: RestEndpoint<'Concept', 'update'> = (
  http: AxiosInstance,
  params: UpdateConceptParams,
  data: CreateConceptProps,
  headers?: RawAxiosRequestHeaders
) => {
  return raw.put<ConceptProps>(
    http,
    `${basePath(params.organizationId)}/${params.conceptId}`,
    data,
    {
      headers: {
        'X-Contentful-Version': params.version,
        ...headers,
      },
    }
  )
}

export const get: RestEndpoint<'Concept', 'get'> = (
  http: AxiosInstance,
  params: GetConceptParams
) =>
  raw.get<ConceptProps & { conceptSchemes?: Link<'TaxonomyConceptScheme'>[] }>(
    http,
    `${basePath(params.organizationId)}/${params.conceptId}`
  )

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
  return raw.get<
    CursorPaginatedCollectionProp<
      ConceptProps & { conceptSchemes?: Link<'TaxonomyConceptScheme'>[] }
    >
  >(http, url, {
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
