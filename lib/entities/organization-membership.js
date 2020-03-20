/**
 * Organization membership instances
 * @namespace OrganizationMembership
 */

import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import {
  createUpdateEntity,
  createDeleteEntity
} from '../instance-actions'

/**
 * @memberof OrganizationMembership
 * @typedef OrganizationMembership
 * @prop {Meta.Sys} sys - System metadata
 * @prop {string} role
 * @prop {boolean} status - User is an admin
 * @prop {function(): Object} toPlainObject() - Returns this Organization Membership as a plain JS object
 */

/**
 * @memberof OrganizationMembership
 * @typedef OrganizationMembershipCollection
 * @prop {number} total
 * @prop {number} limit
 * @prop {number} skip
 * @prop {Object<{type: "Array"}>} sys
 * @prop {Array<OrganizationMembership.OrganizationMembership>} items
 * @prop {function(): Object} toPlainObject() - Returns the collection as a plain JS object
 */

function createOrganizationMembershipApi (http) {
  return {

    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof OrganizationMembership
     * @func update
     * @return {Promise<OrganizationMembership>} Object returned from the server with updated changes.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<organization_id>')
     * .then((organization) => organization.getOrganizationMembership('<organizationMembership_id>'))
     * .then((organizationMembership) => {
     *  organizationMembership.name = 'new organization membership name'
     * })
     * .then((organizationMembership) => console.log(`organizationMembership ${organizationMembership.sys.id} updated.`))
     * .catch(console.error)
     */
    update: createUpdateEntity({
      http: http,
      entityPath: 'organization_memberships',
      wrapperMethod: wrapOrganizationMembership
    }),

    /**
     * Deletes this object on the server.
     * @memberof OrganizationMembership
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<organization_id>')
     * .then((organization) => organization.getOrganizationMembership('<OrganizationMembership_id>'))
     * .then((OrganizationMembership) => OrganizationMembership.delete())
     * .then(() => console.log(`OrganizationMembership deleted.`))
     * .catch(console.error)
     */
    delete: createDeleteEntity({
      http: http,
      entityPath: 'organization_memberships'
    })
  }
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw organization membership data
 * @return {OrganizationMembership} Wrapped organization membership data
 */
export function wrapOrganizationMembership (http, data) {
  const organizationMembership = toPlainObject(cloneDeep(data))
  enhanceWithMethods(organizationMembership, createOrganizationMembershipApi(http))
  return freezeSys(organizationMembership)
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw organization membership collection data
 * @return {OrganizationMembershipCollection} Wrapped organization membership collection data
 */
export function wrapOrganizationMembershipCollection (http, data) {
  const organizationMemberships = toPlainObject(cloneDeep(data))
  organizationMemberships.items = organizationMemberships.items.map((entity) => wrapOrganizationMembership(http, entity))
  return freezeSys(organizationMemberships)
}
