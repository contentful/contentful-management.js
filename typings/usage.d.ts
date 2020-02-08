import { MetaSys, MetaSysProps } from './meta'
import { Organization } from './organization'
import { Space } from './space'

export interface UsageFilter {
 'filters[metric]': 'cda' | 'cma' | 'cpa' | 'all_apis',
 'filters[usagePeriod]': string,
 'orderBy[metricUsage]': string
}

export interface UsageProps {
  organization?: Organization,
  space?: Space,
  unitOfMeasure: string,
  interval: string,
  startDate: string,
  endDate: string,
  usage: number[]
}

export interface Usage extends UsageProps, MetaSys<MetaSysProps> {}
