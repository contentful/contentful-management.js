/**
 * Locale instances
 * @namespace EnvironmentAlias
 */
import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import {
  createUpdateEntity
} from '../instance-actions'

/**
 * @memberof EnvironmentAlias
 * @typedef EnvironmentAlias
 * @prop {Object} sys - System metadata
 * @prop {string} sys.id - EnvironmentAlias id
 * @prop {string} sys.type - Entity type
 * @prop {Environment} environment - the environment this alias points to
 * @prop {function(): Object} toPlainObject() - Returns this EnvironmentAlias as a plain JS object
 */

/**
 * @memberof EnvironmentAlias
 * @typedef SpaceCollection
 * @prop {number} total
 * @prop {number} skip
 * @prop {number} limit
 * @prop {Array<EnvironmentAlias.EnvironmentAlias>} items
 * @prop {function(): Object} toPlainObject() - Returns this EnvironmentAlias collection as a plain JS object
 */
function createEnvironmentAliasApi (http) {
  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof EnvironmentAlias
     * @func update
     * @return {Promise<EnvironmentAlias>} Object returned from the server with updated changes.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironmentAlias('<environment_alias_id>'))
     * .then((alias) => {
     *   alias.environment.id = '<environment_id>'
     *   return alias.update()
     * })
     * .then((alias) => console.log(`alias ${alias.sys.id} updated.`))
     * .catch(console.error)
     */
    update: function () {
      const environmentAlias = this
      return createUpdateEntity({
        http: http,
        entityPath: 'environment_aliases',
        wrapperMethod: wrapEnvironmentAlias,
        headers: {'x-contentful-enable-alpha-feature': 'environment-aliasing'}
      }).call(environmentAlias)
    }
  }
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw EnvironmentAlias data
 * @return {EnvironmentAlias} Wrapped EnvironmentAlias data
 */
export function wrapEnvironmentAlias (http, data) {
  const alias = toPlainObject(cloneDeep(data))
  enhanceWithMethods(alias, createEnvironmentAliasApi(http))
  return freezeSys(alias)
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw locale collection data
 * @return {LocaleCollection} Wrapped locale collection data
 */
export function wrapEnvironmentAliasCollection (http, data) {
  const aliases = toPlainObject(cloneDeep(data))
  aliases.items = aliases.items.map((entity) => wrapEnvironmentAlias(http, entity))
  return freezeSys(aliases)
}
