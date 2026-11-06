import type { RawAxiosRequestHeaders } from 'axios'
import type {
  GetTeamParams,
  GetOrganizationParams,
  QueryParams,
  CollectionProp,
  GetSpaceParams,
} from '../../common-types'
import type { TeamProps, CreateTeamProps } from '../../entities/team'
import type { OptionalDefaults } from '../wrappers/wrap'

export type TeamPlainClientAPI = {
  /**
   * Fetch a single team by its ID
   * @param params the team and organization IDs
   * @returns the requested team
   * @throws if the request fails, or the team or organization is not found
   * @example
   * ```javascript
   * const team = await client.team.get({
   *   organizationId: '<organization_id>',
   *   teamId: '<team_id>'
   * })
   * ```
   */
  get(params: OptionalDefaults<GetTeamParams>): Promise<TeamProps>
  /**
   * Fetch all teams for a given organization
   * @param params the organization ID and optional pagination query parameters
   * @returns A collection of teams
   * @throws if the request fails, or the organization is not found
   * @example
   * ```javascript
   * const teams = await client.team.getMany({
   *   organizationId: '<organization_id>',
   *   query: {
   *     limit: 10,
   *   }
   * })
   * ```
   */
  getMany(
    params: OptionalDefaults<GetOrganizationParams & QueryParams>,
  ): Promise<CollectionProp<TeamProps>>
  /**
   * Fetch all teams for a given space
   * @param params the space ID and optional pagination query parameters
   * @returns A collection of teams
   * @throws if the request fails, or the space is not found
   * @example
   * ```javascript
   * const teams = await client.team.getManyForSpace({
   *   spaceId: '<space_id>',
   *   query: {
   *     limit: 10,
   *   }
   * })
   * ```
   */
  getManyForSpace(
    params: OptionalDefaults<GetSpaceParams & QueryParams>,
  ): Promise<CollectionProp<TeamProps>>
  /**
   * Create a new team
   * @param params the organization ID
   * @param rawData the team name and description
   * @returns the created team
   * @throws if the request fails, or the organization is not found
   * @example
   * ```javascript
   * const team = await client.team.create({
   *   organizationId: '<organization_id>',
   * }, {
   *   name: 'My Team',
   *   description: 'A team for my organization',
   * })
   * ```
   */
  create(
    params: OptionalDefaults<GetOrganizationParams>,
    rawData: CreateTeamProps,
    headers?: RawAxiosRequestHeaders,
  ): Promise<any>
  /**
   * Update a team
   * @param params the organization and team IDs
   * @param rawData the team data
   * @returns the updated team
   * @throws if the request fails, or the organization or team are not found
   * @example
   * ```javascript
   * let team = await client.team.get({
   *   organizationId: '<organization_id>',
   *   teamId: '<team_id>'
   * })
   *
   * team = await client.team.update({
   *   organizationId: '<organization_id>',
   *   teamId: '<team_id>'
   * }, {
   *   ...team,
   *   name: 'New team name',
   * })
   * ```
   */
  update(
    params: OptionalDefaults<GetTeamParams>,
    rawData: TeamProps,
    headers?: RawAxiosRequestHeaders,
  ): Promise<TeamProps>
  /**
   * Delete a team
   * @param params the organization and team IDs
   * @throws if the request fails, or the organization or team are not found
   * @example
   * ```javascript
   * await client.team.delete({
   *   organizationId: '<organization_id>',
   *   teamId: '<team_id>'
   * })
   * ```
   */
  delete(params: OptionalDefaults<GetTeamParams>): Promise<void>
}
