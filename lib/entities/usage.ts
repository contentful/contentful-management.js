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
 * @deprecated
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
  /** Start date (inclusive) in YYYY-MM-DD format */
  'date[gte]'?: string
  /** End date (inclusive) in YYYY-MM-DD format */
  'date[lte]'?: string
  /** Granularity in ISO-8601 duration format, e.g. "P1D" or "P1M" */
  granularity?: string
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
  /** Column to sort by with optional `-` prefix for descending, e.g. `"total_usage"` or `"-total_usage"` (descending).
   *  For `api_call_*` metrics, `total_usage` sorts by the per-group sum across the requested date range. */
  order?: string
}

type SysLink = {
  sys: { type: 'Link'; linkType: string; id: string }
}

export type AggregatedUsageItemProps = {
  sys: {
    id: string
    type: string
    key: string
    organization: { sys: { type: 'Link'; linkType: 'Organization'; id: string } }
    unitOfMeasurement: string
    dimensions: Record<string, SysLink>
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
