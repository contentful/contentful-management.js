import type { CollectionProp, QueryParams } from '../../common-types'
import type {
  AggregatedUsageCollectionProps,
  AggregatedUsageMetricKey,
  UsageProps,
} from '../../entities/usage'
import type { OptionalDefaults } from '../wrappers/wrap'

export type UsagePlainClientAPI = {
  /**
   * @deprecated Use {@link getAggregated} instead, calling it once per `metricKey` and
   * passing `'filter[sys.dimensions.space.sys.id]': spaceId` in the query to scope to a space.
   * Note: {@link getAggregated} is scoped to a single metric key per request, whereas this method
   * accepted multiple metrics via `metric[in]`. Sunset: 2026-12-31.
   */
  getManyForSpace(
    params: OptionalDefaults<{ organizationId: string } & QueryParams>,
  ): Promise<CollectionProp<UsageProps>>
  /**
   * @deprecated Use {@link getAggregated} instead, calling it once per metric key
   * (this method accepted multiple metrics per call via `metric[in]`; {@link getAggregated}
   * is scoped to a single `metricKey` per request). Sunset: 2026-12-31.
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
   *   metricKey: 'api_call_cma',
   *   query: { 'date[gte]': '2025-01-01', 'date[lte]': '2025-01-31', granularity: 'P1D' },
   * });
   * ```
   */
  getAggregated(
    params: OptionalDefaults<
      { organizationId: string; metricKey: AggregatedUsageMetricKey } & QueryParams
    >,
  ): Promise<AggregatedUsageCollectionProps>
}
