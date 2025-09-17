import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, Link, MakeRequest, QueryOptions } from '../common-types.js'
import { wrapCollection } from '../common-utils.js'
import enhanceWithMethods from '../enhance-with-methods.js'

export type UsageMetricEnum = 'cda' | 'cma' | 'cpa' | 'gql'

export interface UsageQuery extends QueryOptions {
  'metric[in]'?: string
  'dateRange.startAt'?: string
  'dateRange.endAt'?: string
}

export type UsageProps<
  TType extends 'SpacePeriodicUsage' | 'OrganizationPeriodicUsage' =
    | 'SpacePeriodicUsage'
    | 'OrganizationPeriodicUsage',
> = {
  /**
   * System metadata
   */
  sys: {
    id: string
    type: TType
    organization?: Link<'Organization'>
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
