import type { AxiosInstance } from 'contentful-sdk-core'
import type { CollectionProp, QueryParams } from '../../../common-types'
import type { UsageProps } from '../../../entities/usage'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

export const getManyForSpace: RestEndpoint<'Usage', 'getManyForSpace'> = (
  http: AxiosInstance,
  params: { organizationId: string } & QueryParams,
) => {
  return raw.get<CollectionProp<UsageProps>>(
    http,
    `/organizations/${params.organizationId}/space_periodic_usages`,
    {
      params: params.query,
    },
  )
}

export const getManyForOrganization: RestEndpoint<'Usage', 'getManyForOrganization'> = (
  http: AxiosInstance,
  params: { organizationId: string } & QueryParams,
) => {
  return raw.get<CollectionProp<UsageProps>>(
    http,
    `/organizations/${params.organizationId}/organization_periodic_usages`,
    {
      params: params.query,
    },
  )
}
