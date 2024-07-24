import { PaginationQueryParams, CollectionProp, GetOrganizationParams } from '../../common-types'
import { OrganizationProps } from '../../entities/organization'
import { OptionalDefaults } from '../wrappers/wrap'

export type OrganizationPlainClientAPI = {
  /**
   * Fetch all organizations the user has access to
   * @param params Optional pagination query parameters
   * @returns A collection of organizations
   * @throws if the request fails, or no organizations are found
   * @example
   * ```javascript
   * const organizations = await client.organization.getAll({
   *   query: {
   *     limit: 10,
   *   }
   * })
   * ```
   */
  getAll(
    params?: OptionalDefaults<PaginationQueryParams>
  ): Promise<CollectionProp<OrganizationProps>>
  /**
   * Fetch a single organization by its ID
   * @param params the organization ID
   * @returns the requested organization
   * @throws if the request fails, or the organization is not found
   * @example
   * ```javascript
   * const organization = await client.organization.get({
   *    organizationId: '<organization_id>'
   * })
   * ```
   */
  get(params: OptionalDefaults<GetOrganizationParams>): Promise<OrganizationProps>
}
