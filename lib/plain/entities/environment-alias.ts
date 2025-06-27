import type { RawAxiosRequestHeaders } from 'axios'
import type {
  CollectionProp,
  GetSpaceEnvAliasParams,
  GetSpaceParams,
  PaginationQueryParams,
} from '../../common-types.js'
import type {
  CreateEnvironmentAliasProps,
  EnvironmentAliasProps,
} from '../../entities/environment-alias.js'
import type { OptionalDefaults } from '../wrappers/wrap.js'

export type EnvironmentAliasPlainClientAPI = {
  /**
   * Fetch an environment alias
   * @param params a space and environment alias id
   * @returns the environment alias\
   * @throws if the environment alias does not exist
   * @example
   * ```javascript
   * const environmentAlias = await client.environmentAlias.get({
   *   spaceId: '<space_id>',
   *   environmentAliasId: '<environment_alias_id>'
   * })
   * ```
   */
  get(params: OptionalDefaults<GetSpaceEnvAliasParams>): Promise<EnvironmentAliasProps>
  /**
   * Fetch all environment aliases in a space
   * @param params a space Id and optional pagination parameters
   * @returns a collection of environment aliases
   * @throws if the space does not exist
   * @example
   * ```javascript
   * const environmentAliases = await client.environmentAlias.getMany({
   *   spaceId: '<space_id>'
   * })
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceParams & PaginationQueryParams>
  ): Promise<CollectionProp<EnvironmentAliasProps>>
  /**
   * Create an environment alias
   * @param params a space ID to create the environment alias in
   * @param rawData the environment alias metadata
   * @param headers optional custom headers
   * @returns the created environment alias
   * @throws if the space does not exist, or `rawData` is invalid
   * @example
   * ```javascript
   * const environmentAlias = await client.environmentAlias.createWithId(
   *   {
   *     spaceId: '<space_id>',
   *     environmentAliasId: '<environment_alias_id>',
   *   },
   *   {
   *     environment: {
   *       sys: {
   *         type: 'Link',
   *         linkType: 'Environment',
   *         id: '<environment_id>',
   *       },
   *     },
   *   }
   * );
   * ```
   */
  createWithId(
    params: OptionalDefaults<GetSpaceEnvAliasParams>,
    rawData: CreateEnvironmentAliasProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<EnvironmentAliasProps>
  /**
   * Update an environment alias
   * @param params a space and environment alias id
   * @param rawData the updated environment alias metadata
   * @param headers optional custom headers
   * @returns the updated environment alias
   * @throws if the environment alias does not exist, or `rawData` is invalid
   * @example
   * ```javascript
   * const environmentAlias = await client.environmentAlias.update(
   *   {
   *      spaceId: '<space_id>',
   *      environmentAliasId: '<environment_alias_id>',
   *   },
   *   {
   *     environment: {
   *     sys: {
   *       type: 'Link',
   *       linkType: 'Environment',
   *       id: '<environment_id>',
   *     },
   *   }
   * );
   */
  update(
    params: OptionalDefaults<GetSpaceEnvAliasParams>,
    rawData: EnvironmentAliasProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<EnvironmentAliasProps>
  /**
   * Delete an environment alias
   * @param params a space and environment alias id
   * @returns an empty object
   * @throws if the environment alias does not exist
   * @example
   * ```javascript
   * await client.environmentAlias.delete({
   *   spaceId: '<space_id>',
   *   environmentAliasId: '<environment_alias_id>',
   * })
   * ```
   */
  delete(params: OptionalDefaults<GetSpaceEnvAliasParams>): Promise<any>
}
