import { GetAppInstallationParams } from '../../common-types'
import { AppAccessTokenProps, CreateAppAccessTokenProps } from '../../entities/app-access-token'
import { OptionalDefaults } from '../wrappers/wrap'

export type AppAccessTokenPlainClientAPI = {
  /**
   * Issue a token for an app installation in a space environment
   * @param params space, environment, and app definition IDs
   * @param payload the JWT to be used to issue the token
   * @returns the issued token, which can be cached until it expires
   * @throws if the request fails
   * @example
   * ```javascript
   * const { token } = await client.appAccessToken.create(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     appDefinitionId: '<app_definition_id>',
   *   }, {
   *     jwt: '<jwt>',
   *   }
   * );
   * ```
   */
  create(
    params: OptionalDefaults<GetAppInstallationParams>,
    payload: CreateAppAccessTokenProps
  ): Promise<AppAccessTokenProps>
}
