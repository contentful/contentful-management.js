import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
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

export interface Usage extends UsageProps, DefaultElements<UsageProps> {}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw data
 * @return Normalized usage
 */
export function wrapUsage(_makeRequest: MakeRequest, data: UsageProps): Usage {
  const usage = toPlainObject(copy(data))
  const usageWithMethods = enhanceWithMethods(usage, {})
  return freezeSys(usageWithMethods)
}

/**
 * @private
 */
export const wrapUsageCollection = wrapCollection(wrapUsage)
