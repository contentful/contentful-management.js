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

export interface AggregatedUsageQuery {
  /** Start date (inclusive) in YYYY-MM-DD format */
  'date.gte'?: string
  /** End date (inclusive) in YYYY-MM-DD format */
  'date.lte'?: string
  /** Granularity in ISO-8601 duration format, e.g. "P1D" or "P1M" */
  granularity?: string
  /** Comma-separated dimension keys to group results by */
  group?: string
  /** Maximum number of items to return */
  limit?: number
  /** Number of items to skip */
  skip?: number
  /** Sort order, e.g. "ASC" or "DESC" */
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

export interface AggregatedUsage extends AggregatedUsageItemProps, DefaultElements<AggregatedUsageItemProps> {}

/** @internal */
export function wrapAggregatedUsage(_makeRequest: MakeRequest, data: AggregatedUsageItemProps): AggregatedUsage {
  const item = toPlainObject(copy(data))
  return freezeSys(enhanceWithMethods(item, {}))
}

/** @internal */
export const wrapAggregatedUsageCollection = wrapCollection(wrapAggregatedUsage)

// ─── Asset-bandwidth detailed usage types ─────────────────────────────────────

export interface AssetBandwidthUsageQuery {
  /** Start date (inclusive) in YYYY-MM-DD format */
  'date.gte'?: string
  /** End date (inclusive) in YYYY-MM-DD format */
  'date.lte'?: string
}

export type AssetBandwidthUsageItemProps = {
  sys: {
    type: 'AssetBandwidthUsage'
    id: string
    asset: { sys: { type: 'Link'; linkType: 'Asset'; id: string } }
    space: { sys: { type: 'Link'; linkType: 'Space'; id: string } }
  }
  usedBandwidth: number
}

export type AssetBandwidthUsageCollectionProps = {
  sys: { type: 'Array' }
  limit: number
  items: AssetBandwidthUsageItemProps[]
}

export interface AssetBandwidthUsage
  extends AssetBandwidthUsageItemProps,
    DefaultElements<AssetBandwidthUsageItemProps> {}

/** @internal */
export function wrapAssetBandwidthUsage(
  _makeRequest: MakeRequest,
  data: AssetBandwidthUsageItemProps,
): AssetBandwidthUsage {
  const item = toPlainObject(copy(data))
  return freezeSys(enhanceWithMethods(item, {}))
}

/** @internal */
export function wrapAssetBandwidthUsageCollection(
  makeRequest: MakeRequest,
  data: AssetBandwidthUsageCollectionProps,
): AssetBandwidthUsageCollectionProps & { items: AssetBandwidthUsage[] } {
  const collectionData = toPlainObject(copy(data))
  const items = collectionData.items.map((entity: AssetBandwidthUsageItemProps) =>
    wrapAssetBandwidthUsage(makeRequest, entity),
  )
  return { ...collectionData, items }
}
