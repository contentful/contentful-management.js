/* eslint-disable @typescript-eslint/no-explicit-any */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  DefaultElements,
  ISO8601Timestamp,
  Link,
  MakeRequest,
  VersionedLink,
} from '../common-types'

/** Entity types supported by the BulkAction API */
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

const STATUSES = Object.values(BulkActionStatus)
type BulkActionStatuses = typeof STATUSES[number]

interface BulkActionFailedError {
  sys: { type: 'Error'; id: 'BulkActionFailed' }
  details: {
    errors: any
    [key: string]: any
  }
}

export type BulkActionPayload =
  | BulkActionPublishPayload
  | BulkActionUnpublishPayload
  | BulkActionValidatePayload

export interface BulkActionValidatePayload {
  action?: 'publish'
  entities: {
    sys?: { type: string }
    items: Link<Entity>[]
  }
}
export interface BulkActionUnpublishPayload {
  entities: {
    sys?: { type: string }
    items: Link<Entity>[]
  }
}

export interface BulkActionPublishPayload {
  entities: {
    sys?: { type: string }
    items: VersionedLink<Entity>[]
  }
}

export type BulkActionSysProps = {
  id: string
  type: 'BulkAction'
  status: BulkActionStatuses
  space: Link<'Space'>
  environment: Link<'Environment'>
  createdBy: Link<'User'>
  createdAt: ISO8601Timestamp
  updatedAt: ISO8601Timestamp
}

/** The object returned by the BulkActions API */
export interface BulkActionProps<TPayload extends BulkActionPayload> {
  sys: BulkActionSysProps
  action: BulkActionType
  /** original payload when BulkAction was created */
  payload: TPayload
  /** error information, if present */
  error?: BulkActionFailedError
}

export interface BulkAction<T extends BulkActionPayload>
  extends BulkActionProps<T>,
    DefaultElements<BulkActionProps<T>> {}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw BulkAction data
 * @return Wrapped BulkAction data
 */
export function wrapBulkAction<T extends BulkActionPayload = any>(
  _makeRequest: MakeRequest,
  data: BulkActionProps<BulkActionPayload>
): BulkAction<T> {
  const bulkAction = toPlainObject(copy(data))
  return freezeSys(bulkAction) as BulkAction<T>
}
