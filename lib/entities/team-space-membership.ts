import { AxiosInstance } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import { DefaultElements, MetaLinkProps, MetaSysProps, QueryOptions } from '../common-types'
import * as endpoints from '../plain/endpoints'

export interface Options {
  teamId?: string
  query?: QueryOptions
}

export type TeamSpaceMembershipProps = {
  /**
   * System metadata
   */
  sys: MetaSysProps & { team: { sys: MetaLinkProps }; space: { sys: MetaLinkProps } }

  /**
   * Is admin
   */
  admin: boolean

  /**
   * Roles
   */
  roles: { sys: MetaLinkProps }[]
}

export type CreateTeamSpaceMembershipProps = Omit<TeamSpaceMembershipProps, 'sys'>

export interface TeamSpaceMembership
  extends TeamSpaceMembershipProps,
    DefaultElements<TeamSpaceMembershipProps> {
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
   * .then((space) => space.getTeamSpaceMembership('<team_space_membership_id>'))
   * .then((teamSpaceMembership) => teamSpaceMembership.delete())
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
   *  .then((space) => space.getTeamSpaceMembership('team_space_membership_id'))
   *  .then((teamSpaceMembership) => {
   *    item.roles = [
   *      {
   *        sys: {
   *          type: 'Link',
   *          linkType: 'Role',
   *          id: 'role_id'
   *        }
   *      }
   *    ]
   *  })
   *  .then((spaceMembership) => console.log(`spaceMembership ${spaceMembership.sys.id} updated.`))
   *  .catch(console.error)
   *  ```
   */
  update(): Promise<TeamSpaceMembership>
}

function createTeamSpaceMembershipApi(http: AxiosInstance) {
  const getParams = (data: TeamSpaceMembershipProps) => ({
    teamSpaceMembershipId: data.sys.id,
    spaceId: data.sys.space.sys.id,
  })

  return {
    update: function () {
      const raw = this.toPlainObject() as TeamSpaceMembershipProps
      return endpoints.teamSpaceMembership
        .update(http, getParams(raw), raw)
        .then((data) => wrapTeamSpaceMembership(http, data))
    },

    delete: function del() {
      const data = this.toPlainObject() as TeamSpaceMembershipProps
      return endpoints.teamSpaceMembership.del(http, getParams(data))
    },
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw space membership data
 * @return Wrapped team space membership data
 */
export function wrapTeamSpaceMembership(
  http: AxiosInstance,
  data: TeamSpaceMembershipProps
): TeamSpaceMembership {
  const teamSpaceMembership = toPlainObject(cloneDeep(data))
  const teamSpaceMembershipWithMethods = enhanceWithMethods(
    teamSpaceMembership,
    createTeamSpaceMembershipApi(http)
  )
  return freezeSys(teamSpaceMembershipWithMethods)
}

/**
 * @private
 */
export const wrapTeamSpaceMembershipCollection = wrapCollection(wrapTeamSpaceMembership)
