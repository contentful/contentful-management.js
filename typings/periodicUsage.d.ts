import { MetaSys, MetaSysProps, MetaLinkProps } from './meta'
import { QueryOptions } from './queryOptions'

export type PeriodicUsageMetric = "cda" | "cma" | "cpa" | "gql";

export interface PeriodicUsageQuery extends QueryOptions {
  'metric[in]'?: string,
  'dateRange.startAt'?: string,
  'dateRange.endAt'?: string
}

interface PeriodicUsageSysProps extends MetaSysProps {
  organization?: { sys: MetaLinkProps },
}

export interface PeriodicUsage extends MetaSys<PeriodicUsageSysProps> {
  metric: PeriodicUsageMetric,
  unitOfMeasure: string,
  dateRange : {
    startAt: string,
    endAt: string,
  },
  usage: number,
  usagePerDay: {} // { "yyyy-mm-dd": number, ... } This is beyond TS
}
