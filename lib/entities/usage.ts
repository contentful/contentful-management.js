import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import { AxiosInstance } from 'axios'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import { DefaultElements, MetaLinkProps, MetaSysProps, QueryOptions } from '../common-types'

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
 * @param http - HTTP client instance
 * @param data - Raw data
 * @return Normalized usage
 */
export function wrapUsage(http: AxiosInstance, data: UsageProps): Usage {
  const usage = toPlainObject(cloneDeep(data))
  const usageWithMethods = enhanceWithMethods(usage, {})
  return freezeSys(usageWithMethods)
}

/**
 * @private
 */
export const wrapUsageCollection = wrapCollection(wrapUsage)
