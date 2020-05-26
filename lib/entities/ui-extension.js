/**
 * UI Extension instances
 * @namespace UiExtension
 */
import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import {
  createUpdateEntity,
  createDeleteEntity
} from '../instance-actions'

/**
 * @memberof UiExtension
 * @typedef UiExtension
 * @prop {Meta.Sys} sys - System metadata
 * @prop {object} extension - UI Extension config
 * @prop {string} extension.name - Extension name
 * @prop {array} extension.fieldTypes - Field types where an extension can be used
 * @prop {array} extension.src - URL where the root HTML document of the extension can be found
 * @prop {array} extension.srcdoc - String representation of the extension (e.g. inline HTML code)
 * @prop {boolean} extension.sidebar - Controls the location of the extension. If true it will be rendered on the sidebar instead of replacing the field's editing control
 * @prop {function(): Object} toPlainObject() - Returns this UI Extension as a plain JS object
 */

function createUiExtensionApi (http) {
  return {
    update: createUpdateEntity({
      http: http,
      entityPath: 'extensions',
      wrapperMethod: wrapUiExtension
    }),
    delete: createDeleteEntity({
      http: http,
      entityPath: 'extensions'
    })
  }
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw UI Extension data
 * @return {UiExtension} Wrapped UI Extension data
 */
export function wrapUiExtension (http, data) {
  const uiExtension = toPlainObject(cloneDeep(data))
  enhanceWithMethods(uiExtension, createUiExtensionApi(http))
  return freezeSys(uiExtension)
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw UI Extension collection data
 * @return {UiExtensionCollection} Wrapped UI Extension collection data
 */
export function wrapUiExtensionCollection (http, data) {
  const uiExtensions = toPlainObject(cloneDeep(data))
  uiExtensions.items = uiExtensions.items.map((entity) => wrapUiExtension(http, entity))
  return freezeSys(uiExtensions)
}
