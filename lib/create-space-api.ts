/**
 * Contentful Space API. Contains methods to access any operations at a space
 * level, such as creating and reading entities contained in a space.
 */

import { AxiosInstance } from 'axios'
import { createRequestConfig } from 'contentful-sdk-core'
import errorHandler from './error-handler'
import entities from './entities'
import { CreateEnvironmentProps } from './entities/environment'
import { TeamSpaceMembershipProps } from './entities/team-space-membership'
import { SpaceMembershipProps } from './entities/space-membership'
import { RoleProps, CreateRoleProps } from './entities/role'
import { WebhookProps } from './entities/webhook'
import { QueryOptions, PaginationQueryOptions } from './common-types'
import { CreateApiKeyProps } from './entities/api-key'
import * as endpoints from './plain/endpoints'
import { SpaceProps } from './entities/space'
import { ScheduledActionQueryOptions, ScheduledActionProps } from './entities/scheduled-action'

function spaceMembershipDeprecationWarning() {
  console.warn(
    'The user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user)'
  )
}

export type ContentfulSpaceAPI = ReturnType<typeof createSpaceApi>

/**
 * Creates API object with methods to access the Space API
 * @param {object} params - API initialization params
 * @prop {object} http - HTTP client instance
 * @prop {object} entities - Object with wrapper methods for each kind of entity
 * @return {ContentfulSpaceAPI}
 */
export default function createSpaceApi({ http }: { http: AxiosInstance }) {
  const { wrapSpace } = entities.space
  const { wrapEnvironment, wrapEnvironmentCollection } = entities.environment
  const { wrapWebhook, wrapWebhookCollection } = entities.webhook
  const { wrapRole, wrapRoleCollection } = entities.role
  const { wrapUser, wrapUserCollection } = entities.user
  const { wrapSpaceMember, wrapSpaceMemberCollection } = entities.spaceMember
  const { wrapSpaceMembership, wrapSpaceMembershipCollection } = entities.spaceMembership
  const {
    wrapTeamSpaceMembership,
    wrapTeamSpaceMembershipCollection,
  } = entities.teamSpaceMembership
  const { wrapApiKey, wrapApiKeyCollection } = entities.apiKey
  const { wrapPreviewApiKey, wrapPreviewApiKeyCollection } = entities.previewApiKey
  const { wrapEnvironmentAlias, wrapEnvironmentAliasCollection } = entities.environmentAlias
  const { wrapScheduledAction, wrapScheduledActionCollection } = entities.scheduledAction

  return {
    /**
     * Deletes the space
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     *   .then((space) => space.delete())
     *   .then(() => console.log('Space deleted.'))
     *   .catch(console.error)
     * ```
     */
    delete: function deleteSpace() {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.space.del(http, { spaceId: raw.sys.id })
    },
    /**
     * Updates the space
     * @return Promise for the updated space.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => {
     *   space.name = 'New name'
     *   return space.update()
     * })
     * .then((space) => console.log(`Space ${space.sys.id} renamed.`)
     * .catch(console.error)
     * ```
     */
    update: function updateSpace() {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.space
        .update(http, { spaceId: raw.sys.id }, raw)
        .then((data) => wrapSpace(http, data))
    },
    /**
     * Gets an environment
     * @param id - Environment ID
     * @return Promise for an Environment
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environement_id>'))
     * .then((environment) => console.log(environment))
     * .catch(console.error)
     * ```
     */
    getEnvironment(environmentId: string) {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.environment
        .get(http, {
          spaceId: raw.sys.id,
          environmentId,
        })
        .then((data) => wrapEnvironment(http, data))
    },

    /**
     * Gets a collection of Environments
     * @return Promise for a collection of Environment
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironments())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getEnvironments(query: PaginationQueryOptions = {}) {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.environment
        .getMany(http, {
          spaceId: raw.sys.id,
          query,
        })
        .then((data) => wrapEnvironmentCollection(http, data))
    },

    /**
     * Creates an Environement
     * @param data - Object representation of the Environment to be created
     * @return Promise for the newly created Environment
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createEnvironment({ name: 'Staging' }))
     * .then((environment) => console.log(environment))
     * .catch(console.error)
     * ```
     */
    createEnvironment(data: CreateEnvironmentProps = {}) {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.environment
        .create(
          http,
          {
            spaceId: raw.sys.id,
          },
          data
        )
        .then((response) => wrapEnvironment(http, response))
    },

    /**
     * Creates an Environment with a custom ID
     * @param id - Environment ID
     * @param data - Object representation of the Environment to be created
     * @param sourceEnvironmentId - ID of the source environment that will be copied to create the new environment. Default is "master"
     * @return Promise for the newly created Environment
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createEnvironmentWithId('<environment-id>', { name: 'Staging'}, 'master'))
     * .then((environment) => console.log(environment))
     * .catch(console.error)
     * ```
     */
    createEnvironmentWithId(
      id: string,
      data: CreateEnvironmentProps,
      sourceEnvironmentId?: string
    ) {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.environment
        .createWithId(
          http,
          {
            spaceId: raw.sys.id,
            environmentId: id,
            sourceEnvironmentId,
          },
          data
        )
        .then((response) => wrapEnvironment(http, response))
    },

    /**
     * Gets a Webhook
     * @param id - Webhook ID
     * @return Promise for a Webhook
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getWebhook('<webhook_id>'))
     * .then((webhook) => console.log(webhook))
     * .catch(console.error)
     * ```
     */
    getWebhook(id: string) {
      return http
        .get('webhook_definitions/' + id)
        .then((response) => wrapWebhook(http, response.data), errorHandler)
    },

    /**
     * Gets a collection of Webhooks
     * @return Promise for a collection of Webhooks
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getWebhooks())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getWebhooks() {
      return http
        .get('webhook_definitions')
        .then((response) => wrapWebhookCollection(http, response.data), errorHandler)
    },

    /**
     * Creates a Webhook
     * @param data - Object representation of the Webhook to be created
     * @return Promise for the newly created Webhook
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createWebhook({
     *   'name': 'My webhook',
     *   'url': 'https://www.example.com/test',
     *   'topics': [
     *     'Entry.create',
     *     'ContentType.create',
     *     '*.publish',
     *     'Asset.*'
     *   ]
     * }))
     * .then((webhook) => console.log(webhook))
     * .catch(console.error)
     * ```
     */
    createWebhook(data: Omit<WebhookProps, 'sys'>) {
      return http
        .post('webhook_definitions', data)
        .then((response) => wrapWebhook(http, response.data), errorHandler)
    },

    /**
     * Creates a Webhook with a custom ID
     * @param id - Webhook ID
     * @param  data - Object representation of the Webhook to be created
     * @return Promise for the newly created Webhook
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createWebhookWithId('<webhook_id>', {
     *   'name': 'My webhook',
     *   'url': 'https://www.example.com/test',
     *   'topics': [
     *     'Entry.create',
     *     'ContentType.create',
     *     '*.publish',
     *     'Asset.*'
     *   ]
     * }))
     * .then((webhook) => console.log(webhook))
     * .catch(console.error)
     * ```
     */
    createWebhookWithId(id: string, data: Omit<WebhookProps, 'sys'>) {
      return http
        .put('webhook_definitions/' + id, data)
        .then((response) => wrapWebhook(http, response.data), errorHandler)
    },
    /**
     * Gets a Role
     * @param id - Role ID
     * @return Promise for a Role
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createRole({
     *   fields: {
     *     title: {
     *       'en-US': 'Role title'
     *     }
     *   }
     * }))
     * .then((role) => console.log(role))
     * .catch(console.error)
     * ```
     */
    getRole(id: string) {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.role
        .get(http, { spaceId: raw.sys.id, roleId: id })
        .then((data) => wrapRole(http, data))
    },
    /**
     * Gets a collection of Roles
     * @return Promise for a collection of Roles
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getRoles())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getRoles() {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.role.getMany(http, { spaceId: raw.sys.id }).then((data) => {
        return wrapRoleCollection(http, data)
      })
    },

    /**
     * Creates a Role
     * @param data - Object representation of the Role to be created
     * @return  Promise for the newly created Role
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getSpace('<space_id>')
     * .then((space) => space.createRole({
     *   name: 'My Role',
     *   description: 'foobar role',
     *   permissions: {
     *     ContentDelivery: 'all',
     *     ContentModel: ['read'],
     *     Settings: []
     *   },
     *   policies: [
     *     {
     *       effect: 'allow',
     *       actions: 'all',
     *       constraint: {
     *         and: [
     *           {
     *             equals: [
     *               { doc: 'sys.type' },
     *               'Entry'
     *             ]
     *           },
     *           {
     *             equals: [
     *               { doc: 'sys.type' },
     *               'Asset'
     *             ]
     *           }
     *         ]
     *       }
     *     }
     *   ]
     * }))
     * .then((role) => console.log(role))
     * .catch(console.error)
     * ```
     */
    createRole(data: CreateRoleProps) {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.role
        .create(http, { spaceId: raw.sys.id }, data)
        .then((data) => wrapRole(http, data))
    },
    /**
     * Creates a Role with a custom ID
     * @param id - Role ID
     * @param data - Object representation of the Role to be created
     * @return Promise for the newly created Role
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getSpace('<space_id>')
     * .then((space) => space.createRoleWithId('<role-id>', {
     *   name: 'My Role',
     *   description: 'foobar role',
     *   permissions: {
     *     ContentDelivery: 'all',
     *     ContentModel: ['read'],
     *     Settings: []
     *   },
     *   policies: [
     *     {
     *       effect: 'allow',
     *       actions: 'all',
     *       constraint: {
     *         and: [
     *           {
     *             equals: [
     *               { doc: 'sys.type' },
     *               'Entry'
     *             ]
     *           },
     *           {
     *             equals: [
     *               { doc: 'sys.type' },
     *               'Asset'
     *             ]
     *           }
     *         ]
     *       }
     *     }
     *   ]
     * }))
     * .then((role) => console.log(role))
     * .catch(console.error)
     * ```
     */
    createRoleWithId(id: string, roleData: Omit<RoleProps, 'sys'>) {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.role
        .createWithId(http, { spaceId: raw.sys.id, roleId: id }, roleData)
        .then((data) => wrapRole(http, data))
    },
    /**
     * Gets a User
     * @param userId - User ID
     * @return Promise for a User
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceUser('id'))
     * .then((user) => console.log(user))
     * .catch(console.error)
     * ```
     */
    getSpaceUser(userId: string) {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.user
        .getForSpace(http, {
          spaceId: raw.sys.id,
          userId,
        })
        .then((data) => wrapUser(http, data))
    },
    /**
     * Gets a collection of Users in a space
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise a collection of Users in a space
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceUsers(query))
     * .then((data) => console.log(data))
     * .catch(console.error)
     * ```
     */
    getSpaceUsers(query: QueryOptions = {}) {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.user
        .getManyForSpace(http, {
          spaceId: raw.sys.id,
          query: createRequestConfig({ query }).params,
        })
        .then((data) => wrapUserCollection(http, data))
    },
    /**
     * Gets a Space Member
     * @param id Get Space Member by user_id
     * @return Promise for a Space Member
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMember(id))
     * .then((spaceMember) => console.log(spaceMember))
     * .catch(console.error)
     * ```
     */
    getSpaceMember(id: string) {
      return http
        .get('space_members/' + id)
        .then((response) => wrapSpaceMember(http, response.data), errorHandler)
    },
    /**
     * Gets a collection of Space Members
     * @param query
     * @return Promise for a collection of Space Members
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMembers({'limit': 100}))
     * .then((spaceMemberCollection) => console.log(spaceMemberCollection))
     * .catch(console.error)
     * ```
     */
    getSpaceMembers(query: QueryOptions = {}) {
      return http
        .get('space_members', createRequestConfig({ query: query }))
        .then((response) => wrapSpaceMemberCollection(http, response.data), errorHandler)
    },
    /**
     * Gets a Space Membership
     * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
     * @param id - Space Membership ID
     * @return Promise for a Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMembership('id'))
     * .then((spaceMembership) => console.log(spaceMembership))
     * .catch(console.error)
     * ```
     */
    getSpaceMembership(id: string) {
      spaceMembershipDeprecationWarning()
      return http
        .get('space_memberships/' + id)
        .then((response) => wrapSpaceMembership(http, response.data), errorHandler)
    },
    /**
     * Gets a collection of Space Memberships
     * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Space Memberships
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMemberships({'limit': 100})) // you can add more queries as 'key': 'value'
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getSpaceMemberships(query: QueryOptions = {}) {
      spaceMembershipDeprecationWarning()
      return http
        .get('space_memberships', createRequestConfig({ query: query }))
        .then((response) => wrapSpaceMembershipCollection(http, response.data), errorHandler)
    },

    /**
     * Creates a Space Membership
     * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
     * @param  data - Object representation of the Space Membership to be created
     * @return Promise for the newly created Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createSpaceMembership({
     *   admin: false,
     *   roles: [
     *     {
     *       type: 'Link',
     *       linkType: 'Role',
     *       id: '<role_id>'
     *     }
     *   ],
     *   email: 'foo@example.com'
     * }))
     * .then((spaceMembership) => console.log(spaceMembership))
     * .catch(console.error)
     * ```
     */
    createSpaceMembership(data: Omit<SpaceMembershipProps, 'sys'>) {
      spaceMembershipDeprecationWarning()
      return http
        .post('space_memberships', data)
        .then((response) => wrapSpaceMembership(http, response.data), errorHandler)
    },
    /**
     * Creates a Space Membership with a custom ID
     * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
     * @param id - Space Membership ID
     * @param data - Object representation of the Space Membership to be created
     * @return Promise for the newly created Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createSpaceMembershipWithId('<space-membership-id>', {
     *   admin: false,
     *   roles: [
     *     {
     *       type: 'Link',
     *       linkType: 'Role',
     *       id: '<role_id>'
     *     }
     *   ],
     *   email: 'foo@example.com'
     * }))
     * .then((spaceMembership) => console.log(spaceMembership))
     * .catch(console.error)
     * ```
     */
    createSpaceMembershipWithId(id: string, data: Omit<SpaceMembershipProps, 'sys'>) {
      spaceMembershipDeprecationWarning()
      return http
        .put('space_memberships/' + id, data)
        .then((response) => wrapSpaceMembership(http, response.data), errorHandler)
    },

    /**
     * Gets a Team Space Membership
     * @param id - Team Space Membership ID
     * @return Promise for a Team Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getTeamSpaceMembership('team_space_membership_id'))
     * .then((teamSpaceMembership) => console.log(teamSpaceMembership))
     * .catch(console.error)
     * ```
     */
    getTeamSpaceMembership(teamSpaceMembershipId: string) {
      return http
        .get('team_space_memberships/' + teamSpaceMembershipId)
        .then((response) => wrapTeamSpaceMembership(http, response.data), errorHandler)
    },

    /**
     * Gets a collection of Team Space Memberships
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Team Space Memberships
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getTeamSpaceMemberships())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getTeamSpaceMemberships(query: QueryOptions = {}) {
      return http
        .get('team_space_memberships', createRequestConfig({ query: query }))
        .then((response) => wrapTeamSpaceMembershipCollection(http, response.data), errorHandler)
    },
    /**
   * Creates a Team Space Membership
   * @param id - Team ID
   * @param data - Object representation of the Team Space Membership to be created
   * @return Promise for the newly created Team Space Membership
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createTeamSpaceMembership('team_id', {
   *   admin: false,
   *   roles: [
   *    {
          sys: {
   *       type: 'Link',
   *       linkType: 'Role',
   *       id: '<role_id>'
   *      }
   *    }
   *   ],
   * }))
   * .then((teamSpaceMembership) => console.log(teamSpaceMembership))
   * .catch(console.error)
   * ```
   */
    createTeamSpaceMembership(teamId: string, data: Omit<TeamSpaceMembershipProps, 'sys'>) {
      return http
        .post('team_space_memberships', data, {
          headers: {
            'x-contentful-team': teamId,
          },
        })
        .then((response) => wrapTeamSpaceMembership(http, response.data), errorHandler)
    },
    /**
     * Gets a Api Key
     * @param id - API Key ID
     * @return  Promise for a Api Key
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getApiKey('<apikey-id>'))
     * .then((apikey) => console.log(apikey))
     * .catch(console.error)
     * ```
     */
    getApiKey(id: string) {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.apiKey
        .get(http, {
          spaceId: raw.sys.id,
          apiKeyId: id,
        })
        .then((data) => wrapApiKey(http, data))
    },
    /**
     * Gets a collection of Api Keys
     * @return Promise for a collection of Api Keys
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getApiKeys())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getApiKeys() {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.apiKey
        .getMany(http, {
          spaceId: raw.sys.id,
        })
        .then((data) => wrapApiKeyCollection(http, data))
    },
    /**
     * Gets a collection of preview Api Keys
     * @return Promise for a collection of Preview Api Keys
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getPreviewApiKeys())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getPreviewApiKeys() {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.previewApiKey
        .getMany(http, {
          spaceId: raw.sys.id,
        })
        .then((data) => wrapPreviewApiKeyCollection(http, data))
    },
    /**
     * Gets a preview Api Key
     * @param id - Preview API Key ID
     * @return  Promise for a Preview Api Key
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getPreviewApiKey('<preview-apikey-id>'))
     * .then((previewApikey) => console.log(previewApikey))
     * .catch(console.error)
     * ```
     */
    getPreviewApiKey(id: string) {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.previewApiKey
        .get(http, {
          spaceId: raw.sys.id,
          previewApiKeyId: id,
        })
        .then((data) => wrapPreviewApiKey(http, data))
    },
    /**
     * Creates a Api Key
     * @param payload - Object representation of the Api Key to be created
     * @return Promise for the newly created Api Key
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createApiKey({
     *   name: 'API Key name',
     *   environments:[
     *    {
     *     sys: {
     *      type: 'Link'
     *      linkType: 'Environment',
     *      id:'<environment_id>'
     *     }
     *    }
     *   ]
     *   }
     * }))
     * .then((apiKey) => console.log(apiKey))
     * .catch(console.error)
     * ```
     */
    createApiKey: function createApiKey(payload: CreateApiKeyProps) {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.apiKey
        .create(http, { spaceId: raw.sys.id }, payload)
        .then((data) => wrapApiKey(http, data))
    },
    /**
     * Creates a Api Key with a custom ID
     * @param id - Api Key ID
     * @param payload - Object representation of the Api Key to be created
     * @return Promise for the newly created Api Key
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createApiKeyWithId('<api-key-id>', {
     *   name: 'API Key name'
     *   environments:[
     *    {
     *     sys: {
     *      type: 'Link'
     *      linkType: 'Environment',
     *      id:'<environment_id>'
     *     }
     *    }
     *   ]
     *   }
     * }))
     * .then((apiKey) => console.log(apiKey))
     * .catch(console.error)
     * ```
     */
    createApiKeyWithId(id: string, payload: CreateApiKeyProps) {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.apiKey
        .createWithId(http, { spaceId: raw.sys.id, apiKeyId: id }, payload)
        .then((data) => wrapApiKey(http, data))
    },

    /**
     * Gets an Environment Alias
     * @param Environment Alias ID
     * @return Promise for an Environment Alias
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironmentAlias('<alias-id>'))
     * .then((alias) => console.log(alias))
     * .catch(console.error)
     * ```
     */
    getEnvironmentAlias(id: string) {
      return http
        .get('environment_aliases/' + id)
        .then((response) => wrapEnvironmentAlias(http, response.data), errorHandler)
    },
    /**
     * Gets a collection of Environment Aliases
     * @return Promise for a collection of Environment Aliases
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironmentAliases()
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getEnvironmentAliases() {
      return http
        .get('environment_aliases')
        .then((response) => wrapEnvironmentAliasCollection(http, response.data), errorHandler)
    },

    /**
     * Query for scheduled actions in space.
     * @param query - Object with search parameters. The enviroment id field is mandatory. Check the <a href="https://www.contentful.com/developers/docs/references/content-management-api/#/reference/scheduled-actions/scheduled-actions-collection">REST API reference</a> for more details.
     * @return Promise for the scheduled actions query
     */
    getScheduledActions(query: ScheduledActionQueryOptions) {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.scheduledAction
        .query(http, { spaceId: raw.sys.id, query })
        .then((response) => wrapScheduledActionCollection(http, response))
    },
    /**
     * Creates a scheduled action
     * @param data - Object representation of the scheduled action to be created
     * @return Promise for the newly created scheduled actions
     */
    createScheduledAction(data: Omit<ScheduledActionProps, 'sys'>) {
      const raw = this.toPlainObject() as SpaceProps
      return endpoints.scheduledAction
        .create(http, { spaceId: raw.sys.id }, data)
        .then((response) => wrapScheduledAction(http, response))
    },
  }
}
