import { AxiosInstance } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject, createRequestConfig } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
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
import { wrapSnapshot, wrapSnapshotCollection, SnapshotProps, Snapshot } from './snapshot'
import {
  MetaSysProps,
  MetaLinkProps,
  DefaultElements,
  Collection,
  MetadataProps,
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
  metadata?: MetadataProps
}

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
  getSnapshot(id: string): Promise<Snapshot<EntryProp>>
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
  getSnapshots(): Promise<Collection<Snapshot<EntryProp>, SnapshotProps<EntryProp>>>
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

export interface Entry extends EntryProp, DefaultElements<EntryProp>, EntryApi {}

function createEntryApi(http: AxiosInstance): EntryApi {
  return {
    update: createUpdateEntity({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry,
    }),

    delete: createDeleteEntity({
      http: http,
      entityPath: 'entries',
    }),

    publish: createPublishEntity({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry,
    }),

    unpublish: createUnpublishEntity({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry,
    }),

    archive: createArchiveEntity({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry,
    }),

    unarchive: createUnarchiveEntity({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry,
    }),

    getSnapshots: function (query = {}) {
      return http
        .get(`entries/${this.sys.id}/snapshots`, createRequestConfig({ query: query }))
        .then((response) => wrapSnapshotCollection<EntryProp>(http, response.data), errorHandler)
    },

    getSnapshot: function (snapshotId: string) {
      return http
        .get(`entries/${this.sys.id}/snapshots/${snapshotId}`)
        .then((response) => wrapSnapshot<EntryProp>(http, response.data), errorHandler)
    },

    isPublished: createPublishedChecker(),

    isUpdated: createUpdatedChecker(),

    isDraft: createDraftChecker(),

    isArchived: createArchivedChecker(),
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw entry data
 * @return Wrapped entry data
 */
export function wrapEntry(http: AxiosInstance, data: EntryProp): Entry {
  const entry = toPlainObject(cloneDeep(data))
  const entryWithMethods = enhanceWithMethods(entry, createEntryApi(http))
  return freezeSys(entryWithMethods)
}

/**
 * Data is also mixed in with link getters if links exist and includes were requested
 * @private
 */
export const wrapEntryCollection = wrapCollection(wrapEntry)
