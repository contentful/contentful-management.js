import type { CollectionProp, GetAppDefinitionParams, QueryParams } from '../../common-types'
import type { AppKeyProps, CreateAppKeyProps } from '../../entities/app-key'
import type { OptionalDefaults } from '../wrappers/wrap'

export type AppKeyPlainClientAPI = {
  /**
   * Creates an App Key
   * @param params entity IDs to identify the App that the Key belongs to
   * @param payload options for Key creation, see example for details
   * @returns the App Key and its metadata
   * @throws if the request fails, the App or Key is not found, or the payload is malformed
   * @example
   * ```javascript
   * // create an App Key by generating a new private key
   * const key = await client.appKey.create({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * }, {
   *   generate: true
   * })
   *
   * // create an App Key by specifying an existing private key
   * const keyFromExistingJWK = await client.appKey.create({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * }, {
   *   jwk: '<jwk>'
   * })
   * ```
   */
  create(
    params: OptionalDefaults<GetAppDefinitionParams>,
    payload: CreateAppKeyProps,
  ): Promise<AppKeyProps>
  /**
   * Fetches the App Key with the given fingerprint
   * @param params entity IDs to identify the App Key
   * @returns the App Key
   * @throws if the request fails, or the App or the Key is not found
   * @example
   * ```javascript
   * const key = await client.appKey.get({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   *   fingerprint: '<fingerprint>',
   * })
   * ```
   */
  get(
    params: OptionalDefaults<GetAppDefinitionParams> & { fingerprint: string },
  ): Promise<AppKeyProps>
  /**
   * Fetches all Keys for the given App
   * @param params entity IDs to identify the App, along with optional pagination query parameters
   * @returns the App Keys
   * @throws if the request fails, or the App is not found
   * @example
   * ```javascript
   * // with default pagination
   * const keys = await client.appKey.getMany({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * })
   *
   * // with explicit pagination
   * const paginatedKeys = await client.appKey.getMany({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * }, {
   *   query: {
   *     skip: '<skip>',
   *     limit: '<limit>',
   *   }
   * })
   * ```
   */
  getMany(
    params: OptionalDefaults<GetAppDefinitionParams> & QueryParams,
  ): Promise<CollectionProp<AppKeyProps>>
  /**
   * Removes the App Key with the given fingerprint
   * @param params entity IDs to identify the App Key
   * @throws if the request fails, or the App or the Key is not found
   * @example
   * ```javascript
   * await client.appKey.delete({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   *   fingerprint: '<fingerprint>',
   * })
   * ```
   */
  delete(params: OptionalDefaults<GetAppDefinitionParams> & { fingerprint: string }): Promise<void>
}
