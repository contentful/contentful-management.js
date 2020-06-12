import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import errorHandler from '../error-handler'
import { DefaultElements, MetaSysProps, CollectionProp, MetaLinkProps } from '../common-types'
import { AxiosInstance } from 'axios'

export type TeamMembershipProps = {
  /**
   * System metadata
   */
  sys: MetaSysProps & { team: { sys: MetaLinkProps } }

  /**
   * Is admin
   */
  admin: boolean

  /**
   * Organization membership id
   */
  organizationMembershipId: string
}

export interface TeamMembership extends TeamMembershipProps, DefaultElements<TeamMembershipProps> {
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
   * client.getOrganization('organizationId')
   * .then(org => org.getTeamMembership('teamId', 'teamMembershipId'))
   * .then((teamMembership) => {
   *  teamMembership.delete();
   * })
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
   * client.getOrganization('organizationId')
   * .then(org => org.getTeamMembership('teamId', 'teamMembershipId'))
   * .then((teamMembership) => {
   *  teamMembership.admin = true;
   *  teamMembership.update();
   * })
   * .catch(console.error)
   * ```
   */
  update(): Promise<TeamMembership>
}

function createTeamMembershipApi(http: AxiosInstance) {
  return {
    update: function () {
      const raw = this.toPlainObject()
      const teamId = raw.sys.team.sys.id
      return http
        .put('teams/' + teamId + '/team_memberships/' + this.sys.id, raw, {
          headers: {
            'X-Contentful-Version': this.sys.version || 0,
          },
        })
        .then((response) => wrapTeamMembership(http, response.data), errorHandler)
    },

    delete: function () {
      const raw = this.toPlainObject()
      const teamId = raw.sys.team.sys.id
      return http.delete('teams/' + teamId + '/team_memberships/' + this.sys.id).then(() => {
        // do nothing
      }, errorHandler)
    },
  }
}
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw team membership data
 * @return Wrapped team membership data
 */
export function wrapTeamMembership(http: AxiosInstance, data: TeamMembershipProps) {
  const teamMembership = toPlainObject(cloneDeep(data))
  const teamMembershipWithMethods = enhanceWithMethods(
    teamMembership,
    createTeamMembershipApi(http)
  )
  return freezeSys(teamMembershipWithMethods)
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw team membership collection data
 * @return Wrapped team membership collection data
 */
export function wrapTeamMembershipCollection(
  http: AxiosInstance,
  data: CollectionProp<TeamMembershipProps>
) {
  const teamMemberships = toPlainObject(cloneDeep(data))
  return freezeSys({
    ...teamMemberships,
    items: teamMemberships.items.map((entity) => wrapTeamMembership(http, entity)),
  })
}
