import type { CollectionProp, QueryParams } from '../../common-types'
import type {
  AggregatedUsageCollectionProps,
  AssetBandwidthUsageCollectionProps,
  UsageProps,
} from '../../entities/usage'
import type { OptionalDefaults } from '../wrappers/wrap'

export type UsagePlainClientAPI = {
  /**
   * @deprecated Use {@link getAggregated} instead. Sunset: 2026-12-31.
   */
  getManyForSpace(
    params: OptionalDefaults<{ organizationId: string } & QueryParams>,
  ): Promise<CollectionProp<UsageProps>>
  /**
   * @deprecated Use {@link getAggregated} instead. Sunset: 2026-12-31.
   */
  getManyForOrganization(
    params: OptionalDefaults<{ organizationId: string } & QueryParams>,
  ): Promise<CollectionProp<UsageProps>>
  /** Fetches aggregated usage for an organization metric.
   *
   * @param params organization ID, metric key, and query parameters
   * @returns a collection of aggregated usage items
   * @throws if the request fails or the metric is not found
   * @example
   * ```javascript
   * const usage = await client.usage.getAggregated({
   *   organizationId: '<organization_id>',
   *   metricKey: 'functions_invocations',
   *   query: { 'date.gte': '2025-01-01', 'date.lte': '2025-01-31', granularity: 'P1D' },
   * });
   * ```
   */
  getAggregated(
    params: OptionalDefaults<{ organizationId: string; metricKey: string } & QueryParams>,
  ): Promise<AggregatedUsageCollectionProps>
  /** Fetches detailed asset-bandwidth usage for an organization.
   *
   * @param params organization ID and query parameters
   * @returns a collection of asset-bandwidth usage items
   * @throws if the request fails
   * @example
   * ```javascript
   * const usage = await client.usage.getDetailedAssetBandwidth({
   *   organizationId: '<organization_id>',
   *   query: { 'date.gte': '2025-01-01', 'date.lte': '2025-01-31' },
   * });
   * ```
   */
  getDetailedAssetBandwidth(
    params: OptionalDefaults<{ organizationId: string } & QueryParams>,
  ): Promise<AssetBandwidthUsageCollectionProps>
}
