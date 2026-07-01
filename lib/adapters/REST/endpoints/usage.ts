import type { AxiosInstance } from 'contentful-sdk-core'
import type { CollectionProp, QueryParams } from '../../../common-types'
import type {
  AggregatedUsageCollectionProps,
  AssetBandwidthUsageCollectionProps,
  UsageProps,
} from '../../../entities/usage'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

/**
 * @deprecated Use {@link getAggregated} instead. Sunset: 2026-12-31.
 */
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

/**
 * @deprecated Use {@link getAggregated} instead. Sunset: 2026-12-31.
 */
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

export const getAggregated: RestEndpoint<'Usage', 'getAggregated'> = (
  http: AxiosInstance,
  params: { organizationId: string; metricKey: string } & QueryParams,
) => {
  return raw.get<AggregatedUsageCollectionProps>(
    http,
    `/organizations/${params.organizationId}/usages/${params.metricKey}`,
    {
      params: params.query,
    },
  )
}

export const getDetailedAssetBandwidth: RestEndpoint<'Usage', 'getDetailedAssetBandwidth'> = (
  http: AxiosInstance,
  params: { organizationId: string } & QueryParams,
) => {
  return raw.get<AssetBandwidthUsageCollectionProps>(
    http,
    `/organizations/${params.organizationId}/usages-detailed/asset_bandwidth`,
    {
      params: params.query,
    },
  )
}
