import { createRequestConfig } from 'contentful-sdk-core'
import { BasicQueryOptions, MakeRequest } from './common-types'
import entities from './entities'
import type { QueryOptions } from './common-types'
import type { EntryProps, CreateEntryProps } from './entities/entry'
import type { AssetFileProp, AssetProps, CreateAssetProps } from './entities/asset'
import type { CreateContentTypeProps, ContentTypeProps } from './entities/content-type'
import type { CreateLocaleProps } from './entities/locale'
import type { CreateExtensionProps } from './entities/extension'
import type { CreateAppInstallationProps } from './entities/app-installation'
import { wrapTag, wrapTagCollection } from './entities/tag'
import { Stream } from 'stream'
import { EnvironmentProps } from './entities/environment'

export type ContentfulEnvironmentAPI = ReturnType<typeof createEnvironmentApi>

/**
 * Creates API object with methods to access the Environment API
 * @param {ContentfulEnvironmentAPI} makeRequest - function to make requests via an adapter
 * @return {ContentfulSpaceAPI}
 */
export default function createEnvironmentApi(makeRequest: MakeRequest) {
  const { wrapEnvironment } = entities.environment
  const { wrapContentType, wrapContentTypeCollection } = entities.contentType
  const { wrapEntry, wrapEntryCollection } = entities.entry
  const { wrapAsset, wrapAssetCollection } = entities.asset
  const { wrapLocale, wrapLocaleCollection } = entities.locale
  const { wrapSnapshotCollection } = entities.snapshot
  const { wrapEditorInterface, wrapEditorInterfaceCollection } = entities.editorInterface
  const { wrapUpload } = entities.upload
  const { wrapExtension, wrapExtensionCollection } = entities.extension
  const { wrapAppInstallation, wrapAppInstallationCollection } = entities.appInstallation

  return {
    /**
     * Deletes the environment
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.delete())
     * .then(() => console.log('Environment deleted.'))
     * .catch(console.error)
     * ```
     */
    delete: function deleteEnvironment() {
      const raw = this.toPlainObject() as EnvironmentProps
      makeRequest({
        entityType: 'Environment',
        action: 'delete',
        params: { spaceId: raw.sys.space.sys.id, environmentId: raw.sys.id },
      }).then(() => {
        // noop
      })
    },
    /**
     * Updates the environment
     * @return Promise for the updated environment.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => {
     *   environment.name = 'New name'
     *   return environment.update()
     * })
     * .then((environment) => console.log(`Environment ${environment.sys.id} renamed.`)
     * .catch(console.error)
     * ```
     */
    update: function updateEnvironment() {
      const raw = this.toPlainObject() as EnvironmentProps

      return makeRequest({
        entityType: 'Environment',
        action: 'update',
        params: { spaceId: raw.sys.space.sys.id, environmentId: raw.sys.id },
        payload: raw,
      }).then((data) => wrapEnvironment(makeRequest, data))
    },

    /**
     * Creates SDK Entry object (locally) from entry data
     * @param entryData - Entry Data
     * @return Entry
     * @example ```javascript
     * environment.getEntry('entryId').then(entry => {
     *
     *   // Build a plainObject in order to make it usable for React (saving in state or redux)
     *   const plainObject = entry.toPlainObject();
     *
     *   // The entry is being updated in some way as plainObject:
     *   const updatedPlainObject = {
     *     ...plainObject,
     *     fields: {
     *       ...plainObject.fields,
     *       title: {
     *         'en-US': 'updatedTitle'
     *       }
     *     }
     *   };
     *
     *   // Rebuild an sdk object out of the updated plainObject:
     *   const entryWithMethodsAgain = environment.getEntryFromData(updatedPlainObject);
     *
     *   // Update with help of the sdk method:
     *   entryWithMethodsAgain.update();
     *
     * });
     * ```
     **/
    getEntryFromData(entryData: EntryProps) {
      return wrapEntry(makeRequest, entryData)
    },
    /**
     * Creates SDK Asset object (locally) from entry data
     * @param assetData - Asset ID
     * @return Asset
     * @example ```javascript
     * environment.getAsset('asset_id').then(asset => {
     *
     *   // Build a plainObject in order to make it usable for React (saving in state or redux)
     *   const plainObject = asset.toPlainObject();
     *
     *   // The asset is being updated in some way as plainObject:
     *   const updatedPlainObject = {
     *     ...plainObject,
     *     fields: {
     *       ...plainObject.fields,
     *       title: {
     *         'en-US': 'updatedTitle'
     *       }
     *     }
     *   };
     *
     *   // Rebuild an sdk object out of the updated plainObject:
     *   const assetWithMethodsAgain = environment.getAssetFromData(updatedPlainObject);
     *
     *   // Update with help of the sdk method:
     *   assetWithMethodsAgain.update();
     *
     * });
     * ```
     */
    getAssetFromData(assetData: AssetProps) {
      return wrapAsset(makeRequest, assetData)
    },

    /**
     * Gets a Content Type
     * @param contentTypeId - Content Type ID
     * @return Promise for a Content Type
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getContentType('<content_type_id>'))
     * .then((contentType) => console.log(contentType))
     * .catch(console.error)
     * ```
     */
    getContentType(contentTypeId: string) {
      const raw = this.toPlainObject() as EnvironmentProps

      return makeRequest({
        entityType: 'ContentType',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId,
        },
      }).then((data) => wrapContentType(makeRequest, data))
    },

    /**
     * Gets a collection of Content Types
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
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getContentTypes())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getContentTypes(query: QueryOptions = {}) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'ContentType',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          query: createRequestConfig({ query }).params,
        },
      }).then((data) => wrapContentTypeCollection(makeRequest, data))
    },
    /**
     * Creates a Content Type
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
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createContentType({
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
      const raw = this.toPlainObject() as EnvironmentProps

      return makeRequest({
        entityType: 'ContentType',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
        },
        payload: data,
      }).then((response) => wrapContentType(makeRequest, response))
    },
    /**
     * Creates a Content Type with a custom ID
     * @param contentTypeId - Content Type ID
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
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createContentTypeWithId('<content-type-id>', {
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
    createContentTypeWithId(contentTypeId: string, data: CreateContentTypeProps) {
      const raw = this.toPlainObject() as EnvironmentProps

      return makeRequest({
        entityType: 'ContentType',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId,
        },
        payload: data,
      }).then((response) => wrapContentType(makeRequest, response))
    },

    /**
     * Gets an EditorInterface for a ContentType
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
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEditorInterfaceForContentType('<content_type_id>'))
     * .then((EditorInterface) => console.log(EditorInterface))
     * .catch(console.error)
     * ```
     */
    getEditorInterfaceForContentType(contentTypeId: string) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'EditorInterface',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId,
        },
      }).then((response) => wrapEditorInterface(makeRequest, response))
    },

    /**
     * Gets all EditorInterfaces
     * @return Promise for a collection of EditorInterface
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEditorInterfaces())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getEditorInterfaces() {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'EditorInterface',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
        },
      }).then((response) => wrapEditorInterfaceCollection(makeRequest, response))
    },

    /**
     * Gets an Entry
     * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
     * from your entry in the backend
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
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntry('<entry-id>'))
     * .then((entry) => console.log(entry))
     * .catch(console.error)
     * ```
     */
    getEntry(id: string, query: QueryOptions = {}) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Entry',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          entryId: id,
          query: createRequestConfig({ query: query }).params,
        },
      }).then((data) => wrapEntry(makeRequest, data))
    },

    /**
     * Deletes an Entry of this environement
     * @param id - Entry ID
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.deleteEntry("4bmLXiuviAZH3jkj5DLRWE"))
     * .then(() => console.log('Entry deleted.'))
     * .catch(console.error)
     * ```
     */
    deleteEntry(id: string) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Entry',
        action: 'delete',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          entryId: id,
        },
      }).then(() => {
        // noop
      })
    },

    /**
     * Gets a collection of Entries
     * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
     * from your entry in the backend
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
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntries({'content_type': 'foo'})) // you can add more queries as 'key': 'value'
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getEntries(query: QueryOptions = {}) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Entry',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          query: createRequestConfig({ query: query }).params,
        },
      }).then((data) => wrapEntryCollection(makeRequest, data))
    },

    /**
     * Creates a Entry
     * @param contentTypeId - The Content Type ID of the newly created Entry
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
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createEntry('<content_type_id>', {
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
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Entry',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId: contentTypeId,
        },
        payload: data,
      }).then((response) => wrapEntry(makeRequest, response))
    },

    /**
     * Creates a Entry with a custom ID
     * @param contentTypeId - The Content Type of the newly created Entry
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
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createEntryWithId('<content_type_id>', '<entry_id>', {
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
    createEntryWithId(contentTypeId: string, id: string, data: CreateEntryProps) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Entry',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          entryId: id,
          contentTypeId: contentTypeId,
        },
        payload: data,
      }).then((response) => wrapEntry(makeRequest, response))
    },

    /**
     * Gets an Asset
     * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
     * from your entry in the backend
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
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getAsset('<asset_id>'))
     * .then((asset) => console.log(asset))
     * .catch(console.error)
     * ```
     */
    getAsset(id: string, query: QueryOptions = {}) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Asset',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          assetId: id,
          query: createRequestConfig({ query: query }).params,
        },
      }).then((data) => wrapAsset(makeRequest, data))
    },

    /**
     * Gets a collection of Assets
     * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
     * from your entry in the backend
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
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getAssets())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getAssets(query: QueryOptions = {}) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Asset',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          query: createRequestConfig({ query: query }).params,
        },
      }).then((data) => wrapAssetCollection(makeRequest, data))
    },
    /**
     * Creates a Asset. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
     * @param data - Object representation of the Asset to be created. Note that the field object should have an upload property on asset creation, which will be removed and replaced with an url property when processing is finished.
     * @return Promise for the newly created Asset
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * // Create asset
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createAsset({
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
    createAsset(data: CreateAssetProps) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Asset',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
        },
        payload: data,
      }).then((response) => wrapAsset(makeRequest, response))
    },
    /**
     * Creates a Asset with a custom ID. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
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
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createAssetWithId('<asset_id>', {
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
    createAssetWithId(id: string, data: CreateAssetProps) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Asset',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          assetId: id,
        },
        payload: data,
      }).then((response) => wrapAsset(makeRequest, response))
    },
    /**
     * Creates a Asset based on files. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
     * @param data - Object representation of the Asset to be created. Note that the field object should have an uploadFrom property on asset creation, which will be removed and replaced with an url property when processing is finished.
     * @param data.fields.file.[LOCALE].file - Can be a string, an ArrayBuffer or a Stream.
     * @return Promise for the newly created Asset
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createAssetFromFiles({
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
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Asset',
        action: 'createFromFiles',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
        },
        payload: data,
      }).then((response) => wrapAsset(makeRequest, response))
    },
    /**
     * Gets an Upload
     * @param id - Upload ID
     * @return Promise for an Upload
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * const uploadStream = createReadStream('path/to/filename_english.jpg')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getUpload('<upload-id>')
     * .then((upload) => console.log(upload))
     * .catch(console.error)
     */
    getUpload(id: string) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Upload',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          uploadId: id,
        },
      }).then((data) => wrapUpload(makeRequest, data))
    },

    /**
     * Creates a Upload.
     * @param data - Object with file information.
     * @param data.file - Actual file content. Can be a string, an ArrayBuffer or a Stream.
     * @return Upload object containing information about the uploaded file.
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * const uploadStream = createReadStream('path/to/filename_english.jpg')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createUpload({file: uploadStream})
     * .then((upload) => console.log(upload))
     * .catch(console.error)
     * ```
     */
    createUpload: function createUpload(data: { file: string | ArrayBuffer | Stream }) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Upload',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
        },
        payload: data,
      }).then((data) => wrapUpload(makeRequest, data))
    },
    /**
     * Gets a Locale
     * @param localeId - Locale ID
     * @return Promise for an Locale
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getLocale('<locale_id>'))
     * .then((locale) => console.log(locale))
     * .catch(console.error)
     * ```
     */
    getLocale(localeId: string) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Locale',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          localeId,
        },
      }).then((data) => wrapLocale(makeRequest, data))
    },

    /**
     * Gets a collection of Locales
     * @return Promise for a collection of Locales
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getLocales())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getLocales() {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Locale',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
        },
      }).then((data) => wrapLocaleCollection(makeRequest, data))
    },
    /**
     * Creates a Locale
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
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createLocale({
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
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Locale',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
        },
        payload: data,
      }).then((response) => wrapLocale(makeRequest, response))
    },
    /**
     * Gets an UI Extension
     * @param id - Extension ID
     * @return Promise for an UI Extension
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getUiExtension('<extension-id>'))
     * .then((extension) => console.log(extension))
     * .catch(console.error)
     * ```
     */
    getUiExtension(id: string) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Extension',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          extensionId: id,
        },
      }).then((data) => wrapExtension(makeRequest, data))
    },
    /**
     * Gets a collection of UI Extension
     * @return Promise for a collection of UI Extensions
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getUiExtensions()
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getUiExtensions() {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Extension',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
        },
      }).then((response) => wrapExtensionCollection(makeRequest, response))
    },
    /**
     * Creates a UI Extension
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
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createUiExtension({
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
     * .then((extension) => console.log(extension))
     * .catch(console.error)
     * ```
     */
    createUiExtension(data: CreateExtensionProps) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Extension',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
        },
        payload: data,
      }).then((response) => wrapExtension(makeRequest, response))
    },
    /**
     * Creates a UI Extension with a custom ID
     * @param id - Extension ID
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
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createUiExtensionWithId('<extension_id>', {
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
     * .then((extension) => console.log(extension))
     * .catch(console.error)
     * ```
     */
    createUiExtensionWithId(id: string, data: CreateExtensionProps) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Extension',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          extensionId: id,
        },
        payload: data,
      }).then((response) => wrapExtension(makeRequest, response))
    },

    /**
     * Gets an App Installation
     * @param appDefinitionId - AppDefinition ID
     * @param data - AppInstallation data
     * @return Promise for an App Installation
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     *  .then((space) => space.getEnvironment('<environment-id>'))
     *  .then((environment) => environment.createAppInstallation('<app_definition_id>', {
     *    parameters: {
     *      someParameter: someValue
     *    }
     *   })
     *  .then((appInstallation) => console.log(appInstallation))
     *  .catch(console.error)
     *  ```
     */
    createAppInstallation(appDefinitionId: string, data: CreateAppInstallationProps) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'AppInstallation',
        action: 'upsert',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          appDefinitionId,
        },
        payload: data,
      }).then((payload) => wrapAppInstallation(makeRequest, payload))
    },
    /**
     * Gets an App Installation
     * @param id - AppDefintion ID
     * @return Promise for an App Installation
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     *  .then((space) => space.getEnvironment('<environment-id>'))
     *  .then((environment) => environment.getAppInstallation('<app-definition-id>'))
     *  .then((appInstallation) => console.log(appInstallation))
     *  .catch(console.error)
     *  ```
     */
    getAppInstallation(id: string) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'AppInstallation',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          appDefinitionId: id,
        },
      }).then((data) => wrapAppInstallation(makeRequest, data))
    },
    /**
     * Gets a collection of App Installation
     * @return Promise for a collection of App Installations
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     *  .then((space) => space.getEnvironment('<environment-id>'))
     *  .then((environment) => environment.getAppInstallations()
     *  .then((response) => console.log(response.items))
     *  .catch(console.error)
     *  ```
     */
    getAppInstallations() {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'AppInstallation',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
        },
      }).then((data) => wrapAppInstallationCollection(makeRequest, data))
    },
    /**
     * Gets all snapshots of an entry
     * @func getEntrySnapshots
     * @param entryId - Entry ID
     * @param query - query additional query paramaters
     * @return Promise for a collection of Entry Snapshots
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntrySnapshots('<entry_id>'))
     * .then((snapshots) => console.log(snapshots.items))
     * .catch(console.error)
     * ```
     */
    getEntrySnapshots(entryId: string, query: QueryOptions = {}) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Snapshot',
        action: 'getManyForEntry',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          entryId,
          query,
        },
      }).then((data) => wrapSnapshotCollection<EntryProps>(makeRequest, data))
    },
    /**
     * Gets all snapshots of a contentType
     * @func getContentTypeSnapshots
     * @param contentTypeId - Content Type ID
     * @param query - query additional query paramaters
     * @return Promise for a collection of Content Type Snapshots
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getContentTypeSnapshots('<contentTypeId>'))
     * .then((snapshots) => console.log(snapshots.items))
     * .catch(console.error)
     * ```
     */
    getContentTypeSnapshots(contentTypeId: string, query: QueryOptions = {}) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Snapshot',
        action: 'getManyForContentType',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId,
          query,
        },
      }).then((data) => wrapSnapshotCollection<ContentTypeProps>(makeRequest, data))
    },

    createTag(id: string, name: string) {
      const raw = this.toPlainObject() as EnvironmentProps
      const params = { spaceId: raw.sys.space.sys.id, environmentId: raw.sys.id, tagId: id }

      return makeRequest({
        entityType: 'Tag',
        action: 'createWithId',
        params,
        payload: { name },
      }).then((data) => wrapTag(makeRequest, data))
    },

    getTags(query: BasicQueryOptions = {}) {
      const raw = this.toPlainObject() as EnvironmentProps
      return makeRequest({
        entityType: 'Tag',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          query: createRequestConfig({ query }).params,
        },
      }).then((data) => wrapTagCollection(makeRequest, data))
    },

    getTag(id: string) {
      const raw = this.toPlainObject() as EnvironmentProps

      return makeRequest({
        entityType: 'Tag',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          tagId: id,
        },
      }).then((data) => wrapTag(makeRequest, data))
    },
  }
}
