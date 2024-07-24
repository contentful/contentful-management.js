import { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import { CollectionProp, GetOrganizationParams, QueryParams } from '../../../common-types'
import { CreatePersonalAccessTokenProps, AccessTokenProps } from '../../../entities/access-token'
import { RestEndpoint } from '../types'
import * as raw from './raw'

/**
 * Retrieves an access token by its unique token ID for the currently authenticated user.
 *
 * @param {AxiosInstance} http - An Axios HTTP client instance.
 * @param {Object} params - Parameters for the request.
 * @param {string} params.tokenId - The unique token ID of the access token to retrieve.
 * @returns {Promise<AccessTokenProps>} A Promise that resolves with the retrieved access token information.
 * @example ```javascript
 * const contentful = require('contentful-management')
 *
 * const plainClient = contentful.createClient(
 *  {
 *   accessToken: '<content_management_api_key>'
 *  },
 *  { type: 'plain' }
 * )
 * plainClient.get({tokenId: 'TestTokenTd'})
 *  .then(token => console.log(token))
 *  .catch(console.error)
 * ```
 */
export const get: RestEndpoint<'AccessToken', 'get'> = (
  http: AxiosInstance,
  params: { tokenId: string }
) => {
  return raw.get<AccessTokenProps>(http, `/users/me/access_tokens/${params.tokenId}`)
}

/**
 * Retrieves multiple access tokens associated with the currently authenticated user.
 *
 * @param {AxiosInstance} http - An Axios HTTP client instance.
 * @param {QueryParams} params - Query parameters to filter and customize the request.
 * @returns {Promise<CollectionProp<AccessTokenProps>>} A Promise that resolves with a collection of access token properties.
 * @example ```javascript
 * const contentful = require('contentful-management')
 *
 * const plainClient = contentful.createClient(
 *  {
 *    accessToken: '<content_management_api_key>'
 *  },
 *  { type: 'plain' }
 * )
 * plainClient.getMany()
 *  .then(result => console.log(result.items))
 *  .catch(console.error)
 * ```
 */
export const getMany: RestEndpoint<'AccessToken', 'getMany'> = (
  http: AxiosInstance,
  params: QueryParams
) => {
  return raw.get<CollectionProp<AccessTokenProps>>(http, '/users/me/access_tokens', {
    params: params.query,
  })
}

/**
 * Creates a personal access token for the currently authenticated user.
 *
 * @param {AxiosInstance} http - Axios instance for making the HTTP request.
 * @param {Object} _params - Unused parameters (can be an empty object).
 * @param {CreatePersonalAccessTokenProps} rawData - Data for creating the personal access token.
 * @param {RawAxiosRequestHeaders} [headers] - Optional HTTP headers for the request.
 * @returns {Promise<AccessTokenProps>} A Promise that resolves with the created personal access token.
 * @example ```javascript
 * const contentful = require('contentful-management')
 *
 * const plainClient = contentful.createClient(
 *  {
 *    accessToken: '<content_management_api_key>',
 *  },
 *  { type: 'plain' }
 * )
 * plainClient.createPersonalAccessToken({name: 'Test-Name', scope: ['content_management_manage'], expiresIn: 777596.92})
 *  .then(token => console.log(token))
 *  .catch(console.error)
 * ```
 */
export const createPersonalAccessToken: RestEndpoint<'AccessToken', 'createPersonalAccessToken'> = (
  http: AxiosInstance,
  _params: {},
  rawData: CreatePersonalAccessTokenProps,
  headers?: RawAxiosRequestHeaders
) => {
  return raw.post<AccessTokenProps>(http, '/users/me/access_tokens', rawData, {
    headers,
  })
}

/**
 * Revokes an access token associated with the currently authenticated user.
 *
 * @param {AxiosInstance} http - The Axios HTTP client instance.
 * @param {Object} params - The parameters for revoking the access token.
 * @param {string} params.tokenId - The unique identifier of the access token to revoke.
 * @returns {Promise<AccessTokenProps>} A Promise that resolves with the updated access token information after revocation.
 * @example ```javascript
 * const contentful = require('contentful-management')
 *
 * const plainClient = contentful.createClient(
 *  {
 *    accessToken: '<content_management_api_key>'
 *  },
 *  { type: 'plain' }
 * )
 * plainClient.revoke({tokenId: 'TestTokenTd'})
 *  .then(token => console.log(token))
 *  .catch(console.error)
 * ```
 */
export const revoke: RestEndpoint<'AccessToken', 'revoke'> = (
  http: AxiosInstance,
  params: { tokenId: string }
) => {
  return raw.put<AccessTokenProps>(http, `/users/me/access_tokens/${params.tokenId}/revoked`, null)
}

/**
 * Retrieves a list of redacted versions of access tokens for an organization, accessible to owners or administrators of an organization.
 *
 * @param {AxiosInstance} http - The Axios HTTP client instance.
 * @param {GetOrganizationParams & QueryParams} params - Parameters for the request, including organization ID and query parameters.
 * @param {string} params.organizationId - The unique identifier of the organization.
 * @returns {Promise<CollectionProp<AccessTokenProps>>} A promise that resolves to a collection of access tokens.
 * @example ```javascript
 * const contentful = require('contentful-management')
 *
 * const plainClient = contentful.createClient(
 *  {
 *    accessToken: '<content_management_api_key>'
 *  },
 *  { type: 'plain' }
 * )
 * plainClient.getManyForOrganization({organizationId: 'OrgId'})
 *  .then(result => console.log(result.items))
 *  .catch(console.error)
 * ```
 */
export const getManyForOrganization: RestEndpoint<'AccessToken', 'getManyForOrganization'> = (
  http: AxiosInstance,
  params: GetOrganizationParams & QueryParams
) => {
  return raw.get<CollectionProp<AccessTokenProps>>(
    http,
    `/organizations/${params.organizationId}/access_tokens`,
    {
      params: params.query,
    }
  )
}
