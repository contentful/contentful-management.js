import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import { wrapSnapshot, wrapSnapshotCollection, SnapshotProps, Snapshot } from './snapshot'
import {
  DefaultElements,
  Collection,
  KeyValueMap,
  EntityMetaSysProps,
  MetadataProps,
  MakeRequest,
  CollectionProp,
} from '../common-types'
import * as checks from '../plain/checks'
import type { OpPatch } from 'json-patch'

export type EntryProps<T = KeyValueMap> = {
  sys: EntityMetaSysProps
  metadata?: MetadataProps

  fields: T
}

export type CreateEntryProps<TFields = KeyValueMap> = Omit<EntryProps<TFields>, 'sys'>

type EntryApi = {
  /**
   * Sends an update to the server with any changes made to the object's properties
   * @return Object returned from the server with updated changes.
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getEntry('<entry_id>'))
   * .then((entry) => {
   *   entry.fields.title['en-US'] = 'New entry title'
   *   return entry.update()
   * })
   * .then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
   * .catch(console.error)
   * ```
   */
  update(): Promise<Entry>
  /**
   * Sends an JSON patch to the server with any changes made to the object's properties
   * @return Object returned from the server with updated changes.
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getEntry('<entry_id>'))
   * .then((entry) => entry.patch([
   *   {
   *     op: 'replace',
   *     path: '/fields/title/en-US',
   *     value: 'New entry title'
   *   }
   * ]))
   * .then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
   * .catch(console.error)
   * ```
   */
  patch(patch: OpPatch[]): Promise<Entry>
  /**
   * Archives the object
   * @return Object returned from the server with updated metadata.
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getEntry('<entry_id>'))
   * .then((entry) => entry.archive())
   * .then((entry) => console.log(`Entry ${entry.sys.id} archived.`))
   * .catch(console.error)
   * ```
   */
  archive(): Promise<Entry>

  /**
   * Deletes this object on the server.
   * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getEntry('<entry_id>'))
   * .then((entry) => entry.delete())
   * .then(() => console.log(`Entry deleted.`))
   * .catch(console.error)
   * ```
   */
  delete(): Promise<void>
  /**
   * Publishes the object
   * @return Object returned from the server with updated metadata.
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getEntry('<entry_id>'))
   * .then((entry) => entry.publish())
   * .then((entry) => console.log(`Entry ${entry.sys.id} published.`))
   * .catch(console.error)
   * ```
   */
  publish(): Promise<Entry>

  /**
   * Unarchives the object
   * @return Object returned from the server with updated metadata.
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getEntry('<entry_id>'))
   * .then((entry) => entry.unarchive())
   * .then((entry) => console.log(`Entry ${entry.sys.id} unarchived.`))
   * .catch(console.error)
   * ```
   */
  unarchive(): Promise<Entry>
  /**
   * Unpublishes the object
   * @return Object returned from the server with updated metadata.
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getEntry('<entry_id>'))
   * .then((entry) => entry.unpublish())
   * .then((entry) => console.log(`Entry ${entry.sys.id} unpublished.`))
   * .catch(console.error)
   * ```
   */
  unpublish(): Promise<Entry>

  /**
   * Gets a snapshot of an entry
   * @param snapshotId - Id of the snapshot
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getEntry('<entry_id>'))
   * .then((entry) => entry.getSnapshot('<snapshot_id>'))
   * .then((snapshot) => console.log(snapshot))
   * .catch(console.error)
   * ```
   */
  getSnapshot(snapshotId: string): Promise<Snapshot<EntryProps>>
  /**
   * Gets all snapshots of an entry
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getEntry('<entry_id>'))
   * .then((entry) => entry.getSnapshots())
   * .then((snapshots) => console.log(snapshots.items))
   * .catch(console.error)
   * ```
   */
  getSnapshots(): Promise<Collection<Snapshot<EntryProps>, SnapshotProps<EntryProps>>>
  /**
   * Checks if entry is archived. This means it's not exposed to the Delivery/Preview APIs.
   */
  isArchived(): boolean
  /**
   * Checks if the entry is in draft mode. This means it is not published.
   */
  isDraft(): boolean
  /**
   * Checks if the entry is published. A published entry might have unpublished changes
   */
  isPublished(): boolean

  /**
   * Checks if the entry is updated. This means the entry was previously published but has unpublished changes.
   */
  isUpdated(): boolean

  references(maxDepth: number): Promise<CollectionProp<EntryProps>>
}

export interface Entry extends EntryProps, DefaultElements<EntryProps>, EntryApi {}

function createEntryApi(makeRequest: MakeRequest): EntryApi {
  const getParams = (self: Entry) => {
    const entry = self.toPlainObject() as EntryProps

    return {
      params: {
        spaceId: entry.sys.space.sys.id,
        environmentId: entry.sys.environment.sys.id,
        entryId: entry.sys.id,
      },
      raw: entry,
    }
  }

  return {
    update: function update() {
      const { raw, params } = getParams(this)

      return makeRequest({
        entityType: 'Entry',
        action: 'update',
        params,
        payload: raw,
      }).then((data) => wrapEntry(makeRequest, data))
    },

    patch: function patch(ops: OpPatch[]) {
      const { raw, params } = getParams(this)

      return makeRequest({
        entityType: 'Entry',
        action: 'patch',
        params: {
          ...params,
          version: raw.sys.version,
        },
        payload: ops,
      }).then((data) => wrapEntry(makeRequest, data))
    },

    delete: function del() {
      const { params } = getParams(this)

      return makeRequest({ entityType: 'Entry', action: 'delete', params })
    },

    publish: function publish() {
      const { raw, params } = getParams(this)

      return makeRequest({
        entityType: 'Entry',
        action: 'publish',
        params,
        payload: raw,
      }).then((data) => wrapEntry(makeRequest, data))
    },

    unpublish: function unpublish() {
      const { params } = getParams(this)

      return makeRequest({
        entityType: 'Entry',
        action: 'unpublish',
        params,
      }).then((data) => wrapEntry(makeRequest, data))
    },

    archive: function archive() {
      const { params } = getParams(this)

      return makeRequest({
        entityType: 'Entry',
        action: 'archive',
        params,
      }).then((data) => wrapEntry(makeRequest, data))
    },

    unarchive: function unarchive() {
      const { params } = getParams(this)

      return makeRequest({
        entityType: 'Entry',
        action: 'unarchive',
        params,
      }).then((data) => wrapEntry(makeRequest, data))
    },

    getSnapshots: function (query = {}) {
      const { params } = getParams(this)

      return makeRequest({
        entityType: 'Snapshot',
        action: 'getManyForEntry',
        params: { ...params, query },
      }).then((data) => wrapSnapshotCollection<EntryProps>(makeRequest, data))
    },

    getSnapshot: function (snapshotId: string) {
      const { params } = getParams(this)

      return makeRequest({
        entityType: 'Snapshot',
        action: 'getForEntry',
        params: { ...params, snapshotId },
      }).then((data) => wrapSnapshot<EntryProps>(makeRequest, data))
    },

    isPublished: function isPublished() {
      const raw = this.toPlainObject() as EntryProps
      return checks.isPublished(raw)
    },

    isUpdated: function isUpdated() {
      const raw = this.toPlainObject() as EntryProps
      return checks.isUpdated(raw)
    },

    isDraft: function isDraft() {
      const raw = this.toPlainObject() as EntryProps
      return checks.isDraft(raw)
    },

    isArchived: function isArchived() {
      const raw = this.toPlainObject() as EntryProps
      return checks.isArchived(raw)
    },

    references: function references(maxDepth: number) {
      const raw = this.toPlainObject() as EntryProps
      return makeRequest({
        entityType: 'Entry',
        action: 'references',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.environment.sys.id,
          entryId: raw.sys.id,
          maxDepth: maxDepth,
        },
      }).then((response) => wrapEntryCollection(makeRequest, response))
    },
  }
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw entry data
 * @return Wrapped entry data
 */
export function wrapEntry(makeRequest: MakeRequest, data: EntryProps): Entry {
  const entry = toPlainObject(copy(data))
  const entryWithMethods = enhanceWithMethods(entry, createEntryApi(makeRequest))
  return freezeSys(entryWithMethods)
}

/**
 * Data is also mixed in with link getters if links exist and includes were requested
 * @private
 */
export const wrapEntryCollection = wrapCollection(wrapEntry)
