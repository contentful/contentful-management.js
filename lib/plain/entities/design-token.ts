import type {
  GetSpaceEnvironmentParams,
  GetDesignTokenParams,
  ExoCursorPaginatedCollectionProp,
} from '../../common-types'
import type {
  DesignTokenQueryOptions,
  DesignTokenProps,
  UpsertDesignTokenProps,
} from '../../entities/design-token'
import type { OptionalDefaults } from '../wrappers/wrap'

export type DesignTokenPlainClientAPI = {
  /**
   * Fetches all design tokens for a space and environment
   * @param params the space and environment IDs and query parameters
   * @param params.query.limit the maximum number of design tokens to return
   * @param params.query.pageNext cursor token for the next page
   * @param params.query.pagePrev cursor token for the previous page
   * @returns a collection of design tokens
   * @throws if the request fails, or the space or environment is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const designTokens = await client.designToken.getMany({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   query: {
   *     limit: 10,
   *   },
   * });
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { query: DesignTokenQueryOptions }>,
  ): Promise<ExoCursorPaginatedCollectionProp<DesignTokenProps>>

  /**
   * Fetches a single design token by ID
   * @param params the space, environment, and design token IDs
   * @returns the design token
   * @throws if the request fails, or the space, environment, or design token is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const designToken = await client.designToken.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   designTokenId: '<design_token_id>',
   * });
   * ```
   */
  get(params: OptionalDefaults<GetDesignTokenParams>): Promise<DesignTokenProps>

  /**
   * Upserts a design token (creates or updates via PUT)
   * @param params the space, environment, and design token IDs
   * @param rawData the design token data to upsert (include sys.version for updates, omit for creates)
   * @returns the upserted design token
   * @throws if the request fails
   * @remarks Unlike ComponentType/Fragment, DesignToken has no separate publish step — every
   * upsert auto-publishes server-side, which bumps `sys.version` by 2 (not 1) per call.
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * const current = await client.designToken.get({ designTokenId: '<design_token_id>' });
   * const updated = await client.designToken.upsert({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   designTokenId: '<design_token_id>',
   * }, {
   *   sys: { id: current.sys.id, type: 'DesignToken', version: current.sys.version },
   *   name: 'Updated Design Token',
   *   type: 'DTCG.Color',
   * });
   * ```
   */
  upsert(
    params: OptionalDefaults<GetDesignTokenParams>,
    rawData: UpsertDesignTokenProps,
  ): Promise<DesignTokenProps>

  /**
   * Deletes a single design token
   * @param params the space, environment, and design token IDs
   * @throws if the request fails, or the design token is not found
   * @internal - Experimental endpoint, subject to breaking changes without notice
   * @example
   * ```javascript
   * await client.designToken.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   designTokenId: '<design_token_id>',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetDesignTokenParams>): Promise<void>
}
