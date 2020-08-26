import { AxiosInstance } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject, createRequestConfig } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import errorHandler from '../error-handler'
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
   * .then((space) => space.getEntry('<entry_id>'))
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
   * .then((space) => space.getEntry('<entry_id>'))
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
   * .then((space) => space.getEntry('<entry_id>'))
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
   * .then((space) => space.getEntry('<entry_id>'))
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
   * .then((space) => space.getEntry('<entry_id>'))
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
   * .then((space) => space.getEntry('<entry_id>'))
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
   * .then((space) => space.getEntry('<entry_id>'))
   * .then((entry) => entry.getSnapshot('<snapshot_id>'))
   * .then((snapshot) => console.log(snapshot))
   * .catch(console.error)
   * ```
   */
  getSnapshot(id: string): Promise<Snapshot<EntryProps>>
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
   * .then((space) => space.getEntry('<entry_id>'))
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
  const getParams = (raw: EntryProps) => {
    return {
      spaceId: raw.sys.space.sys.id,
      environmentId: raw.sys.environment.sys.id,
      entryId: raw.sys.id,
    }
  }

  return {
    update: function update() {
      const raw = this.toPlainObject() as EntryProps
      return endpoints.entry.update(http, getParams(raw), raw).then((data) => wrapEntry(http, data))
    },

    delete: function del() {
      const raw = this.toPlainObject() as EntryProps
      return endpoints.entry.del(http, getParams(raw))
    },

    publish: function publish() {
      const raw = this.toPlainObject() as EntryProps
      return endpoints.entry
        .publish(http, getParams(raw), raw)
        .then((data) => wrapEntry(http, data))
    },

    unpublish: function unpublish() {
      const raw = this.toPlainObject() as EntryProps
      return endpoints.entry.unpublish(http, getParams(raw)).then((data) => wrapEntry(http, data))
    },

    archive: function archive() {
      const raw = this.toPlainObject() as EntryProps
      return endpoints.entry.archive(http, getParams(raw)).then((data) => wrapEntry(http, data))
    },

    unarchive: function unarchive() {
      const raw = this.toPlainObject() as EntryProps
      return endpoints.entry.unarchive(http, getParams(raw)).then((data) => wrapEntry(http, data))
    },

    getSnapshots: function (query = {}) {
      return http
        .get(`entries/${this.sys.id}/snapshots`, createRequestConfig({ query: query }))
        .then((response) => wrapSnapshotCollection<EntryProps>(http, response.data), errorHandler)
    },

    getSnapshot: function (snapshotId: string) {
      return http
        .get(`entries/${this.sys.id}/snapshots/${snapshotId}`)
        .then((response) => wrapSnapshot<EntryProps>(http, response.data), errorHandler)
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
