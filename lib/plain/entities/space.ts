import type { RawAxiosRequestHeaders } from 'axios'
import type {
  GetSpaceParams,
  QueryParams,
  CollectionProp,
  CursorPaginatedCollectionProp,
  BasicCursorPaginationOptions,
  GetOrganizationParams,
} from '../../common-types'
import type { OptionalDefaults } from '../wrappers/wrap'
import type { SpaceIncludeParam, SpaceIncludes, SpaceProps } from '../../entities/space'

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
  get(
    params: OptionalDefaults<GetSpaceParams & SpaceIncludeParam>,
  ): Promise<SpaceProps & { includes?: SpaceIncludes }>
  /**
   * Fetches a cursor-paginated page of spaces the user has access to.
   * Pass `pageNext` or `pagePrev` (typically `string | undefined` from a previous response) in `query`.
   * @param params cursor pagination query parameters plus optional org filter and includes
   * @returns a cursor-paginated collection of spaces
   * @throws if the request fails, or the query parameters are malformed
   * @example ```javascript
   * const page = await client.space.getMany({
   *   query: { pageNext: previousResponse.pages?.next, limit: 10 },
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<
      {
        query: BasicCursorPaginationOptions &
          ({ pageNext: string | undefined } | { pagePrev: string | undefined })
        organizationId?: string
      } & SpaceIncludeParam
    >,
  ): Promise<CursorPaginatedCollectionProp<SpaceProps> & { includes?: SpaceIncludes }>
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
  getMany(
    params?: OptionalDefaults<
      {
        query?: QueryParams['query'] & { pageNext?: never; pagePrev?: never }
        organizationId?: string
      } & SpaceIncludeParam
    >,
  ): Promise<CollectionProp<SpaceProps> & { includes?: SpaceIncludes }>
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
    params: OptionalDefaults<GetOrganizationParams & QueryParams>,
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
    headers?: RawAxiosRequestHeaders,
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
    headers?: RawAxiosRequestHeaders,
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
