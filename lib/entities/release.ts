/* eslint-disable @typescript-eslint/no-explicit-any */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  BaseCollection,
  DefaultElements,
  ISO8601Timestamp,
  Link,
  MakeRequest,
  MakeRequestPayload,
  Collection,
  CollectionProp,
} from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'

/** Entity types supported by the Release API */
type Entity = 'Entry' | 'Asset'

export interface ReleaseQueryOptions {
  /** Find releases filtered by the Entity type (Asset, Entry) */
  'entities.sys.linkType'?: string
  /** Find releases by using comma-separated list of Entities Link Ids */
  'entities.sys.id'?: string
  /** Find releases by using comma-separated list of Ids */
  'sys.id'?: string
  /** If present, will return results based of a pagination cursor */
  pageNext?: string
  /** Limit how many records are returned in the result */
  limit?: number
}

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
  action: 'publish' | 'unpublish'
}

export interface ReleaseApiMethods {
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
 * Return a Release object enhanced with its own API helper functions.
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw Release data
 * @return Wrapped Release data
 */
export function wrapRelease(makeRequest: MakeRequest, data: ReleaseProps): Release {
  const release = toPlainObject(copy(data))
  const releaseWithApiMethods = enhanceWithMethods(release as any, createReleaseApi(makeRequest))
  return freezeSys(releaseWithApiMethods)
}

export const wrapReleaseCollection: (
  makeRequest: MakeRequest,
  data: CollectionProp<ReleaseProps>
) => Collection<Release, ReleaseProps> & { pages?: { next: string } } = wrapCollection(wrapRelease)
