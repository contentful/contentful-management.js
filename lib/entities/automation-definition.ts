/**
 * @module
 * @category Shared Types
 */
import type { BasicCursorPaginationOptions, BasicMetaSysProps, SysLink } from '../common-types'

/** The publication status of an automation definition */
export type AutomationDefinitionStatus = 'published'

/** Supported event topics that can trigger an automation definition */
export type AutomationDefinitionTriggerTopic =
  | 'Workflow.create'
  | 'Workflow.save'
  | 'Workflow.complete'
  | 'Entry.create'
  | 'Entry.delete'
  | 'Entry.save'
  | 'Entry.publish'
  | 'Entry.unpublish'
  | 'Entry.archive'
  | 'Entry.unarchive'

/** A trigger configuration for starting an automation definition */
export type AutomationDefinitionTrigger =
  | {
      type: 'event'
      topic: AutomationDefinitionTriggerTopic
      constraints?: Record<string, unknown>
    }
  | {
      type: 'schedule'
      rrule: string
      constraints?: Record<string, unknown>
    }

/** Supported action types for automation definition steps */
export type AutomationDefinitionActionType =
  | 'cma.aiAction.invoke'
  | 'cma.entry.get'
  | 'cma.entry.getMany'
  | 'cma.entry.create'
  | 'cma.entry.publish'
  | 'cma.entry.unpublish'
  | 'cma.entry.patch'
  | 'cma.entry.delete'
  | 'cma.entry.archive'
  | 'cma.entry.unarchive'
  | 'cma.workflow.update'
  | 'cma.workflow.create'
  | 'cma.workflow.complete'
  | 'cma.appActionCall.createWithResult'

/** An action executed by an automation definition step */
export interface AutomationDefinitionAction {
  type: AutomationDefinitionActionType
  parameters: Record<string, unknown>
}

/** A conditional branch within an automation definition condition step */
export interface AutomationDefinitionConditionStepCondition {
  nextStepId: string | null
  constraints: Record<string, unknown>
}

/** Shared properties for all automation definition steps */
export interface AutomationDefinitionBaseStep {
  id: string
  name: string
  description?: string
  nextStepId: string | null
}

/** A step that performs an action */
export interface AutomationDefinitionActionStep extends AutomationDefinitionBaseStep {
  type: 'action'
  action: AutomationDefinitionAction
}

/** A step that routes execution based on conditions */
export interface AutomationDefinitionConditionStep extends AutomationDefinitionBaseStep {
  type: 'condition'
  conditions: AutomationDefinitionConditionStepCondition[]
}

/** A step that iterates over a collection of items */
export interface AutomationDefinitionLoopStep extends AutomationDefinitionBaseStep {
  type: 'loop'
  items: string
  mode: 'sequential'
  steps: AutomationDefinitionStep[]
}

/** Any supported step within an automation definition */
export type AutomationDefinitionStep =
  | AutomationDefinitionActionStep
  | AutomationDefinitionConditionStep
  | AutomationDefinitionLoopStep

/** System metadata for an automation definition */
export type AutomationDefinitionSysProps = Pick<
  BasicMetaSysProps,
  'id' | 'version' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'
> & {
  type: 'AutomationDefinition'
  space: SysLink
  environment: SysLink
  organization: SysLink
}

/** Properties of an automation definition */
export interface AutomationDefinitionProps {
  sys: AutomationDefinitionSysProps
  name: string
  description?: string
  triggers: AutomationDefinitionTrigger[]
  steps: AutomationDefinitionStep[]
  status: AutomationDefinitionStatus
}

/** Properties required to create an automation definition */
export type CreateAutomationDefinitionProps = Omit<AutomationDefinitionProps, 'sys'>

/** Properties required to update an automation definition */
export type UpdateAutomationDefinitionProps = Omit<AutomationDefinitionProps, 'sys'> & {
  sys: Pick<AutomationDefinitionSysProps, 'version'>
}

/** Query options for filtering automation definitions */
export interface AutomationDefinitionQueryOptions extends BasicCursorPaginationOptions {
  order?: 'sys.createdAt' | '-sys.createdAt' | 'sys.updatedAt' | '-sys.updatedAt'
}
