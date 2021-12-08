/* eslint-disable @typescript-eslint/no-explicit-any */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  BaseCollection,
  CursorPaginatedCollection,
  CursorPaginatedCollectionProp,
  DefaultElements,
  ISO8601Timestamp,
  Link,
  MakeRequest,
  MakeRequestPayload,
} from '../common-types'
import { wrapCursorPaginatedCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'
import { AsyncActionProcessingOptions } from '../methods/action'
import { ReleaseActionProps, wrapReleaseAction } from './release-action'

/** Entity types supported by the Release API */
type Entity = 'Entry' | 'Asset'

export interface ReleaseQueryOptions {
  /** Find releases filtered by the Entity type (Asset, Entry) */
  'entities.sys.linkType'?: string
  /** Find releases containing the specified, comma-separated entities. Requires `entities.sys.linkType` */
  'entities.sys.id[in]'?: string
  /** Find releases by using a comma-separated list of Ids */
  'sys.id[in]'?: string
  /** Find releases using full text phrase and term matching */
  'title[match]'?: string
  /** If present, will return results based on a pagination cursor */
  pageNext?: string
  /**
   * Limit how many records are returned in the result
   * @default 100
   * */
  limit?: number
}

export type ReleaseSysProps = {
  id: string
  type: 'Release'
  version: number
  space: Link<'Space'>
  environment: Link<'Environment'>
  createdBy: Link<'User'> | Link<'AppDefinition'>
  updatedBy: Link<'User'> | Link<'AppDefinition'>
  createdAt: ISO8601Timestamp
  updatedAt: ISO8601Timestamp
  lastAction?: Link<'ReleaseAction'>
}

/** The object returned by the Releases API */
export interface ReleaseProps {
  title: string
  sys: ReleaseSysProps
  entities: BaseCollection<Link<Entity>>
}

export interface ReleasePayload extends MakeRequestPayload {
  title: string
  entities: BaseCollection<Link<Entity>>
}

export interface ReleaseValidatePayload {
  action?: 'publish'
}

export interface ReleaseValidateOptions {
  payload?: ReleaseValidatePayload
  processingOptions?: AsyncActionProcessingOptions
}

export interface ReleaseApiMethods {
  /** Updates a Release and returns the updated Release object */
  update(payload: ReleasePayload): Promise<Release>
  /** Deletes a Release and all ReleaseActions linked to it (non-reversible) */
  delete(): Promise<void>
  /** Publishes a Release and waits until the asynchronous action is completed */
  publish(options?: AsyncActionProcessingOptions): Promise<ReleaseActionProps<'publish'>>
  /** Unpublishes a Release and waits until the asynchronous action is completed */
  unpublish(options?: AsyncActionProcessingOptions): Promise<ReleaseActionProps<'unpublish'>>
  /** Validates a Release and waits until the asynchronous action is completed */
  validate({
    payload,
    options,
  }?: {
    payload?: ReleaseValidatePayload
    options?: AsyncActionProcessingOptions
  }): Promise<ReleaseActionProps<'validate'>>
}

/**
 * @private
 */
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
    async update(payload: ReleasePayload) {
      const params = getParams(this)

      return makeRequest({
        entityType: 'Release',
        action: 'update',
        params,
        payload,
      }).then((release) => wrapRelease(makeRequest, release))
    },
    async delete() {
      const params = getParams(this)

      await makeRequest({
        entityType: 'Release',
        action: 'delete',
        params,
      })
    },

    async publish(options?: AsyncActionProcessingOptions) {
      const params = getParams(this)

      return makeRequest({
        entityType: 'Release',
        action: 'publish',
        params,
      })
        .then((data) => wrapReleaseAction(makeRequest, data))
        .then((action) => action.waitProcessing(options))
    },

    async unpublish(options?: AsyncActionProcessingOptions) {
      const params = getParams(this)

      return makeRequest({
        entityType: 'Release',
        action: 'unpublish',
        params,
      })
        .then((data) => wrapReleaseAction(makeRequest, data))
        .then((action) => action.waitProcessing(options))
    },

    async validate(options?: ReleaseValidateOptions) {
      const params = getParams(this)

      return makeRequest({
        entityType: 'Release',
        action: 'validate',
        params,
        payload: options?.payload,
      })
        .then((data) => wrapReleaseAction(makeRequest, data))
        .then((action) => action.waitProcessing(options?.processingOptions))
    },
  }
}

export interface Release extends ReleaseProps, ReleaseApiMethods, DefaultElements<ReleaseProps> {}

/**
 * Return a Release object enhanced with its own API helper functions.
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw Release data
 * @return Wrapped Release data
 */
export function wrapRelease(makeRequest: MakeRequest, data: ReleaseProps): Release {
  const release = toPlainObject(copy(data))
  const releaseWithApiMethods = enhanceWithMethods(release as any, createReleaseApi(makeRequest))
  return freezeSys(releaseWithApiMethods)
}

/**
 * @private
 */
export const wrapReleaseCollection: (
  makeRequest: MakeRequest,
  data: CursorPaginatedCollectionProp<ReleaseProps>
) => CursorPaginatedCollection<Release, ReleaseProps> = wrapCursorPaginatedCollection(wrapRelease)
