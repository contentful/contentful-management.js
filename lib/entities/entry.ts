import { AxiosInstance } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
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
} from '../common-types'
import * as endpoints from '../plain/endpoints'
import * as checks from '../plain/checks'

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
}

export interface Entry extends EntryProps, DefaultElements<EntryProps>, EntryApi {}

function createEntryApi(http: AxiosInstance): EntryApi {
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

      return endpoints.entry.update(http, params, raw).then((data) => wrapEntry(http, data))
    },

    delete: function del() {
      const { params } = getParams(this)

      return endpoints.entry.del(http, params)
    },

    publish: function publish() {
      const { raw, params } = getParams(this)

      return endpoints.entry.publish(http, params, raw).then((data) => wrapEntry(http, data))
    },

    unpublish: function unpublish() {
      const { params } = getParams(this)

      return endpoints.entry.unpublish(http, params).then((data) => wrapEntry(http, data))
    },

    archive: function archive() {
      const { params } = getParams(this)

      return endpoints.entry.archive(http, params).then((data) => wrapEntry(http, data))
    },

    unarchive: function unarchive() {
      const { params } = getParams(this)

      return endpoints.entry.unarchive(http, params).then((data) => wrapEntry(http, data))
    },

    getSnapshots: function (query = {}) {
      const { params } = getParams(this)

      return endpoints.snapshot
        .getManyForEntry(http, { ...params, query })
        .then((data) => wrapSnapshotCollection<EntryProps>(http, data))
    },

    getSnapshot: function (snapshotId: string) {
      const { params } = getParams(this)

      return endpoints.snapshot
        .getForEntry(http, { ...params, snapshotId })
        .then((data) => wrapSnapshot<EntryProps>(http, data))
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
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw entry data
 * @return Wrapped entry data
 */
export function wrapEntry(http: AxiosInstance, data: EntryProps): Entry {
  const entry = toPlainObject(cloneDeep(data))
  const entryWithMethods = enhanceWithMethods(entry, createEntryApi(http))
  return freezeSys(entryWithMethods)
}

/**
 * Data is also mixed in with link getters if links exist and includes were requested
 * @private
 */
export const wrapEntryCollection = wrapCollection(wrapEntry)
