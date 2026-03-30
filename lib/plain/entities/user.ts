import type {
  CollectionProp,
  GetOrganizationParams,
  GetSpaceParams,
  QueryParams,
} from '../../common-types'
import type { UserProps } from '../../entities/user'
import type { OptionalDefaults } from '../wrappers/wrap'

export type UserPlainClientAPI = {
  /** Fetches all users in a space
   *
   * @param params space ID and query parameters
   * @returns a collection of users
   * @throws if the request fails or the users are not found
   * @example
   * ```javascript
   * const users = await client.user.getManyForSpace({
   *   spaceId: '<space_id>',
   *   query: {
   *     limit: 100,
   *   },
   * });
   * ```
   */
  getManyForSpace(
    params: OptionalDefaults<GetSpaceParams & QueryParams>,
  ): Promise<CollectionProp<UserProps>>
  /**
   * Fetches a user in a space
   * @param params space ID, user ID, and query parameters
   * @returns the user
   * @throws if the request fails or the user is not found
   * @example
   * ```javascript
   * const user = await client.user.getForSpace({
   *   spaceId: '<space_id>',
   *   userId: '<user_id>',
   * });
   * ```
   */
  getForSpace(params: OptionalDefaults<GetSpaceParams & { userId: string }>): Promise<UserProps>
  /**
   * Fetches the current user
   * @param params query parameters
   * @returns the current user
   * @throws if the request fails or the user is not found
   * @example
   * ```javascript
   * const user = await client.user.getCurrent();
   * ```
   */
  getCurrent<T = UserProps>(params?: QueryParams): Promise<T>
  /**
   * Fetches a user in an organization
   * @param params organization ID, user ID, and query parameters
   * @returns the user
   * @throws if the request fails or the user is not found
   * @example
   * ```javascript
   * const user = await client.user.getForOrganization({
   *   organizationId: '<organization_id>',
   *   userId: '<user_id>',
   * });
   * ```
   */
  getForOrganization(
    params: OptionalDefaults<GetOrganizationParams & { userId: string }>,
  ): Promise<UserProps>
  /**
   * Fetches all users in an organization
   * @param params organization ID and query parameters
   * @returns a collection of users
   * @throws if the request fails or the users are not found
   * @example
   * ```javascript
   * const users = await client.user.getManyForOrganization({
   *   organizationId: '<organization_id>',
   *   query: {
   *     limit: 100,
   *   },
   * });
   * ```
   */
  getManyForOrganization(
    params: OptionalDefaults<GetOrganizationParams & QueryParams>,
  ): Promise<CollectionProp<UserProps>>
}
