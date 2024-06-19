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
import { Patch } from 'json-patch'
import { RawAxiosRequestHeaders } from 'axios'
import { toUrlParams } from '../../../entities/utils'

function basePath(orgId: string) {
  return `/organizations/${orgId}/taxonomy/concepts`
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
  data: Patch,
  headers?: RawAxiosRequestHeaders
) => {
  return raw.patch<ConceptProps>(
    http,
    `${basePath(params.organizationId)}/${params.conceptId}`,
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
  const url = getCollectionUrl('', params)
  return raw.get<CursorPaginatedCollectionProp<ConceptProps>>(http, url)
}

export const getDescendants: RestEndpoint<'Concept', 'getDescendants'> = (
  http: AxiosInstance,
  params: GetConceptDescendantsParams
) => {
  const url = getCollectionUrl(`/${params.conceptId}/descendants`, params)
  return raw.get<CursorPaginatedCollectionProp<ConceptProps>>(http, url)
}

export const getAncestors: RestEndpoint<'Concept', 'getAncestors'> = (
  http: AxiosInstance,
  params: GetConceptDescendantsParams
) => {
  const url = getCollectionUrl(`/${params.conceptId}/ancestors`, params)
  return raw.get<CursorPaginatedCollectionProp<ConceptProps>>(http, url)
}

export const getTotal: RestEndpoint<'Concept', 'getTotal'> = (
  http: AxiosInstance,
  params: GetOrganizationParams
) => raw.get<{ total: number }>(http, `${basePath(params.organizationId)}/total`)

function getCollectionUrl(
  path: string,
  params: {
    organizationId: string
    query?: Record<string, string | number> & { pageUrl?: string }
  }
) {
  const url = basePath(params.organizationId)
  return params.query?.pageUrl ?? url.concat(`${path}${toUrlParams(params.query)}`)
}
