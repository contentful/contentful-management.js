/**
 * Organization membership instances
 * @namespace Invitation
 */

import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'

/**
 * @memberof Invitation
 * @typedef Invitation
 * @prop {Meta.Sys} sys - System metadata
 * @prop {function(): Object} toPlainObject() - Returns this Organization Membership as a plain JS object
 */

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw invitation data
 * @return {Invitation} Wrapped Inviation data
 */
export function wrapInvitation (http, data) {
  const invitation = toPlainObject(cloneDeep(data))
  return freezeSys(invitation)
}
