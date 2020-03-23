/**
 * UI Extension instances
 * @namespace AppInstallation
 */

import { toPlainObject, freezeSys } from 'contentful-sdk-core'
import cloneDeep from 'lodash/cloneDeep'
import enhanceWithMethods from '../enhance-with-methods'

/**
 * @memberof AppInstallation
 * @typedef AppInstallation
 * @prop {Meta.Sys} sys - System metadata
 * @prop {object} parameters - TODO: PROVIDE USEFULL PARAMETER DESCRIPTION
 *
 */

function createAppInstallationApi (http) {
  return {
    test: function () {
      console.log('I am just a test method :)')
    }
  }
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw App Installation data
 * @return {AppInstallation} Wrapped App installation data
 */
export function wrapAppInstallation (http, data) {
  const appInstallation = toPlainObject(cloneDeep(data))
  enhanceWithMethods(appInstallation, createAppInstallationApi(http))
  return freezeSys(appInstallation)
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw App installation collection data
 * @return {AppInstallationCollection} Wrapped App installation collection data
 */
export function wrapAppInstallationCollection (http, data) {
  const appInstallations = toPlainObject(cloneDeep(data))
  appInstallations.items = appInstallations.items.map(appInstallation => wrapAppInstallation(http, data))
  return freezeSys(appInstallations)
}
