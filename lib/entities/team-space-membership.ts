import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import {
  DefaultElements,
  MakeRequest,
  MetaLinkProps,
  MetaSysProps,
  QueryOptions,
} from '../common-types'

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

function createTeamSpaceMembershipApi(makeRequest: MakeRequest) {
  const getParams = (data: TeamSpaceMembershipProps) => ({
    teamSpaceMembershipId: data.sys.id,
    spaceId: data.sys.space.sys.id,
  })

  return {
    update: function () {
      const raw = this.toPlainObject() as TeamSpaceMembershipProps
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'update',
        params: getParams(raw),
        payload: raw,
      }).then((data) => wrapTeamSpaceMembership(makeRequest, data))
    },

    delete: function del() {
      const data = this.toPlainObject() as TeamSpaceMembershipProps
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'delete',
        params: getParams(data),
      })
    },
  }
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw space membership data
 * @return Wrapped team space membership data
 */
export function wrapTeamSpaceMembership(
  makeRequest: MakeRequest,
  data: TeamSpaceMembershipProps
): TeamSpaceMembership {
  const teamSpaceMembership = toPlainObject(copy(data))
  const teamSpaceMembershipWithMethods = enhanceWithMethods(
    teamSpaceMembership,
    createTeamSpaceMembershipApi(makeRequest)
  )
  return freezeSys(teamSpaceMembershipWithMethods)
}

/**
 * @private
 */
export const wrapTeamSpaceMembershipCollection = wrapCollection(wrapTeamSpaceMembership)
