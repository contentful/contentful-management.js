import { AxiosInstance } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import errorHandler from '../error-handler'
import { createDeleteEntity } from '../instance-actions'
import { wrapCollection } from '../common-utils'
import { MetaSysProps, DefaultElements } from '../common-types'

export type OrganizationMembershipProps = {
  /**
   * System metadata
   */
  sys: MetaSysProps

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

function createOrganizationMembershipApi(http: AxiosInstance) {
  return {
    update: function () {
      const self = this as OrganizationMembership
      const raw = self.toPlainObject()
      const { role } = raw

      return http
        .put(
          'organization_memberships' + '/' + self.sys.id,
          { role },
          {
            headers: {
              'X-Contentful-Version': self.sys.version || 0,
            },
          }
        )
        .then((response) => wrapOrganizationMembership(http, response.data), errorHandler)
    },

    delete: createDeleteEntity({
      http: http,
      entityPath: 'organization_memberships',
    }),
  }
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw organization membership data
 * @return {OrganizationMembership} Wrapped organization membership data
 */
export function wrapOrganizationMembership(http: AxiosInstance, data: OrganizationMembershipProps) {
  const organizationMembership = toPlainObject(cloneDeep(data))
  const organizationMembershipWithMethods = enhanceWithMethods(
    organizationMembership,
    createOrganizationMembershipApi(http)
  )
  return freezeSys(organizationMembershipWithMethods)
}

/**
 * @private
 */
export const wrapOrganizationMembershipCollection = wrapCollection(wrapOrganizationMembership)
