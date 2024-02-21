import { RawAxiosRequestHeaders } from 'axios'
import {
  CollectionProp,
  GetSpaceEnvironmentParams,
  GetSpaceParams,
  PaginationQueryParams,
} from '../../common-types'
import { CreateEnvironmentProps, EnvironmentProps } from '../../entities/environment'
import { OptionalDefaults } from '../wrappers/wrap'

export type EnvironmentPlainClientAPI = {
  /**
   * Fetch an environment
   * @param params a space and environment id
   * @returns the environment
   * @throws if the environment does not exist
   * @example
   * ```javascript
   * const environment = await client.environment.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>'
   * })
   * ```
   */
  get(params: OptionalDefaults<GetSpaceEnvironmentParams>): Promise<EnvironmentProps>
  /**
   * Fetch all environments in a space
   * @param params a space Id and optional pagination parameters
   * @returns a collection of environments
   * @throws if the space does not exist
   * @example
   * ```javascript
   * const environments = await client.environment.getMany({
   *   spaceId: '<space_id>'
   * })
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceParams & PaginationQueryParams>
  ): Promise<CollectionProp<EnvironmentProps>>
  /**
   * Create an environment
   * @param params a space ID to create the environment in
   * @param rawData the environment metadata
   * @param headers optional custom headers
   * @returns the created environment
   * @throws if the space does not exist, or `rawData` is invalid
   * @example
   * ```javascript
   * const environment = await client.environment.create(
   *   {
   *     spaceId: '<space_id>'
   *   },
   *   {
   *      name: 'new-env'
   *   }
   * )
   * ```
   */
  create(
    params: OptionalDefaults<GetSpaceParams>,
    rawData: Partial<Pick<EnvironmentProps, 'name'>>,
    headers?: RawAxiosRequestHeaders
  ): Promise<EnvironmentProps>
  /**
   * Create an environment with a specific ID
   * @param params a space ID to create the environment in
   * @param rawData the environment metadata
   * @param headers optional custom headers
   * @returns the created environment
   * @throws if the space does not exist, or `rawData` is invalid
   * @example
   * ```javascript
   * const environment = await client.environment.createWithId(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>'
   *   },
   *   {
   *      name: 'new-env'
   *   }
   * )
   * ```
   */
  createWithId(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { sourceEnvironmentId?: string }>,
    rawData: CreateEnvironmentProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<EnvironmentProps>
  /**
   * Update an environment
   * @param params a space and environment id
   * @param rawData the environment metadata
   * @param headers optional custom headers
   * @returns the updated environment
   * @throws if the environment does not exist, or `rawData` is invalid
   * @example
   * ```javascript
   * let environment = await client.environment.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>'
   * })
   *
   * environment = await client.environment.update(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>'
   *   },
   *   {
   *      name: 'updated-env'
   *   }
   * )
   * ```
   */
  update(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    rawData: EnvironmentProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<EnvironmentProps>
  /**
   * Delete an environment
   * @param params a space and environment id
   * @returns an empty object
   * @throws if the environment does not exist
   * @example
   * ```javascript
   * await client.environment.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>'
   * })
   * ```
   */
  delete(params: OptionalDefaults<GetSpaceEnvironmentParams>): Promise<any>
}
