import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  DefaultElements,
  ISO8601Timestamp,
  BasicCursorPaginationOptions,
  MetaLinkProps,
  Link,
  MakeRequest,
  SysLink,
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

type ErrorDetail = { error: any }
interface ScheduledActionFailedError {
  sys: {
    type: 'Error'
    id: string
  }
  message?: string
  details?: { errors: ErrorDetail[] }
}

export type ScheduledActionSysProps = {
  id: string
  type: 'ScheduledAction'
  version: number
  space: SysLink
  status: ScheduledActionStatus
  createdAt: ISO8601Timestamp
  createdBy: Link<'User'> | Link<'AppDefinition'>
  /** an ISO8601 date string representing when an action was moved to canceled */
  canceledAt?: ISO8601Timestamp
  canceledBy?: Link<'User'> | Link<'AppDefinition'>
  /** an ISO8601 date string representing when an action was updated */
  updatedAt: ISO8601Timestamp
  updatedBy: Link<'User'> | Link<'AppDefinition'>
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
  /**
   * The Contentful-style error that occurred during execution if sys.status is failed
   *
   * @example
   * {
   *   sys: {
   *     type: 'Error',
   *     id: 'InvalidEntry'
   *   },
   *   message: 'Entry is invalid',
   *   details: {
   *     errors: [...]
   *   }
   * }
   */
  error?: ScheduledActionFailedError
}

export type CreateUpdateScheduledActionProps = Pick<
  ScheduledActionProps,
  'action' | 'entity' | 'environment' | 'scheduledFor'
>

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

export type ScheduledActionApi = {
  delete(): Promise<ScheduledAction>
  update(): Promise<ScheduledAction>
}

export interface ScheduledAction
  extends ScheduledActionProps,
    DefaultElements<ScheduledActionProps>,
    ScheduledActionApi {}

export default function getInstanceMethods(makeRequest: MakeRequest): ScheduledActionApi {
  const getParams = (self: ScheduledAction) => {
    const scheduledAction = self.toPlainObject()
    return {
      spaceId: scheduledAction.sys.space.sys.id,
      environmentId: scheduledAction.environment?.sys.id as string,
      scheduledActionId: scheduledAction.sys.id,
      version: scheduledAction.sys.version,
    }
  }

  return {
    /**
     * Cancels the current Scheduled Action schedule.
     *
     * @example ```javascript
     *  const contentful = require('contentful-management');
     *
     *  const client = contentful.createClient({
     *    accessToken: '<content_management_api_key>'
     *  })
     *
     *  client.getSpace('<space_id>')
     *    .then((space) => {
     *      return space.createScheduledAction({
     *        entity: {
     *          sys: {
     *            type: 'Link',
     *            linkType: 'Entry',
     *            id: '<entry_id>'
     *          }
     *        },
     *        environment: {
     *          type: 'Link',
     *          linkType: 'Environment',
     *          id: '<environment_id>'
     *        },
     *        action: 'publish',
     *        scheduledFor: {
     *          dateTime: <ISO_date_string>,
     *          timezone: 'Europe/Berlin'
     *        }
     *      })
     *    .then((scheduledAction) => scheduledAction.delete())
     *    .then((deletedScheduledAction) => console.log(deletedScheduledAction))
     *    .catch(console.error);
     * ```
     */
    async delete(): Promise<ScheduledAction> {
      const params = getParams(this)

      return makeRequest({
        entityType: 'ScheduledAction',
        action: 'delete',
        params,
      }).then((data) => wrapScheduledAction(makeRequest, data))
    },
    /**
     * Update the current scheduled action. Currently, only changes made to the `scheduledFor` property will be saved.
     *
     * @example ```javascript
     *  const contentful = require('contentful-management');
     *
     *  const client = contentful.createClient({
     *    accessToken: '<content_management_api_key>'
     *  })
     *
     *  client.getSpace('<space_id>')
     *    .then((space) => {
     *      return space.createScheduledAction({
     *        entity: {
     *          sys: {
     *            type: 'Link',
     *            linkType: 'Entry',
     *            id: '<entry_id>'
     *          }
     *        },
     *        environment: {
     *          type: 'Link',
     *          linkType: 'Environment',
     *          id: '<environment_id>'
     *        },
     *        action: 'publish',
     *        scheduledFor: {
     *          dateTime: <ISO_date_string>,
     *          timezone: 'Europe/Berlin'
     *        }
     *      })
     *    .then((scheduledAction) => {
     *      scheduledAction.scheduledFor.timezone = 'Europe/Paris';
     *      return scheduledAction.update();
     *    })
     *    .then((scheduledAction) => console.log(scheduledAction))
     *    .catch(console.error);
     * ```
     */
    async update(): Promise<ScheduledAction> {
      const params = getParams(this)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { sys, ...payload } = this.toPlainObject()

      return makeRequest({
        entityType: 'ScheduledAction',
        action: 'update',
        params,
        payload,
      }).then((data) => wrapScheduledAction(makeRequest, data))
    },
  }
}

/**
 * @private
 */
export function wrapScheduledAction(
  makeRequest: MakeRequest,
  data: ScheduledActionProps
): ScheduledAction {
  const scheduledAction = toPlainObject(copy(data))
  const scheduledActionWithMethods = enhanceWithMethods(
    scheduledAction,
    getInstanceMethods(makeRequest)
  )
  return freezeSys(scheduledActionWithMethods)
}

/**
 * @private
 */
export const wrapScheduledActionCollection = wrapCollection(wrapScheduledAction)
