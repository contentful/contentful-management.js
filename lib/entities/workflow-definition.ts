import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  BasicMetaSysProps,
  DefaultElements,
  GetSpaceEnvironmentParams,
  GetWorkflowDefinitionParams,
  Link,
  MakeRequest,
  PaginationQueryOptions,
  SysLink,
} from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'
import { ActionType } from './role'

/* Workflow Step Action */
export enum WorkflowStepActionType {
  App = 'app',
  Email = 'email',
  Task = 'task',
}
export interface WorkflowStepAction<T = Record<string, any>> {
  appId?: string
  appActionId?: string
  type: WorkflowStepActionType
  configuration?: T
}

type EmailActionRecipient = string | Link<'User'> | Link<'Team'>

export type WorkflowStepEmailActionConfiguration = {
  recipients: EmailActionRecipient[]
}

export type WorkflowStepTaskActionConfiguration = {
  assignee: Link<'User'> | Link<'Team'>
  body: string
  dueDate?: number
}

export type WorkflowStepAppActionConfiguration = {
  body: Record<string, any>
  headers: Record<string, any>
}

/* Workflow Step */
export type WorkflowStepPermission = {
  effect: string
  action: ActionType | 'all'
  actor: Link<'User' | 'Team'>
}

export type WorkflowStepProps = {
  id: string
  name: string
  description?: string
  actions?: WorkflowStepAction[]
  annotations?: string[]
  permissions?: WorkflowStepPermission[]
}

export type UpdateWorkflowStepProps = WorkflowStepProps
export type CreateWorkflowStepProps = Omit<WorkflowStepProps, 'id'>

/* Workflow Definition */

export type WorkflowDefinitionSysProps = Pick<
  BasicMetaSysProps,
  'id' | 'version' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'
> & {
  type: 'WorkflowDefinition'
  space: SysLink
  environment: SysLink
}

export type WorkflowDefinitionValidationLink = {
  type: 'Link'
  validations: Array<{
    linkContentType: string[]
  }>
  linkType: 'Entry'
}

export type WorkflowDefinitionProps = {
  sys: WorkflowDefinitionSysProps
  name: string
  description?: string
  appliesTo?: WorkflowDefinitionValidationLink[]
  steps: WorkflowStepProps[]
}

export type CreateWorkflowDefinitionProps = Omit<WorkflowDefinitionProps, 'sys' | 'steps'> & {
  steps: CreateWorkflowStepProps[]
}
export type UpdateWorkflowDefinitionProps = Omit<WorkflowDefinitionProps, 'sys' | 'steps'> & {
  sys: Pick<WorkflowDefinitionSysProps, 'version'>
  steps: Array<CreateWorkflowStepProps | UpdateWorkflowStepProps>
}

export type CreateWorkflowDefinitionParams = GetSpaceEnvironmentParams
export type UpdateWorkflowDefinitionParams = GetWorkflowDefinitionParams
export type DeleteWorkflowDefinitionParams = GetWorkflowDefinitionParams & { version: number }

type WorkflowDefinitionApi = {
  update(): Promise<WorkflowDefinition>
  delete(): Promise<void>
}

export interface WorkflowDefinition
  extends WorkflowDefinitionProps,
    DefaultElements<WorkflowDefinitionProps>,
    WorkflowDefinitionApi {}

export type WorkflowDefinitionQueryOptions = Omit<PaginationQueryOptions, 'order'>

/**
 * @private
 */
export default function createWorkflowDefinitionApi(
  makeRequest: MakeRequest
): WorkflowDefinitionApi {
  const getParams = (workflowDefinition: WorkflowDefinitionProps): GetWorkflowDefinitionParams => ({
    spaceId: workflowDefinition.sys.space.sys.id,
    environmentId: workflowDefinition.sys.environment.sys.id,
    workflowDefinitionId: workflowDefinition.sys.id,
  })

  return {
    update: function () {
      const raw = this.toPlainObject() as WorkflowDefinitionProps

      return makeRequest({
        entityType: 'WorkflowDefinition',
        action: 'update',
        params: getParams(raw),
        payload: raw,
      }).then((data) => wrapWorkflowDefinition(makeRequest, data))
    },

    delete: function () {
      const raw = this.toPlainObject() as WorkflowDefinitionProps

      return makeRequest({
        entityType: 'WorkflowDefinition',
        action: 'delete',
        params: {
          ...getParams(raw),
          version: raw.sys.version,
        },
      }).then(() => {
        // noop
      })
    },
  }
}

/**
 * @private
 */
export function wrapWorkflowDefinition(
  makeRequest: MakeRequest,
  data: WorkflowDefinitionProps
): WorkflowDefinition {
  const workflowDefinition = toPlainObject(copy(data))
  const workflowDefinitionWithMethods = enhanceWithMethods(
    workflowDefinition,
    createWorkflowDefinitionApi(makeRequest)
  )
  return freezeSys(workflowDefinitionWithMethods)
}

/**
 * @private
 */
export const wrapWorkflowDefinitionCollection = wrapCollection(wrapWorkflowDefinition)
