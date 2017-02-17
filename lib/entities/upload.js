import cloneDeep from 'lodash/cloneDeep'
import freezeSys from 'contentful-sdk-core/freeze-sys'
import enhanceWithMethods from '../enhance-with-methods'
import mixinToPlainObject from 'contentful-sdk-core/mixins/to-plain-object'
import {
  createDeleteEntity
} from '../instance-actions'

/**
 * @typedef {Upload} Upload
 * @property {Object} sys - Standard system metadata with additional upload specific properties
 * @property {function(): Promise<Upload>} delete - Deletes an upload on the server
 * @example
 * // require contentful-management
 * var contentfulManagement = require('contentful-management')
 * var client = contentfulManagement.createClient({
 * // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
 * accessToken: 'YOUR_ACCESS_TOKEN'
 * })
 *
 * //=======================================================================================================
 * // You can get an Upload object by
 * //
 * // 1. Creating one
 * //
 * // var upload = await space.createUpload(data)
 * //
 * // OR
 * //
 * // 2. Get an existing one
 * //
 * // var upload = await space.getUpload('UPLOAD_ID')
 * //=======================================================================================================
 *
 * // Example deleting an upload
 * upload.delete()
 * .catch(err => console.log(err))
 */

function createUploadApi (http) {
  return {
    /**
     * Deletes this object on the server.
     * @memberof Upload
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * upload.delete()
     * .catch(err => console.log(err))
     */
    delete: createDeleteEntity({
      http: http,
      entityPath: 'uploads'
    })
  }
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw upload data
 * @return {Upload} Wrapped upload data
 */
export function wrapUpload (http, data) {
  const upload = mixinToPlainObject(cloneDeep(data))
  enhanceWithMethods(upload, createUploadApi(http))
  return freezeSys(upload)
}
