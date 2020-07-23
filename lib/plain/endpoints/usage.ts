import { AxiosInstance } from 'axios'
import * as raw from './raw'
import { UsageProps } from '../../entities/usage'
import { CollectionProp, QueryParams } from './common-types'

export const getForSpace = (
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

export const getForOrganization = (
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
