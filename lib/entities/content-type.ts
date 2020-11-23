import { AxiosInstance } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import { wrapEditorInterface } from './editor-interface'
import { wrapSnapshot, wrapSnapshotCollection, Snapshot } from './snapshot'
import { Except, SetOptional } from 'type-fest'
import { isUpdated, isPublished, isDraft } from '../plain/checks'

import { ContentFields } from './content-type-fields'
import {
  BasicMetaSysProps,
  DefaultElements,
  Collection,
  QueryOptions,
  SysLink,
} from '../common-types'
import { EditorInterface } from './editor-interface'
import { SnapshotProps } from './snapshot'
import * as endpoints from '../plain/endpoints'

export type ContentTypeProps = {
  sys: BasicMetaSysProps & {
    space: SysLink
    environment: SysLink
    firstPublishedAt?: string
    publishedCounter?: number
    publishedVersion?: number
  }
  name: string
  description: string
  /** Field used as the main display field for Entries */
  displayField: string
  /** All the fields contained in this Content Type */
  fields: ContentFields[]
}

export type CreateContentTypeProps = SetOptional<
  Except<ContentTypeProps, 'sys'>,
  'description' | 'displayField'
>

type ContentTypeApi = {
  /**
   * Sends an update to the server with any changes made to the object's properties. <br />
   * <strong>Important note about deleting fields</strong>: The standard way to delete a field is with two updates: first omit the property from your responses (set the field attribute "omitted" to true), and then
   * delete it by setting the attribute "deleted" to true. See the "Deleting fields" section in the
   * <a href="https://www.contentful.com/developers/docs/references/content-management-api/#/reference/content-types/content-type">API reference</a> for more reasoning. Alternatively,
   * you may use the convenience method omitAndDeleteField to do both steps at once.
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
   * .then((environment) => environment.getContentType('<contentType_id>'))
   * .then((contentType) => {
   *  contentType.name = 'New name'
   *  return contentType.update()
   * })
   * .then(contentType => console.log(contentType))
   * .catch(console.error)
   * ```
   */
  update(): Promise<ContentType>

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
   * .then((environment) => environment.getContentType('<contentType_id>'))
   * .then((contentType) => contentType.delete())
   * .then(() => console.log('contentType deleted'))
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
   * .then((environment) => environment.getContentType('<contentType_id>'))
   * .then((contentType) => contentType.publish())
   * .then((contentType) => console.log(`${contentType.sys.id} is published`))
   * .catch(console.error)
   * ```
   */
  publish(): Promise<ContentType>
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
   * .then((environment) => environment.getContentType('<contentType_id>'))
   * .then((contentType) => contentType.unpublish())
   * .then((contentType) => console.log(`${contentType.sys.id} is unpublished`))
   * .catch(console.error)
   * ```
   */
  unpublish(): Promise<ContentType>
  /**
   * Gets the editor interface for the object <br />
   * <strong>Important note</strong>: The editor interface only represent a published contentType.<br />
   * To get the most recent representation of the contentType make sure to publish it first
   * @return Object returned from the server with the current editor interface.
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getContentType('<contentType_id>'))
   * .then((contentType) => contentType.getEditorInterface())
   * .then((editorInterface) => console.log(editorInterface.contorls))
   * .catch(console.error)
   * ```
   */
  getEditorInterface(): Promise<EditorInterface>
  /**
   * Checks if the contentType is in draft mode. This means it is not published.
   */
  isDraft(): boolean
  /**
   * Checks if the contentType is published. A published contentType might have unpublished changes (@see {ContentType.isUpdated})
   */
  isPublished(): boolean
  /**
   * Checks if the contentType is updated. This means the contentType was previously published but has unpublished changes.
   */
  isUpdated(): boolean

  /**
   * Omits and deletes a field if it exists on the contentType. This is a convenience method which does both operations at once and potentially less
   * safe than the standard way. See note about deleting fields on the Update method.
   * @return Object returned from the server with updated metadata.
   */
  omitAndDeleteField(id: string): Promise<ContentType>

  /**
   * Gets a snapshot of a contentType
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
   * .then((environment) => environment.getContentType('<contentType_id>'))
   * .then((entry) => entry.getSnapshot('<snapshot-id>'))
   * .then((snapshot) => console.log(snapshot))
   * .catch(console.error)
   * ```
   */
  getSnapshot(snapshotId: string): Promise<SnapshotProps<ContentTypeProps>>
  /**
   * Gets all snapshots of a contentType
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getContentType('<contentType_id>'))
   * .then((entry) => entry.getSnapshots())
   * .then((snapshots) => console.log(snapshots.items))
   * .catch(console.error)
   * ```
   */
  getSnapshots(): Promise<Collection<Snapshot<ContentTypeProps>, SnapshotProps<ContentTypeProps>>>
}

export interface ContentType
  extends ContentTypeProps,
    DefaultElements<ContentTypeProps>,
    ContentTypeApi {}

function createContentTypeApi(http: AxiosInstance): ContentTypeApi {
  const getParams = (self: ContentType) => {
    const contentType = self.toPlainObject() as ContentTypeProps

    return {
      raw: contentType,
      params: {
        spaceId: contentType.sys.space.sys.id,
        environmentId: contentType.sys.environment.sys.id,
        contentTypeId: contentType.sys.id,
      },
    }
  }

  return {
    update: function () {
      const { raw, params } = getParams(this)

      return endpoints.contentType
        .update(http, params, raw)
        .then((data) => wrapContentType(http, data))
    },

    delete: function () {
      const { params } = getParams(this)

      return endpoints.contentType.del(http, params).then(() => {
        // noop
      })
    },

    publish: function () {
      const { raw, params } = getParams(this)

      return endpoints.contentType
        .publish(http, params, raw)
        .then((data) => wrapContentType(http, data))
    },

    unpublish: function () {
      const { params } = getParams(this)

      return endpoints.contentType
        .unpublish(http, params)
        .then((data) => wrapContentType(http, data))
    },

    getEditorInterface: function () {
      const { params } = getParams(this)

      return endpoints.editorInterface
        .get(http, params)
        .then((data) => wrapEditorInterface(http, data))
    },

    getSnapshots: function (query: QueryOptions = {}) {
      const { params } = getParams(this)

      return endpoints.snapshot
        .getManyForContentType(http, { ...params, query })
        .then((data) => wrapSnapshotCollection<ContentTypeProps>(http, data))
    },

    getSnapshot: function (snapshotId: string) {
      const { params } = getParams(this)

      return endpoints.snapshot
        .getForContentType(http, { ...params, snapshotId })
        .then((data) => wrapSnapshot<ContentTypeProps>(http, data))
    },

    isPublished: function () {
      return isPublished(this)
    },

    isUpdated: function () {
      return isUpdated(this)
    },

    isDraft: function () {
      return isDraft(this)
    },

    omitAndDeleteField: function (id: string) {
      const { raw, params } = getParams(this)

      return endpoints.contentType
        .omitAndDeleteField(http, params, raw, id)
        .then((data) => wrapContentType(http, data))
    },
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw content type data
 * @return Wrapped content type data
 */
export function wrapContentType(http: AxiosInstance, data: ContentTypeProps): ContentType {
  const contentType = toPlainObject(cloneDeep(data))
  const contentTypeWithMethods = enhanceWithMethods(contentType, createContentTypeApi(http))
  return freezeSys(contentTypeWithMethods)
}

/**
 * @private
 */
export const wrapContentTypeCollection = wrapCollection(wrapContentType)
