import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  CursorPaginatedCollectionProp,
  GetOAuthAppilicationParams,
  GetUserParams,
  QueryParams,
} from '../../../common-types'
import type { RestEndpoint } from '../types'
import * as raw from './raw'
import type {
  OAuthApplicationProps,
  CreateOAuthApplicationProps,
} from '../../../entities/oauth-application'

/**
 * Retrieves details of a specific OAuth application. by its unique user ID and oauth application ID.
 *
 * @param {AxiosInstance} http - An Axios HTTP client instance.
 * @param {Object} params - Parameters for the request.
 * @param {string} params.userId - The unique user ID of the user.
 * @param {string} params.oauthApplicationId - The unique application ID of the OAuth application.
 * @returns {Promise<OAuthApplicationProps>} A Promise that resolves with the retrieved OAuth Application.
 * @example ```javascript
 * const contentful = require('contentful-management')
 *
 * const plainClient = contentful.createClient(
 *  {
 *   accessToken: '<content_management_api_key>'
 *  },
 *  { type: 'plain' }
 * )
 * plainClient.get({userId: 'TestUserId', oauthApplicationId: 'TestOAuthAppId'})
 *  .then(oauthApplication => console.log(oauthApplication))
 *  .catch(console.error)
 * ```
 */
export const get: RestEndpoint<'OAuthApplication', 'get'> = (
  http: AxiosInstance,
  params: GetOAuthAppilicationParams
) => {
  return raw.get<OAuthApplicationProps>(
    http,
    `/users/${params.userId}/oauth_applications/${params.oauthApplicationId}`
  )
}

/**
 * Retrieves a list of OAuth applications associated with the current user.
 *
 * @param {AxiosInstance} http - An Axios HTTP client instance.
 * @param {Object} params - Parameters for the request.
 * @param {string} params.userId - The unique user ID of the user.
 * @param {QueryParams} params - Query parameters to filter and customize the request.
 * @returns {Promise<CursorPaginatedCollectionProp<OAuthApplicationProps>>} A Promise that resolves with a collection of oauth application properties.
 * @example ```javascript
 * const contentful = require('contentful-management')
 *
 * const plainClient = contentful.createClient(
 *  {
 *    accessToken: '<content_management_api_key>'
 *  },
 *  { type: 'plain' }
 * )
 * plainClient.getMany({userId: 'TestUserId'})
 *  .then(result => console.log(result.items))
 *  .catch(console.error)
 * ```
 */
export const getManyForUser: RestEndpoint<'OAuthApplication', 'getManyForUser'> = (
  http: AxiosInstance,
  params: GetUserParams & QueryParams
) => {
  return raw.get<CursorPaginatedCollectionProp<OAuthApplicationProps>>(
    http,
    `/users/${params.userId}/oauth_applications`,
    {
      params: params.query,
    }
  )
}

/**
 * Creates a new OAuth application for current authenticated user.
 *
 * @param {AxiosInstance} http - Axios instance for making the HTTP request.
 * @param {Object} params - Parameters for the request.
 * @param {string} params.userId - The unique user ID of the user.
 * @param {RawAxiosRequestHeaders} [headers] - Optional HTTP headers for the request.
 * @returns {Promise<OAuthApplicationProps>} A Promise that resolves with the created oauth application.
 * @example ```javascript
 * const contentful = require('contentful-management')
 *
 * const plainClient = contentful.createClient(
 *  {
 *    accessToken: '<content_management_api_key>',
 *  },
 *  { type: 'plain' }
 * )
 * plainClient.create(
 *  {userId: 'TestUserId'},
 *  {name: 'Test-Name', description: 'Test-Desc', scopes: ['content_management_manage'], redirectUri: 'https://redirect.uri.com', confidential: true}
 *  )
 *  .then(oauthApplication => console.log(oauthApplication))
 *  .catch(console.error)
 * ```
 */
export const create: RestEndpoint<'OAuthApplication', 'create'> = (
  http: AxiosInstance,
  params: GetUserParams,
  rawData: CreateOAuthApplicationProps,
  headers?: RawAxiosRequestHeaders
) => {
  return raw.post<OAuthApplicationProps>(
    http,
    `/users/${params.userId}/oauth_applications`,
    rawData,
    {
      headers,
    }
  )
}

/**
 * Updates details of a specific OAuth application.
 *
 * @param {AxiosInstance} http - The Axios HTTP client instance.
 * @param {Object} params - The parameters for updating oauth application.
 * @param {string} params.userId - The unique user ID of the user.
 * @param {string} params.oauthApplicationId - The unique application ID of the OAuth application.
 * @returns {Promise<OAuthApplicationProps>} A Promise that resolves with the updated oauth application.
 * @example ```javascript
 * const contentful = require('contentful-management')
 *
 * const plainClient = contentful.createClient(
 *  {
 *    accessToken: '<content_management_api_key>'
 *  },
 *  { type: 'plain' }
 * )
 * plainClient.update(
 * {userId: 'TestUserId', oauthApplicationId: 'TestOAuthAppId'},
 * {name: 'Test-Name', description: 'Test-Desc', scope: ['content_management_manage'], redirectUri: 'https://redirect.uri.com', confidential: true}
 * )
 *  .then(oauthApplication => console.log(oauthApplication))
 *  .catch(console.error)
 * ```
 */
export const update: RestEndpoint<'OAuthApplication', 'update'> = (
  http: AxiosInstance,
  params: GetOAuthAppilicationParams,
  rawData: CreateOAuthApplicationProps,
  headers?: RawAxiosRequestHeaders
) => {
  return raw.put<OAuthApplicationProps>(
    http,
    `/users/${params.userId}/oauth_applications/${params.oauthApplicationId}`,
    rawData,
    {
      headers,
    }
  )
}

/**
 * Deletes a specific OAuth application.
 *
 * @param {AxiosInstance} http - The Axios HTTP client instance.
 * @param {Object} params - The parameters for deleting oauth application.
 * @param {string} params.userId - The unique user ID of the user.
 * @param {string} params.oauthApplicationId - The unique application ID of the OAuth application.
 * @returns {Promise<void>}
 * @example ```javascript
 * const contentful = require('contentful-management')
 *
 * const plainClient = contentful.createClient(
 *  {
 *    accessToken: '<content_management_api_key>'
 *  },
 *  { type: 'plain' }
 * )
 * plainClient.del({userId: 'TestUserId', oauthApplicationId: 'TestOAuthAppId'}) })
 *  .then(result => console.log(result.items))
 *  .catch(console.error)
 * ```
 */
export const del: RestEndpoint<'OAuthApplication', 'delete'> = (
  http: AxiosInstance,
  params: GetOAuthAppilicationParams
) => {
  return raw.del<void>(
    http,
    `/users/${params.userId}/oauth_applications/${params.oauthApplicationId}`
  )
}
