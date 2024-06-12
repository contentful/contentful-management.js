import type { AxiosInstance } from 'contentful-sdk-core'
import { AppAccessTokenProps, CreateAppAccessTokenProps } from '../../../entities/app-access-token'
import * as raw from './raw'
import { RestEndpoint } from '../types'
import {
  GetAppInstallationParams,
  GetCommentParams,
  GetOrganizationParams,
} from '../../../common-types'
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

// export const get: RestEndpoint<'Concept', 'get'> = (
//   http: AxiosInstance,
//   params: GetCommentParams & GetOrganizationParams
// ) =>
//   raw.get<ConceptProps>(http, getEntityCommentUrl(params), {
//     headers:
//       params.bodyFormat === 'rich-text'
//         ? {
//             [BODY_FORMAT_HEADER]: params.bodyFormat,
//           }
//         : {},
//   })
