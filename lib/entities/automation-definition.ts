import type { BasicMetaSysProps, SysLink } from '../common-types'

export type AutomationDefinitionStatus = 'published' | 'draft'

export type AutomationDefinitionTriggerType = 'manual' | 'event' | 'schedule'

export type AutomationDefinitionTriggerTopic =
  | 'Workflow.create'
  | 'Workflow.save'
  | 'Workflow.complete'
  | 'Entry.create'
  | 'Entry.delete'
  | 'Entry.save'
  | 'Entry.auto_save'
  | 'Entry.publish'
  | 'Entry.unpublish'
  | 'Entry.archive'
  | 'Entry.unarchive'

export type AutomationDefinitionTrigger =
  | { type: 'manual'; constraints?: Record<string, unknown>; debounce?: { interval: 0 | 300 } }
  | {
      type: 'event'
      topic: AutomationDefinitionTriggerTopic
      constraints?: Record<string, unknown>
      debounce?: { interval: 0 | 300 }
    }
  | {
      type: 'schedule'
      rrule: string
      constraints?: Record<string, unknown>
      debounce?: { interval: 0 | 300 }
    }

export type AutomationDefinitionStepType = 'action' | 'condition' | 'loop'

export type AutomationDefinitionActionType =
  | 'entry.create'
  | 'entry.update'
  | 'entry.delete'
  | 'entry.publish'
  | 'entry.unpublish'
  | 'entry.archive'
  | 'entry.unarchive'
  | 'workflow.create'
  | 'workflow.update'
  | 'workflow.open'
  | 'workflow.complete'
  | 'aiAction.invoke'
  | 'appActionCall.create'

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
  mode: 'sequential' | 'parallel'
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
  nextExecution?: string | null
}

export type CreateAutomationDefinitionProps = Omit<AutomationDefinitionProps, 'sys'>

export type UpdateAutomationDefinitionProps = Omit<AutomationDefinitionProps, 'sys'> & {
  sys: Pick<AutomationDefinitionSysProps, 'version'>
}

export interface AutomationDefinitionQueryOptions {
  limit?: number
  skip?: number
  'sys.id[in]'?: string
  status?: AutomationDefinitionStatus
}
