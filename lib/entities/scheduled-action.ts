import { AxiosInstance } from 'axios'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import { cloneDeep } from 'lodash'
import {
  DefaultElements,
  MetaSysProps,
  ISO8601Timestamp,
  BasicCursorPaginationOptions,
  MetaLinkProps,
  Link,
} from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'
import errorHandler from '../error-handler'

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

type SchedulableEntityType = 'Entry'
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

type ThisContext = ScheduledActionProps & DefaultElements<ScheduledActionProps>

type ScheduledActionApi = {
  delete(): Promise<ScheduledAction>
}

export interface ScheduledAction
  extends ScheduledActionProps,
    DefaultElements<ScheduledActionProps>,
    ScheduledActionApi {}

export function createDeleteScheduledAction(http: AxiosInstance): () => Promise<ScheduledAction> {
  return function (): Promise<ScheduledAction> {
    const self = this as ThisContext
    return http
      .delete('scheduled_actions/' + self.sys.id)
      .then((response) => wrapScheduledAction(http, response.data), errorHandler)
  }
}

export default function createScheduledActionApi(http: AxiosInstance): ScheduledActionApi {
  return {
    delete: createDeleteScheduledAction(http),
  }
}

export function wrapScheduledAction(
  http: AxiosInstance,
  data: ScheduledActionProps
): ScheduledAction {
  const scheduledAction = toPlainObject(cloneDeep(data))
  const scheduledActionWithMethods = enhanceWithMethods(
    scheduledAction,
    createScheduledActionApi(http)
  )
  return freezeSys(scheduledActionWithMethods)
}

export const wrapScheduledActionCollection = wrapCollection(wrapScheduledAction)
