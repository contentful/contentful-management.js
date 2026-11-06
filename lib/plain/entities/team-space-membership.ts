import type { RawAxiosRequestHeaders } from 'axios'
import type {
  GetTeamSpaceMembershipParams,
  GetSpaceParams,
  QueryParams,
  CollectionProp,
  GetOrganizationParams,
} from '../../common-types'
import type {
  TeamSpaceMembershipProps,
  CreateTeamSpaceMembershipProps,
} from '../../entities/team-space-membership'
import type { OptionalDefaults } from '../wrappers/wrap'

export type TeamSpaceMembershipPlainClientAPI = {
  /**
   * Fetch a single team space membership by its ID
   * @param params the team and space IDs
   * @returns the requested team space membership
   * @throws if the request fails, or the team space membership or space are not found
   * @example
   * ```javascript
   * const teamSpaceMembership = await client.teamSpaceMembership.get({
   *   spaceId: '<space_id>',
   *   teamSpaceMembershipId: '<team_space_membership_id>'
   * })
   * ```
   */
  get(params: OptionalDefaults<GetTeamSpaceMembershipParams>): Promise<TeamSpaceMembershipProps>
  /**
   * Fetch all team space memberships for a given space
   * @param params the space ID and optional pagination query parameters
   * @returns A collection of team space memberships
   * @throws if the request fails, or the space is not found
   * @example
   * ```javascript
   * const teamSpaceMemberships = await client.teamSpaceMembership.getMany({
   *   spaceId: '<space_id>',
   *   query: {
   *     limit: 10,
   *   }
   * })
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceParams & QueryParams>,
  ): Promise<CollectionProp<TeamSpaceMembershipProps>>
  /**
   * Fetch a team space membership for a given organization
   * @param params the space ID and optional pagination query parameters
   * @returns A collection of team space memberships
   * @throws if the request fails, or the space is not found
   * @example
   * ```javascript
   * const teamSpaceMembership = await client.teamSpaceMembership.getForOrganization({
   *   organizationId: '<organization_id>',
   *   teamSpaceMembershipId: '<team_space_membership_id>'
   * })
   * ```
   */
  getForOrganization(
    params: OptionalDefaults<GetOrganizationParams & { teamSpaceMembershipId: string }>,
  ): Promise<TeamSpaceMembershipProps>
  /**
   * Fetch all team space memberships for a given organization
   * @param params the organization ID and optional filter and pagination query parameters
   * @returns A collection of team space memberships
   * @throws if the request fails, or the organization is not found
   * @example
   * ```javascript
   * const teamSpaceMemberships = await client.teamSpaceMembership.getManyForOrganization({
   *   organizationId: '<organization_id>',
   *   query: {
   *     teamId: '<team_id>',
   *     limit: 10,
   *   }
   * })
   * ```
   */
  getManyForOrganization(
    params: OptionalDefaults<GetOrganizationParams & QueryParams & { teamId?: string }>,
  ): Promise<CollectionProp<TeamSpaceMembershipProps>>
  /**
   * Create a new team space membership
   * @param params the space and team IDs
   * @param rawData the role links and a flag indicating whether or not the user is an admin
   * @returns the created team space membership
   * @throws if the request fails, or the organization or team are not found
   * @example
   * ```javascript
   * const teamSpaceMembership = await client.teamSpaceMembership.create({
   *   organizationId: '<organization_id>',
   *   teamId: '<team_id>',
   * }, {
   *   admin: false,
   *   roles: []
   * })
   * ```
   */
  create(
    params: OptionalDefaults<GetSpaceParams & { teamId: string }>,
    rawData: CreateTeamSpaceMembershipProps,
    headers?: RawAxiosRequestHeaders,
  ): Promise<TeamSpaceMembershipProps>
  /**
   * Update a team space membership
   * @param params the space and team space membership IDs
   * @param rawData the team space membership data
   * @returns the updated team space membership
   * @throws if the request fails, or the space or team space membership are not found
   * @example
   * ```javascript
   * let teamSpaceMembership = await client.teamSpaceMembership.get({
   *   spaceId: '<space_id>',
   *   teamSpaceMembershipId: '<team_space_membership_id>'
   * })
   *
   * teamMembership = await client.teamMembership.update({
   *   spaceId: '<space_id>',
   *   teamSpaceMembershipId: '<team_space_membership_id>'
   * }, {
   *   ...teamSpaceMembership,
   *   admin: true,
   * })
   * ```
   */
  update(
    params: OptionalDefaults<GetTeamSpaceMembershipParams>,
    rawData: TeamSpaceMembershipProps,
    headers?: RawAxiosRequestHeaders,
  ): Promise<TeamSpaceMembershipProps>
  /**
   * Delete a team space membership
   * @param params the space and team space membership IDs
   * @throws if the request fails, or the space or team space membership are not found
   * @example
   * ```javascript
   * await client.teamSpaceMembership.delete({
   *   spaceId: '<space_id>',
   *   teamSpaceMembershipId: '<team_space_membership_id>'
   * })
   * ```
   */
  delete(params: OptionalDefaults<GetTeamSpaceMembershipParams>): Promise<void>
}
