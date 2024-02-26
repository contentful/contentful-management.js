import { CollectionProp, QueryParams } from '../../common-types'
import { UsageProps } from '../../export-types'
import { OptionalDefaults } from '../wrappers/wrap'

export type UsagePlainClientAPI = {
  /** Fetches all usage by space
   *
   * @param params organization ID and query parameters
   * @returns a collection of usage
   * @throws if the request fails or the usage is not found
   * @example
   * ```javascript
   * const usage = await client.usage.getManyForSpace({
   *   organizationId: '<organization_id>',
   *   query: {
   *     order: 'usage',
   *   },
   * });
   * ```
   */
  getManyForSpace(
    params: OptionalDefaults<{ organizationId: string } & QueryParams>
  ): Promise<CollectionProp<UsageProps>>
  /** Fetches all usage for a given organization
   *
   * @param params organization ID and query parameters
   * @returns a collection of usage
   * @throws if the request fails or the usage is not found
   * @example
   * ```javascript
   * const usage = await client.usage.getManyForOrganization({
   *   organizationId: '<organization_id>',
   *   query: {
   *     order: 'usage',
   *   },
   * });
   * ```
   */
  getManyForOrganization(
    params: OptionalDefaults<{ organizationId: string } & QueryParams>
  ): Promise<CollectionProp<UsageProps>>
}
