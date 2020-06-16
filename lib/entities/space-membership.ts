import { AxiosInstance } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import { createUpdateEntity, createDeleteEntity } from '../instance-actions'
import { MetaSysProps, MetaLinkProps, DefaultElements } from '../common-types'

export type SpaceMembershipProps = {
  sys: MetaSysProps
  name: string
  /**
   * User is an admin
   */
  admin: boolean
  roles: MetaLinkProps[]
}

export interface SpaceMembership
  extends SpaceMembershipProps,
    DefaultElements<SpaceMembershipProps> {
  /**
   * Deletes this object on the server.
   * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getSpaceMembership('<spaceMembership_id>'))
   * .then((spaceMembership) => spaceMembership.delete())
   * .then(() => console.log(`spaceMembership deleted.`))
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
   * .then((space) => space.getSpaceMembership('<spaceMembership_id>'))
   * .then((spaceMembership) => {
   *  spaceMembership.name = 'new space membership name'
   * })
   * .then((spaceMembership) => console.log(`spaceMembership ${spaceMembership.sys.id} updated.`))
   * .catch(console.error)
   * ```
   */
  update(): Promise<SpaceMembership>
}

function createSpaceMembershipApi(http: AxiosInstance) {
  return {
    update: createUpdateEntity({
      http: http,
      entityPath: 'space_memberships',
      wrapperMethod: wrapSpaceMembership,
    }),

    delete: createDeleteEntity({
      http: http,
      entityPath: 'space_memberships',
    }),
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw space membership data
 * @return Wrapped space membership data
 */
export function wrapSpaceMembership(
  http: AxiosInstance,
  data: SpaceMembershipProps
): SpaceMembership {
  const spaceMembership = toPlainObject(cloneDeep(data))
  const spaceMembershipWithMethods = enhanceWithMethods(
    spaceMembership,
    createSpaceMembershipApi(http)
  )
  return freezeSys(spaceMembershipWithMethods)
}

/**
 * @private
 */
export const wrapSpaceMembershipCollection = wrapCollection(wrapSpaceMembership)
