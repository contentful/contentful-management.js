import type { OpPatch } from 'json-patch'
import { MakeRequest } from './common-types'
import { CreateCommentProps } from './entities/comment'
import { Entry, EntryProps, EntryReferenceOptionsProps } from './entities/entry'
import { CreateTaskProps } from './entities/task'
import * as checks from './plain/checks'
import entities from './entities'

/**
 * @private
 */
export type ContentfulEntryApi = ReturnType<typeof createEntryApi>

/**
 * @private
 */
export default function createEntryApi(makeRequest: MakeRequest) {
  const { wrapEntry, wrapEntryCollection } = entities.entry
  const { wrapSnapshot, wrapSnapshotCollection } = entities.snapshot
  const { wrapTask, wrapTaskCollection } = entities.task
  const { wrapComment, wrapCommentCollection } = entities.comment

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
    update: function update() {
      const { raw, params } = getParams(this)

      return makeRequest({
        entityType: 'Entry',
        action: 'update',
        params,
        payload: raw,
      }).then((data) => wrapEntry(makeRequest, data))
    },

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
    delete: function del() {
      const { params } = getParams(this)

      return makeRequest({ entityType: 'Entry', action: 'delete', params })
    },

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
    publish: function publish() {
      const { raw, params } = getParams(this)

      return makeRequest({
        entityType: 'Entry',
        action: 'publish',
        params,
        payload: raw,
      }).then((data) => wrapEntry(makeRequest, data))
    },

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
    unpublish: function unpublish() {
      const { params } = getParams(this)

      return makeRequest({
        entityType: 'Entry',
        action: 'unpublish',
        params,
      }).then((data) => wrapEntry(makeRequest, data))
    },

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
    archive: function archive() {
      const { params } = getParams(this)

      return makeRequest({
        entityType: 'Entry',
        action: 'archive',
        params,
      }).then((data) => wrapEntry(makeRequest, data))
    },

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
    unarchive: function unarchive() {
      const { params } = getParams(this)

      return makeRequest({
        entityType: 'Entry',
        action: 'unarchive',
        params,
      }).then((data) => wrapEntry(makeRequest, data))
    },

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
    getSnapshots: function (query = {}) {
      const { params } = getParams(this)

      return makeRequest({
        entityType: 'Snapshot',
        action: 'getManyForEntry',
        params: { ...params, query },
      }).then((data) => wrapSnapshotCollection<EntryProps>(makeRequest, data))
    },

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
    getSnapshot: function (snapshotId: string) {
      const { params } = getParams(this)

      return makeRequest({
        entityType: 'Snapshot',
        action: 'getForEntry',
        params: { ...params, snapshotId },
      }).then((data) => wrapSnapshot<EntryProps>(makeRequest, data))
    },

    /**
     * Creates a new comment for an entry
     * @param data Object representation of the Comment to be created
     * @returns Promise for the newly created Comment
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntry('<entry-id>'))
     * .then((entry) => entry.createComment({
     *   body: 'Something left to do'
     * }))
     * .then((comment) => console.log(comment))
     * .catch(console.error)
     * ```
     */
    createComment: function (data: CreateCommentProps) {
      const { params } = getParams(this)
      return makeRequest({
        entityType: 'Comment',
        action: 'create',
        params,
        payload: data,
      }).then((data) => wrapComment(makeRequest, data))
    },

    /**
     * Gets all comments of an entry
     * @returns
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntry('<entry-id>'))
     * .then((entry) => entry.getComments())
     * .then((comments) => console.log(comments))
     * .catch(console.error)
     * ```
     */
    getComments: function () {
      const { params } = getParams(this)
      return makeRequest({
        entityType: 'Comment',
        action: 'getMany',
        params,
      }).then((data) => wrapCommentCollection(makeRequest, data))
    },

    /**
     * Gets a comment of an entry
     * @returns
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntry('<entry-id>'))
     * .then((entry) => entry.getComment(`<comment-id>`))
     * .then((comment) => console.log(comment))
     * .catch(console.error)
     * ```
     */
    getComment: function (id: string) {
      const { params } = getParams(this)
      return makeRequest({
        entityType: 'Comment',
        action: 'get',
        params: {
          ...params,
          commentId: id,
        },
      }).then((data) => wrapComment(makeRequest, data))
    },

    /**
     * Creates a new task for an entry
     * @param data Object representation of the Task to be created
     * @returns Promise for the newly created Task
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntry('<entry-id>'))
     * .then((entry) => entry.createTask({
     *   body: 'Something left to do',
     *   assignedTo: '<user-id>',
     *   status: 'active'
     * }))
     * .then((task) => console.log(task))
     * .catch(console.error)
     * ```
     */
    createTask: function (data: CreateTaskProps) {
      const { params } = getParams(this)
      return makeRequest({
        entityType: 'Task',
        action: 'create',
        params,
        payload: data,
      }).then((data) => wrapTask(makeRequest, data))
    },

    /**
     * Gets all tasks of an entry
     * @returns
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntry('<entry-id>'))
     * .then((entry) => entry.getTasks())
     * .then((tasks) => console.log(tasks))
     * .catch(console.error)
     * ```
     */
    getTasks: function () {
      const { params } = getParams(this)
      return makeRequest({
        entityType: 'Task',
        action: 'getMany',
        params,
      }).then((data) => wrapTaskCollection(makeRequest, data))
    },

    /**
     * Gets a task of an entry
     * @returns
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntry('<entry-id>'))
     * .then((entry) => entry.getTask(`<task-id>`))
     * .then((task) => console.log(task))
     * .catch(console.error)
     * ```
     */
    getTask: function (id: string) {
      const { params } = getParams(this)
      return makeRequest({
        entityType: 'Task',
        action: 'get',
        params: {
          ...params,
          taskId: id,
        },
      }).then((data) => wrapTask(makeRequest, data))
    },

    /**
     * Checks if the entry is published. A published entry might have unpublished changes
     */
    isPublished: function isPublished() {
      const raw = this.toPlainObject() as EntryProps
      return checks.isPublished(raw)
    },

    /**
     * Checks if the entry is updated. This means the entry was previously published but has unpublished changes.
     */
    isUpdated: function isUpdated() {
      const raw = this.toPlainObject() as EntryProps
      return checks.isUpdated(raw)
    },

    /**
     * Checks if the entry is in draft mode. This means it is not published.
     */
    isDraft: function isDraft() {
      const raw = this.toPlainObject() as EntryProps
      return checks.isDraft(raw)
    },

    /**
     * Checks if entry is archived. This means it's not exposed to the Delivery/Preview APIs.
     */
    isArchived: function isArchived() {
      const raw = this.toPlainObject() as EntryProps
      return checks.isArchived(raw)
    },

    /**
     * Recursively collects references of an entry and their descendants
     */
    references: function references(options?: EntryReferenceOptionsProps) {
      const raw = this.toPlainObject() as EntryProps
      return makeRequest({
        entityType: 'Entry',
        action: 'references',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.environment.sys.id,
          entryId: raw.sys.id,
          include: options?.include,
        },
      }).then((response) => wrapEntryCollection(makeRequest, response))
    },
  }
}
