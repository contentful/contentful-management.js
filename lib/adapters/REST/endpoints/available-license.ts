import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  CollectionProp,
  GetOrganizationParams,
  QueryParams,
} from '../../../common-types'
import type { AvailableLicenseProps } from '../../../entities/available-license'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetOrganizationParams) =>
  `/organizations/${params.organizationId}/available_licenses`

export const getMany: RestEndpoint<'AvailableLicense', 'getMany'> = (
  http: AxiosInstance,
  params: GetOrganizationParams & QueryParams,
) => {
  return raw.get<CollectionProp<AvailableLicenseProps>>(http, getBaseUrl(params), {
    params: params.query,
  })
}
