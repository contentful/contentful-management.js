/**
 * Contentful Organization API. Contains methods to access any operations at a space
 * level, such as creating and reading entities contained in a space.
 * @namespace ContentfulOrganizationAPI
 */

import { createRequestConfig } from 'contentful-sdk-core'
import errorHandler from './error-handler'
import entities from './entities'

/**
 * @memberof ContentfulOrganizationAPI
 * @typedef {object} ContentfulOrganizationAPI
 * @prop {function} createAppDefinition
 * @prop {function} getAppDefinition
 * @prop {function} getAppDefinitions
 */

/**
 * Creates API object with methods to access the Space API
 * @private
 * @param {object} params - API initialization params
 * @prop {object} http - HTTP client instance
 * @prop {object} entities - Object with wrapper methods for each kind of entity
 * @return {ContentfulOrganizationAPI}
 */
export default function createOrganizationApi ({
  http,
  httpUpload
}) {
  const {wrapAppDefinition, wrapAppDefinitionCollection} = entities.appDefinition

  /**
   * Organization instances.
   * @namespace Organization
   */

  /**
   * Gets all app definitions
   * @memberof ContentfulOrganizationAPI
   * @return {Promise<AppDefinition.AppDefinitionCollection>} Promise for a collection of App Definitions
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getOrganization('<org_id>')
   * .then((org) => org.getAppDefinitions())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   */
  function getAppDefinitions (query = {}) {
    return http.get('app_definitions', createRequestConfig({query: query}))
      .then((response) => wrapAppDefinitionCollection(http, response.data), errorHandler)
  }

  /**
   * Gets an app definition
   * @memberof ContentfulOrganizationAPI
   * @return {Promise<AppDefinition.AppDefinition>} Promise for an App Definition
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getOrganization('<org_id>')
   * .then((org) => org.getAppDefinition('<app_definition_id>'))
   * .then((appDefinition) => console.log(appDefinition))
   * .catch(console.error)
   */
  function getAppDefinition (id) {
    return http.get('app_definitions/' + id)
      .then((response) => wrapAppDefinition(http, response.data), errorHandler)
  }

  /**
   * Creates an App Definition
   * @memberof ContentfulOrganizationAPI
   * @see {AppDefinition}
   * @param {object=} data - Object representation of the App Definition to be created
   * @return {Promise<AppDefinition.AppDefinition>} Promise for the newly created AppDefinition
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getOrganization('<org_id>')
   * .then((org) => org.createAppDefinition({
   *    name: 'Example app',
   *    locations: [{ location: 'app-config' }],
   *    src: "http://my-app-host.com/my-app"
   *  }))
   * .then((appDefinition) => console.log(appDefinition))
   * .catch(console.error)
   */
  function createAppDefinition (data = {}) {
    return http.post('app_definitions', data)
      .then((response) => wrapAppDefinition(http, response.data), errorHandler)
  }

  return {
    createAppDefinition,
    getAppDefinition,
    getAppDefinitions
  }
}
