import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  DefaultElements,
  Link,
  MakeRequest,
  PaginationQueryOptions,
  SysLink,
} from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'

export type WorkflowsChangelogQueryOptions = Omit<PaginationQueryOptions, 'order'> & {
  /** Find workflows changelog entries filtered by the Entity type (Entry) */
  'entity.sys.linkType': string
  /** Find workflows changelog entries containing the specified, comma-separated entities. Requires `sys.entity.sys.linkType` */
  'entity.sys.id': string
  'workflow.sys.id': string
}

export type WorkflowsChangelogEntryProps = {
  event: string
  eventBy: SysLink
  eventAt: string
  workflow: Link<'Workflow'>
  workflowDefinition: Link<'WorkflowDefinition'>
  entity: Link<'Entry'>
  stepId: string
  stepAnnotations: string[]
  stepName: string
}

export interface WorkflowsChangelogEntry
  extends WorkflowsChangelogEntryProps,
    DefaultElements<WorkflowsChangelogEntryProps> {}

/**
 * @private
 */
function createWorkflowsChangelogEntryApi() {
  return {}
}

/**
 * @private
 */
export function wrapWorkflowsChangelogEntry(
  _makeRequest: MakeRequest,
  data: WorkflowsChangelogEntryProps
): WorkflowsChangelogEntry {
  const workflowsChangelogEntry = toPlainObject(copy(data))
  const workflowsChangelogEntryWithMethods = enhanceWithMethods(
    workflowsChangelogEntry,
    createWorkflowsChangelogEntryApi()
  )
  return freezeSys(workflowsChangelogEntryWithMethods)
}

/**
 * @private
 */
export const wrapWorkflowsChangelogEntryCollection = wrapCollection(wrapWorkflowsChangelogEntry)
