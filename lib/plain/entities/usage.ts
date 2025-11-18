import type { CollectionProp, QueryParams } from '../../common-types'
import type { UsageProps } from '../../export-types'
import type { OptionalDefaults } from '../wrappers/wrap'

export type UsagePlainClientAPI = {
  /** Fetches all of an organization's usage data by space
   *
   * @param params organization ID and query parameters
   * @returns a collection of an organization's usage data
   * @throws if the request fails or the usage data is not found
   * @example
   * ```javascript
   * const usage = await client.usage.getManyForSpace({
   *   organizationId: '<organization_id>',
   *   {
   *        skip: 0,
   *        limit: 10,
   *        'metric[in]': 'cda,gql',
   *        'dateRange.startAt': '2020-01-05',
   *        'dateRange.endAt': '2020-01-20'
   *    }
   * });
   * ```
   */
  getManyForSpace(
    params: OptionalDefaults<{ organizationId: string } & QueryParams>,
  ): Promise<CollectionProp<UsageProps>>
  /** Fetches all an organization's usage data by organization
   *
   * @param params organization ID and query parameters
   * @returns a collection of an organization's usage data
   * @throws if the request fails or the usage data is not found
   * @example
   * ```javascript
   * const usage = await client.usage.getManyForOrganization({
   *   organizationId: '<organization_id>',
   *   {
   *        skip: 0,
   *        limit: 10,
   *        'metric[in]': 'cda,gql',
   *        'dateRange.startAt': '2020-01-05',
   *        'dateRange.endAt': '2020-01-20'
   *    }
   * });
   * ```
   */
  getManyForOrganization(
    params: OptionalDefaults<{ organizationId: string } & QueryParams>,
  ): Promise<CollectionProp<UsageProps>>
}
