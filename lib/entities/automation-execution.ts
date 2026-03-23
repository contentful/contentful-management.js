import type {
  BasicCursorPaginationOptions,
  BasicMetaSysProps,
  Link,
  SysLink,
} from '../common-types'

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

export interface AutomationExecutionQueryOptions extends BasicCursorPaginationOptions {
  'sys.status[in]'?: string
  uniqueBy?: string
}

export interface AutomationExecutionByDefinitionQueryOptions
  extends AutomationExecutionQueryOptions {
  order?: 'sys.createdAt' | '-sys.createdAt' | 'sys.updatedAt' | '-sys.updatedAt'
}
