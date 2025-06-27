import type { RawAxiosRequestHeaders } from 'axios'
import type { GetSpaceEnvironmentParams, QueryParams, CollectionProp } from '../../common-types.js'
import type { OptionalDefaults } from '../wrappers/wrap.js'
import type { CreateLocaleProps, LocaleProps } from '../../entities/locale.js'

export type LocalePlainClientAPI = {
  /**
   * Fetch a single locale by ID
   * @param params the locale ID and the IDs of the space and environment
   * @returns the locale
   * @throws if the space, environment, or locale are not found
   * @example
   * ```javascript
   * const locale = await client.locale.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   localeId: 'en-US',
   * });
   * ```
   */
  get(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { localeId: string }>
  ): Promise<LocaleProps>
  /**
   * Fetch all locales in a space and environment
   * @param params the space and environment IDs
   * @returns a collection of locales
   * @throws if the space or environment are not found
   * @example
   * ```javascript
   * const locales = await client.locale.getMany(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     query: {
   *       limit: 10,
   *     },
   *   }
   * );
   * ```
   */
  getMany(
    params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>
  ): Promise<CollectionProp<LocaleProps>>
  /**
   * Delete a locale
   * @param params the space, environment, and locale IDs
   * @returns void
   * @throws if the space, environment, or locale are not found
   * @example
   * ```javascript
   * await client.locale.delete({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   localeId: 'en-US',
   * });
   * ```
   */
  delete(params: OptionalDefaults<GetSpaceEnvironmentParams & { localeId: string }>): Promise<any>
  /**
   * Update a locale
   * @param params the space, environment, and locale IDs
   * @param rawData the updated locale data
   * @returns the updated locale
   * @throws if the space, environment, or locale are not found
   * @example
   * ```javascript
   * let locale = await client.locale.get({
   *   spaceId: '<space_id>',
   *   environmentId: '<environment_id>',
   *   localeId: 'en-US',
   * });
   *
   * locale = await client.locale.update(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     localeId: 'en-US',
   *   },
   *   {
   *     ...locale,
   *     name: 'English (US)',
   *   }
   * );
   * ```
   */
  update(
    params: OptionalDefaults<GetSpaceEnvironmentParams & { localeId: string }>,
    rawData: LocaleProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<LocaleProps>
  /**
   * Create a locale
   * @param params the space and environment ID to create the locale in
   * @param data the locale data
   * @returns the created locale
   * @throws if the space or environment are not found or the payload is malformed
   * @example
   * ```javascript
   * const locale = await client.locale.create(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *   },
   *   {
   *     name: 'German (Austria)',
   *     code: 'de-AT',
   *     fallbackCode: 'de-DE',
   *     optional: true,
   *   }
   * );
   * ```
   */
  create(
    params: OptionalDefaults<GetSpaceEnvironmentParams>,
    data: CreateLocaleProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<LocaleProps>
}
