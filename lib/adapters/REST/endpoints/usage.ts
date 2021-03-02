import type { AxiosInstance } from 'contentful-sdk-core'
import { CollectionProp } from '../../../common-types'
import { UsageProps } from '../../../entities/usage'
import { QueryParams } from '../../../plain/common-types'
import * as raw from './raw'

export const getManyForSpace = (
  http: AxiosInstance,
  params: { organizationId: string } & QueryParams
) => {
  return raw.get<CollectionProp<UsageProps>>(
    http,
    `/organizations/${params.organizationId}/space_periodic_usages`,
    {
      params: params.query,
    }
  )
}

export const getManyForOrganization = (
  http: AxiosInstance,
  params: { organizationId: string } & QueryParams
) => {
  return raw.get<CollectionProp<UsageProps>>(
    http,
    `/organizations/${params.organizationId}/organization_periodic_usages`,
    {
      params: params.query,
    }
  )
}
