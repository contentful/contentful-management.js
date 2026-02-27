/**
 * @module
 * @category Entities
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  DefaultElements,
  MakeRequest,
  MetaLinkProps,
  MetaSysProps,
  QueryOptions,
} from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'

/** API usage metric types */
export type UsageMetricEnum = 'cda' | 'cma' | 'cpa' | 'gql'

/** Query options for filtering usage data */
export interface UsageQuery extends QueryOptions {
  'metric[in]'?: string
  'dateRange.startAt'?: string
  'dateRange.endAt'?: string
}

/** Properties of API usage data for a space or organization */
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

/** A usage data entity */
export interface Usage extends UsageProps, DefaultElements<UsageProps> {}

/**
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw data
 * @returns Normalized usage
 */
export function wrapUsage(_makeRequest: MakeRequest, data: UsageProps): Usage {
  const usage = toPlainObject(copy(data))
  const usageWithMethods = enhanceWithMethods(usage, {})
  return freezeSys(usageWithMethods)
}

/**
 * @internal
 */
export const wrapUsageCollection = wrapCollection(wrapUsage)
