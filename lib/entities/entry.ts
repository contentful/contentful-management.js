import { AxiosInstance } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject, createRequestConfig } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import {
  createUpdateEntity,
  createDeleteEntity,
  createPublishEntity,
  createUnpublishEntity,
  createArchiveEntity,
  createUnarchiveEntity,
  createPublishedChecker,
  createUpdatedChecker,
  createDraftChecker,
  createArchivedChecker,
} from '../instance-actions'
import errorHandler from '../error-handler'
import { wrapSnapshot, wrapSnapshotCollection, SnapshotProps } from './snapshot'
import {
  MetaSysProps,
  MetaLinkProps,
  DefaultElements,
  Collection,
  CollectionProp,
} from '../common-types'

export interface EntrySys extends MetaSysProps {
  contentType: { sys: MetaLinkProps }
  environment: { sys: MetaLinkProps }
  publishedBy?: { sys: MetaLinkProps }
  publishedVersion?: number
  publishedAt?: string
  firstPublishedAt?: string
  publishedCounter?: number
}

export type EntryProp = {
  sys: EntrySys
  fields: Record<string, any>
}

type EntryApi = {
  archive(): Promise<Entry>
  delete(): Promise<void>
  getSnapshot(id: string): Promise<SnapshotProps<EntryProp>>
  getSnapshots(): Promise<Collection<SnapshotProps<EntryProp>>>
  isArchived(): boolean
  isDraft(): boolean
  isPublished(): boolean
  isUpdated(): boolean
  publish(): Promise<Entry>
  unarchive(): Promise<Entry>
  unpublish(): Promise<Entry>
  update(): Promise<Entry>
}

export interface Entry extends EntryProp, DefaultElements<EntryProp>, EntryApi {}

/**
 * A Field in an Entry can have one of the following types that can be defined in Contentful. See <a href="https://www.contentful.com/developers/docs/references/field-type/">Field Types</a> for more details.
 * @memberof EntryFields
 * @typedef Field
 * @type EntryFields.Symbol | EntryFields.Text | EntryFields.Integer | EntryFields.Number | EntryFields.Date | EntryFields.Boolean | EntryFields.Location | Meta.Link | Array<EntryFields.Symbol|Meta.Link> | Object
 */

/**
 * @memberof Entry
 * @typedef Entry
 * @prop {Meta.Sys} sys - Standard system metadata with additional entry specific properties
 * @prop {Meta.Link} sys.contentType - Content Type used by this Entry
 * @prop {string=} sys.locale - If present, indicates the locale which this entry uses
 * @prop {Object<EntryFields.Field>} fields - Object with content for each field
 * @prop {function(): Object} toPlainObject() - Returns this Entry as a plain JS object
 */

function createEntryApi(http: AxiosInstance): EntryApi {
  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof Entry
     * @func update
     * @return {Promise<Entry>} Object returned from the server with updated changes.
     * ```javascript
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
    update: createUpdateEntity({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry,
    }),

    /**
     * Deletes this object on the server.
     * @memberof Entry
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * ```javascript
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
    delete: createDeleteEntity({
      http: http,
      entityPath: 'entries',
    }),

    /**
     * Publishes the object
     * @memberof Entry
     * @func publish
     * @return {Promise<Entry>} Object returned from the server with updated metadata.
     * ```javascript
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
    publish: createPublishEntity({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry,
    }),

    /**
     * Unpublishes the object
     * @memberof Entry
     * @func unpublish
     * @return {Promise<Entry>} Object returned from the server with updated metadata.
     * ```javascript
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
    unpublish: createUnpublishEntity({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry,
    }),

    /**
     * Archives the object
     * @memberof Entry
     * @func archive
     * @return {Promise<Entry>} Object returned from the server with updated metadata.
     * ```javascript
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
    archive: createArchiveEntity({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry,
    }),

    /**
     * Unarchives the object
     * @memberof Entry
     * @func unarchive
     * @return {Promise<Entry>} Object returned from the server with updated metadata.
     * ```javascript
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
    unarchive: createUnarchiveEntity({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry,
    }),

    /**
     * Gets all snapshots of an entry
     * @memberof Entry
     * @func getSnapshots
     * @return Promise<Snapshot>
     * ```javascript
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
    getSnapshots: function (query = {}) {
      return http
        .get(`entries/${this.sys.id}/snapshots`, createRequestConfig({ query: query }))
        .then((response) => wrapSnapshotCollection<EntryProp>(http, response.data), errorHandler)
    },

    /**
     * Gets a snapshot of an entry
     * @memberof Entry
     * @func getSnapshot
     * @param {string} snapshotId - Id of the snapshot
     * @return Promise<Snapshot>
     * ```javascript
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
    getSnapshot: function (snapshotId: string) {
      return http
        .get(`entries/${this.sys.id}/snapshots/${snapshotId}`)
        .then((response) => wrapSnapshot<EntryProp>(http, response.data), errorHandler)
    },
    /**
     * Checks if the entry is published. A published entry might have unpublished changes (@see {Entry.isUpdated})
     * @memberof Entry
     * @func isPublished
     * @return {boolean}
     */
    isPublished: createPublishedChecker(),

    /**
     * Checks if the entry is updated. This means the entry was previously published but has unpublished changes.
     * @memberof Entry
     * @func isUpdated
     * @return {boolean}
     */
    isUpdated: createUpdatedChecker(),

    /**
     * Checks if the entry is in draft mode. This means it is not published.
     * @memberof Entry
     * @func isDraft
     * @return {boolean}
     */
    isDraft: createDraftChecker(),

    /**
     * Checks if entry is archived. This means it's not exposed to the Delivery/Preview APIs.
     * @memberof Entry
     * @func isArchived
     * @return {boolean}
     */
    isArchived: createArchivedChecker(),
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw entry data
 * @return Wrapped entry data
 */
export function wrapEntry(http: AxiosInstance, data: EntryProp) {
  const entry = toPlainObject(cloneDeep(data))
  enhanceWithMethods(entry, createEntryApi(http))
  return freezeSys(entry)
}

/**
 * Data is also mixed in with link getters if links exist and includes were requested
 * @private
 * @param http - HTTP client instance
 * @param data - Raw entry collection data
 * @return Wrapped entry collection data
 */
export function wrapEntryCollection(http: AxiosInstance, data: CollectionProp<EntryProp>) {
  const entries = toPlainObject(cloneDeep(data))
  entries.items = entries.items.map((entity) => wrapEntry(http, entity))
  return freezeSys(entries)
}
