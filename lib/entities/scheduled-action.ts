import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  DefaultElements,
  ISO8601Timestamp,
  BasicCursorPaginationOptions,
  MetaLinkProps,
  Link,
  MakeRequest,
} from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'

/**
 * Represents that state of the scheduled action
 */
enum ScheduledActionStatus {
  /** action is pending execution */
  scheduled = 'scheduled',
  /** action has been started and pending completion */
  inProgress = 'inProgress',
  /** action was completed successfully (terminal state) */
  succeeded = 'succeeded',
  /** action failed to complete (terminal state) */
  failed = 'failed',
  /** action was canceled by a user (terminal state) */
  canceled = 'canceled',
}

type SchedulableEntityType = 'Entry' | 'Asset' | 'Release'
type SchedulableActionType = 'publish' | 'unpublish'

export type ScheduledActionSysProps = {
  id: string
  type: 'ScheduledAction'
  space: { sys: MetaLinkProps }
  status: ScheduledActionStatus
  createdAt: ISO8601Timestamp
  createdBy: { sys: MetaLinkProps }
  /** an ISO8601 date string representing when an action was moved to canceled */
  canceledAt?: ISO8601Timestamp
  canceledBy?: { sys: MetaLinkProps }
}

export type ScheduledActionProps = {
  sys: ScheduledActionSysProps
  action: SchedulableActionType
  entity: Link<SchedulableEntityType>
  environment?: { sys: MetaLinkProps }
  scheduledFor: {
    datetime: ISO8601Timestamp
    /**
     * A valid IANA timezone Olson identifier
     *
     * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
     * @example 'Asia/Kolkata'
     */
    timezone?: string
  }
}

export interface ScheduledActionCollection {
  sys: {
    type: 'Array'
  }
  pages: BasicCursorPaginationOptions
  limit: number
  items: ScheduledActionProps[]
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ScheduledActionQueryOptions extends BasicCursorPaginationOptions {
  'environment.sys.id': string
  [key: string]: any
}

type ScheduledActionApi = {
  delete(): Promise<ScheduledAction>
}

export interface ScheduledAction
  extends ScheduledActionProps,
    DefaultElements<ScheduledActionProps>,
    ScheduledActionApi {}

export function createDeleteScheduledAction(
  makeRequest: MakeRequest
): () => Promise<ScheduledAction> {
  return function (): Promise<ScheduledAction> {
    const data = this.toPlainObject() as ScheduledActionProps
    return makeRequest({
      entityType: 'ScheduledAction',
      action: 'delete',
      params: {
        spaceId: data.sys.space.sys.id,
        scheduledActionId: data.sys.id,
        environmentId: data.environment?.sys.id as string,
      },
    }).then((data) => wrapScheduledAction(makeRequest, data))
  }
}

export default function createScheduledActionApi(makeRequest: MakeRequest): ScheduledActionApi {
  return {
    delete: createDeleteScheduledAction(makeRequest),
  }
}

export function wrapScheduledAction(
  makeRequest: MakeRequest,
  data: ScheduledActionProps
): ScheduledAction {
  const scheduledAction = toPlainObject(copy(data))
  const scheduledActionWithMethods = enhanceWithMethods(
    scheduledAction,
    createScheduledActionApi(makeRequest)
  )
  return freezeSys(scheduledActionWithMethods)
}

export const wrapScheduledActionCollection = wrapCollection(wrapScheduledAction)
