/**
 * @module
 * @category Entities
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type {
  DefaultElements,
  ISO8601Timestamp,
  Link,
  MakeRequest,
  MakeRequestPayload,
  VersionedLink,
} from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'
import type { AsyncActionProcessingOptions } from '../methods/action'
import { pollAsyncActionStatus } from '../methods/action'

/** Entity types supported by the BulkAction API */
type Entity = 'Entry' | 'Asset'
type Collection<T> = Array<T>
type EntityError = { entity: VersionedLink<Entity> | Link<Entity>; error: any }

/** The type of operation performed by a bulk action. */
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
type BulkActionStatuses = (typeof STATUSES)[number]

interface BulkActionFailedError {
  sys: { type: 'Error'; id: 'BulkActionFailed' }
  message?: string
  details?: {
    errors: Collection<EntityError>
  }
}

/** Union of all valid bulk action payload types. */
export type BulkActionPayload =
  | BulkActionPublishPayload
  | BulkActionUnpublishPayload
  | BulkActionValidatePayload

/** Payload for a bulk validate action. */
export interface BulkActionValidatePayload extends MakeRequestPayload {
  action?: 'publish'
  entities: {
    sys?: { type: 'Array' }
    items: Collection<Link<Entity>>
  }
}
/** Payload for a bulk unpublish action. */
export interface BulkActionUnpublishPayload extends MakeRequestPayload {
  entities: {
    sys?: { type: 'Array' }
    items: Collection<Link<Entity>>
  }
}

/** Payload for a bulk publish action. */
export interface BulkActionPublishPayload extends MakeRequestPayload {
  entities: {
    sys?: { type: 'Array' }
    items: Collection<VersionedLink<Entity>>
  }
}

interface AddFieldsEntity<L extends Link<Entity> | VersionedLink<Entity>> {
  entity: L
  add?: {
    fields: Record<'*', string[]>
  }
}

interface RemoveFieldsEntity<L extends Link<Entity> | VersionedLink<Entity>> {
  entity: L
  remove?: {
    fields: Record<'*', string[]>
  }
}
type BulkActionEntity<L extends Link<Entity> | VersionedLink<Entity>> = {
  entity: L
}

/** V2 payload for a bulk publish action with field-level granularity. */
export interface PublishBulkActionV2Payload<PublishActionType extends 'add' | 'remove' = 'add'> {
  action: 'publish'
  entities: PublishActionType extends 'remove'
    ? RemoveFieldsEntity<VersionedLink<Entity>>[]
    : AddFieldsEntity<VersionedLink<Entity>>[]
}

/** V2 payload for a bulk validate action with field-level granularity. */
export interface ValidateBulkActionV2Payload<PublishActionType extends 'add' | 'remove' = 'add'> {
  action: 'validate'
  entities: PublishActionType extends 'remove'
    ? RemoveFieldsEntity<Link<Entity>>[]
    : AddFieldsEntity<Link<Entity>>[]
}

/** V2 payload for a bulk unpublish action. */
export interface UnpublishBulkActionV2Payload {
  action: 'unpublish'
  entities: BulkActionEntity<Link<Entity>>[]
}

/** Union of all valid V2 bulk action payload types. */
export type BulkActionV2Payload =
  | PublishBulkActionV2Payload<'add'>
  | PublishBulkActionV2Payload<'remove'>
  | UnpublishBulkActionV2Payload
  | ValidateBulkActionV2Payload<'add'>
  | ValidateBulkActionV2Payload<'remove'>

/** System metadata properties of a bulk action. */
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
export interface BulkActionProps<TPayload extends BulkActionPayload | BulkActionV2Payload = any> {
  sys: BulkActionSysProps
  action: BulkActionType
  /** original payload when BulkAction was created */
  payload: TPayload
  /** error information, if present */
  error?: BulkActionFailedError
}

/** Methods available on a bulk action entity. */
export interface BulkActionApiMethods {
  /** Performs a new GET request and returns the wrapper BulkAction */
  get(): BulkAction
  /** Waits until the BulkAction is in one of the final states (`succeeded` or `failed`) and returns it. */
  waitProcessing(options?: AsyncActionProcessingOptions): Promise<BulkAction>
}

/**
 * @internal
 */
function createBulkActionApi(makeRequest: MakeRequest) {
  const getParams = (self: BulkAction) => {
    const bulkAction = self.toPlainObject()

    return {
      spaceId: bulkAction.sys.space.sys.id,
      environmentId: bulkAction.sys.environment.sys.id,
      bulkActionId: bulkAction.sys.id,
    }
  }

  return {
    async get() {
      const params = getParams(this)
      return makeRequest({
        entityType: 'BulkAction',
        action: 'get',
        params,
      }).then((bulkAction) => wrapBulkAction(makeRequest, bulkAction))
    },
    async waitProcessing<TPayload extends BulkActionPayload | BulkActionV2Payload = any>(
      options?: AsyncActionProcessingOptions,
    ): Promise<BulkActionProps<TPayload>> {
      return pollAsyncActionStatus<BulkActionProps<TPayload>>(async () => this.get(), options)
    },
  }
}

/** A Contentful bulk action with methods for polling status and retrieving results. */
export interface BulkAction<T extends BulkActionPayload | BulkActionV2Payload = any>
  extends BulkActionProps<T>,
    BulkActionApiMethods,
    DefaultElements<BulkActionProps<T>> {}

/**
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw BulkAction data
 * @returns Wrapped BulkAction data
 */
export function wrapBulkAction<TPayload extends BulkActionPayload | BulkActionV2Payload = any>(
  makeRequest: MakeRequest,
  data: BulkActionProps<BulkActionPayload | BulkActionV2Payload>,
): BulkAction<TPayload> {
  const bulkAction = toPlainObject(copy(data))
  const bulkActionWithApiMethods = enhanceWithMethods(
    bulkAction as any,
    createBulkActionApi(makeRequest),
  )
  return freezeSys(bulkActionWithApiMethods) as BulkAction<TPayload>
}
