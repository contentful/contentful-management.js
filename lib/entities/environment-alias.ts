import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import { DefaultElements, MetaLinkProps, BasicMetaSysProps, SysLink } from '../common-types'
import { AxiosInstance } from 'axios'
import * as endpoints from '../plain/endpoints'

export type EnvironmentAliasProps = {
  /**
   * System meta data
   */
  sys: BasicMetaSysProps & { space: SysLink }
  environment: { sys: MetaLinkProps }
}

export type CreateEnvironmentAliasProps = Omit<EnvironmentAliasProps, 'sys'>

export interface EnvironmentAlias
  extends EnvironmentAliasProps,
    DefaultElements<EnvironmentAliasProps> {
  /**
   * Sends an update to the server with any changes made to the object's properties. Currently, you can only change the id of the alias's underlying environment. See the example below.
   * @memberof EnvironmentAlias
   * @func update
   * @return {Promise<EnvironmentAlias>} Object returned from the server with updated changes.
   * ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironmentAlias('<environment_alias_id>'))
   * .then((alias) => {
   *   alias.environment.sys.id = '<environment_id>'
   *   return alias.update()
   * })
   * .then((alias) => console.log(`alias ${alias.sys.id} updated.`))
   * .catch(console.error)
   * ```
   */
  update(): Promise<EnvironmentAlias>

  /**
   * Deletes this object on the server.
   * @memberof EnvironmentAlias
   * @func delete
   * @return {Promise<void>} Promise for the deletion. It contains no data, but the Promise error case should be handled.
   * ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironmentAlias('<environment_alias_id>'))
   * .then((alias) => {
   *   return alias.delete()
   * })
   * .then(() => console.log(`Alias deleted.`))
   * .catch(console.error)
   * ```
   */
  delete(): Promise<void>
}

function createEnvironmentAliasApi(http: AxiosInstance) {
  const getParams = (alias: EnvironmentAliasProps) => ({
    spaceId: alias.sys.space.sys.id,
    environmentAliasId: alias.sys.id,
  })

  return {
    update: function () {
      const raw = this.toPlainObject() as EnvironmentAliasProps
      return endpoints.environmentAlias
        .update(http, getParams(raw), raw)
        .then((data) => wrapEnvironmentAlias(http, data))
    },

    delete: function () {
      const raw = this.toPlainObject() as EnvironmentAliasProps
      return endpoints.environmentAlias.del(http, getParams(raw)).then(() => {
        // noop
      })
    },
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw environment alias data
 * @return Wrapped environment alias data
 */
export function wrapEnvironmentAlias(
  http: AxiosInstance,
  data: EnvironmentAliasProps
): EnvironmentAlias {
  const alias = toPlainObject(cloneDeep(data))
  const enhancedAlias = enhanceWithMethods(alias, createEnvironmentAliasApi(http))
  return freezeSys(enhancedAlias)
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw environment alias collection data
 * @return Wrapped environment alias collection data
 */
export const wrapEnvironmentAliasCollection = wrapCollection(wrapEnvironmentAlias)
