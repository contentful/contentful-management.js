/**
 * Organization space membership instances
 * @namespace OrganizationSpaceMembership
 */

import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'

/**
 * @memberof OrganizationSpaceMembership
 * @typedef OrganizationSpaceMembership
 * @prop {boolean} admin - User is an admin
 * @prop {Meta.Sys} sys - System metadata
 * @prop {Object<User.User>} user - User object
 * @prop {array} roles - Array of Role Links
 * @prop {function(): Object} toPlainObject() - Returns this Organization Space Membership as a plain JS object
 */

/**
 * @memberof OrganizationSpaceMembership
 * @typedef OrganizationSpaceMembershipCollection
 * @prop {number} total
 * @prop {number} limit
 * @prop {number} skip
 * @prop {Object<{type: "Array"}>} sys
 * @prop {Array<OrganizationSpaceMembership.OrganizationSpaceMembership>} items
 * @prop {function(): Object} toPlainObject() - Returns the collection as a plain JS object
 */

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
