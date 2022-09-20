import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import { MetaSysProps, DefaultElements, MakeRequest } from '../common-types'
import { UserProps } from './user'

export type OrganizationMembershipProps = {
  /**
   * System metadata
   */
  sys: MetaSysProps & { user: UserProps }

  /**
   * Role
   */
  role: string

  /**
   * status
   */
  status: boolean
}

export interface OrganizationMembership
  extends OrganizationMembershipProps,
    DefaultElements<OrganizationMembershipProps> {
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
   * client.getOrganization('organization_id')
   * .then(org => org.getOrganizationMembership('organizationMembership_id'))
   * .then((organizationMembership) => {
   *  organizationMembership.role = 'member';
   *  organizationMembership.update();
   * })
   * .catch(console.error)
   */
  update(): Promise<OrganizationMembership>

  /**
   * Deletes this object on the server.
   * @example```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getOrganization('organization_id')
   * .then(org => org.getOrganizationMembership('organizationMembership_id'))
   * .then((organizationMembership) => {
   *  organizationMembership.delete();
   * })
   * .catch(console.error)
   * ```
   */
  delete(): Promise<void>
}

/**
 * @private
 */
function createOrganizationMembershipApi(makeRequest: MakeRequest, organizationId: string) {
  const getParams = (data: OrganizationMembershipProps) => ({
    organizationMembershipId: data.sys.id,
    organizationId,
  })

  return {
    update: function () {
      const raw = this.toPlainObject() as OrganizationMembershipProps
      return makeRequest({
        entityType: 'OrganizationMembership',
        action: 'update',
        params: getParams(raw),
        payload: raw,
      }).then((data) => wrapOrganizationMembership(makeRequest, data, organizationId))
    },

    delete: function del() {
      const raw = this.toPlainObject() as OrganizationMembershipProps
      return makeRequest({
        entityType: 'OrganizationMembership',
        action: 'delete',
        params: getParams(raw),
      })
    },
  }
}

/**
 * @private
 * @param {function} makeRequest - function to make requests via an adapter
 * @param {Object} data - Raw organization membership data
 * @return {OrganizationMembership} Wrapped organization membership data
 */
export function wrapOrganizationMembership(
  makeRequest: MakeRequest,
  data: OrganizationMembershipProps,
  organizationId: string
): OrganizationMembership {
  const organizationMembership = toPlainObject(copy(data))
  const organizationMembershipWithMethods = enhanceWithMethods(
    organizationMembership,
    createOrganizationMembershipApi(makeRequest, organizationId)
  )
  return freezeSys(organizationMembershipWithMethods)
}

/**
 * @private
 */
export const wrapOrganizationMembershipCollection = wrapCollection(wrapOrganizationMembership)
