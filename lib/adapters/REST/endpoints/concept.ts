import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import { RestEndpoint } from '../types'
import { GetConceptParams, GetOrganizationParams } from '../../../common-types'
import { ConceptProps, CreateConceptProps } from '../../../entities/concept'

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

export const get: RestEndpoint<'Concept', 'get'> = (
  http: AxiosInstance,
  params: GetConceptParams & GetOrganizationParams
) => raw.get<ConceptProps>(http, `${conceptBasePath(params.organizationId)}/${params.conceptId}`)

export const getTotal: RestEndpoint<'Concept', 'getTotal'> = (
  http: AxiosInstance,
  params: GetOrganizationParams
) => raw.get<{ total: number }>(http, `${conceptBasePath(params.organizationId)}/total`)
