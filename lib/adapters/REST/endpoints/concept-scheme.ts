import { RestEndpoint } from '../types'
import type { AxiosInstance } from 'contentful-sdk-core'
import {
  CursorPaginatedCollectionProp,
  DeleteConceptSchemeParams,
  GetConceptSchemeParams,
  GetManyConceptSchemeParams,
  GetOrganizationParams,
  UpdateConceptSchemeParams,
} from '../../../common-types'
import * as raw from './raw'
import { ConceptSchemeProps, CreateConceptSchemeProps } from '../../../entities/concept-scheme'
import { RawAxiosRequestHeaders } from 'axios'
import { toUrlParams } from '../../../entities/utils'
import { Patch } from 'json-patch'

function basePath(orgId: string) {
  return `/organizations/${orgId}/taxonomy/concept-schemes`
}

export const get: RestEndpoint<'ConceptScheme', 'get'> = (
  http: AxiosInstance,
  params: GetConceptSchemeParams
) =>
  raw.get<ConceptSchemeProps>(http, `${basePath(params.organizationId)}/${params.conceptSchemeId}`)

export const del: RestEndpoint<'ConceptScheme', 'delete'> = (
  http: AxiosInstance,
  params: DeleteConceptSchemeParams,
  headers?: RawAxiosRequestHeaders
) =>
  raw.del<void>(http, `${basePath(params.organizationId)}/${params.conceptSchemeId}`, {
    headers: {
      'X-Contentful-Version': params.version,
      ...headers,
    },
  })

export const getMany: RestEndpoint<'ConceptScheme', 'getMany'> = (
  http: AxiosInstance,
  params: GetManyConceptSchemeParams
) => {
  let url = basePath(params.organizationId)
  url = params.query?.pageUrl ?? url.concat(`${toUrlParams(params.query)}`)
  return raw.get<CursorPaginatedCollectionProp<ConceptSchemeProps>>(http, url)
}

export const getTotal: RestEndpoint<'ConceptScheme', 'getTotal'> = (
  http: AxiosInstance,
  params: GetOrganizationParams
) => raw.get<{ total: number }>(http, `${basePath(params.organizationId)}/total`)

export const create: RestEndpoint<'ConceptScheme', 'create'> = (
  http: AxiosInstance,
  params: GetOrganizationParams,
  data: CreateConceptSchemeProps
) => {
  return raw.post<ConceptSchemeProps>(http, basePath(params.organizationId), data)
}

export const update: RestEndpoint<'ConceptScheme', 'update'> = (
  http: AxiosInstance,
  params: UpdateConceptSchemeParams,
  data: Patch,
  headers?: RawAxiosRequestHeaders
) => {
  return raw.patch<ConceptSchemeProps>(
    http,
    `${basePath(params.organizationId)}/${params.conceptSchemeId}`,
    data,
    {
      headers: {
        'X-Contentful-Version': params.version,
        ...headers,
      },
    }
  )
}