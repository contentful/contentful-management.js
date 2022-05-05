import type { AxiosInstance } from 'contentful-sdk-core'
import {
  CollectionProp,
  GetOrgAppInstallationParams,
  PaginationQueryParams,
} from '../../../common-types'
import { OrgAppInstallationProps } from '../../../entities/org-app-installation'
import { RestEndpoint } from '../types'
import * as raw from './raw'
import { normalizeSelect } from './utils'

const getBaseUrl = (params: GetOrgAppInstallationParams) =>
  `/app_definitions/${params.appDefinitionId}/app_installations?sys.organization.sys.id=${params.organizationId}`

export const getMany: RestEndpoint<'OrgAppInstallation', 'getMany'> = (
  http: AxiosInstance,
  params: GetOrgAppInstallationParams & PaginationQueryParams
) => {
  return raw.get<CollectionProp<OrgAppInstallationProps>>(http, getBaseUrl(params), {
    params: normalizeSelect(params.query),
  })
}
