import { RawAxiosRequestHeaders } from 'axios'
import {
  GetSpaceParams,
  QueryParams,
  CollectionProp,
  GetOrganizationParams,
} from '../../common-types'
import { OptionalDefaults } from '../wrappers/wrap'
import { SpaceProps } from '../../entities/space'

export type SpacePlainClientAPI = {
  /**
   * Fetches a space
   * @param params the space ID
   * @returns the space
   * @throws if the request fails, or the space is not found
   * @example ```javascript
   * const space = await client.space.get({
   *   spaceId: '<space_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetSpaceParams>): Promise<SpaceProps>
  /**
   * Fetches all the spaces that the logged in user has access to
   * @param params (optional) filter and pagination query parameters
   * @returns a collection of spaces
   * @throws if the request fails, or the query parameters are malformed
   * @example ```javascript
   * const space = await client.space.getMany({
   *   query: {
   *     limit: 10,
   *   },
   * });
   * ```
   */
  getMany(params: OptionalDefaults<QueryParams>): Promise<CollectionProp<SpaceProps>>
  /**
   * Fetches all the spaces in the given organization
   * @param params the organization ID and query parameters
   * @returns a collection of spaces
   * @throws if the request fails, the organization is not found, or the query parameters are malformed
   * @example ```javascript
   * const space = await client.space.getManyForOrganization({
   *   organizationId: '<organization_id>',
   *   query: {
   *     limit: 10,
   *   },
   * });
   * ```
   */
  getManyForOrganization(
    params: OptionalDefaults<GetOrganizationParams & QueryParams>
  ): Promise<CollectionProp<SpaceProps>>
  /**
   * Creates a space
   * @param params an organization ID
   * @param payload the space to create
   * @returns the created space
   * @throws if the request fails, or the payload is malformed
   * @example ```javascript
   * const space = await client.space.create(
   *   {
   *     organizationId: '<organization_id>',
   *   },
   *   {
   *     name: 'New space',
   *   }
   * );
   * ```
   */
  create(
    params: OptionalDefaults<{ organizationId?: string }>,
    payload: Omit<SpaceProps, 'sys'>,
    headers?: RawAxiosRequestHeaders
  ): Promise<any>
  /**
   * Updates a space
   * @param params the space ID
   * @param payload the space update
   * @returns the updated space
   * @throws if the request fails, the space is not found, or the payload is malformed
   * @example ```javascript
   * let space = await client.space.get({
   *   spaceId: '<space_id>',
   * });
   *
   * space = await client.space.update(
   *   {
   *     spaceId: '<space_id>',
   *   },
   *   {
   *     ...space.sys,
   *     name: 'New name'
   *   }
   * );
   * ```
   */
  update(
    params: OptionalDefaults<GetSpaceParams>,
    payload: SpaceProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<SpaceProps>
  /**
   * Deletes a space
   * @param params the space ID
   * @returns void
   * @throws if the request fails, or the space is not found
   * @example ```javascript
   * await client.space.delete({
   *   spaceId: '<space_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetSpaceParams>): Promise<any>
}
