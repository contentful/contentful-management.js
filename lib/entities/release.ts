/* eslint-disable @typescript-eslint/no-explicit-any */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  DefaultElements,
  EntityPayload,
  ISO8601Timestamp,
  Link,
  MakeRequest,
  MakeRequestPayload,
} from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'
import { ReleaseActionProps, wrapReleaseAction } from './release-action'

/** Entity types supported by the Release API */
type Entity = 'Entry' | 'Asset'

export type ReleaseSysProps = {
  id: string
  type: 'Release'
  version: number
  space: Link<'Space'>
  environment: Link<'Environment'>
  createdBy: Link<'User'>
  updatedBy: Link<'User'>
  createdAt: ISO8601Timestamp
  updatedAt: ISO8601Timestamp
}

/** The object returned by the Releases API */
export interface ReleaseProps extends EntityPayload<Link<Entity>> {
  title: string
  sys: ReleaseSysProps
}

export interface ReleasePayload extends EntityPayload<Link<Entity>>, MakeRequestPayload {
  title: string
}

export interface ReleaseValidatePayload {
  action: 'publish' | 'unpublish'
}

export interface ReleaseApiMethods {
  /** Attempts to publish a Release */
  publish(): Promise<ReleaseActionProps>
  unpublish(): Promise<ReleaseActionProps>
  validate(payload?: ReleaseValidatePayload): Promise<ReleaseActionProps>
  /** Deletes a Release and all ReleaseActions linked to it (non-reversible) */
  delete(): Promise<null>
}

function createReleaseApi(makeRequest: MakeRequest) {
  const getParams = (self: Release) => {
    const release = self.toPlainObject()

    return {
      spaceId: release.sys.space.sys.id,
      environmentId: release.sys.environment.sys.id,
      releaseId: release.sys.id,
      version: release.sys.version,
    }
  }

  return {
    async publish() {
      const params = getParams(this)

      return makeRequest({
        entityType: 'Release',
        action: 'publish',
        params,
      })
        .then((action) => wrapReleaseAction(makeRequest, action))
        .then((action) => action.waitProcessing())
    },
    async unpublish() {
      const params = getParams(this)

      return makeRequest({
        entityType: 'Release',
        action: 'unpublish',
        params,
      })
        .then((action) => wrapReleaseAction(makeRequest, action))
        .then((action) => action.waitProcessing())
    },
    async validate(payload: { action: 'publish' | 'unpublish' }) {
      const params = getParams(this)

      return makeRequest({
        entityType: 'Release',
        action: 'validate',
        params,
        payload,
      })
        .then((action) => wrapReleaseAction(makeRequest, action))
        .then((action) => action.waitProcessing())
    },
    async delete() {
      const params = getParams(this)
      return makeRequest({
        entityType: 'Release',
        action: 'delete',
        params,
      })
    },
  }
}

export interface Release extends ReleaseProps, ReleaseApiMethods, DefaultElements<ReleaseProps> {}

/**
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw Release data
 * @return Wrapped Release data
 */
export function wrapRelease(makeRequest: MakeRequest, data: ReleaseProps): Release {
  const release = toPlainObject(copy(data))
  const releaseWithApiMethods = enhanceWithMethods(release as any, createReleaseApi(makeRequest))
  return freezeSys(releaseWithApiMethods)
}

export const wrapReleaseCollection = wrapCollection(wrapRelease)
