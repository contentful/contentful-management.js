/**
 * Contentful Space API. Contains methods to access any operations at a space
 * level, such as creating and reading entities contained in a space.
 */

import { AxiosInstance } from 'axios'
import { Stream } from 'stream'
import { createRequestConfig } from 'contentful-sdk-core'
import errorHandler from './error-handler'
import entities from './entities'
import { EnvironmentProps } from './entities/environment'
import { CreateContentTypeProps } from './entities/content-type'
import { EntryProps } from './entities/entry'
import { AssetProps, AssetFileProp } from './entities/asset'
import { TeamSpaceMembershipProps } from './entities/team-space-membership'
import { SpaceMembershipProps } from './entities/space-membership'
import { RoleProps } from './entities/role'
import { CreateLocaleProps } from './entities/locale'
import { WebhookProps } from './entities/webhook'
import { QueryOptions } from './common-types'
import { UIExtensionProps } from './entities/ui-extension'
import { CreateApiKeyProps } from './entities/api-key'
import * as endpoints from './plain'

function raiseDeprecationWarning(method: string) {
  console.warn(
    [
      `Deprecated: Space.${method}() will be removed in future major versions.`,
      null,
      `Please migrate your code to use Environment.${method}():`,
      `https://contentful.github.io/contentful-management.js/contentful-management/latest/ContentfulEnvironmentAPI.html#.${method}`,
      null,
    ].join('\n')
  )
}

function spaceMembershipDeprecationWarning() {
  console.warn(
    'The user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user)'
  )
}

export type ContentfulSpaceAPI = ReturnType<typeof createSpaceApi>

/**
 * Creates API object with methods to access the Space API
 * @param {object} params - API initialization params
 * @prop {object} http - HTTP client instance
 * @prop {object} entities - Object with wrapper methods for each kind of entity
 * @return {ContentfulSpaceAPI}
 */
export default function createSpaceApi({
  http,
  httpUpload,
}: {
  http: AxiosInstance
  httpUpload: AxiosInstance
}) {
  const { wrapSpace } = entities.space
  const { wrapEnvironment, wrapEnvironmentCollection } = entities.environment
  const { wrapContentType, wrapContentTypeCollection } = entities.contentType
  const { wrapEntry, wrapEntryCollection } = entities.entry
  const { wrapAsset, wrapAssetCollection } = entities.asset
  const { wrapLocale, wrapLocaleCollection } = entities.locale
  const { wrapWebhook, wrapWebhookCollection } = entities.webhook
  const { wrapRole, wrapRoleCollection } = entities.role
  const { wrapUser, wrapUserCollection } = entities.user
  const { wrapSpaceMember, wrapSpaceMemberCollection } = entities.spaceMember
  const { wrapSpaceMembership, wrapSpaceMembershipCollection } = entities.spaceMembership
  const {
    wrapTeamSpaceMembership,
    wrapTeamSpaceMembershipCollection,
  } = entities.teamSpaceMembership
  const { wrapApiKey, wrapApiKeyCollection } = entities.apiKey
  const { wrapPreviewApiKey, wrapPreviewApiKeyCollection } = entities.previewApiKey
  const { wrapSnapshotCollection } = entities.snapshot
  const { wrapEditorInterface } = entities.editorInterface
  const { wrapUpload } = entities.upload
  const { wrapUiExtension, wrapUiExtensionCollection } = entities.uiExtension
  const { wrapEnvironmentAlias, wrapEnvironmentAliasCollection } = entities.environmentAlias

  function createAsset(data: Omit<AssetProps, 'sys'>) {
    return http
      .post('assets', data)
      .then((response) => wrapAsset(http, response.data), errorHandler)
  }

  function createUpload(data: { file: string | ArrayBuffer | Stream }) {
    raiseDeprecationWarning('createUpload')
    const { file } = data
    if (!file) {
      return Promise.reject(new Error('Unable to locate a file to upload.'))
    }
    return httpUpload
      .post('uploads', file, {
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      })
      .then((uploadResponse) => {
        return wrapUpload(httpUpload, uploadResponse.data)
      })
      .catch(errorHandler)
  }

  /*
   * @private
   * sdk relies heavily on sys metadata
   * so we cannot omit the sys property on sdk level
   *
   */
  function normalizeSelect(query: QueryOptions) {
    if (query.select && !/sys/i.test(query.select)) {
      query.select += ',sys'
    }
  }

  return {
    /**
     * Deletes the space
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     *   .then((space) => space.delete())
     *   .then(() => console.log('Space deleted.'))
     *   .catch(console.error)
     * ```
     */
    delete: function deleteSpace() {
      const raw = this.toPlainObject()
      return endpoints.space.delete(http, { spaceId: raw.sys.id })
    },
    /**
     * Updates the space
     * @return Promise for the updated space.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => {
     *   space.name = 'New name'
     *   return space.update()
     * })
     * .then((space) => console.log(`Space ${space.sys.id} renamed.`)
     * .catch(console.error)
     * ```
     */
    update: function updateSpace() {
      const raw = this.toPlainObject()
      return endpoints.space
        .update(http, { spaceId: raw.sys.id }, raw)
        .then((data) => wrapSpace(http, data))
    },
    /**
     * Gets an environment
     * @param id - Environment ID
     * @return Promise for an Environment
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environement_id>'))
     * .then((environment) => console.log(environment))
     * .catch(console.error)
     * ```
     */
    getEnvironment(environmentId: string) {
      const raw = this.toPlainObject()
      return endpoints.environment
        .get(http, {
          spaceId: raw.sys.id,
          environmentId,
        })
        .then((data) => wrapEnvironment(http, data))
    },

    /**
     * Gets a collection of Environments
     * @return Promise for a collection of Environment
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironments())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getEnvironments() {
      return http
        .get('environments')
        .then((response) => wrapEnvironmentCollection(http, response.data), errorHandler)
    },

    /**
     * Creates an Environement
     * @param data - Object representation of the Environment to be created
     * @return Promise for the newly created Environment
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createEnvironment({ name: 'Staging' }))
     * .then((environment) => console.log(environment))
     * .catch(console.error)
     * ```
     */
    createEnvironment(data = {}) {
      return http
        .post('environments', data)
        .then((response) => wrapEnvironment(http, response.data), errorHandler)
    },

    /**
     * Creates an Environment with a custom ID
     * @param id - Environment ID
     * @param data - Object representation of the Environment to be created
     * @param sourceEnvironmentId - ID of the source environment that will be copied to create the new environment. Default is "master"
     * @return Promise for the newly created Environment
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createEnvironmentWithId('<environment-id>', { name: 'Staging'}, 'master'))
     * .then((environment) => console.log(environment))
     * .catch(console.error)
     * ```
     */
    createEnvironmentWithId(
      id: string,
      data: Omit<EnvironmentProps, 'sys'>,
      sourceEnvironmentId?: string
    ) {
      return http
        .put('environments/' + id, data, {
          headers: sourceEnvironmentId
            ? { 'X-Contentful-Source-Environment': sourceEnvironmentId }
            : {},
        })
        .then((response) => wrapEnvironment(http, response.data), errorHandler)
    },
    /**
     * Gets a Content Type
     * @deprecated since version 5.0
     * @param id - Content Type ID
     * @return Promise for a Content Type
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getContentType('<content_type_id>'))
     * .then((contentType) => console.log(contentType))
     * .catch(console.error)
     * ```
     */
    getContentType(id: string) {
      raiseDeprecationWarning('getContentType')
      return http
        .get('content_types/' + id)
        .then((response) => wrapContentType(http, response.data), errorHandler)
    },
    /**
     * Gets a collection of Content Types
     * @deprecated since version 5.0
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Content Types
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getContentTypes())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getContentTypes(query: QueryOptions = {}) {
      raiseDeprecationWarning('getContentTypes')
      return http
        .get('content_types', createRequestConfig({ query: query }))
        .then((response) => wrapContentTypeCollection(http, response.data), errorHandler)
    },

    /**
     * Creates a Content Type
     * @deprecated since version 5.0
     * @param data - Object representation of the Content Type to be created
     * @return Promise for the newly created Content Type
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createContentType({
     *   name: 'Blog Post',
     *   fields: [
     *     {
     *       id: 'title',
     *       name: 'Title',
     *       required: true,
     *       localized: false,
     *       type: 'Text'
     *     }
     *   ]
     * }))
     * .then((contentType) => console.log(contentType))
     * .catch(console.error)
     * ```
     */
    createContentType(data: CreateContentTypeProps) {
      raiseDeprecationWarning('createContentType')
      return http
        .post('content_types', data)
        .then((response) => wrapContentType(http, response.data), errorHandler)
    },
    /**
     * Creates a Content Type with a custom ID
     * @deprecated since version 5.0
     * @param id - Content Type ID
     * @param data - Object representation of the Content Type to be created
     * @return Promise for the newly created Content Type
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createContentTypeWithId('<content-type-id>', {
     *   name: 'Blog Post',
     *   fields: [
     *     {
     *       id: 'title',
     *       name: 'Title',
     *       required: true,
     *       localized: false,
     *       type: 'Text'
     *     }
     *   ]
     * }))
     * .then((contentType) => console.log(contentType))
     * .catch(console.error)
     * ```
     */
    createContentTypeWithId(id: string, data: CreateContentTypeProps) {
      raiseDeprecationWarning('createContentTypeWithId')
      return http
        .put('content_types/' + id, data)
        .then((response) => wrapContentType(http, response.data), errorHandler)
    },

    /**
     * Gets an EditorInterface for a ContentType
     * @deprecated since version 5.0
     * @param contentTypeId - Content Type ID
     * @return Promise for an EditorInterface
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEditorInterfaceForContentType('<content_type_id>'))
     * .then((EditorInterface) => console.log(EditorInterface))
     * .catch(console.error)
     * ```
     */
    getEditorInterfaceForContentType(contentTypeId: string) {
      raiseDeprecationWarning('getEditorInterfaceForContentType')
      return http
        .get('content_types/' + contentTypeId + '/editor_interface')
        .then((response) => wrapEditorInterface(http, response.data), errorHandler)
    },
    /**
     * Gets an Entry
     * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
     * from your entry in the backend
     * @deprecated since version 5.0
     * @param id - Entry ID
     * @param query - Object with search parameters. In this method it's only useful for `locale`.
     * @return Promise for an Entry
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEntry('<entry-id>'))
     * .then((entry) => console.log(entry))
     * .catch(console.error)
     * ```
     */
    getEntry(id: string, query: QueryOptions = {}) {
      raiseDeprecationWarning('getEntry')
      normalizeSelect(query)
      return http
        .get('entries/' + id, createRequestConfig({ query: query }))
        .then((response) => wrapEntry(http, response.data), errorHandler)
    },
    /**
     * Gets a collection of Entries
     * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
     * from your entry in the backend
     * @deprecated since version 5.0
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Entries
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEntries({'content_type': 'foo'})) // you can add more queries as 'key': 'value'
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getEntries(query: QueryOptions = {}) {
      raiseDeprecationWarning('getEntries')
      normalizeSelect(query)
      return http
        .get('entries', createRequestConfig({ query: query }))
        .then((response) => wrapEntryCollection(http, response.data), errorHandler)
    },
    /**
     * Creates a Entry
     * @deprecated since version 5.0
     * @param contentTypeId - The Content Type which this Entry is based on
     * @param data - Object representation of the Entry to be created
     * @return Promise for the newly created Entry
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createEntry('<content_type_id>', {
     *   fields: {
     *     title: {
     *       'en-US': 'Entry title'
     *     }
     *   }
     * }))
     * .then((entry) => console.log(entry))
     * .catch(console.error)
     * ```
     */
    createEntry(contentTypeId: string, data: Omit<EntryProps, 'sys'>) {
      raiseDeprecationWarning('createEntry')
      return http
        .post('entries', data, {
          headers: {
            'X-Contentful-Content-Type': contentTypeId,
          },
        })
        .then((response) => wrapEntry(http, response.data), errorHandler)
    },
    /**
     * Creates a Entry with a custom ID
     * @deprecated since version 5.0
     * @param contentTypeId - The Content Type which this Entry is based on
     * @param id - Entry ID
     * @param data - Object representation of the Entry to be created
     * @return Promise for the newly created Entry
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * // Create entry
     * client.getSpace('<space_id>')
     * .then((space) => space.createEntryWithId('<content_type_id>', '<entry_id>', {
     *   fields: {
     *     title: {
     *       'en-US': 'Entry title'
     *     }
     *   }
     * }))
     * .then((entry) => console.log(entry))
     * .catch(console.error)
     * ```
     */
    createEntryWithId(contentTypeId: string, id: string, data: Omit<EntryProps, 'sys'>) {
      raiseDeprecationWarning('createEntryWithId')
      return http
        .put('entries/' + id, data, {
          headers: {
            'X-Contentful-Content-Type': contentTypeId,
          },
        })
        .then((response) => wrapEntry(http, response.data), errorHandler)
    },
    /**
     * Creates a Upload.
     * @deprecated since version 5.0
     * @param data - Object with file information.
     * @param data.file - Actual file content. Can be a string, an ArrayBuffer or a Stream.
     * @return Upload object containing information about the uploaded file.
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * const uploadStream = createReadStream('path/to/filename_english.jpg')
     * client.getSpace('<space_id>')
     * .then((space) => space.createUpload({file: uploadStream, 'image/png'})
     * .then((upload) => console.log(upload))
     * .catch(console.error)
     * ```
     */
    createUpload,
    /**
     * Creates a Asset. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
     * @deprecated since version 5.0
     * @param data - Object representation of the Asset to be created. Note that the field object should have an upload property on asset creation, which will be removed and replaced with an url property when processing is finished.
     * @return Promise for the newly created Asset
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * // Create asset
     * client.getSpace('<space_id>')
     * .then((space) => space.createAsset({
     *   fields: {
     *     title: {
     *       'en-US': 'Playsam Streamliner'
     *    },
     *    file: {
     *       'en-US': {
     *         contentType: 'image/jpeg',
     *        fileName: 'example.jpeg',
     *        upload: 'https://example.com/example.jpg'
     *      }
     *    }
     *   }
     * }))
     * .then((asset) => asset.processForLocale("en-US")) // OR asset.processForAllLocales()
     * .then((asset) => console.log(asset))
     * .catch(console.error)
     * ```
     */
    createAsset,
    /**
     * Gets an Asset
     * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
     * from your entry in the backend
     * @deprecated since version 5.0
     * @param id - Asset ID
     * @param query - Object with search parameters. In this method it's only useful for `locale`.
     * @return Promise for an Asset
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getAsset('<asset_id>'))
     * .then((asset) => console.log(asset))
     * .catch(console.error)
     * ```
     */
    getAsset(id: string, query: QueryOptions = {}) {
      raiseDeprecationWarning('getAsset')
      normalizeSelect(query)
      return http
        .get('assets/' + id, createRequestConfig({ query: query }))
        .then((response) => wrapAsset(http, response.data), errorHandler)
    },
    /**
     * Gets a collection of Assets
     * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
     * from your entry in the backend
     * @deprecated since version 5.0
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Assets
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getAssets())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getAssets(query: QueryOptions = {}) {
      raiseDeprecationWarning('getAssets')
      normalizeSelect(query)
      return http
        .get('assets', createRequestConfig({ query: query }))
        .then((response) => wrapAssetCollection(http, response.data), errorHandler)
    },
    /**
     * Creates a Asset with a custom ID. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
     * @deprecated since version 5.0
     * @param id - Asset ID
     * @param data - Object representation of the Asset to be created. Note that the field object should have an upload property on asset creation, which will be removed and replaced with an url property when processing is finished.
     * @return Promise for the newly created Asset
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * // Create asset
     * client.getSpace('<space_id>')
     * .then((space) => space.createAssetWithId('<asset_id>', {
     *   title: {
     *     'en-US': 'Playsam Streamliner'
     *   },
     *   file: {
     *     'en-US': {
     *       contentType: 'image/jpeg',
     *       fileName: 'example.jpeg',
     *       upload: 'https://example.com/example.jpg'
     *     }
     *   }
     * }))
     * .then((asset) => asset.process())
     * .then((asset) => console.log(asset))
     * .catch(console.error)
     * ```
     */
    createAssetWithId(id: string, data: Omit<AssetProps, 'sys'>) {
      raiseDeprecationWarning('createAssetWithId')
      return http
        .put('assets/' + id, data)
        .then((response) => wrapAsset(http, response.data), errorHandler)
    },
    /**
     * Creates a Asset based on files. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
     * @deprecated since version 5.0
     * @param data - Object representation of the Asset to be created. Note that the field object should have an uploadFrom property on asset creation, which will be removed and replaced with an url property when processing is finished.
     * @param data.fields.file.[LOCALE].file - Can be a string, an ArrayBuffer or a Stream.
     * @return Promise for the newly created Asset
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getSpace('<space_id>')
     * .then((space) => space.createAssetFromFiles({
     *   fields: {
     *     file: {
     *       'en-US': {
     *          contentType: 'image/jpeg',
     *          fileName: 'filename_english.jpg',
     *          file: createReadStream('path/to/filename_english.jpg')
     *       },
     *       'de-DE': {
     *          contentType: 'image/svg+xml',
     *          fileName: 'filename_german.svg',
     *          file: '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>'
     *       }
     *     }
     *   }
     * }))
     * .then((asset) => console.log(asset))
     * .catch(console.error)
     * ```
     */
    createAssetFromFiles(data: Omit<AssetFileProp, 'sys'>) {
      raiseDeprecationWarning('createAssetFromFiles')
      const { file } = data.fields
      return Promise.all(
        Object.keys(file).map((locale) => {
          const { contentType, fileName } = file[locale]
          return createUpload(file[locale]).then((upload) => {
            return {
              [locale]: {
                contentType,
                fileName,
                uploadFrom: {
                  sys: {
                    type: 'Link',
                    linkType: 'Upload',
                    id: upload.sys.id,
                  },
                },
              },
            }
          })
        })
      )
        .then((uploads) => {
          // @ts-expect-error
          data.fields.file = uploads.reduce((fieldsData, upload) => {
            return {
              ...fieldsData,
              ...upload,
            }
          }, {})
          return createAsset(data)
        })
        .catch(errorHandler)
    },
    /**
     * Gets an Upload
     * @deprecated since version 5.0
     * @param id - Upload ID
     * @return Promise for an Upload
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * const uploadStream = createReadStream('path/to/filename_english.jpg')
     * client.getSpace('<space_id>')
     * .then((space) => space.getUpload('<upload-id>')
     * .then((upload) => console.log(upload))
     * .catch(console.error)
     * ```
     */
    getUpload(id: string) {
      raiseDeprecationWarning('getUpload')
      return httpUpload
        .get('uploads/' + id)
        .then((response) => wrapUpload(http, response.data))
        .catch(errorHandler)
    },
    /**
     * Gets a Locale
     * @deprecated since version 5.0
     * @param id - Locale ID
     * @return Promise for an Locale
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getLocale('<locale_id>'))
     * .then((locale) => console.log(locale))
     * .catch(console.error)
     * ```
     */
    getLocale(id: string) {
      raiseDeprecationWarning('getLocale')
      return http
        .get('locales/' + id)
        .then((response) => wrapLocale(http, response.data), errorHandler)
    },

    /**
     * Gets a collection of Locales
     * @deprecated since version 5.0
     * @return Promise for a collection of Locales
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getLocales())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getLocales() {
      raiseDeprecationWarning('getLocales')
      return http
        .get('locales')
        .then((response) => wrapLocaleCollection(http, response.data), errorHandler)
    },

    /**
     * Creates a Locale
     * @deprecated since version 5.0
     * @param data - Object representation of the Locale to be created
     * @return Promise for the newly created Locale
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * // Create locale
     * client.getSpace('<space_id>')
     * .then((space) => space.createLocale({
     *   name: 'German (Austria)',
     *   code: 'de-AT',
     *   fallbackCode: 'de-DE',
     *   optional: true
     * }))
     * .then((locale) => console.log(locale))
     * .catch(console.error)
     * ```
     */
    createLocale(data: CreateLocaleProps) {
      raiseDeprecationWarning('createLocale')
      return http
        .post('locales', data)
        .then((response) => wrapLocale(http, response.data), errorHandler)
    },
    /**
     * Gets a Webhook
     * @param id - Webhook ID
     * @return Promise for a Webhook
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getWebhook('<webhook_id>'))
     * .then((webhook) => console.log(webhook))
     * .catch(console.error)
     * ```
     */
    getWebhook(id: string) {
      return http
        .get('webhook_definitions/' + id)
        .then((response) => wrapWebhook(http, response.data), errorHandler)
    },

    /**
     * Gets a collection of Webhooks
     * @return Promise for a collection of Webhooks
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getWebhooks())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getWebhooks() {
      return http
        .get('webhook_definitions')
        .then((response) => wrapWebhookCollection(http, response.data), errorHandler)
    },

    /**
     * Creates a Webhook
     * @param data - Object representation of the Webhook to be created
     * @return Promise for the newly created Webhook
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createWebhook({
     *   'name': 'My webhook',
     *   'url': 'https://www.example.com/test',
     *   'topics': [
     *     'Entry.create',
     *     'ContentType.create',
     *     '*.publish',
     *     'Asset.*'
     *   ]
     * }))
     * .then((webhook) => console.log(webhook))
     * .catch(console.error)
     * ```
     */
    createWebhook(data: Omit<WebhookProps, 'sys'>) {
      return http
        .post('webhook_definitions', data)
        .then((response) => wrapWebhook(http, response.data), errorHandler)
    },

    /**
     * Creates a Webhook with a custom ID
     * @param id - Webhook ID
     * @param  data - Object representation of the Webhook to be created
     * @return Promise for the newly created Webhook
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createWebhookWithId('<webhook_id>', {
     *   'name': 'My webhook',
     *   'url': 'https://www.example.com/test',
     *   'topics': [
     *     'Entry.create',
     *     'ContentType.create',
     *     '*.publish',
     *     'Asset.*'
     *   ]
     * }))
     * .then((webhook) => console.log(webhook))
     * .catch(console.error)
     * ```
     */
    createWebhookWithId(id: string, data: Omit<WebhookProps, 'sys'>) {
      return http
        .put('webhook_definitions/' + id, data)
        .then((response) => wrapWebhook(http, response.data), errorHandler)
    },
    /**
     * Gets a Role
     * @param id - Role ID
     * @return Promise for a Role
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createRole({
     *   fields: {
     *     title: {
     *       'en-US': 'Role title'
     *     }
     *   }
     * }))
     * .then((role) => console.log(role))
     * .catch(console.error)
     * ```
     */
    getRole(id: string) {
      return http.get('roles/' + id).then((response) => wrapRole(http, response.data), errorHandler)
    },
    /**
     * Gets a collection of Roles
     * @return Promise for a collection of Roles
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getRoles())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getRoles() {
      return http
        .get('roles')
        .then((response) => wrapRoleCollection(http, response.data), errorHandler)
    },

    /**
     * Creates a Role
     * @param data - Object representation of the Role to be created
     * @return  Promise for the newly created Role
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getSpace('<space_id>')
     * .then((space) => space.createRole({
     *   name: 'My Role',
     *   description: 'foobar role',
     *   permissions: {
     *     ContentDelivery: 'all',
     *     ContentModel: ['read'],
     *     Settings: []
     *   },
     *   policies: [
     *     {
     *       effect: 'allow',
     *       actions: 'all',
     *       constraint: {
     *         and: [
     *           {
     *             equals: [
     *               { doc: 'sys.type' },
     *               'Entry'
     *             ]
     *           },
     *           {
     *             equals: [
     *               { doc: 'sys.type' },
     *               'Asset'
     *             ]
     *           }
     *         ]
     *       }
     *     }
     *   ]
     * }))
     * .then((role) => console.log(role))
     * .catch(console.error)
     * ```
     */
    createRole(data: Omit<RoleProps, 'sys'>) {
      return http
        .post('roles', data)
        .then((response) => wrapRole(http, response.data), errorHandler)
    },
    /**
     * Creates a Role with a custom ID
     * @param id - Role ID
     * @param data - Object representation of the Role to be created
     * @return Promise for the newly created Role
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getSpace('<space_id>')
     * .then((space) => space.createRoleWithId('<role-id>', {
     *   name: 'My Role',
     *   description: 'foobar role',
     *   permissions: {
     *     ContentDelivery: 'all',
     *     ContentModel: ['read'],
     *     Settings: []
     *   },
     *   policies: [
     *     {
     *       effect: 'allow',
     *       actions: 'all',
     *       constraint: {
     *         and: [
     *           {
     *             equals: [
     *               { doc: 'sys.type' },
     *               'Entry'
     *             ]
     *           },
     *           {
     *             equals: [
     *               { doc: 'sys.type' },
     *               'Asset'
     *             ]
     *           }
     *         ]
     *       }
     *     }
     *   ]
     * }))
     * .then((role) => console.log(role))
     * .catch(console.error)
     * ```
     */
    createRoleWithId(id: string, data: Omit<RoleProps, 'sys'>) {
      return http
        .put('roles/' + id, data)
        .then((response) => wrapRole(http, response.data), errorHandler)
    },
    /**
     * Gets a User
     * @param id - User ID
     * @return Promise for a User
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceUser('id'))
     * .then((user) => console.log(user))
     * .catch(console.error)
     * ```
     */
    getSpaceUser(id: string) {
      return http.get('users/' + id).then((response) => wrapUser(http, response.data), errorHandler)
    },
    /**
     * Gets a collection of Users in a space
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise a collection of Users in a space
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceUsers(query))
     * .then((data) => console.log(data))
     * .catch(console.error)
     * ```
     */
    getSpaceUsers(query: QueryOptions = {}) {
      const raw = this.toPlainObject()
      return endpoints.user
        .getManyForSpace(http, {
          spaceId: raw.sys.id,
          query: createRequestConfig({ query }).params,
        })
        .then((data) => wrapUserCollection(http, data))
    },
    /**
     * Gets a Space Member
     * @param id Get Space Member by user_id
     * @return Promise for a Space Member
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMember(id))
     * .then((spaceMember) => console.log(spaceMember))
     * .catch(console.error)
     * ```
     */
    getSpaceMember(id: string) {
      return http
        .get('space_members/' + id)
        .then((response) => wrapSpaceMember(http, response.data), errorHandler)
    },
    /**
     * Gets a collection of Space Members
     * @param query
     * @return Promise for a collection of Space Members
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMembers({'limit': 100}))
     * .then((spaceMemberCollection) => console.log(spaceMemberCollection))
     * .catch(console.error)
     * ```
     */
    getSpaceMembers(query: QueryOptions = {}) {
      return http
        .get('space_members', createRequestConfig({ query: query }))
        .then((response) => wrapSpaceMemberCollection(http, response.data), errorHandler)
    },
    /**
     * Gets a Space Membership
     * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
     * @param id - Space Membership ID
     * @return Promise for a Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMembership('id'))
     * .then((spaceMembership) => console.log(spaceMembership))
     * .catch(console.error)
     * ```
     */
    getSpaceMembership(id: string) {
      spaceMembershipDeprecationWarning()
      return http
        .get('space_memberships/' + id)
        .then((response) => wrapSpaceMembership(http, response.data), errorHandler)
    },
    /**
     * Gets a collection of Space Memberships
     * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Space Memberships
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMemberships({'limit': 100})) // you can add more queries as 'key': 'value'
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getSpaceMemberships(query: QueryOptions = {}) {
      spaceMembershipDeprecationWarning()
      return http
        .get('space_memberships', createRequestConfig({ query: query }))
        .then((response) => wrapSpaceMembershipCollection(http, response.data), errorHandler)
    },

    /**
     * Creates a Space Membership
     * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
     * @param  data - Object representation of the Space Membership to be created
     * @return Promise for the newly created Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createSpaceMembership({
     *   admin: false,
     *   roles: [
     *     {
     *       type: 'Link',
     *       linkType: 'Role',
     *       id: '<role_id>'
     *     }
     *   ],
     *   email: 'foo@example.com'
     * }))
     * .then((spaceMembership) => console.log(spaceMembership))
     * .catch(console.error)
     * ```
     */
    createSpaceMembership(data: Omit<SpaceMembershipProps, 'sys'>) {
      spaceMembershipDeprecationWarning()
      return http
        .post('space_memberships', data)
        .then((response) => wrapSpaceMembership(http, response.data), errorHandler)
    },
    /**
     * Creates a Space Membership with a custom ID
     * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
     * @param id - Space Membership ID
     * @param data - Object representation of the Space Membership to be created
     * @return Promise for the newly created Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createSpaceMembershipWithId('<space-membership-id>', {
     *   admin: false,
     *   roles: [
     *     {
     *       type: 'Link',
     *       linkType: 'Role',
     *       id: '<role_id>'
     *     }
     *   ],
     *   email: 'foo@example.com'
     * }))
     * .then((spaceMembership) => console.log(spaceMembership))
     * .catch(console.error)
     * ```
     */
    createSpaceMembershipWithId(id: string, data: Omit<SpaceMembershipProps, 'sys'>) {
      spaceMembershipDeprecationWarning()
      return http
        .put('space_memberships/' + id, data)
        .then((response) => wrapSpaceMembership(http, response.data), errorHandler)
    },

    /**
     * Gets a Team Space Membership
     * @param id - Team Space Membership ID
     * @return Promise for a Team Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getTeamSpaceMembership('team_space_membership_id'))
     * .then((teamSpaceMembership) => console.log(teamSpaceMembership))
     * .catch(console.error)
     * ```
     */
    getTeamSpaceMembership(teamSpaceMembershipId: string) {
      return http
        .get('team_space_memberships/' + teamSpaceMembershipId)
        .then((response) => wrapTeamSpaceMembership(http, response.data), errorHandler)
    },

    /**
     * Gets a collection of Team Space Memberships
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Team Space Memberships
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getTeamSpaceMemberships())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getTeamSpaceMemberships(query: QueryOptions = {}) {
      return http
        .get('team_space_memberships', createRequestConfig({ query: query }))
        .then((response) => wrapTeamSpaceMembershipCollection(http, response.data), errorHandler)
    },
    /**
   * Creates a Team Space Membership
   * @param id - Team ID
   * @param data - Object representation of the Team Space Membership to be created
   * @return Promise for the newly created Team Space Membership
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createTeamSpaceMembership('team_id', {
   *   admin: false,
   *   roles: [
   *    {
          sys: {
   *       type: 'Link',
   *       linkType: 'Role',
   *       id: '<role_id>'
   *      }
   *    }
   *   ],
   * }))
   * .then((teamSpaceMembership) => console.log(teamSpaceMembership))
   * .catch(console.error)
   * ```
   */
    createTeamSpaceMembership(teamId: string, data: Omit<TeamSpaceMembershipProps, 'sys'>) {
      return http
        .post('team_space_memberships', data, {
          headers: {
            'x-contentful-team': teamId,
          },
        })
        .then((response) => wrapTeamSpaceMembership(http, response.data), errorHandler)
    },
    /**
     * Gets a Api Key
     * @param id - API Key ID
     * @return  Promise for a Api Key
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getApiKey('<apikey-id>'))
     * .then((apikey) => console.log(apikey))
     * .catch(console.error)
     * ```
     */
    getApiKey(id: string) {
      return http
        .get('api_keys/' + id)
        .then((response) => wrapApiKey(http, response.data), errorHandler)
    },
    /**
     * Gets a collection of Api Keys
     * @return Promise for a collection of Api Keys
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getApiKeys())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getApiKeys() {
      return http
        .get('api_keys')
        .then((response) => wrapApiKeyCollection(http, response.data), errorHandler)
    },
    /**
     * Gets a collection of preview Api Keys
     * @return Promise for a collection of Preview Api Keys
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getPreviewApiKeys())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getPreviewApiKeys() {
      return http
        .get('preview_api_keys')
        .then((response) => wrapPreviewApiKeyCollection(http, response.data), errorHandler)
    },
    /**
     * Gets a preview Api Key
     * @param id - Preview API Key ID
     * @return  Promise for a Preview Api Key
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getPreviewApiKey('<preview-apikey-id>'))
     * .then((previewApikey) => console.log(previewApikey))
     * .catch(console.error)
     * ```
     */
    getPreviewApiKey(id: string) {
      return http
        .get('preview_api_keys/' + id)
        .then((response) => wrapPreviewApiKey(http, response.data), errorHandler)
    },
    /**
     * Creates a Api Key
     * @param data - Object representation of the Api Key to be created
     * @return Promise for the newly created Api Key
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createApiKey({
     *   name: 'API Key name',
     *   environments:[
     *    {
     *     sys: {
     *      type: 'Link'
     *      linkType: 'Environment',
     *      id:'<environment_id>'
     *     }
     *    }
     *   ]
     *   }
     * }))
     * .then((apiKey) => console.log(apiKey))
     * .catch(console.error)
     * ```
     */
    createApiKey: function createApiKey(data: CreateApiKeyProps) {
      return http
        .post('api_keys', data)
        .then((response) => wrapApiKey(http, response.data), errorHandler)
    },
    /**
     * Creates a Api Key with a custom ID
     * @param id - Api Key ID
     * @param data - Object representation of the Api Key to be created
     * @return Promise for the newly created Api Key
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createApiKeyWithId('<api-key-id>', {
     *   name: 'API Key name'
     *   environments:[
     *    {
     *     sys: {
     *      type: 'Link'
     *      linkType: 'Environment',
     *      id:'<environment_id>'
     *     }
     *    }
     *   ]
     *   }
     * }))
     * .then((apiKey) => console.log(apiKey))
     * .catch(console.error)
     * ```
     */
    createApiKeyWithId(id: string, data: CreateApiKeyProps) {
      return http
        .put('api_keys/' + id, data)
        .then((response) => wrapApiKey(http, response.data), errorHandler)
    },
    /**
     * Gets an UI Extension
     * @deprecated since version 5.0
     * @param id - UI Extension ID
     * @return Promise for an UI Extension
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getUiExtension('<extension-id>'))
     * .then((uiExtension) => console.log(uiExtension))
     * .catch(console.error)
     * ```
     */
    getUiExtension(id: string) {
      raiseDeprecationWarning('getUiExtension')
      return http
        .get('extensions/' + id)
        .then((response) => wrapUiExtension(http, response.data), errorHandler)
    },
    /**
     * Gets a collection of UI Extension
     * @deprecated since version 5.0
     * @return Promise for a collection of UI Extensions
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getUiExtensions()
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getUiExtensions() {
      raiseDeprecationWarning('getUiExtensions')
      return http
        .get('extensions')
        .then((response) => wrapUiExtensionCollection(http, response.data), errorHandler)
    },
    /**
     * Creates a UI Extension
     * @deprecated since version 5.0
     * @param data - Object representation of the UI Extension to be created
     * @return Promise for the newly created UI Extension
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createUiExtension({
     *   extension: {
     *     name: 'My awesome extension',
     *     src: 'https://example.com/my',
     *     fieldTypes: [
     *       {
     *         type: 'Symbol'
     *       },
     *       {
     *         type: 'Text'
     *       }
     *     ],
     *     sidebar: false
     *   }
     * }))
     * .then((uiExtension) => console.log(uiExtension))
     * .catch(console.error)
     * ```
     */
    createUiExtension(data: Omit<UIExtensionProps, 'sys'>) {
      raiseDeprecationWarning('createUiExtension')
      return http
        .post('extensions', data)
        .then((response) => wrapUiExtension(http, response.data), errorHandler)
    },
    /**
     * Creates a UI Extension with a custom ID
     * @deprecated since version 5.0
     * @param id - UI Extension ID
     * @param data - Object representation of the UI Extension to be created
     * @return Promise for the newly created UI Extension
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createUiExtensionWithId('<extension_id>', {
     *   extension: {
     *     name: 'My awesome extension',
     *     src: 'https://example.com/my',
     *     fieldTypes: [
     *       {
     *         type: 'Symbol'
     *       },
     *       {
     *         type: 'Text'
     *       }
     *     ],
     *     sidebar: false
     *   }
     * }))
     * .then((uiExtension) => console.log(uiExtension))
     * .catch(console.error)
     * ```
     */
    createUiExtensionWithId(id: string, data: Omit<UIExtensionProps, 'sys'>) {
      raiseDeprecationWarning('createUiExtensionWithId')
      return http
        .put('extensions/' + id, data)
        .then((response) => wrapUiExtension(http, response.data), errorHandler)
    },

    /**
     * Gets all snapshots of an entry
     * @deprecated since version 5.0
     * @param entryId - Entry ID
     * @param query - additional query paramaters
     * @return Promise for a collection of Entry Snapshots
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEntrySnapshots('<entry_id>'))
     * .then((snapshots) => console.log(snapshots.items))
     * .catch(console.error)
     * ```
     */
    getEntrySnapshots(entryId: string, query: QueryOptions = {}) {
      raiseDeprecationWarning('getEntrySnapshots')
      return http
        .get(`entries/${entryId}/snapshots`, createRequestConfig({ query: query }))
        .then((response) => wrapSnapshotCollection(http, response.data), errorHandler)
    },
    /**
     * Gets all snapshots of a contentType
     * @deprecated since version 5.0
     * @param contentTypeId - Content Type ID
     * @param query - additional query paramaters
     * @return Promise for a collection of Content Type Snapshots
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getContentTypeSnapshots('<contentTypeId>'))
     * .then((snapshots) => console.log(snapshots.items))
     * .catch(console.error)
     * ```
     */
    getContentTypeSnapshots(contentTypeId: string, query: QueryOptions = {}) {
      raiseDeprecationWarning('getContentTypeSnapshots')
      return http
        .get(`content_types/${contentTypeId}/snapshots`, createRequestConfig({ query: query }))
        .then((response) => wrapSnapshotCollection(http, response.data), errorHandler)
    },
    /**
     * Gets an Environment Alias
     * @param Environment Alias ID
     * @return Promise for an Environment Alias
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironmentAlias('<alias-id>'))
     * .then((alias) => console.log(alias))
     * .catch(console.error)
     * ```
     */
    getEnvironmentAlias(id: string) {
      return http
        .get('environment_aliases/' + id)
        .then((response) => wrapEnvironmentAlias(http, response.data), errorHandler)
    },
    /**
     * Gets a collection of Environment Aliases
     * @return Promise for a collection of Environment Aliases
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironmentAliases()
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getEnvironmentAliases() {
      return http
        .get('environment_aliases')
        .then((response) => wrapEnvironmentAliasCollection(http, response.data), errorHandler)
    },
  }
}
