import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  BasicMetaSysProps,
  DefaultElements,
  GetSpaceEnvironmentParams,
  GetWorkflowDefinitionParams,
  Link,
  MakeRequest,
  SysLink,
} from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'
import { ActionType } from './role'

export type WorkflowDefinitionSysProps = Pick<
  BasicMetaSysProps,
  'id' | 'version' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'
> & {
  type: 'WorkflowDefinition'
  space: SysLink
  environment: SysLink
}

type ValidationLink = {
  type: 'Link'
  validations: Array<{
    linkContentType: string[]
  }>
  linkType: 'Entry'
}

type WorkflowStepProps = {
  id: string
  name: string
  description?: string
  actions?: Array<{
    action: Link<'AppAction'>
    body: string
    headers: Record<string, unknown>
  }>
  annotations?: string[]
}

type CreateWorkflowStepProps = Omit<WorkflowStepProps, 'sys'>

type Permission = {
  effect: string
  action: ActionType | 'all'
  actor: Link<'User' | 'Team'>
}

export type WorkflowDefinitionProps = {
  sys: WorkflowDefinitionSysProps
  name: string
  description: string
  applicableEntities: ValidationLink[]
  steps: WorkflowStepProps[]
  permissions: Permission[]
}

export type CreateWorkflowDefinitionProps = Omit<WorkflowDefinitionProps, 'sys' | 'steps'> & {
  steps: CreateWorkflowStepProps[]
}
export type UpdateWorkflowDefinitionProps = Omit<WorkflowDefinitionProps, 'sys' | 'steps'> & {
  sys: Pick<WorkflowDefinitionSysProps, 'version'>
  steps: Array<CreateWorkflowStepProps | WorkflowStepProps>
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
