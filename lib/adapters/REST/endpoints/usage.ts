import type { AxiosInstance } from 'contentful-sdk-core'
import type { CollectionProp, QueryParams } from '../../../common-types'
import type {
  AggregatedUsageCollectionProps,
  AggregatedUsageMetricKey,
  UsageProps,
} from '../../../entities/usage'
import type { RestEndpoint } from '../types'
import * as raw from './raw'

/**
 * @deprecated Use {@link getAggregated} instead, calling it once per metric key and
 * filtering by `filter[sys.dimensions.space.sys.id]` to scope to a space. Sunset: 2026-12-31.
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
 * @deprecated Use {@link getAggregated} instead, calling it once per metric key
 * (this endpoint accepted multiple metrics per call via `metric[in]`; {@link getAggregated}
 * is scoped to a single `metricKey` per request). Sunset: 2026-12-31.
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
  params: { organizationId: string; metricKey: AggregatedUsageMetricKey } & QueryParams,
) => {
  return raw.get<AggregatedUsageCollectionProps>(
    http,
    `/organizations/${params.organizationId}/usages/${params.metricKey}`,
    {
      params: params.query,
    },
  )
}
