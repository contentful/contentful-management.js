/* eslint-disable @typescript-eslint/no-explicit-any */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, ISO8601Timestamp, Link, MakeRequest } from '../common-types'
import { wrapCollection } from '../common-utils'
import type { AsyncActionProcessingOptions } from '../methods/action'
import { pollAsyncActionStatus } from '../methods/action'
import enhanceWithMethods from '../enhance-with-methods'

type ReleaseActionStatuses = 'created' | 'inProgress' | 'failed' | 'succeeded'
export type ReleaseActionTypes = 'publish' | 'unpublish' | 'validate'

export type ReleaseActionSysProps = {
  id: string
  type: 'ReleaseAction'
  space: Link<'Space'>
  environment: Link<'Environment'>
  release: Link<'Release'>
  status: ReleaseActionStatuses
  createdBy: Link<'User'>
  createdAt: ISO8601Timestamp
  updatedBy: Link<'User'>
  updatedAt: ISO8601Timestamp
}

/** The object returned by the Releases API */
export interface ReleaseActionProps<T extends ReleaseActionTypes = any> {
  action: T
  sys: ReleaseActionSysProps
}

export interface ReleaseActionQueryOptions {
  /** Find Release Actions by using a comma-separated list of Ids */
  'sys.id[in]'?: string
  'sys.release.sys.id[in]'?: string
  'sys.status[in]'?: string
  'sys.status[nin]'?: string
  action?: ReleaseActionTypes
  /** Get unique results by this field. Currently supports `sys.release.sys.id` */
  uniqueBy?: string

  /** @default -sys.updatedAt */
  order?: string
  /**
   * Limit of how many records are returned in the query result
   * @default 100
   * */
  limit?: number
}

export interface ReleaseActionApiMethods {
  /** Performs a new GET request and returns the wrapper Release */
  get(): ReleaseAction
  /** Waits until the Release Action has either succeeded or failed */
  waitProcessing(options?: AsyncActionProcessingOptions): ReleaseAction
}

/**
 * @private
 */
function createReleaseActionApi(makeRequest: MakeRequest) {
  const getParams = (self: ReleaseAction) => {
    const action = self.toPlainObject()

    return {
      spaceId: action.sys.space.sys.id,
      environmentId: action.sys.environment.sys.id,
      releaseId: action.sys.release.sys.id,
      actionId: action.sys.id,
    }
  }

  return {
    async get() {
      const params = getParams(this)
      return makeRequest({
        entityType: 'ReleaseAction',
        action: 'get',
        params,
      }).then((releaseAction) => wrapReleaseAction(makeRequest, releaseAction))
    },

    /** Waits for a Release Action to complete */
    async waitProcessing(options?: AsyncActionProcessingOptions): Promise<ReleaseAction> {
      return pollAsyncActionStatus<ReleaseAction>(async () => this.get(), options)
    },
  }
}

export interface ReleaseAction<T extends ReleaseActionTypes = any>
  extends ReleaseActionProps<T>,
    ReleaseActionApiMethods,
    DefaultElements<ReleaseActionProps<T>> {}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw Release data
 * @return Wrapped Release data
 */
export function wrapReleaseAction(
  makeRequest: MakeRequest,
  data: ReleaseActionProps
): ReleaseAction {
  const releaseAction = toPlainObject(copy(data))
  const releaseActionWithApiMethods = enhanceWithMethods(
    releaseAction as any,
    createReleaseActionApi(makeRequest)
  )
  return freezeSys(releaseActionWithApiMethods)
}

/**
 * @private
 */
export const wrapReleaseActionCollection = wrapCollection(wrapReleaseAction)
