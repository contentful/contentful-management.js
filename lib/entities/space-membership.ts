import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import {
  SysLink,
  MetaSysProps,
  DefaultElements,
  MakeRequestWithoutUserAgent,
} from '../common-types'

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

function createSpaceMembershipApi(makeRequest: MakeRequestWithoutUserAgent) {
  const getParams = (data: SpaceMembershipProps) => ({
    spaceId: data.sys.space.sys.id,
    spaceMembershipId: data.sys.id,
  })

  return {
    update: function update() {
      const data = this.toPlainObject() as SpaceMembershipProps
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'update',
        params: getParams(data),
        payload: data,
      }).then((data) => wrapSpaceMembership(makeRequest, data))
    },
    delete: function del() {
      const data = this.toPlainObject() as SpaceMembershipProps
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'delete',
        params: getParams(data),
      })
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
  makeRequest: MakeRequestWithoutUserAgent,
  data: SpaceMembershipProps
): SpaceMembership {
  const spaceMembership = toPlainObject(copy(data))
  const spaceMembershipWithMethods = enhanceWithMethods(
    spaceMembership,
    createSpaceMembershipApi(makeRequest)
  )
  return freezeSys(spaceMembershipWithMethods)
}

/**
 * @private
 */
export const wrapSpaceMembershipCollection = wrapCollection(wrapSpaceMembership)
