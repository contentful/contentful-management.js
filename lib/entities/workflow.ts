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
  GetWorkflowParams,
  Link,
  MakeRequest,
  PaginationQueryOptions,
  SysLink,
} from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'

/** System metadata properties for a workflow */
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

/** Properties of a workflow instance on an entry */
export type WorkflowProps = {
  sys: WorkflowSysProps
  stepId?: string
}

/** Properties required to create a new workflow */
export type CreateWorkflowProps = Omit<WorkflowProps, 'sys'> & {
  entity: Link<'Entry'>
  workflowDefinition: Link<'WorkflowDefinition'>
}
/** Properties for updating an existing workflow */
export type UpdateWorkflowProps = Omit<WorkflowProps, 'sys'> & {
  sys: Pick<WorkflowSysProps, 'version'>
}

/** Parameters required to create a workflow */
export type CreateWorkflowParams = GetSpaceEnvironmentParams
/** Parameters required to update a workflow */
export type UpdateWorkflowParams = GetWorkflowParams
/** Parameters required to delete a workflow */
export type DeleteWorkflowParams = GetWorkflowParams & { version: number }
/** Parameters required to complete a workflow */
export type CompleteWorkflowParams = DeleteWorkflowParams

type WorkflowApi = {
  update(): Promise<Workflow>
  get(): Promise<Workflow>
  delete(): Promise<void>
  complete(): Promise<void>
}

type OrderQueryParam = 'sys.updatedAt' | '-sys.updatedAt' | 'sys.createdAt' | '-sys.createdAt'

/** A workflow with methods to update, get, delete, and complete */
export interface Workflow extends WorkflowProps, DefaultElements<WorkflowProps>, WorkflowApi {}

/** Query options for filtering and paginating workflows */
export type WorkflowQueryOptions = Omit<PaginationQueryOptions, 'order'> & {
  'stepId[in]'?: string
  /** Find workflows filtered by the Entity type (Entry) */
  'sys.entity.sys.linkType'?: string
  /** Find workflows containing the specified, comma-separated entities. Requires `sys.entity.sys.linkType` */
  'sys.entity.sys.id[in]'?: string
  'sys.workflowDefinition.sys.id'?: string
  /**
   * Order workflows by
   * @default -sys.createdAt
   **/
  order?: OrderQueryParam
}

/**
 * @internal
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
    get: function () {
      const raw = this.toPlainObject() as WorkflowProps

      return makeRequest({
        entityType: 'Workflow',
        action: 'get',
        params: getParams(raw),
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
 * @internal
 */
export function wrapWorkflow(makeRequest: MakeRequest, data: WorkflowProps): Workflow {
  const Workflow = toPlainObject(copy(data))
  const WorkflowWithMethods = enhanceWithMethods(Workflow, createWorkflowApi(makeRequest))
  return freezeSys(WorkflowWithMethods)
}

/**
 * @internal
 */
export const wrapWorkflowCollection = wrapCollection(wrapWorkflow)
