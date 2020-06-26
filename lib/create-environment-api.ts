import { AxiosInstance } from 'axios'
import { createRequestConfig } from 'contentful-sdk-core'
import cloneDeep from 'lodash/cloneDeep'
import { Stream } from 'stream'
import { QueryOptions } from './common-types'
import entities from './entities'
import { AppInstallationProps } from './entities/app-installation'
import { AssetFileProp, AssetProps } from './entities/asset'

import { ContentType, CreateContentTypeProps } from './entities/content-type'
import { Entry, EntryProp } from './entities/entry'
import { CreateLocaleProps } from './entities/locale'
import { wrapTag, wrapTagCollection } from './entities/tag'
import { UIExtensionProps } from './entities/ui-extension'
import errorHandler from './error-handler'

export type ContentfulEnvironmentAPI = ReturnType<typeof createEnvironmentApi>

/**
 * Creates API object with methods to access the Environment API
 */
export default function createEnvironmentApi({
  http,
  httpUpload,
}: {
  http: AxiosInstance
  httpUpload: AxiosInstance
}) {
  const { wrapEnvironment } = entities.environment
  const { wrapContentType, wrapContentTypeCollection } = entities.contentType
  const { wrapEntry, wrapEntryCollection } = entities.entry
  const { wrapAsset, wrapAssetCollection } = entities.asset
  const { wrapLocale, wrapLocaleCollection } = entities.locale
  const { wrapSnapshotCollection } = entities.snapshot
  const { wrapEditorInterface } = entities.editorInterface
  const { wrapUpload } = entities.upload
  const { wrapUiExtension, wrapUiExtensionCollection } = entities.uiExtension
  const { wrapAppInstallation, wrapAppInstallationCollection } = entities.appInstallation

  function createAsset(data: Omit<AssetProps, 'sys'>) {
    return http
      .post('assets', data)
      .then((response) => wrapAsset(http, response.data), errorHandler)
  }

  function createUpload(data: { file: string | ArrayBuffer | Stream }) {
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

  /**
   * @private
   * sdk relies heavily on sys metadata
   * so we cannot omit the sys property on sdk level
   */
  function normalizeSelect(query: QueryOptions) {
    if (query.select && !/sys/i.test(query.select)) {
      query.select += ',sys'
    }
  }

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
      return http.delete('').then(() => {
        // noop
      }, errorHandler)
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
      const raw = this.toPlainObject()
      const data = cloneDeep(raw)
      delete data.sys
      return http
        .put('', data, {
          headers: {
            'X-Contentful-Version': raw.sys.version,
          },
        })
        .then((response) => wrapEnvironment(http, response.data), errorHandler)
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
    getEntryFromData(entryData: EntryProp) {
      return wrapEntry(http, entryData)
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
      return wrapAsset(http, assetData)
    },

    /**
     * Gets a Content Type
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
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getContentType('<content_type_id>'))
     * .then((contentType) => console.log(contentType))
     * .catch(console.error)
     * ```
     */
    getContentType(id: string) {
      return http
        .get('content_types/' + id)
        .then((response) => wrapContentType(http, response.data), errorHandler)
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
      return http
        .get('content_types', createRequestConfig({ query: query }))
        .then((response) => wrapContentTypeCollection(http, response.data), errorHandler)
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
      return http
        .post('content_types', data)
        .then((response) => wrapContentType(http, response.data), errorHandler)
    },
    /**
     * Creates a Content Type with a custom ID
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
    createContentTypeWithId(id: string, data: CreateContentTypeProps) {
      return http
        .put('content_types/' + id, data)
        .then((response) => wrapContentType(http, response.data), errorHandler)
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
      return http
        .get('content_types/' + contentTypeId + '/editor_interface')
        .then((response) => wrapEditorInterface(http, response.data), errorHandler)
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
      normalizeSelect(query)
      return http
        .get('entries/' + id, createRequestConfig({ query: query }))
        .then((response) => wrapEntry(http, response.data), errorHandler)
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
      normalizeSelect(query)
      return http
        .get('entries', createRequestConfig({ query: query }))
        .then((response) => wrapEntryCollection(http, response.data), errorHandler)
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
    createEntry(contentTypeId: string, data: Omit<EntryProp, 'sys'>) {
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
    createEntryWithId(contentTypeId: string, id: string, data: Omit<EntryProp, 'sys'>) {
      return http
        .put('entries/' + id, data, {
          headers: {
            'X-Contentful-Content-Type': contentTypeId,
          },
        })
        .then((response) => wrapEntry(http, response.data), errorHandler)
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
      normalizeSelect(query)
      return http
        .get('assets/' + id, createRequestConfig({ query: query }))
        .then((response) => wrapAsset(http, response.data), errorHandler)
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
      normalizeSelect(query)
      return http
        .get('assets', createRequestConfig({ query: query }))
        .then((response) => wrapAssetCollection(http, response.data), errorHandler)
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
    createAsset: createAsset,
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
    createAssetWithId(id: string, data: Omit<AssetProps, 'sys'>) {
      return http
        .put('assets/' + id, data)
        .then((response) => wrapAsset(http, response.data), errorHandler)
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
          const file = uploads.reduce((fieldsData, upload) => ({ ...fieldsData, ...upload }), {})
          const asset = {
            ...data,
            fields: {
              ...data.fields,
              file,
            },
          }
          return createAsset(asset)
        })
        .catch(errorHandler)
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
      return httpUpload
        .get('uploads/' + id)
        .then((response) => wrapUpload(http, response.data))
        .catch(errorHandler)
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
    createUpload: createUpload,
    /**
     * Gets a Locale
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
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getLocale('<locale_id>'))
     * .then((locale) => console.log(locale))
     * .catch(console.error)
     * ```
     */
    getLocale(id: string) {
      return http
        .get('locales/' + id)
        .then((response) => wrapLocale(http, response.data), errorHandler)
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
      return http
        .get('locales')
        .then((response) => wrapLocaleCollection(http, response.data), errorHandler)
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
      return http
        .post('locales', data)
        .then((response) => wrapLocale(http, response.data), errorHandler)
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
     * .then((uiExtension) => console.log(uiExtension))
     * .catch(console.error)
     * ```
     */
    getUiExtension(id: string) {
      return http
        .get('extensions/' + id)
        .then((response) => wrapUiExtension(http, response.data), errorHandler)
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
      return http
        .get('extensions')
        .then((response) => wrapUiExtensionCollection(http, response.data), errorHandler)
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
     * .then((uiExtension) => console.log(uiExtension))
     * .catch(console.error)
     * ```
     */
    createUiExtension(data: Omit<UIExtensionProps, 'sys'>) {
      return http
        .post('extensions', data)
        .then((response) => wrapUiExtension(http, response.data), errorHandler)
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
     * .then((uiExtension) => console.log(uiExtension))
     * .catch(console.error)
     * ```
     */
    createUiExtensionWithId(id: string, data: Omit<UIExtensionProps, 'sys'>) {
      return http
        .put('extensions/' + id, data)
        .then((response) => wrapUiExtension(http, response.data), errorHandler)
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
    createAppInstallation(appDefinitionId: string, data: Omit<AppInstallationProps, 'sys'>) {
      return http
        .put('app_installations/' + appDefinitionId, data)
        .then((response) => wrapAppInstallation(http, response.data), errorHandler)
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
      return http
        .get('app_installations/' + id)
        .then((response) => wrapAppInstallation(http, response.data), errorHandler)
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
      return http
        .get('app_installations')
        .then((response) => wrapAppInstallationCollection(http, response.data), errorHandler)
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
      return http
        .get(`entries/${entryId}/snapshots`, createRequestConfig({ query: query }))
        .then((response) => wrapSnapshotCollection<Entry>(http, response.data), errorHandler)
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
      return http
        .get(`content_types/${contentTypeId}/snapshots`, createRequestConfig({ query: query }))
        .then((response) => wrapSnapshotCollection<ContentType>(http, response.data), errorHandler)
    },

    createTag(id: string, name: string) {
      return http
        .put(`tags/${id}`, {
          name,
          sys: {
            id,
          },
        })
        .then((response) => wrapTag(http, response.data), errorHandler)
    },
    getTags(skip?: number, limit?: number) {
      return http
        .get('tags', { params: { skip, limit } })
        .then((response) => wrapTagCollection(http, response.data), errorHandler)
    },
    getTag(id: string) {
      return http.get('tags/' + id).then((response) => wrapTag(http, response.data), errorHandler)
    },
  }
}
