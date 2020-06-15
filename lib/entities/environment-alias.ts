import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { createUpdateEntity } from '../instance-actions'
import { wrapCollection } from '../common-utils'
import { DefaultElements, MetaLinkProps, MetaSysProps } from '../common-types'
import { AxiosInstance } from 'axios'

export type EnvironmentAliasProps = {
  /**
   * System meta data
   */
  sys: MetaSysProps
  environment: MetaLinkProps
}

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
  update(data: Omit<EnvironmentAliasProps, 'sys'>): Promise<EnvironmentAlias>
}

function createEnvironmentAliasApi(http: AxiosInstance) {
  return {
    update: createUpdateEntity<EnvironmentAlias>({
      http: http,
      entityPath: 'environment_aliases',
      wrapperMethod: wrapEnvironmentAlias,
    }),
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
