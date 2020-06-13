import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import { AxiosInstance } from 'axios'
import {
  CollectionProp,
  DefaultElements,
  MetaLinkProps,
  MetaSysProps,
  QueryOptions,
} from '../common-types'

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
 * @param data - Raw usage data collection
 * @return Normalized usage collection
 */
export function wrapUsageCollection(_http: AxiosInstance, data: CollectionProp<UsageProps>) {
  const usage = toPlainObject(cloneDeep(data))
  return freezeSys(usage)
}
