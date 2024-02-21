import { RawAxiosRequestHeaders } from 'axios'
import {
  GetSpaceMembershipProps,
  GetSpaceParams,
  QueryParams,
  CollectionProp,
  GetOrganizationParams,
} from '../../common-types'
import { OptionalDefaults } from '../wrappers/wrap'
import { CreateSpaceMembershipProps, SpaceMembershipProps } from '../../entities/space-membership'

export type SpaceMembershipPlainClientAPI = {
  /**
   * Fetches a space membership for a given space
   * @param params the space and membership IDs
   * @returns the space membership
   * @throws if the request fails, or the space membership is not found
   * @example ```javascript
   * const spaceMembership = await client.spaceMembership.get({
   *   spaceId: '<space_id>',
   *   spaceMembershipId: '<membership_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetSpaceMembershipProps>): Promise<SpaceMembershipProps>
  /**
   * Fetches all of the memberships for a given space
   * @param params a space ID
   * @returns a collection of space memberships
   * @throws if the request fails, the space is not found, or the query parameters are malformed
   * @example ```javascript
   * const spaceMemberships = await client.spaceMembership.getMany({
   *   spaceId: '<space_id>',
   *   spaceMembershipId: '<membership_id>',
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceParams & QueryParams>
  ): Promise<CollectionProp<SpaceMembershipProps>>
  /**
   * Fetches the space membership within a given organization
   * @param params the organization and membership IDs
   * @returns the space membership
   * @throws if the request fails, or the organization or the space membership is not found
   * @example ```javascript
   * const spaceMembership = await client.spaceMembership.getForOrganization({
   *   spaceId: '<space_id>',
   *   spaceMembershipId: '<membership_id>',
   * });
   * ```
   */
  getForOrganization(
    params: OptionalDefaults<GetOrganizationParams & { spaceMembershipId: string }>
  ): Promise<SpaceMembershipProps>
  /**
   * Fetches all of the space memberships within a given organization
   * @param params the organization and query parameterss
   * @returns a collection of space memberships
   * @throws if the request fails, the organization is not found, or the query parameters are malformed
   * @example ```javascript
   * const spaceMemberships = await client.spaceMembership.getManyForOrganization({
   *   organizationId: '<organization_id>',
   *   spaceMembershipId: '<membership_id>',
   * });
   * ```
   */
  getManyForOrganization(
    params: OptionalDefaults<GetOrganizationParams & QueryParams>
  ): Promise<CollectionProp<SpaceMembershipProps>>
  /**
   * Creates a space membership
   * @param params the space ID
   * @param data the space membership data
   * @returns the created space membership
   * @throws if the request fails, the space cannot be found, or the data is malformed
   * @example ```javascript
   * const spaceMembership = await client.spaceMembership.create(
   *   {
   *     spaceId: '<space_id>',
   *   },
   *   {
   *     admin: false,
   *     roles: [
   *       {
   *         sys: {
   *           type: 'Link',
   *           linkType: 'Role',
   *           id: '<role_id>',
   *         },
   *       },
   *     ],
   *     email: 'foo@example.com',
   *   }
   * );
   * ```
   */
  create(
    params: OptionalDefaults<GetSpaceParams>,
    data: CreateSpaceMembershipProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<SpaceMembershipProps>
  /**
   * Creates a space membership with a specific ID
   * @param params the space ID and chosen membership ID
   * @param data the space membership data
   * @returns the created space membership
   * @throws if the request fails, the space cannot be found, or the data is malformed
   * @example ```javascript
   * const spaceMembership = await client.spaceMembership.createWithId(
   *   {
   *     spaceId: '<space_id>',
   *     spaceMembershipId: '<membership_id>',
   *   },
   *   {
   *     admin: false,
   *     roles: [
   *       {
   *         sys: {
   *           type: 'Link',
   *           linkType: 'Role',
   *           id: '<role_id>',
   *         },
   *       },
   *     ],
   *     email: 'foo@example.com',
   *   }
   * );
   * ```
   */
  createWithId(
    params: OptionalDefaults<GetSpaceMembershipProps>,
    data: CreateSpaceMembershipProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<SpaceMembershipProps>
  /**
   * Updates a space membership
   * @param params the space and membership IDs
   * @param rawData the space membership update
   * @returns the updated space membership
   * @throws if the request fails, the space membership is not found, or the payload is malformed
   * @example ```javascript
   * let spaceMembership = await client.spaceMembership.get({
   *   spaceId: '<space_id>',
   *   spaceMembershipId: '<membership_id>',
   * });
   *
   * spaceMembership = await client.spaceMembership.update(
   *   {
   *     spaceId: '<space_id>',
   *     spaceMembershipId: '<membership_id>',
   *   },
   *   {
   *     ...spaceMembership,
   *     admin: true,
   *   }
   * );
   * ```
   */
  update(
    params: OptionalDefaults<GetSpaceMembershipProps>,
    rawData: SpaceMembershipProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<SpaceMembershipProps>
  /**
   * Deletes a space membership
   * @param params the space and membership IDs
   * @returns void
   * @throws if the request fails, or the space membership is not found
   * @example ```javascript
   * await client.spaceMembership.delete({
   *   spaceId: '<space_id>',
   *   spaceMembershipId: '<membership_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetSpaceMembershipProps>): Promise<any>
}
