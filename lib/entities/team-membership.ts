import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import { DefaultElements, MetaSysProps, MetaLinkProps, MakeRequest } from '../common-types'

export type TeamMembershipProps = {
  /**
   * System metadata
   */
  sys: MetaSysProps & {
    team: { sys: MetaLinkProps }
    organization: { sys: MetaLinkProps }
    organizationMembership: { sys: MetaLinkProps }
  }

  /**
   * Is admin
   */
  admin: boolean

  /**
   * Organization membership id
   */
  organizationMembershipId: string
}

export type CreateTeamMembershipProps = Omit<TeamMembershipProps, 'sys'>

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

/**
 * @private
 */
function createTeamMembershipApi(makeRequest: MakeRequest) {
  const getParams = (data: TeamMembershipProps) => ({
    teamMembershipId: data.sys.id,
    teamId: data.sys.team.sys.id,
    organizationId: data.sys.organization.sys.id,
  })

  return {
    update: function () {
      const raw = this.toPlainObject() as TeamMembershipProps
      return makeRequest({
        entityType: 'TeamMembership',
        action: 'update',
        params: getParams(raw),
        payload: raw,
      }).then((data) => wrapTeamMembership(makeRequest, data))
    },

    delete: function del() {
      const raw = this.toPlainObject() as TeamMembershipProps
      return makeRequest({
        entityType: 'TeamMembership',
        action: 'delete',
        params: getParams(raw),
      })
    },
  }
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw team membership data
 * @return Wrapped team membership data
 */
export function wrapTeamMembership(
  makeRequest: MakeRequest,
  data: TeamMembershipProps
): TeamMembership {
  const teamMembership = toPlainObject(copy(data))
  const teamMembershipWithMethods = enhanceWithMethods(
    teamMembership,
    createTeamMembershipApi(makeRequest)
  )
  return freezeSys(teamMembershipWithMethods)
}

/**
 * @private
 */
export const wrapTeamMembershipCollection = wrapCollection(wrapTeamMembership)
