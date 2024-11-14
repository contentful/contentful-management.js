import type { RawAxiosRequestHeaders } from 'axios'
import type {
  GetTeamMembershipParams,
  GetOrganizationParams,
  QueryParams,
  CollectionProp,
  GetTeamParams,
} from '../../common-types'
import type { TeamMembershipProps, CreateTeamMembershipProps } from '../../export-types'
import type { OptionalDefaults } from '../wrappers/wrap'

export type TeamMembershipPlainClientAPI = {
  /**
   * Fetch a single team membership by its ID
   * @param params the team, team-membership, and organization IDs
   * @returns the requested team membership
   * @throws if the request fails, or the team membership or organization are not found
   * @example
   * ```javascript
   * const teamMembership = await client.teamMembership.get({
   *   organizationId: '<organization_id>',
   *   teamMembershipId: '<team_membership_id>'
   * })
   * ```
   */
  get(params: OptionalDefaults<GetTeamMembershipParams>): Promise<TeamMembershipProps>
  /**
   * Fetch all team memberships for a given organization
   * @param params the organization ID and optional pagination query parameters
   * @returns A collection of team memberships
   * @throws if the request fails, or the organization is not found
   * @example
   * ```javascript
   * const teamMemberships = await client.teamMembership.getMany({
   *   organizationId: '<organization_id>',
   *   query: {
   *     limit: 10,
   *   }
   * })
   * ```
   */
  getManyForOrganization(
    params: OptionalDefaults<GetOrganizationParams & QueryParams>
  ): Promise<CollectionProp<TeamMembershipProps>>
  /**
   * Fetch all team memberships for a given team
   * @param params the organization and team IDs and optional pagination query parameters
   * @returns A collection of team memberships
   * @throws if the request fails, or the organization or team are not found
   * @example
   * ```javascript
   * const teamMemberships = await client.teamMembership.getManyForTeam({
   *   organizationId: '<organization_id>',
   *   teamId: '<team_id>',
   *   query: {
   *     limit: 10,
   *   }
   * })
   * ```
   */
  getManyForTeam(
    params: OptionalDefaults<GetTeamParams & QueryParams>
  ): Promise<CollectionProp<TeamMembershipProps>>
  /**
   * Create a new team membership
   * @param params the organization and team IDs
   * @param rawData the organization membership ID and a flag indicating whether or not the user is an admin
   * @returns the created team membership
   * @throws if the request fails, or the organization or team are not found
   * @example
   * ```javascript
   * const teamMembership = await client.teamMembership.create({
   *   organizationId: '<organization_id>',
   *   teamId: '<team_id>',
   * }, {
   *   admin: false,
   *   organizationMembershipId: '<organization_membership_id>',
   * })
   * ```
   */
  create(
    params: OptionalDefaults<GetTeamParams>,
    rawData: CreateTeamMembershipProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<TeamMembershipProps>
  /**
   * Update a team membership
   * @param params the team, team-membership, and organization IDs
   * @param rawData the team membership data
   * @returns the updated team membership
   * @throws if the request fails, or the organization, team, or team membership are not found
   * @example
   * ```javascript
   * let teamMembership = await client.teamMembership.get({
   *   organizationId: '<organization_id>',
   *   teamId: '<team_id>',
   *   teamMembershipId: '<team_membership_id>',
   * })
   *
   * teamMembership = await client.teamMembership.update({
   *   organizationId: '<organization_id>',
   *   teamId: '<team_id>',
   *   teamMembershipId: '<team_membership_id>',
   * }, {
   *   ...teamMembership,
   *   admin: true,
   * })
   * ```
   */
  update(
    params: OptionalDefaults<GetTeamMembershipParams>,
    rawData: TeamMembershipProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<TeamMembershipProps>
  /**
   * Delete a team membership
   * @param params the team, team-membership, and organization IDs
   * @throws if the request fails, or the organization, team, or team membership are not found
   * @example
   * ```javascript
   * await client.teamMembership.delete({
   *   organizationId: '<organization_id>',
   *   teamId: '<team_id>',
   *   teamMembershipId: '<team_membership_id>',
   * })
   * ```
   */
  delete(params: OptionalDefaults<GetTeamMembershipParams>): Promise<void>
}
