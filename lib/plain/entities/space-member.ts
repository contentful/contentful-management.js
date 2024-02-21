import { CollectionProp, GetSpaceParams, QueryParams } from '../../common-types'
import { SpaceMemberProps } from '../../entities/space-member'
import { OptionalDefaults } from '../wrappers/wrap'

export type SpaceMemberPlainClientAPI = {
  /**
   * Fetch the space member
   * @param params the space and member IDs
   * @returns the space member
   * @throws if the request fails, or the space member is not found
   * @example ```javascript
   * const spaceMember = await client.spaceMember.get({
   *   spaceId: '<space_id>',
   *   spaceMemberId: '<member_id>',
   * });
   * ```
   */
  get(
    params: OptionalDefaults<GetSpaceParams & { spaceMemberId: string }>
  ): Promise<SpaceMemberProps>
  /**
   * Fetches all the space members for a given space
   * @param params a space ID and query parameters
   * @returns a collection of space members
   * @throws if the request fails, the space is not found, or the query parameters are malformed
   * @example ```javascript
   * const spaceMember = await client.spaceMember.getMany({
   *   spaceId: '<space_id>',
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceParams & QueryParams>
  ): Promise<CollectionProp<SpaceMemberProps>>
}
