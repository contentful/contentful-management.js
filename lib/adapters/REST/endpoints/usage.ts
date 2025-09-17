import type { AxiosInstance } from 'contentful-sdk-core'
import type { CollectionProp, QueryParams } from '../../../common-types.js'
import type { UsageProps } from '../../../entities/usage.js'
import type { RestEndpoint } from '../types.js'
import * as raw from './raw.js'

export const getManyForSpace: RestEndpoint<'Usage', 'getManyForSpace'> = (
  http: AxiosInstance,
  params: { organizationId: string } & QueryParams,
) => {
  return raw.get<CollectionProp<UsageProps<'SpacePeriodicUsage'>>>(
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
  return raw.get<CollectionProp<UsageProps<'OrganizationPeriodicUsage'>>>(
    http,
    `/organizations/${params.organizationId}/organization_periodic_usages`,
    {
      params: params.query,
    },
  )
}
