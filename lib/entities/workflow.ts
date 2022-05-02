import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  BasicMetaSysProps,
  DefaultElements,
  GetSpaceEnvironmentParams,
  GetWorkflowParams,
  Link,
  MakeRequest,
  PaginationQueryOptions,
  SysLink,
} from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'

export type WorkflowSysProps = Pick<
  BasicMetaSysProps,
  'id' | 'version' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'
> & {
  type: 'Workflow'
  space: SysLink
  environment: SysLink
  completedBy?: SysLink
  completedAt?: string
  deletedBy?: SysLink
  deletedAt?: string
  entity: Link<'Entry'>
  workflowDefinition: Link<'WorkflowDefinition'>
}

export type WorkflowProps = {
  sys: WorkflowSysProps
  stepId?: string
}

export type CreateWorkflowProps = Omit<WorkflowProps, 'sys'> & {
  entity: Link<'Entry'>
  workflowDefinition: Link<'WorkflowDefinition'>
}
export type UpdateWorkflowProps = Omit<WorkflowProps, 'sys'> & {
  sys: Pick<WorkflowSysProps, 'version'>
}

export type CreateWorkflowParams = GetSpaceEnvironmentParams
export type UpdateWorkflowParams = GetWorkflowParams
export type DeleteWorkflowParams = GetWorkflowParams & { version: number }
export type CompleteWorkflowParams = DeleteWorkflowParams

type WorkflowApi = {
  update(): Promise<Workflow>
  delete(): Promise<void>
  complete(): Promise<void>
}

export interface Workflow extends WorkflowProps, DefaultElements<WorkflowProps>, WorkflowApi {}

export type WorkflowQueryOptions = Omit<PaginationQueryOptions, 'order'> & {
  'stepId[in]'?: string
  /** Find workflows filtered by the Entity type (Entry) */
  'sys.entity.sys.linkType'?: string
  /** Find workflows containing the specified, comma-separated entities. Requires `sys.entity.sys.linkType` */
  'sys.entity.sys.id[in]'?: string
  'sys.workflowDefinition.sys.id'?: string
  /**
   * Order releases by
   * @default -sys.createdAt
   * */
  order?: string
}

/**
 * @private
 */
export default function createWorkflowApi(makeRequest: MakeRequest): WorkflowApi {
  const getParams = (Workflow: WorkflowProps): GetWorkflowParams => ({
    spaceId: Workflow.sys.space.sys.id,
    environmentId: Workflow.sys.environment.sys.id,
    workflowId: Workflow.sys.id,
  })

  return {
    update: function () {
      const raw = this.toPlainObject() as WorkflowProps

      return makeRequest({
        entityType: 'Workflow',
        action: 'update',
        params: getParams(raw),
        payload: raw,
      }).then((data) => wrapWorkflow(makeRequest, data))
    },

    delete: function () {
      const raw = this.toPlainObject() as WorkflowProps

      return makeRequest({
        entityType: 'Workflow',
        action: 'delete',
        params: {
          ...getParams(raw),
          version: raw.sys.version,
        },
      }).then(() => {
        // noop
      })
    },

    complete: function () {
      const raw = this.toPlainObject() as WorkflowProps

      return makeRequest({
        entityType: 'Workflow',
        action: 'complete',
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
export function wrapWorkflow(makeRequest: MakeRequest, data: WorkflowProps): Workflow {
  const Workflow = toPlainObject(copy(data))
  const WorkflowWithMethods = enhanceWithMethods(Workflow, createWorkflowApi(makeRequest))
  return freezeSys(WorkflowWithMethods)
}

/**
 * @private
 */
export const wrapWorkflowCollection = wrapCollection(wrapWorkflow)
