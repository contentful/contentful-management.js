/**
 * Organization space membership instances
 * @namespace OrganizationSpaceMembership
 */

import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw organization space membership data
 * @return {organizationSpaceMembership} Wrapped organization space membership data
 */
export function wrapOrganizationSpaceMembership (http, data) {
  const organizationSpaceMembership = toPlainObject(cloneDeep(data))
  enhanceWithMethods(organizationSpaceMembership, {})
  return freezeSys(organizationSpaceMembership)
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw organization space membership collection data
 * @return {organizationSpaceMembershipsCollection} Wrapped organization space membership collection data
 */
export function wrapOrganizationSpaceMembershipCollection (http, data) {
  const organizationSpaceMemberships = toPlainObject(cloneDeep(data))
  organizationSpaceMemberships.items = organizationSpaceMemberships.items.map((entity) => wrapOrganizationSpaceMembership(http, entity))
  return freezeSys(organizationSpaceMemberships)
}
