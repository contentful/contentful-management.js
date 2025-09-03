import type { GetAppDefinitionParams } from '../../common-types.js'
import type {
  AppSigningSecretProps,
  CreateAppSigningSecretProps,
} from '../../entities/app-signing-secret.js'
import type { OptionalDefaults } from '../wrappers/wrap.js'

export type AppSigningSecretPlainClientAPI = {
  /**
   * Creates or updates an App Signing Secret
   * @param params entity IDs to identify the App that the Signing Secret belongs to
   * @param payload the new or updated Signing Secret
   * @returns the App Signing Secret and its metadata
   * @throws if the request fails, the App or Signing Secret is not found, or the payload is malformed
   * @example
   * ```javascript
   * const signingSecret = await client.appSigningSecret.upsert({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * }, {
   *   value: '<value>'
   * })
   * ```
   */
  upsert(
    params: OptionalDefaults<GetAppDefinitionParams>,
    payload: CreateAppSigningSecretProps,
  ): Promise<AppSigningSecretProps>
  /**
   * Fetches the current App Signing Secret for the given App
   * @param params entity IDs to identify the App that the Signing Secret belongs to
   * @returns the App Signing Secret
   * @throws if the request fails, or the App or the Signing Secret is not found
   * @example
   * ```javascript
   * const signingSecret = await client.appSigningSecret.get({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * })
   * ```
   */
  get(params: OptionalDefaults<GetAppDefinitionParams>): Promise<AppSigningSecretProps>
  /**
   * Removes the current App Signing Secret for the given App
   * @param params entity IDs to identify the App that the Signing Secret belongs to
   * @throws if the request fails, or the App or the Signing Secret is not found
   * @example
   * ```javascript
   * await client.appSigningSecret.delete({
   *   organizationId: '<organization_id>',
   *   appDefinitionId: '<app_definition_id>',
   * })
   * ```
   */
  delete(params: OptionalDefaults<GetAppDefinitionParams>): Promise<void>
}
