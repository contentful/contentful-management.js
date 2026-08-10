import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  CollectionProp,
  DefaultElements,
  MakeRequest,
  MetaLinkProps,
  MetaSysProps,
  QueryOptions,
} from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'

export type UsageMetricEnum = 'cda' | 'cma' | 'cpa' | 'gql'

export interface UsageQuery extends QueryOptions {
  'metric[in]'?: string
  'dateRange.startAt'?: string
  'dateRange.endAt'?: string
}

/** @deprecated Use {@link AggregatedUsageQuery} with `usage.getAggregated()` instead. Sunset: 2026-12-31. */
export type UsageProps = {
  /**
   * System metadata
   */
  sys: MetaSysProps & {
    organization?: { sys: MetaLinkProps }
  }

  /**
   * Type of usage
   */
  metric: UsageMetricEnum

  /**
   * Unit of usage metric
   */
  unitOfMeasure: string

  /**
   * Range of usage
   */
  dateRange: {
    startAt: string
    endAt: string
  }

  /**
   * Value of the usage
   */
  usage: number

  /**
   * Usage per day
   */
  usagePerDay: {
    [key: string]: number
  }
}

/** @deprecated Use `usage.getAggregated()` instead. Sunset: 2026-12-31. */
export interface Usage extends UsageProps, DefaultElements<UsageProps> {}

/**
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw data
 * @returns Normalized usage
 * @deprecated Use {@link wrapAggregatedUsage} / `usage.getAggregated()` instead. Sunset: 2026-12-31.
 */
export function wrapUsage(_makeRequest: MakeRequest, data: UsageProps): Usage {
  const usage = toPlainObject(copy(data))
  const usageWithMethods = enhanceWithMethods(usage, {})
  return freezeSys(usageWithMethods)
}

/** @internal @deprecated */
export const wrapUsageCollection = wrapCollection(wrapUsage)

// ─── New aggregated usage types ───────────────────────────────────────────────

export type AggregatedUsageMetricKey =
  | 'functions_invocations'
  | 'asset_bandwidth'
  | 'api_call_cma'
  | 'api_call_cpa'
  | 'api_call_cda'
  | 'api_call_graphql'
  | 'ai_action_invocation'
  | 'ai_action_word_count'
  | 'ai_consumption_unit'

export interface AggregatedUsageQuery {
  /** Start date (inclusive) in YYYY-MM-DD format. Required. */
  'date[gte]': string
  /** End date (inclusive) in YYYY-MM-DD format. Required. */
  'date[lte]': string
  /** ISO-8601 granularity. Defaults to `"P1D"` server-side when omitted. `"P1D"` is limited to a 31-day range; `"P1M"` to 12 calendar months (including the current one). */
  granularity?: 'P1D' | 'P1M'
  /** Comma-separated dimension keys to group results by */
  group?: string
  /**
   * Filter by a single dimension value, e.g. `filter[sys.dimensions.space.sys.id]=<id>`.
   * Allowed dimension keys per metric are documented in `MetricDimensions` in the OpenAPI spec.
   */
  [filterKey: `filter[sys.dimensions.${string}.sys.${string}]`]: string | undefined
  /**
   * Filter by multiple dimension values using the `[in]` operator, e.g.
   * `filter[sys.dimensions.space.sys.id][in]=id1,id2` (max 10 comma-separated values).
   * Allowed dimension keys per metric are documented in `MetricDimensions` in the OpenAPI spec.
   */
  [filterInKey: `filter[sys.dimensions.${string}.sys.${string}][in]`]: string | undefined
  /** Maximum number of items to return */
  limit?: number
  /** Number of items to skip */
  skip?: number
  /** Comma-separated columns in `sys.dimensions.<name>.sys.<suffix>` form (matching the `group` and `filter` grammar),
   *  optionally prefixed with `-` for descending, e.g. `"total_usage"` or `"-total_usage"` (descending).
   *  The synthetic aggregate `total_usage` is a bare-token passthrough (`"total_usage"`, `"-total_usage"`).
   *  For `api_call_*` metrics, `total_usage` sorts by the per-group sum across the requested date range. */
  order?: string
}

type SysLink = {
  sys: { type: 'Link'; linkType: string; id: string }
}

type EmbeddedDimensionEntity = {
  sys: { type: string } & { [suffix: string]: string }
}

/**
 * A response value under `dimensions`. Id-only families (`space`, `app`, `function`, `ai_action`, `asset`)
 * render as classic Contentful Links. Families like `model` render as an embedded-entity block whose
 * `sys.type` names the entity (e.g. `"Model"`) and carries the grouped suffixes alongside (`sys.id`,
 * `sys.provider`, …). Narrow with `dim.sys.type === 'Link'` vs a specific entity type.
 */
export type AggregatedUsageDimension = SysLink | EmbeddedDimensionEntity

export type AggregatedUsageItemProps = {
  sys: {
    id: string
    type: string
    key: string
    organization: { sys: { type: 'Link'; linkType: 'Organization'; id: string } }
    unitOfMeasurement: string
    dimensions: Record<string, AggregatedUsageDimension>
    accumulation: string
  }
  dateRange: { start: string; end: string }
  granularity?: string
  data: number[]
}

export type AggregatedUsageCollectionProps = CollectionProp<AggregatedUsageItemProps>

export interface AggregatedUsage
  extends AggregatedUsageItemProps,
    DefaultElements<AggregatedUsageItemProps> {}

/** @internal */
export function wrapAggregatedUsage(
  _makeRequest: MakeRequest,
  data: AggregatedUsageItemProps,
): AggregatedUsage {
  const item = toPlainObject(copy(data))
  return freezeSys(enhanceWithMethods(item, {}))
}

/** @internal */
export const wrapAggregatedUsageCollection = wrapCollection(wrapAggregatedUsage)

// ─── Detailed asset-bandwidth usage types ─────────────────────────────────────

export interface AssetBandwidthUsageDetailedQuery {
  /** Start date (inclusive) in YYYY-MM-DD format. Required. */
  'date[gte]': string
  /** End date (inclusive) in YYYY-MM-DD format. Required. */
  'date[lte]': string
}

export type AssetBandwidthUsageItemProps = {
  sys: {
    id: string
    type: string
    asset: SysLink
    space: SysLink
  }
  usedBandwidth: number
}

export type AssetBandwidthUsageDetailedCollectionProps = {
  sys: { type: 'Array' }
  limit: number
  items: AssetBandwidthUsageItemProps[]
}

export interface AssetBandwidthUsage
  extends AssetBandwidthUsageItemProps,
    DefaultElements<AssetBandwidthUsageItemProps> {}

export interface AssetBandwidthUsageDetailedCollection
  extends DefaultElements<AssetBandwidthUsageDetailedCollectionProps> {
  sys: { type: 'Array' }
  limit: number
  items: AssetBandwidthUsage[]
}

/** @internal */
export function wrapAssetBandwidthUsage(
  _makeRequest: MakeRequest,
  data: AssetBandwidthUsageItemProps,
): AssetBandwidthUsage {
  const item = toPlainObject(copy(data))
  return freezeSys(enhanceWithMethods(item, {}))
}

/** @internal */
export function wrapAssetBandwidthUsageDetailedCollection(
  makeRequest: MakeRequest,
  data: AssetBandwidthUsageDetailedCollectionProps,
): AssetBandwidthUsageDetailedCollection {
  const collectionData = toPlainObject(copy(data))
  collectionData.items = collectionData.items.map((item) => wrapAssetBandwidthUsage(makeRequest, item))
  // @ts-expect-error items is reassigned above from AssetBandwidthUsageItemProps[] to AssetBandwidthUsage[]
  return collectionData
}
