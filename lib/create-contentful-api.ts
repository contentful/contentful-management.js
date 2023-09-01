import { createRequestConfig } from 'contentful-sdk-core'
import {
  Collection,
  MakeRequest,
  PaginationQueryParams,
  QueryOptions,
  QueryParams,
  GetAppDefinitionParams,
  PaginationQueryOptions,
  CursorPaginatedCollection,
  GetEnvironmentTemplateParams,
} from './common-types'
import entities from './entities'
import { Organization, OrganizationProp } from './entities/organization'
import { CreatePersonalAccessTokenProps } from './entities/personal-access-token'
import { Space, SpaceProps } from './entities/space'
import { AppDefinition } from './entities/app-definition'
import { UsageQuery } from './entities/usage'
import { UserProps } from './entities/user'
import {
  CreateEnvironmentTemplateProps,
  EnvironmentTemplate,
  EnvironmentTemplateProps,
} from './entities/environment-template'
import { RawAxiosRequestConfig } from 'axios'

export type ClientAPI = ReturnType<typeof createClientApi>
type CreateSpaceProps = Omit<SpaceProps, 'sys'> & { defaultLocale?: string }

/**
 * @private
 */
export default function createClientApi(makeRequest: MakeRequest) {
  const { wrapSpace, wrapSpaceCollection } = entities.space
  const { wrapUser } = entities.user
  const { wrapPersonalAccessToken, wrapPersonalAccessTokenCollection } =
    entities.personalAccessToken
  const { wrapAccessToken, wrapAccessTokenCollection } = entities.accessToken
  const { wrapOrganization, wrapOrganizationCollection } = entities.organization
  const { wrapUsageCollection } = entities.usage
  const { wrapAppDefinition } = entities.appDefinition
  const { wrapEnvironmentTemplate, wrapEnvironmentTemplateCollection } =
    entities.environmentTemplate

  return {
    /**
     * Gets all environment templates for a given organization with the lasted version
     * @param organizationId - Organization ID
     * @return Promise for a collection of EnvironmentTemplates
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getEnvironmentTemplates('<organization_id>')
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getEnvironmentTemplates: function getEnvironmentTemplates(
      organizationId: string,
      query: PaginationQueryOptions = {}
    ): Promise<CursorPaginatedCollection<EnvironmentTemplate, EnvironmentTemplateProps>> {
      return makeRequest({
        entityType: 'EnvironmentTemplate',
        action: 'getMany',
        params: { organizationId, query: createRequestConfig({ query }).params },
      }).then((data) => wrapEnvironmentTemplateCollection(makeRequest, data, organizationId))
    },
    /**
     * Gets the lasted version environment template if params.version is not specified
     * @param params.organizationId - Organization ID
     * @param params.environmentTemplateId - Environment template ID
     * @param [params.version] - Template version number to return a specific version of the environment template
     * @return Promise for a EnvironmentTemplate
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getEnvironmentTemplate({
     *   organizationId: '<organization_id>',
     *   environmentTemplateId: '<environment_template_id>',
     *   version: version>
     * })
     * .then((space) => console.log(space))
     * .catch(console.error)
     * ```
     */
    getEnvironmentTemplate: function getEnvironmentTemplate({
      organizationId,
      environmentTemplateId,
      version,
    }: GetEnvironmentTemplateParams & {
      version?: number
    }): Promise<EnvironmentTemplate> {
      return makeRequest({
        entityType: 'EnvironmentTemplate',
        action: 'get',
        params: { organizationId, environmentTemplateId, version },
      }).then((data) => wrapEnvironmentTemplate(makeRequest, data, organizationId))
    },
    /**
     * Creates an environment template
     * @param organizationId - Organization ID
     * @param environmentTemplateData - Object representation of the environment template to be created
     * @return Promise for the newly created EnvironmentTemplate
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.createEnvironmentTemplate('<organization_id>', {<environment_template_date>})
     * .then((environmentTemplate) => console.log(environmentTemplate))
     * .catch(console.error)
     * ```
     */
    createEnvironmentTemplate: function createEnvironmentTemplate(
      organizationId: string,
      environmentTemplateData: CreateEnvironmentTemplateProps
    ): Promise<EnvironmentTemplate> {
      return makeRequest({
        entityType: 'EnvironmentTemplate',
        action: 'create',
        params: { organizationId },
        payload: environmentTemplateData,
      }).then((data) => wrapEnvironmentTemplate(makeRequest, data, organizationId))
    },
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
      spaceData: CreateSpaceProps,
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
    getOrganizations: function getOrganizations(
      query: PaginationQueryParams['query'] = {}
    ): Promise<Collection<Organization, OrganizationProp>> {
      return makeRequest({
        entityType: 'Organization',
        action: 'getMany',
        params: { query: createRequestConfig({ query }).params },
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
     * Gets App Definition
     * @return Promise for App Definition
     * @param organizationId - Id of the organization where the app is installed
     * @param appDefinitionId - Id of the app that will be returned
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getAppDefinition(<'org_id'>, <'app_id'>)
     * .then(appDefinition => console.log(appDefinition.name))
     * .catch(console.error)
     * ```
     */

    getAppDefinition: function getAppDefinition(
      params: GetAppDefinitionParams
    ): Promise<AppDefinition> {
      return makeRequest({
        entityType: 'AppDefinition',
        action: 'get',
        params,
      }).then((data) => wrapAppDefinition(makeRequest, data))
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
     * Gets a users access token
     * @param data - users access token config
     * @return Promise for a Token
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getAccessToken(tokenId)
     * .then(token => console.log(token.token))
     * .catch(console.error)
     * ```
     */
    getAccessToken: function getAccessToken(tokenId: string) {
      return makeRequest({
        entityType: 'AccessToken',
        action: 'get',
        params: { tokenId },
      }).then((data) => wrapAccessToken(makeRequest, data))
    },

    /**
     * Gets all user access tokens
     * @return Promise for a Token
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getAccessTokens()
     * .then(response => console.log(reponse.items))
     * .catch(console.error)
     * ```
     */
    getAccessTokens: function getAccessTokens() {
      return makeRequest({
        entityType: 'AccessToken',
        action: 'getMany',
        params: {},
      }).then((data) => wrapAccessTokenCollection(makeRequest, data))
    },

    /**
     * Gets all organization access tokens
     * @return Promise for a Token
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganizationAccessTokens()
     * .then(response => console.log(reponse.items))
     * .catch(console.error)
     * ```
     */
    getOrganizationAccessTokens: function getOrganizationAccessTokens(
      organizationId: string,
      query: QueryOptions = {}
    ) {
      return makeRequest({
        entityType: 'AccessToken',
        action: 'getManyForOrganization',
        params: { organizationId, query },
      }).then((data) => wrapAccessTokenCollection(makeRequest, data))
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
    rawRequest: function rawRequest({ url, ...config }: RawAxiosRequestConfig & { url: string }) {
      return makeRequest({
        entityType: 'Http',
        action: 'request',
        params: { url, config },
      })
    },
  }
}
