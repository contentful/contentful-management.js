/**
 * Contentful Space API. Contains methods to access any operations at a space
 * level, such as creating and reading entities contained in a space.
 */

import { createRequestConfig } from 'contentful-sdk-core'
import { MakeRequestWithoutUserAgent, PaginationQueryOptions, QueryOptions } from './common-types'
import entities from './entities'
import { CreateApiKeyProps } from './entities/api-key'
import { CreateEnvironmentProps } from './entities/environment'
import { CreateEnvironmentAliasProps } from './entities/environment-alias'
import { CreateRoleProps, RoleProps } from './entities/role'
import { ScheduledActionProps, ScheduledActionQueryOptions } from './entities/scheduled-action'
import { SpaceProps } from './entities/space'
import { CreateSpaceMembershipProps } from './entities/space-membership'
import { CreateTeamSpaceMembershipProps } from './entities/team-space-membership'
import { CreateWebhooksProps } from './entities/webhook'

export type ContentfulSpaceAPI = ReturnType<typeof createSpaceApi>

/**
 * Creates API object with methods to access the Space API
 * @param {object} params - API initialization params
 * @prop {object} http - HTTP client instance
 * @prop {object} entities - Object with wrapper methods for each kind of entity
 * @return {ContentfulSpaceAPI}
 */
export default function createSpaceApi({
  makeRequest,
}: {
  makeRequest: MakeRequestWithoutUserAgent
}) {
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
  const { wrapEnvironmentAlias, wrapEnvironmentAliasCollection } = entities.environmentAlias
  const { wrapPreviewApiKey, wrapPreviewApiKeyCollection } = entities.previewApiKey
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
      return makeRequest({
        entityType: 'Space',
        action: 'delete',
        params: { spaceId: raw.sys.id },
      })
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
      return makeRequest({
        entityType: 'Space',
        action: 'update',
        params: { spaceId: raw.sys.id },
        payload: raw,
      }).then((data) => wrapSpace(makeRequest, data))
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

      return makeRequest({
        entityType: 'Environment',
        action: 'get',
        params: { spaceId: raw.sys.id, environmentId },
      }).then((data) => wrapEnvironment(makeRequest, data))
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
      return makeRequest({
        entityType: 'Environment',
        action: 'get',
        params: { spaceId: raw.sys.id, query },
      }).then((data) => wrapEnvironmentCollection(makeRequest, data))
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
      return makeRequest({
        entityType: 'Environment',
        action: 'create',
        params: {
          spaceId: raw.sys.id,
        },
        payload: data,
      }).then((response) => wrapEnvironment(makeRequest, response))
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
      return makeRequest({
        entityType: 'Environment',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          environmentId: id,
          sourceEnvironmentId,
        },
        payload: data,
      }).then((response) => wrapEnvironment(makeRequest, response))
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
      const raw = this.toPlainObject() as SpaceProps
      return makeRequest({
        entityType: 'Webhook',
        action: 'get',
        params: { spaceId: raw.sys.id, webhookDefinitionId: id },
      }).then((data) => wrapWebhook(makeRequest, data))
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
      const raw = this.toPlainObject() as SpaceProps
      return makeRequest({
        entityType: 'Webhook',
        action: 'getMany',
        params: { spaceId: raw.sys.id },
      }).then((data) => wrapWebhookCollection(makeRequest, data))
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
    createWebhook(data: CreateWebhooksProps) {
      const raw = this.toPlainObject() as SpaceProps
      return makeRequest({
        entityType: 'Webhook',
        action: 'create',
        params: { spaceId: raw.sys.id },
        payload: data,
      }).then((data) => wrapWebhook(makeRequest, data))
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
    createWebhookWithId(id: string, data: CreateWebhooksProps) {
      const raw = this.toPlainObject() as SpaceProps
      return makeRequest({
        entityType: 'Webhook',
        action: 'createWithId',
        params: { spaceId: raw.sys.id, webhookDefinitionId: id },
        payload: data,
      }).then((data) => wrapWebhook(makeRequest, data))
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
      return makeRequest({
        entityType: 'Role',
        action: 'get',
        params: { spaceId: raw.sys.id, roleId: id },
      }).then((data) => wrapRole(makeRequest, data))
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
    getRoles(query: QueryOptions = {}) {
      const raw = this.toPlainObject() as SpaceProps
      return makeRequest({
        entityType: 'Role',
        action: 'getMany',
        params: { spaceId: raw.sys.id, query: createRequestConfig({ query }).params },
      }).then((data) => wrapRoleCollection(makeRequest, data))
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
      return makeRequest({
        entityType: 'Role',
        action: 'create',
        params: { spaceId: raw.sys.id },
        payload: data,
      }).then((data) => wrapRole(makeRequest, data))
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
      return makeRequest({
        entityType: 'Role',
        action: 'createWithId',
        params: { spaceId: raw.sys.id, roleId: id },
        payload: roleData,
      }).then((data) => wrapRole(makeRequest, data))
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
      return makeRequest({
        entityType: 'User',
        action: 'getForSpace',
        params: {
          spaceId: raw.sys.id,
          userId,
        },
      }).then((data) => wrapUser(makeRequest, data))
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
      return makeRequest({
        entityType: 'User',
        action: 'getManyForSpace',
        params: {
          spaceId: raw.sys.id,
          query: createRequestConfig({ query }).params,
        },
      }).then((data) => wrapUserCollection(makeRequest, data))
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
      const raw = this.toPlainObject() as SpaceProps
      return makeRequest({
        entityType: 'SpaceMember',
        action: 'get',
        params: { spaceId: raw.sys.id, spaceMemberId: id },
      }).then((data) => wrapSpaceMember(makeRequest, data))
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
      const raw = this.toPlainObject() as SpaceProps
      return makeRequest({
        entityType: 'SpaceMember',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query: createRequestConfig({ query }).params,
        },
      }).then((data) => wrapSpaceMemberCollection(makeRequest, data))
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
      const raw = this.toPlainObject() as SpaceProps
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'get',
        params: { spaceId: raw.sys.id, spaceMembershipId: id },
      }).then((data) => wrapSpaceMembership(makeRequest, data))
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
      const raw = this.toPlainObject() as SpaceProps
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query: createRequestConfig({ query }).params,
        },
      }).then((data) => wrapSpaceMembershipCollection(makeRequest, data))
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
    createSpaceMembership(data: CreateSpaceMembershipProps) {
      const raw = this.toPlainObject() as SpaceProps
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'create',
        params: {
          spaceId: raw.sys.id,
        },
        payload: data,
      }).then((response) => wrapSpaceMembership(makeRequest, response))
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
    createSpaceMembershipWithId(id: string, data: CreateSpaceMembershipProps) {
      const raw = this.toPlainObject() as SpaceProps
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          spaceMembershipId: id,
        },
        payload: data,
      }).then((response) => wrapSpaceMembership(makeRequest, response))
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
      const raw = this.toPlainObject() as SpaceProps
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          teamSpaceMembershipId,
        },
      }).then((data) => wrapTeamSpaceMembership(makeRequest, data))
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
      const raw = this.toPlainObject() as SpaceProps
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query: createRequestConfig({ query: query }).params,
        },
      }).then((data) => wrapTeamSpaceMembershipCollection(makeRequest, data))
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
    createTeamSpaceMembership(teamId: string, data: CreateTeamSpaceMembershipProps) {
      const raw = this.toPlainObject() as SpaceProps
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'create',
        params: {
          spaceId: raw.sys.id,
          teamId,
        },
        payload: data,
      }).then((response) => wrapTeamSpaceMembership(makeRequest, response))
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
      return makeRequest({
        entityType: 'ApiKey',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          apiKeyId: id,
        },
      }).then((data) => wrapApiKey(makeRequest, data))
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
      return makeRequest({
        entityType: 'ApiKey',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
        },
      }).then((data) => wrapApiKeyCollection(makeRequest, data))
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
      return makeRequest({
        entityType: 'PreviewApiKey',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
        },
      }).then((data) => wrapPreviewApiKeyCollection(makeRequest, data))
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
      return makeRequest({
        entityType: 'PreviewApiKey',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          previewApiKeyId: id,
        },
      }).then((data) => wrapPreviewApiKey(makeRequest, data))
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
      return makeRequest({
        entityType: 'ApiKey',
        action: 'create',
        params: { spaceId: raw.sys.id },
        payload,
      }).then((data) => wrapApiKey(makeRequest, data))
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
      return makeRequest({
        entityType: 'ApiKey',
        action: 'createWithId',
        params: { spaceId: raw.sys.id, apiKeyId: id },
        payload,
      }).then((data) => wrapApiKey(makeRequest, data))
    },

    /**
     * Creates an EnvironmentAlias with a custom ID
     * @param environmentAliasId - EnvironmentAlias ID
     * @param data - Object representation of the EnvironmentAlias to be created
     * @return Promise for the newly created EnvironmentAlias
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createEnvironmentAliasWithId('<environment-alias-id>', {
     *   environment: {
     *     sys: { type: 'Link', linkType: 'Environment', id: 'targetEnvironment' }
     *   }
     * }))
     * .then((environmentAlias) => console.log(environmentAlias))
     * .catch(console.error)
     * ```
     */
    createEnvironmentAliasWithId(environmentAliasId: string, data: CreateEnvironmentAliasProps) {
      const raw = this.toPlainObject() as SpaceProps
      return makeRequest({
        entityType: 'EnvironmentAlias',
        action: 'createWithId',
        params: { spaceId: raw.sys.id, environmentAliasId },
        payload: data,
      }).then((response) => wrapEnvironmentAlias(makeRequest, response))
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
    getEnvironmentAlias(environmentAliasId: string) {
      const raw = this.toPlainObject() as SpaceProps
      return makeRequest({
        entityType: 'EnvironmentAlias',
        action: 'get',
        params: { spaceId: raw.sys.id, environmentAliasId },
      }).then((data) => wrapEnvironmentAlias(makeRequest, data))
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
      const raw = this.toPlainObject() as SpaceProps
      return makeRequest({
        entityType: 'EnvironmentAlias',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
        },
      }).then((data) => wrapEnvironmentAliasCollection(makeRequest, data))
    },
    /**
     * Query for scheduled actions in space.
     * @param query - Object with search parameters. The enviroment id field is mandatory. Check the <a href="https://www.contentful.com/developers/docs/references/content-management-api/#/reference/scheduled-actions/scheduled-actions-collection">REST API reference</a> for more details.
     * @return Promise for the scheduled actions query
     */
    getScheduledActions(query: ScheduledActionQueryOptions) {
      const raw = this.toPlainObject() as SpaceProps
      return makeRequest({
        entityType: 'ScheduledAction',
        action: 'getMany',
        params: { spaceId: raw.sys.id, query },
      }).then((response) => wrapScheduledActionCollection(makeRequest, response))
    },
    /**
     * Creates a scheduled action
     * @param data - Object representation of the scheduled action to be created
     * @return Promise for the newly created scheduled actions
     */
    createScheduledAction(data: Omit<ScheduledActionProps, 'sys'>) {
      const raw = this.toPlainObject() as SpaceProps
      return makeRequest({
        entityType: 'ScheduledAction',
        action: 'create',
        params: { spaceId: raw.sys.id },
        payload: data,
      }).then((response) => wrapScheduledAction(makeRequest, response))
    },
  }
}
