import type { BasicCursorPaginationOptions, BasicMetaSysProps, SysLink } from '../common-types'

export type AutomationDefinitionStatus = 'published'

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

export interface AutomationDefinitionAction {
  type: AutomationDefinitionActionType
  parameters: Record<string, unknown>
}

export interface AutomationDefinitionConditionStepCondition {
  nextStepId: string | null
  constraints: boolean | Record<string, unknown>
}

export interface AutomationDefinitionBaseStep {
  id: string
  name: string
  description?: string
}

export interface AutomationDefinitionActionStep extends AutomationDefinitionBaseStep {
  type: 'action'
  action: AutomationDefinitionAction
  nextStepId: string | null
}

export interface AutomationDefinitionConditionStep extends AutomationDefinitionBaseStep {
  type: 'condition'
  conditions: AutomationDefinitionConditionStepCondition[]
  nextStepId: string | null
}

export interface AutomationDefinitionLoopStep extends AutomationDefinitionBaseStep {
  type: 'loop'
  items: string
  mode: 'sequential'
  steps: AutomationDefinitionStep[]
  nextStepId: string | null
}

export type AutomationDefinitionStep =
  | AutomationDefinitionActionStep
  | AutomationDefinitionConditionStep
  | AutomationDefinitionLoopStep

export type AutomationDefinitionSysProps = Pick<
  BasicMetaSysProps,
  'id' | 'version' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'
> & {
  type: 'AutomationDefinition'
  space: SysLink
  environment: SysLink
  organization: SysLink
}

export interface AutomationDefinitionProps {
  sys: AutomationDefinitionSysProps
  name: string
  description?: string
  triggers: AutomationDefinitionTrigger[]
  steps: AutomationDefinitionStep[]
  status: AutomationDefinitionStatus
}

export type CreateAutomationDefinitionProps = Omit<AutomationDefinitionProps, 'sys'>

export type UpdateAutomationDefinitionProps = Omit<AutomationDefinitionProps, 'sys'> & {
  sys: Pick<AutomationDefinitionSysProps, 'version'>
}

export interface AutomationDefinitionQueryOptions extends BasicCursorPaginationOptions {
  order?: string
}
