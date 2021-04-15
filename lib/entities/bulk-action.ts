import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  DefaultElements,
  ISO8601Timestamp,
  Link,
  MakeRequest,
  VersionedLink,
} from '../common-types'

/** Entities supported by the BulkAction API */
type Entity = 'Entry' | 'Asset'

export type BulkActionType = 'publish' | 'unpublish' | 'validate'

/** Represents the state of the BulkAction */
export enum BulkActionStatus {
  /** BulkAction is pending execution */
  created = 'created',
  /** BulkAction has been started and pending completion */
  inProgress = 'inProgress',
  /** BulkAction was completed successfully (terminal state) */
  succeeded = 'succeeded',
  /** BulkAction failed to complete (terminal state) */
  failed = 'failed',
}

interface BulkActionFailedError {
  sys: { type: 'Error'; id: 'BulkActionFailed' }
  details: any
}

export type BulkActionSysProps = {
  id: string
  type: 'BulkAction'
  status: BulkActionStatus
  space: Link<'Space'>
  environment: Link<'Environment'>
  createdBy: Link<'User'>
  createdAt: ISO8601Timestamp
  updatedAt: ISO8601Timestamp
}

export type BulkActionProps = {
  sys: BulkActionSysProps
  action: BulkActionType
  /** original payload when BulkAction was created */
  payload: any
  /** error information, if present */
  error?: BulkActionFailedError
}

export type BulkActionPayload = {
  entities: {
    sys?: { type: string }
    items: Link<Entity>[] | VersionedLink<Entity>[]
    [key: string]: any
  }
}

export interface BulkAction extends BulkActionProps, DefaultElements<BulkActionProps> {}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw BulkAction data
 * @return Wrapped content type data
 */
export function wrapBulkAction(_makeRequest: MakeRequest, data: BulkActionProps): BulkAction {
  const bulkAction = toPlainObject(copy(data))
  return freezeSys(bulkAction)
}
