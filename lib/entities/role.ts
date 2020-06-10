import cloneDeep from 'lodash/cloneDeep'
import { AxiosInstance } from 'axios'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { createUpdateEntity, createDeleteEntity } from '../instance-actions'
import { MetaSysProps, DefaultElements, CollectionProp } from '../types/common-types'

export type RoleProps = {
  sys: MetaSysProps
  name: string
  /**
   * Permissions for application sections
   */
  permissions: {
    ContentDelivery: string
    ContentModel: string[]
    Settings: any[]
  }
  policies: {
    effect: string
    actions: string
    constraint: any
  }[]
}

export interface Role extends RoleProps, DefaultElements<RoleProps> {
  /**
   * Deletes this object on the server.
   * @memberof Role
   * @func delete
   * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getRole('<role_id>'))
   * .then((role) => role.delete())
   * .then((role) => console.log(`role deleted.`))
   * .catch(console.error)
   * ```
   */
  delete(): Promise<void>
  /**
   * Sends an update to the server with any changes made to the object's properties
   * @return Object returned from the server with updated changes.
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getRole('<roles_id>'))
   * .then((roles) => {
   *   roles.name = 'New role name'
   *   return roles.update()
   * })
   * .then((roles) => console.log(`roles ${roles.sys.id} updated.`))
   * .catch(console.error)
   * ```
   */
  update(): Promise<Role>
}

function createRoleApi(http: AxiosInstance) {
  return {
    update: createUpdateEntity({
      http: http,
      entityPath: 'roles',
      wrapperMethod: wrapRole,
    }),

    delete: createDeleteEntity({
      http: http,
      entityPath: 'roles',
    }),
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw role data
 * @return Wrapped role data
 */
export function wrapRole(http: AxiosInstance, data: RoleProps) {
  const role = toPlainObject(cloneDeep(data))
  enhanceWithMethods(role, createRoleApi(http))
  return freezeSys(role)
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw role collection data
 * @return Wrapped role collection data
 */
export function wrapRoleCollection(http: AxiosInstance, data: CollectionProp<RoleProps>) {
  const roles = toPlainObject(cloneDeep(data))
  roles.items = roles.items.map((entity) => wrapRole(http, entity))
  return freezeSys(roles)
}
