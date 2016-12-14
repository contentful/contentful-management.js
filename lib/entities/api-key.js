import cloneDeep from 'lodash/cloneDeep'
import freezeSys from 'contentful-sdk-core/freeze-sys'
import enhanceWithMethods from '../enhance-with-methods'
import mixinToPlainObject from 'contentful-sdk-core/mixins/to-plain-object'
import {
  createUpdateEntity,
  createDeleteEntity
} from '../instance-actions'

/**
 * @typedef {ApiKey} ApiKey
 * @property {Object} sys - System metadata
 * @property {string} name
 * @property {string} description
 * @property {function(): Promise<ApiKey>} update() - Sends an update to the server with any changes made to the object's properties
 * @property {function(): Promise} delete() - Deletes this object on the server 
 * @property {function(): Object} toPlainObject() - Returns this Api Key as a plain JS object
 * @example
 * // Update an APIKey
 * apiKey.name = 'New name'
 * apiKey.update()
 * .then(apiKey => console.log(apiKey.name))
 * @example
 * // Delete an ApiKey
 * apiKey.delete()
 * .catch(err => console.log(err))
 *  
 */

/**
 * @typedef {ApiKeyCollection} ApiKeyCollection
 * @property {number} total - Total amount of records in the server
 * @property {number} skip - A starting point of the collection
 * @property {number} limit - Amount of records in collection
 * @property {Array<ApiKey>} items - Array of ApiKey
 * @property {function(): Object} toPlainObject() - Returns this Api Key collection as a plain JS object
 */
function createApiKeyApi (http) {
  return {
    update: createUpdateEntity({
      http: http,
      entityPath: 'api_keys',
      wrapperMethod: wrapApiKey
    }),

    delete: createDeleteEntity({
      http: http,
      entityPath: 'api_keys'
    })
  }
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw api key data
 * @return {ApiKey} Wrapped api key data
 */
export function wrapApiKey (http, data) {
  const apiKey = mixinToPlainObject(cloneDeep(data))
  enhanceWithMethods(apiKey, createApiKeyApi(http))
  return freezeSys(apiKey)
}


/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw api key collection data
 * @return {ApiKeyCollection} Wrapped api key collection data
 */
export function wrapApiKeyCollection (http, data) {
  const apiKeys = mixinToPlainObject(cloneDeep(data))
  apiKeys.items = apiKeys.items.map((entity) => wrapApiKey(http, entity))
  return freezeSys(apiKeys)
}
