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
  type: 'AutomationExecution'
  space: SysLink
  environment: SysLink
  organization: SysLink
  automationDefinition: Link<'AutomationDefinition'>
}

export interface AutomationExecutionProps {
  sys: AutomationExecutionSysProps
  status: AutomationExecutionStatus
  errors: AutomationExecutionError[]
}

export interface AutomationExecutionQueryOptions {
  limit?: number
  skip?: number
  'sys.automationDefinition.sys.id'?: string
}
