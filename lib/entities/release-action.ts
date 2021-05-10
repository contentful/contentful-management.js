/* eslint-disable @typescript-eslint/no-explicit-any */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { DefaultElements, ISO8601Timestamp, Link, MakeRequest } from '../common-types'
import { wrapCollection } from '../common-utils'
import { pollReleaseActionStatus, ReleaseActionProcessingOptions } from '../methods/release-action'
import enhanceWithMethods from '../enhance-with-methods'

type ReleaseActionTypes = 'publish' | 'unpublish' | 'validate'
type ReleaseActionStatuses = 'created' | 'inProgress' | 'failed' | 'succeeded'

export type ReleaseActionSysProps = {
  id: string
  type: 'ReleaseAction'
  space: Link<'Space'>
  environment: Link<'Environment'>
  release: Link<'Release'>
  status: ReleaseActionStatuses
  createdBy: Link<'User'>
  createdAt: ISO8601Timestamp
  updatedAt: ISO8601Timestamp
}

/** The object returned by the Releases API */
export interface ReleaseActionProps<T extends ReleaseActionTypes = any> {
  action: T
  sys: ReleaseActionSysProps
}

export interface ReleaseActionApiMethods {
  /** Performs a new GET request and returns the wrapper Release */
  get(): ReleaseAction
  waitProcessing(options?: any): ReleaseActionProps
}

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
    async waitProcessing(options?: ReleaseActionProcessingOptions): Promise<ReleaseActionProps> {
      return pollReleaseActionStatus(async () => this.get(), options)
    },
  }
}

export interface ReleaseAction
  extends ReleaseActionProps,
    ReleaseActionApiMethods,
    DefaultElements<ReleaseActionProps> {}

/**
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

export const wrapReleaseActionCollection = wrapCollection(wrapReleaseAction)
