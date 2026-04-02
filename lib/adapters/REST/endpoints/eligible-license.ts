import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  CollectionProp,
  GetSpaceParams,
  QueryParams,
} from '../../../common-types'
import type { EligibleLicenseProps } from '../../../entities/eligible-license'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

const getBaseUrl = (params: GetSpaceParams) =>
  `/spaces/${params.spaceId}/eligible_licenses`

export const getMany: RestEndpoint<'EligibleLicense', 'getMany'> = (
  http: AxiosInstance,
  params: GetSpaceParams & QueryParams,
) => {
  return raw.get<CollectionProp<EligibleLicenseProps>>(http, getBaseUrl(params), {
    params: params.query,
  })
}
