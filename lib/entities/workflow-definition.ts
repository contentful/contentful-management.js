/**
 * @module
 * @category Entities
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
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

/* Workflow Step Permission */
type NonEmptyArray<T> = [T, ...T[]]
/** Actors for a workflow step permission: all users or specific users/teams */
export type WorkflowStepPermissionActors = 'all' | NonEmptyArray<Link<'User'> | Link<'Team'>>

/** Types of permissions that can be applied to a workflow step */
export enum WorkflowStepPermissionType {
  EntityPermission = 'entity_permission',
  WorkflowPermission = 'workflow_permission',
}

/** Actions that can be controlled by a workflow step permission */
export enum WorkflowStepPermissionAction {
  Edit = 'edit',
  Publish = 'publish',
  Delete = 'delete',
}

/** Whether a workflow step permission allows or denies an action */
export enum WorkflowStepPermissionEffect {
  Allow = 'allow',
  Deny = 'deny',
}

/** A permission rule for a workflow step controlling who can perform actions */
export interface WorkflowStepPermission {
  type: WorkflowStepPermissionType
  configuration: {
    actors: WorkflowStepPermissionActors
    action: WorkflowStepPermissionAction
    effect: WorkflowStepPermissionEffect
  }
}

/* Workflow Step Action */
/** Types of actions that can be triggered by a workflow step */
export enum WorkflowStepActionType {
  App = 'app',
  Email = 'email',
  Task = 'task',
}
/** An action triggered when a workflow step is reached */
export type WorkflowStepAction =
  | WorkflowStepEmailAction
  | WorkflowStepTaskAction
  | WorkflowStepAppAction

/** A recipient of a workflow step email action */
export type WorkflowStepEmailActionRecipient = string | Link<'User'> | Link<'Team'>

/** A workflow step action that sends an email notification */
export type WorkflowStepEmailAction = {
  type: 'email'
  configuration: {
    recipients: WorkflowStepEmailActionRecipient[]
  }
}

/** A workflow step action that creates a task */
export type WorkflowStepTaskAction = {
  type: 'task'
  configuration: {
    assignee: Link<'User'> | Link<'Team'>
    body: string
    dueDate?: number
  }
}

/** A workflow step action that triggers an app action */
export type WorkflowStepAppAction = {
  type: 'app'
  appId: string
  appActionId: string
  configuration?: {
    body?: Record<string, any>
    headers?: Record<string, string>
  }
}

/* Workflow Step */
/** Properties of a workflow step within a workflow definition */
export type WorkflowStepProps = {
  id: string
  name: string
  description?: string
  actions?: WorkflowStepAction[]
  annotations?: string[]
  permissions?: WorkflowStepPermission[]
}

/** Properties for updating an existing workflow step */
export type UpdateWorkflowStepProps = WorkflowStepProps
/** Properties required to create a new workflow step */
export type CreateWorkflowStepProps = Omit<WorkflowStepProps, 'id'>

/* Workflow Definition */

/** System metadata properties for a workflow definition */
export type WorkflowDefinitionSysProps = Pick<
  BasicMetaSysProps,
  'id' | 'version' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'
> & {
  type: 'WorkflowDefinition'
  space: SysLink
  environment: SysLink
  isLocked: boolean
}

/** A link constraint defining which content types a workflow definition applies to */
export type WorkflowDefinitionValidationLink = {
  type: 'Link'
  validations: Array<{
    linkContentType: string[]
  }>
  linkType: 'Entry'
}

/** Properties of a workflow definition containing steps and configuration */
export type WorkflowDefinitionProps = {
  sys: WorkflowDefinitionSysProps
  name: string
  description?: string
  appliesTo?: WorkflowDefinitionValidationLink[]
  steps: WorkflowStepProps[]
  startOnEntityCreation?: boolean
  flowType?: 'no_restriction' | 'strict_neighbor'
}

/** Properties required to create a new workflow definition */
export type CreateWorkflowDefinitionProps = Omit<WorkflowDefinitionProps, 'sys' | 'steps'> & {
  steps: CreateWorkflowStepProps[]
}
/** Properties for updating an existing workflow definition */
export type UpdateWorkflowDefinitionProps = Omit<WorkflowDefinitionProps, 'sys' | 'steps'> & {
  sys: Pick<WorkflowDefinitionSysProps, 'version'>
  steps: Array<CreateWorkflowStepProps | UpdateWorkflowStepProps>
}

/** Parameters required to create a workflow definition */
export type CreateWorkflowDefinitionParams = GetSpaceEnvironmentParams
/** Parameters required to update a workflow definition */
export type UpdateWorkflowDefinitionParams = GetWorkflowDefinitionParams
/** Parameters required to delete a workflow definition */
export type DeleteWorkflowDefinitionParams = GetWorkflowDefinitionParams & { version: number }

type WorkflowDefinitionApi = {
  update(): Promise<WorkflowDefinition>
  delete(): Promise<void>
}

/** A workflow definition with methods to update and delete */
export interface WorkflowDefinition
  extends WorkflowDefinitionProps,
    DefaultElements<WorkflowDefinitionProps>,
    WorkflowDefinitionApi {}

/** Query options for filtering workflow definitions */
export type WorkflowDefinitionQueryOptions = Omit<PaginationQueryOptions, 'order'>

/**
 * @internal
 */
export default function createWorkflowDefinitionApi(
  makeRequest: MakeRequest,
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
 * @internal
 */
export function wrapWorkflowDefinition(
  makeRequest: MakeRequest,
  data: WorkflowDefinitionProps,
): WorkflowDefinition {
  const workflowDefinition = toPlainObject(copy(data))
  const workflowDefinitionWithMethods = enhanceWithMethods(
    workflowDefinition,
    createWorkflowDefinitionApi(makeRequest),
  )
  return freezeSys(workflowDefinitionWithMethods)
}

/**
 * @internal
 */
export const wrapWorkflowDefinitionCollection = wrapCollection(wrapWorkflowDefinition)
