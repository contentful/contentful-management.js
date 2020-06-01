/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 * @packageDocumentation
 */

import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ClientParams } from './generated/create-cma-http-client'
import { User } from './generated/entities/user'
import { PersonalAccessToken, PersonalAccessTokenProp } from './personalAccessToken'
import { Space, SpaceProps } from './space'
import { Collection } from './generated/common-types'
import { Organization } from './organization'
import { UsageMetricEnum, Usage, UsageQuery } from './generated/entities/usage'

export { ClientParams } from './generated/create-cma-http-client'

export as namespace contentfulManagementStatic

/**
 * Create a client instance
 *
 * ```javascript
 * const client = contentfulManagement.createClient({
 *  accessToken: 'myAccessToken'
 * })
 * ```
 */
declare function createClient(params: ClientParams): ClientAPI

export interface ClientAPI {
  /**
   * Creates a personal access token
   * @param data - personal access token config
   * @return Promise for a Token
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.createPersonalAccessToken(
   *  {
   *    "name": "My Token",
   *    "scope": [
   *      "content_management_manage"
   *    ]
   *  }
   * )
   * .then(personalAccessToken => console.log(personalAccessToken.token))
   * .catch(console.error)
   * ```
   */
  createPersonalAccessToken(data: PersonalAccessTokenProp): Promise<PersonalAccessToken>
  /**
   * Creates a space
   * @param data - Object representation of the Space to be created
   * @param organizationId - Organization ID, if the associated token can manage more than one organization.
   * @return Promise for the newly created Space
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.createSpace({
   *   name: 'Name of new space'
   * })
   * .then((space) => console.log(space))
   * .catch(console.error)
   * ```
   */
  createSpace(data: SpaceProps, organizationId: string): Promise<Space>
  /**
   * Gets the authenticated user
   * @return Promise for a User
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getCurrentUser()
   * .then(user => console.log(user.firstName))
   * .catch(console.error)
   * ```
   */
  getCurrentUser(): Promise<User>
  /**
   * Gets an organization
   * @param  id - Organization ID
   * @return Promise for a Organization
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getOrganization('<org_id>')
   * .then((org) => console.log(org))
   * .catch(console.error)
   * ```
   */
  getOrganization(id: string): Promise<Organization>
  /**
   * Gets a collection of Organizations
   * @return Promise for a collection of Organizations
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getOrganizations()
   * .then(result => console.log(result.items))
   * .catch(console.error)
   * ```
   */
  getOrganizations(): Promise<Collection<Organization>>
  /**
   * Gets a personal access token
   * @param data - personal access token config
   * @return Promise for a Token
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getPersonalAccessToken(tokenId)
   * .then(token => console.log(token.token))
   * .catch(console.error)
   * ```
   */
  getPersonalAccessToken(data: PersonalAccessTokenProp): Promise<void>
  /**
   * Gets all personal access tokens
   * @return Promise for a Token
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getPersonalAccessTokens()
   * .then(response => console.log(reponse.items))
   * .catch(console.error)
   * ```
   */
  getPersonalAccessTokens(): Promise<Collection<PersonalAccessToken>>
  /**
   * Gets a space
   * @param id - Space ID
   * @return Promise for a Space
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => console.log(space))
   * .catch(console.error)
   * ```
   */
  getSpace(id: string): Promise<Space>
  /**
   * Gets all spaces
   * @return Promise for a collection of Spaces
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpaces()
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   * ```
   */
  getSpaces(params?: { limit?: number; skip?: number }): Promise<Collection<Space>>
  /**
   * Get organization usage grouped by {@link UsageMetricEnum metric}
   *
   * @param organizationId - Id of an organization
   * @param query - Query parameters
   * @return Promise of a collection of usages
   * @example ```javascript
   *
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getOrganizationUsage('<organizationId>', {
   *    'metric[in]': 'cma,gql',
   *    'dateRange.startAt': '2019-10-22',
   *    'dateRange.endAt': '2019-11-10'
   *    }
   * })
   * .then(result => console.log(result.items))
   * .catch(console.error)
   * ```
   */
  getOrganizationUsage(
    organizationId: string,
    query: UsageQuery
  ): Promise<Collection<Usage>>
  /**
   * Get organization usage grouped by space and metric
   *
   * @param organizationId - Id of an organization
   * @param query - Query parameters
   * @return Promise of a collection of usages
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpaceUsage('<organizationId>', {
   *    skip: 0,
   *    limit: 10,
   *    'metric[in]': 'cda,cpa,gql',
   *    'dateRange.startAt': '2019-10-22',
   *    'dateRange.endAt': '2020-11-30'
   *    }
   * })
   * .then(result => console.log(result.items))
   * .catch(console.error)
   * ```
   */
  getSpaceUsage(organizationId: string, query: UsageQuery): Promise<Collection<Usage>>
  /**
   * Make a custom request to the Contentful management API's /spaces endpoint
   * @param opts - axios request options (https://github.com/mzabriskie/axios)
   * @return Promise for the response data
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.rawRequest({
   *   method: 'GET',
   *   url: '/custom/path'
   * })
   * .then((responseData) => console.log(responseData))
   * .catch(console.error)
   * ```
   */
  rawRequest(Opts: AxiosRequestConfig): Promise<AxiosResponse>
}
