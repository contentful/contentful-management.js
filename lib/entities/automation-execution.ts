import type { BasicMetaSysProps, Link, SysLink } from '../common-types'

export type AutomationExecutionStatus =
  | 'SCHEDULED'
  | 'IN_PROGRESS'
  | 'FAILED'
  | 'COMPLETED'
  | 'CANCELED'

export interface AutomationExecutionError {
  stepName: string
  message: string | null
}

export type AutomationExecutionSysProps = Pick<
  BasicMetaSysProps,
  'id' | 'createdAt' | 'createdBy' | 'updatedAt'
> & {
  space: SysLink
  environment: SysLink
  automationDefinition: Link<'AutomationDefinition'>
}

export interface AutomationExecutionProps {
  sys: AutomationExecutionSysProps
  status: AutomationExecutionStatus
  errors: AutomationExecutionError[]
}

export interface AutomationExecutionQueryOptions {
  'sys.labels[in]'?: string
  'sys.labels[all]'?: string
  'sys.status[in]'?: string
  limit?: number
  pagePrev?: string
  pageNext?: string
  uniqueBy?: string
}

export interface AutomationExecutionByDefinitionQueryOptions
  extends AutomationExecutionQueryOptions {
  order?: string
}
