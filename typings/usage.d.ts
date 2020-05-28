import { MetaSys, MetaSysProps, MetaLinkProps, QueryOptions } from './generated/types/common-types'

export type UsageMetricEnum = 'cda' | 'cma' | 'cpa' | 'gql'

export interface UsageQuery extends QueryOptions {
  'metric[in]'?: string
  'dateRange.startAt'?: string
  'dateRange.endAt'?: string
}

interface UsageSysProps extends MetaSysProps {
  organization?: { sys: MetaLinkProps }
}

export interface Usage extends MetaSys<UsageSysProps> {
  metric: UsageMetricEnum
  unitOfMeasure: string
  dateRange: {
    startAt: string
    endAt: string
  }
  usage: number
  usagePerDay: {} // { 'yyyy-mm-dd': number, ... }
}
