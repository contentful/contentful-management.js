import { AxiosInstance } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import { MetaSysProps, DefaultElements, MetaLinkProps } from '../common-types'
import * as endpoints from '../plain/endpoints'

export type OrganizationMembershipProps = {
  /**
   * System metadata
   */
  sys: MetaSysProps & { organization: { sys: MetaLinkProps } }

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

function createOrganizationMembershipApi(http: AxiosInstance, organizationId: string) {
  const getParams = (data: OrganizationMembership) => ({
    organizationMembershipId: data.sys.id,
    organizationId,
  })

  return {
    update: function () {
      const raw = this.toPlainObject() as OrganizationMembership
      return endpoints.organizationMembership
        .update(http, getParams(raw), raw)
        .then((data) => wrapOrganizationMembership(http, data, organizationId))
    },

    delete: function del() {
      const raw = this.toPlainObject() as OrganizationMembership
      return endpoints.organizationMembership.del(http, getParams(raw))
    },
  }
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw organization membership data
 * @return {OrganizationMembership} Wrapped organization membership data
 */
export function wrapOrganizationMembership(
  http: AxiosInstance,
  data: OrganizationMembershipProps,
  organizationId: string
): OrganizationMembership {
  const organizationMembership = toPlainObject(cloneDeep(data))
  const organizationMembershipWithMethods = enhanceWithMethods(
    organizationMembership,
    createOrganizationMembershipApi(http, organizationId)
  )
  return freezeSys(organizationMembershipWithMethods)
}

/**
 * @private
 */
export const wrapOrganizationMembershipCollection = wrapCollection(wrapOrganizationMembership)
