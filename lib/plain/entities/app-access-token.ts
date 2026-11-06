import type { GetAppInstallationParams } from '../../common-types'
import type {
  AppAccessTokenProps,
  CreateAppAccessTokenProps,
} from '../../entities/app-access-token'
import type { OptionalDefaults } from '../wrappers/wrap'

export type AppAccessTokenPlainClientAPI = {
  /**
   * Issue a token for an app installation in a space environment
   * @param params space, environment, and app definition IDs
   * @param payload the JWT to be used to issue the token
   * @returns the issued token, which can be cached until it expires
   * @throws if the request fails
   * @example
   * ```javascript
   * import { sign } from 'jsonwebtoken'
   *
   * const signOptions = { algorithm: 'RS256', issuer: '<app_definition_id>', expiresIn: '10m' }
   *
   * const { token } = await client.appAccessToken.create(
   *   {
   *     spaceId: '<space_id>',
   *     environmentId: '<environment_id>',
   *     appDefinitionId: '<app_definition_id>',
   *   }, {
   *     jwt: sign({}, '<private_key>', signOptions)
   *   }
   * );
   * ```
   */
  create(
    params: OptionalDefaults<GetAppInstallationParams>,
    payload: CreateAppAccessTokenProps,
  ): Promise<AppAccessTokenProps>
}
