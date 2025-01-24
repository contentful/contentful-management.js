import type { RawAxiosRequestHeaders } from 'axios'
import type {
  GetOAuthAppilicationParams,
  QueryParams,
  CursorPaginatedCollectionProp,
  GetUserParams,
} from '../../common-types'
import type { OptionalDefaults } from '../wrappers/wrap'
import type {
  CreateOAuthApplicationProps,
  OAuthApplicationProps,
} from '../../entities/oauth-application'

export type OAuthApplicationPlainClientAPI = {
  /**
   * Retrieves details of a specific OAuth application.
   * @param params the user and oauth application IDs
   * @returns the requested OAuth Application
   * @throws if the request fails, or the OAuth Application or user are not found
   * @example
   * ```javascript
   * const oauthApplication = await client.oauthApplication.get({
   *   userId: '<user_id>',
   *   oauthApplicationId: '<oauth_application_id>'
   * })
   * ```
   */
  get(params: OptionalDefaults<GetOAuthAppilicationParams>): Promise<OAuthApplicationProps>
  /**
   * Retrieves a list of OAuth applications associated with the current user.
   * @param params the user ID and optional pagination query parameters
   * @returns A collection of oauth applications
   * @throws if the request fails, or the user is not found
   * @example
   * ```javascript
   * const oauthApplication = await client.oauthApplication.getMany({
   *  userId: '<user_id>',
   *   query: {
   *     limit: 10,
   *   }
   * })
   * ```
   */
  getManyForUser(
    params: OptionalDefaults<GetOAuthAppilicationParams & QueryParams>
  ): Promise<CursorPaginatedCollectionProp<OAuthApplicationProps>>
  /**
   * Creates a new OAuth application.
   * @param params the user ID
   * @param rawData the oauth application payload
   * @returns the created OAuth Application
   * @throws if the request fails, or the user is not found
   * @example
   * ```javascript
   * const oauthApplication = await client.oauthApplication.create({
   *   userId: '<user_id>',
   * }, {
   *   name: 'Test-Name',
   *   description: 'Test-Desc',
   *   scopes: ['content_management_manage'],
   *   redirectUri: 'https://redirect.uri.com',
   *   confidential: true
   * }
   * ```
   */
  create(
    params: OptionalDefaults<GetUserParams>,
    rawData: CreateOAuthApplicationProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<OAuthApplicationProps>
  /**
   * Updates details of a specific OAuth application.
   * @param params the user and oauth application IDs
   * @param rawData the oauth application payload
   * @returns the updated oauth application
   * @throws if the request fails, or the user or oauth application are not found
   * @example
   * ```javascript
   *
   * const oauthApplication = await client.oauthApplication.update({
   *   userId: '<user_id>',
   *   oauthApplicationId: '<oauth_application_id>'
   * }, {
   *   ...oauthApplication,
   *   name: 'Update Test-Name',
   *   description: 'Update Test-Desc',
   * })
   * ```
   */
  update(
    params: OptionalDefaults<GetOAuthAppilicationParams>,
    rawData: OAuthApplicationProps,
    headers?: RawAxiosRequestHeaders
  ): Promise<OAuthApplicationProps>
  /**
   * Deletes a specific OAuth application.
   * @param params the user and oauth application IDs
   * @throws if the request fails, or the user or oauth application are not found
   * @example
   * ```javascript
   * await client.oauthApplication.delete({
   *   userId: '<user_id>',
   *   oauthApplicationId: '<oauth_application_id>'
   * })
   * ```
   */
  delete(params: OptionalDefaults<GetOAuthAppilicationParams>): Promise<void>
}
