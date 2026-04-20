/**
 * @module
 * @category Shared Types
 */
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

/** Details about an error that occurred during an automation execution */
export interface AutomationExecutionError {
  stepName: string
  message: string | null
}

/** System metadata for an automation execution */
export type AutomationExecutionSysProps = Pick<
  BasicMetaSysProps,
  'id' | 'createdAt' | 'createdBy' | 'updatedAt'
> & {
  space: SysLink
  environment: SysLink
  automationDefinition: Link<'AutomationDefinition'>
}

/** Properties of an automation execution */
export interface AutomationExecutionProps {
  sys: AutomationExecutionSysProps
  status: AutomationExecutionStatus
  errors: AutomationExecutionError[]
}

/** Query options for filtering automation executions */
export interface AutomationExecutionQueryOptions extends BasicCursorPaginationOptions {
  'sys.status[in]'?: string
  uniqueBy?: string
}

/** Query options for filtering automation executions by definition */
export interface AutomationExecutionByDefinitionQueryOptions
  extends AutomationExecutionQueryOptions {
  order?: 'sys.createdAt' | '-sys.createdAt' | 'sys.updatedAt' | '-sys.updatedAt'
}
