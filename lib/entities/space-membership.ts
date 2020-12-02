import type { AxiosInstance } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import { SysLink, MetaSysProps, DefaultElements } from '../common-types'
import * as endpoints from '../plain/endpoints'

export type SpaceMembershipProps = {
  sys: MetaSysProps & { space: SysLink; user: SysLink }
  user: SysLink
  admin: boolean
  roles: SysLink[]
}

export type CreateSpaceMembershipProps = Omit<SpaceMembershipProps, 'sys' | 'user'> & {
  email: string
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
  const getParams = (data: SpaceMembershipProps) => ({
    spaceId: data.sys.space.sys.id,
    spaceMembershipId: data.sys.id,
  })

  return {
    update: function update() {
      const data = this.toPlainObject() as SpaceMembershipProps
      return endpoints.spaceMembership
        .update(http, getParams(data), data)
        .then((data) => wrapSpaceMembership(http, data))
    },
    delete: function del() {
      const data = this.toPlainObject() as SpaceMembershipProps
      return endpoints.spaceMembership.del(http, getParams(data))
    },
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
  const spaceMembership = toPlainObject(copy(data))
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
