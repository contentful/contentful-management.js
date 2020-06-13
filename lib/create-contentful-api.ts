import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { createRequestConfig } from 'contentful-sdk-core'
import errorHandler from './error-handler'
import entities from './entities'
import { CollectionProp, Collection, QueryOptions } from './common-types'
import { OrganizationProp, Organization } from './entities/organization'
import { SpaceProps, Space } from './entities/space'
import { PersonalAccessTokenProp } from './entities/personal-access-token'
import { UsageQuery, UsageProps } from './entities/usage'

export type ClientAPI = ReturnType<typeof createClientApi>

export default function createClientApi({ http }: { http: AxiosInstance }) {
  const { wrapSpace, wrapSpaceCollection } = entities.space
  const { wrapUser } = entities.user
  const {
    wrapPersonalAccessToken,
    wrapPersonalAccessTokenCollection,
  } = entities.personalAccessToken
  const { wrapOrganization, wrapOrganizationCollection } = entities.organization
  const { wrapUsageCollection } = entities.usage

  return {
    /**
     * Gets all spaces
     * @return Promise for a collection of Spaces
     * ```javascript
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
    getSpaces: function getSpaces(
      query: QueryOptions = {}
    ): Promise<Collection<Space, SpaceProps>> {
      return http
        .get('', createRequestConfig({ query: query }))
        .then((response) => wrapSpaceCollection(http, response.data), errorHandler)
    },
    /**
     * Gets a space
     * @param id - Space ID
     * @return Promise for a Space
     * ```javascript
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
    getSpace: function getSpace(id: string): Promise<Space> {
      return http.get(id).then((response) => wrapSpace(http, response.data), errorHandler)
    },
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
    createSpace: function createSpace(
      data: Omit<SpaceProps, 'sys'>,
      organizationId: string
    ): Promise<Space> {
      return http
        .post('', data, {
          headers: organizationId ? { 'X-Contentful-Organization': organizationId } : {},
        })
        .then((response) => wrapSpace(http, response.data), errorHandler)
    },
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
    getOrganization: function getOrganization(id: string): Promise<Organization> {
      const baseURL = http.defaults?.baseURL?.replace('/spaces/', '/organizations/')
      return http
        .get<CollectionProp<OrganizationProp>>('', { baseURL })
        .then((response) => {
          const org = response.data.items.find((org) => org.sys.id === id)
          if (!org) {
            const error = new Error(
              `No organization was found with the ID ${id} instead got ${JSON.stringify(response)}`
            )
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            error.status = 404
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            error.statusText = 'Not Found'
            return Promise.reject(error)
          }
          return wrapOrganization(http, org)
        }, errorHandler)
    },
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
    getOrganizations: function getOrganizations(): Promise<
      Collection<Organization, OrganizationProp>
    > {
      const baseURL = http.defaults?.baseURL?.replace('/spaces/', '/organizations/')
      return http
        .get('', { baseURL })
        .then((response) => wrapOrganizationCollection(http, response.data), errorHandler)
    },
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
    getCurrentUser: function getCurrentUser() {
      const baseURL = http.defaults?.baseURL?.replace('/spaces/', '/users/me/')
      return http
        .get('', {
          baseURL,
        })
        .then((response) => wrapUser(http, response.data), errorHandler)
    },
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
    createPersonalAccessToken: function createPersonalAccessToken(
      data: Omit<PersonalAccessTokenProp, 'sys'>
    ) {
      const baseURL = http.defaults?.baseURL?.replace('/spaces/', '/users/me/access_tokens')
      return http
        .post('', data, {
          baseURL,
        })
        .then((response) => wrapPersonalAccessToken(http, response.data), errorHandler)
    },
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
    getPersonalAccessToken: function getPersonalAccessToken(tokenId: string) {
      const baseURL = http.defaults?.baseURL?.replace('/spaces/', '/users/me/access_tokens')
      return http
        .get(tokenId, {
          baseURL,
        })
        .then((response) => wrapPersonalAccessToken(http, response.data), errorHandler)
    },
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
    getPersonalAccessTokens: function getPersonalAccessTokens() {
      const baseURL = http.defaults?.baseURL?.replace('/spaces/', '/users/me/access_tokens')
      return http
        .get('', {
          baseURL,
        })
        .then((response) => wrapPersonalAccessTokenCollection(http, response.data), errorHandler)
    },
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
    getOrganizationUsage: function getOrganizationUsage(
      organizationId: string,
      query: QueryOptions = {}
    ) {
      const baseURL = http.defaults?.baseURL?.replace(
        '/spaces/',
        `/organizations/${organizationId}/organization_periodic_usages`
      )
      return http
        .get('', { baseURL, params: query })
        .then((response) => wrapUsageCollection(http, response.data), errorHandler)
    },
    /**
     * Get organization usage grouped by space and metric
     *
     * @param organizationId - Id of an organization
     * @param query - Query parameters
     * @return Promise of a collection of usages
     * ```javascript
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
    getSpaceUsage: function getSpaceUsage(organizationId: string, query: UsageQuery = {}) {
      const baseURL = http.defaults?.baseURL?.replace(
        '/spaces/',
        `/organizations/${organizationId}/space_periodic_usages`
      )
      return http
        .get<CollectionProp<UsageProps>>('', { baseURL, params: query })
        .then((response) => wrapUsageCollection(http, response.data), errorHandler)
    },
    /**
     * Make a custom request to the Contentful management API's /spaces endpoint
     * @param opts - axios request options (https://github.com/mzabriskie/axios)
     * @return Promise for the response data
     * ```javascript
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
    rawRequest: function rawRequest(opts: AxiosRequestConfig) {
      return http(opts).then((response) => response.data, errorHandler)
    },
  }
}
