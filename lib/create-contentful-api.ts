import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { createRequestConfig } from 'contentful-sdk-core'
import errorHandler from './error-handler'
import entities from './entities'
import { Collection, QueryOptions } from './common-types'
import { OrganizationProp, Organization } from './entities/organization'
import { SpaceProps, Space } from './entities/space'
import { CreatePersonalAccessTokenProps } from './entities/personal-access-token'
import { UsageQuery } from './entities/usage'
import * as endpoints from './plain/endpoints'

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
      return endpoints.space
        .getMany(http, {
          query: createRequestConfig({ query: query }).params,
        })
        .then((data) => wrapSpaceCollection(http, data))
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
      return endpoints.space.get(http, { spaceId }).then((data) => wrapSpace(http, data))
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
      return endpoints.space.create(http, { organizationId }, spaceData).then((data) => {
        return wrapSpace(http, data)
      })
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
      return endpoints.organization.get(http, { organizationId: id }).then((data) => {
        return wrapOrganization(http, data)
      })
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
      return endpoints.organization
        .getAll(http)
        .then((data) => wrapOrganizationCollection(http, data))
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
      return endpoints.user.getCurrent(http).then((data) => wrapUser(http, data))
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
      return endpoints.personalAccessToken
        .create(http, data)
        .then((response) => wrapPersonalAccessToken(http, response))
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
      return endpoints.personalAccessToken
        .get(http, { tokenId })
        .then((data) => wrapPersonalAccessToken(http, data))
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
      return endpoints.personalAccessToken
        .getMany(http, {})
        .then((data) => wrapPersonalAccessTokenCollection(http, data))
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
      return endpoints.usage
        .getManyForOrganization(http, { organizationId, query })
        .then((data) => wrapUsageCollection(http, data))
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
      return endpoints.usage
        .getManyForSpace(http, {
          organizationId,
          query,
        })
        .then((data) => wrapUsageCollection(http, data))
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
