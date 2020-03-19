/**
 * Contentful Organization API. Contains methods to access any operations at a space
 * level, such as creating and reading entities contained in a space.
 * @namespace ContentfulOrganizationAPI
 */

import cloneDeep from 'lodash/cloneDeep'
import { createRequestConfig } from 'contentful-sdk-core'
import errorHandler from './error-handler'
import entities from './entities'

/**
 * @memberof ContentfulOrganizationAPI
 * @typedef {object} ContentfulOrganizationAPI
 * @prop {function} delete
 * @prop {function} update
 * @prop {function} getAppDefinition
 * @prop {function} getAppDefinitions
 * @prop {function} getSpace
 * @prop {function} getSpaces
 * @prop {function} getUsage
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
  const {wrapOrganization} = entities.organization
  const {wrapSpace, wrapSpaceCollection} = entities.space
  const {wrapAppDefinition, wrapAppDefinitionCollection} = entities.appDefinition

  /**
   * Organization instances.
   * @namespace Organization
   */

  /**
   * Deletes the organization
   * @memberof Organization
   * @func delete
   * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getOrganization('<org_id>')
   * .then((org) => org.delete())
   * .then(() => console.log('Organization deleted.'))
   * .catch(console.error)
  */
  function deleteOrganization () {
    return http.delete('')
      .then((response) => {}, errorHandler)
  }

  /**
   * Updates the organization
   * @memberof Organization
   * @func update
   * @return {Promise<Organization.Organization>} Promise for the updated organization.
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getOrganization('<org_id>')
   * .then((org) => {
   *   org.name = 'New name'
   *   return org.update()
   * })
   * .then((org) => console.log(`Organization ${org.sys.id} renamed.`)
   * .catch(console.error)
  */
  function updateOrganization () {
    const raw = this.toPlainObject()
    const data = cloneDeep(raw)
    delete data.sys
    return http.put('', data, {
      headers: {
        'X-Contentful-Version': raw.sys.version
      }
    })
      .then((response) => wrapOrganization(http, response.data), errorHandler)
  }

  /**
   * Gets all app definitions
   * @memberof Organization
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
   * @memberof Organization
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
   * Gets all spaces
   * @memberof Organization
   * @return {Promise<Space.SpaceCollection>} Promise for a collection of Spaces
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getOrganization('<org_id>')
   * .then((org) => org.getSpaces())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   */
  function getSpaces (query = {}) {
    return http.get('spaces', createRequestConfig({query: query}))
      .then((response) => wrapSpaceCollection(http, response.data), errorHandler)
  }

  /**
   * Gets a space
   * @memberof Organization
   * @return {Promise<Space.Space>} Promise for a Space
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getOrganization('<org_id>')
   * .then((org) => org.getSpace('<space_id>'))
   * .then((space) => console.log(space))
   * .catch(console.error)
   */
  function getSpace (id) {
    return http.get('spaces/' + id)
      .then((response) => wrapSpace(http, response.data), errorHandler)
  }

  return {
    delete: deleteOrganization,
    update: updateOrganization,
    getAppDefinition,
    getAppDefinitions,
    getSpace,
    getSpaces
  }
}
