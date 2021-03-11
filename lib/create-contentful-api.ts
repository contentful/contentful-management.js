import { AxiosRequestConfig } from 'axios'
import { createRequestConfig } from 'contentful-sdk-core'
import { Collection, MakeRequest, QueryOptions, QueryParams } from './common-types'
import entities from './entities'
import { Organization, OrganizationProp } from './entities/organization'
import { CreatePersonalAccessTokenProps } from './entities/personal-access-token'
import { Space, SpaceProps } from './entities/space'
import { UsageQuery } from './entities/usage'
import { UserProps } from './entities/user'
import errorHandler from './error-handler'

export type ClientAPI = ReturnType<typeof createClientApi>

export default function createClientApi(makeRequest: MakeRequest) {
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
      return makeRequest({
        entityType: 'Space',
        action: 'getMany',
        params: { query: createRequestConfig({ query: query }).params },
      }).then((data) => wrapSpaceCollection(makeRequest, data))
    },

    /**
     * Gets a space
     * @param spaceId - Space ID
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
    getSpace: function getSpace(spaceId: string): Promise<Space> {
      return makeRequest({
        entityType: 'Space',
        action: 'get',
        params: { spaceId },
      }).then((data) => wrapSpace(makeRequest, data))
    },

    /**
     * Creates a space
     * @param spaceData - Object representation of the Space to be created
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
      spaceData: Omit<SpaceProps, 'sys'>,
      organizationId: string
    ): Promise<Space> {
      return makeRequest({
        entityType: 'Space',
        action: 'create',
        params: { organizationId },
        payload: spaceData,
      }).then((data) => wrapSpace(makeRequest, data))
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
      return makeRequest({
        entityType: 'Organization',
        action: 'get',
        params: { organizationId: id },
      }).then((data) => wrapOrganization(makeRequest, data))
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
      return makeRequest({
        entityType: 'Organization',
        action: 'getMany',
      }).then((data) => wrapOrganizationCollection(makeRequest, data))
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
    getCurrentUser: function getCurrentUser<T = UserProps>(params?: QueryParams): Promise<T> {
      return makeRequest({
        entityType: 'User',
        action: 'getCurrent',
        params,
      }).then((data) => wrapUser<T>(makeRequest, data))
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
      data: CreatePersonalAccessTokenProps
    ) {
      return makeRequest({
        entityType: 'PersonalAccessToken',
        action: 'create',
        params: {},
        payload: data,
      }).then((response) => wrapPersonalAccessToken(makeRequest, response))
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
      return makeRequest({
        entityType: 'PersonalAccessToken',
        action: 'get',
        params: { tokenId },
      }).then((data) => wrapPersonalAccessToken(makeRequest, data))
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
      return makeRequest({
        entityType: 'PersonalAccessToken',
        action: 'getMany',
        params: {},
      }).then((data) => wrapPersonalAccessTokenCollection(makeRequest, data))
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
      return makeRequest({
        entityType: 'Usage',
        action: 'getManyForOrganization',
        params: { organizationId, query },
      }).then((data) => wrapUsageCollection(makeRequest, data))
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
      return makeRequest({
        entityType: 'Usage',
        action: 'getManyForSpace',
        params: {
          organizationId,
          query,
        },
      }).then((data) => wrapUsageCollection(makeRequest, data))
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
    rawRequest: function rawRequest(opts: AxiosRequestConfig & { url: string }) {
      return makeRequest({
        entityType: 'Http',
        action: 'request',
        params: { url: opts.url, config: opts },
      }).then((response) => response.data, errorHandler)
    },
  }
}
