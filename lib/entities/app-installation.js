/**
 * UI Extension instances
 * @namespace AppInstallation
 */

import { toPlainObject, freezeSys } from 'contentful-sdk-core'
import cloneDeep from 'lodash/cloneDeep'
import enhanceWithMethods from '../enhance-with-methods'
import {
  createUpdateEntity,
  createDeleteEntity
} from '../instance-actions'

/**
 * @memberof AppInstallation
 * @typedef AppInstallation
 * @prop {Meta.Sys} sys - System metadata
 * @prop {object} parameters - TODO: PROVIDE USEFULL PARAMETER DESCRIPTION
 *
 */

function createAppInstallationApi (http) {
  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof AppInstallation
     * @func update
     * @return {Promise<AppInstallation>} Object returned from the server with updated changes.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => {
     *   // TODO ADD EXAMPLE
     * })
     */
    update: createUpdateEntity({
      http: http,
      entityPath: 'app_installations',
      wrapperMethod: wrapAppInstallation
    }),

    /**
     * Deletes this object on the server.
     * @memberof AppInstallation
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.delete())
     * .then(() => console.log(`App installation deleted.`))
     * .catch(console.error)
     */
    delete: createDeleteEntity({
      http: http,
      entityPath: 'app_installations'
    })
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
  appInstallations.items = appInstallations.items.map(appInstallationEntity => wrapAppInstallation(http, appInstallationEntity))
  return freezeSys(appInstallations)
}
