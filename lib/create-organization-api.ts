import { createRequestConfig } from 'contentful-sdk-core'
import entities from './entities'
import { Stream } from 'stream'
import { CreateTeamMembershipProps } from './entities/team-membership'
import { CreateTeamProps } from './entities/team'
import { CreateOrganizationInvitationProps } from './entities/organization-invitation'
import { BasicQueryOptions, MakeRequest, QueryOptions, QueryParams } from './common-types'
import { CreateAppDefinitionProps } from './entities/app-definition'
import { CreateAppActionProps } from './entities/app-action'
import { CreateAppSigningSecretProps } from './entities/app-signing-secret'
import { CreateAppEventSubscriptionProps } from './entities/app-event-subscription'
import { CreateAppKeyProps } from './entities/app-key'
import { CreateAppDetailsProps } from './entities/app-details'
import { OrganizationProp } from './entities/organization'

/**
 * @private
 */
export type ContentfulOrganizationAPI = ReturnType<typeof createOrganizationApi>

/**
 * Creates API object with methods to access the Organization API
 * @param {MakeRequest} makeRequest - function to make requests via an adapter
 * @return {ContentfulOrganizationAPI}
 * @private
 */
export default function createOrganizationApi(makeRequest: MakeRequest) {
  const { wrapAppDefinition, wrapAppDefinitionCollection } = entities.appDefinition
  const { wrapUser, wrapUserCollection } = entities.user
  const { wrapOrganizationMembership, wrapOrganizationMembershipCollection } =
    entities.organizationMembership
  const { wrapTeamMembership, wrapTeamMembershipCollection } = entities.teamMembership
  const { wrapTeamSpaceMembership, wrapTeamSpaceMembershipCollection } =
    entities.teamSpaceMembership
  const { wrapTeam, wrapTeamCollection } = entities.team
  const { wrapSpaceMembership, wrapSpaceMembershipCollection } = entities.spaceMembership
  const { wrapOrganizationInvitation } = entities.organizationInvitation
  const { wrapAppUpload } = entities.appUpload
  const { wrapAppSigningSecret } = entities.appSigningSecret
  const { wrapAppEventSubscription } = entities.appEventSubscription
  const { wrapAppKey, wrapAppKeyCollection } = entities.appKey
  const { wrapAppDetails } = entities.appDetails
  const { wrapAppAction, wrapAppActionCollection } = entities.appAction

  return {
    /**
     * Gets a User
     * @return Promise for a User
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<organization_id>')
     * .then((organization) => organization.getUser('id'))
     * .then((user) => console.log(user))
     * .catch(console.error)
     * ```
     */
    getUser(id: string) {
      const raw = this.toPlainObject() as OrganizationProp
      return makeRequest({
        entityType: 'User',
        action: 'getForOrganization',
        params: { organizationId: raw.sys.id, userId: id },
      }).then((data) => wrapUser(makeRequest, data))
    },
    /**
     * Gets a collection of Users in organization
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise a collection of Users in organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<organization_id>')
     * .then((organization) => organization.getUsers())
     * .then((user) => console.log(user))
     * .catch(console.error)
     * ```
     */
    getUsers(query: QueryOptions = {}) {
      const raw = this.toPlainObject() as OrganizationProp
      return makeRequest({
        entityType: 'User',
        action: 'getManyForOrganization',
        params: {
          organizationId: raw.sys.id,
          query: createRequestConfig({ query: query }).params,
        },
      }).then((data) => wrapUserCollection(makeRequest, data))
    },
    /**
     * Gets an Organization Membership
     * @param id - Organization Membership ID
     * @return Promise for an Organization Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organization_id')
     * .then((organization) => organization.getOrganizationMembership('organizationMembership_id'))
     * .then((organizationMembership) => console.log(organizationMembership))
     * .catch(console.error)
     * ```
     */
    getOrganizationMembership(id: string) {
      const raw = this.toPlainObject() as OrganizationProp
      const organizationId = raw.sys.id
      return makeRequest({
        entityType: 'OrganizationMembership',
        action: 'get',
        params: {
          organizationId,
          organizationMembershipId: id,
        },
      }).then((data) => wrapOrganizationMembership(makeRequest, data, organizationId))
    },
    /**
     * Gets a collection of Organization Memberships
     * @param  params - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Organization Memberships
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organization_id')
     * .then((organization) => organization.getOrganizationMemberships({'limit': 100})) // you can add more queries as 'key': 'value'
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */

    getOrganizationMemberships(params: QueryParams = {}) {
      const raw = this.toPlainObject() as OrganizationProp
      return makeRequest({
        entityType: 'OrganizationMembership',
        action: 'getMany',
        params: {
          organizationId: raw.sys.id,
          ...params,
        },
      }).then((data) => wrapOrganizationMembershipCollection(makeRequest, data, raw.sys.id))
    },
    /**
     * Creates a Team
     * @param data representation of the Team to be created
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.createTeam({
     *    name: 'new team',
     *    description: 'new team description'
     *  }))
     * .then((team) => console.log(team))
     * .catch(console.error)
     * ```
     */
    createTeam(data: CreateTeamProps) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'Team',
        action: 'create',
        params: { organizationId: raw.sys.id },
        payload: data,
      }).then((data) => wrapTeam(makeRequest, data))
    },
    /**
     * Gets an Team
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('orgId')
     * .then((organization) => organization.getTeam('teamId'))
     * .then((team) => console.log(team))
     * .catch(console.error)
     * ```
     */
    getTeam(teamId: string) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'Team',
        action: 'get',
        params: { organizationId: raw.sys.id, teamId },
      }).then((data) => wrapTeam(makeRequest, data))
    },
    /**
     * Gets all Teams in an organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('orgId')
     * .then((organization) => organization.getTeams())
     * .then((teams) => console.log(teams))
     * .catch(console.error)
     * ```
     */
    getTeams(query: QueryOptions = {}) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'Team',
        action: 'getMany',
        params: {
          organizationId: raw.sys.id,
          query: createRequestConfig({ query }).params,
        },
      }).then((data) => wrapTeamCollection(makeRequest, data))
    },
    /**
     * Creates a Team membership
     * @param teamId - Id of the team the membership will be created in
     * @param data - Object representation of the Team Membership to be created
     * @return Promise for the newly created TeamMembership
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((org) => org.createTeamMembership('teamId', {
     *    admin: true,
     *    organizationMembershipId: 'organizationMembershipId'
     *  }))
     * .then((teamMembership) => console.log(teamMembership))
     * .catch(console.error)
     * ```
     */
    createTeamMembership(teamId: string, data: CreateTeamMembershipProps) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'TeamMembership',
        action: 'create',
        params: { organizationId: raw.sys.id, teamId },
        payload: data,
      }).then((data) => wrapTeamMembership(makeRequest, data))
    },
    /**
     * Gets an Team Membership from the team with given teamId
     * @return Promise for an Team Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((organization) => organization.getTeamMembership('teamId', 'teamMembership_id'))
     * .then((teamMembership) => console.log(teamMembership))
     * .catch(console.error)
     * ```
     */
    getTeamMembership(teamId: string, teamMembershipId: string) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'TeamMembership',
        action: 'get',
        params: { organizationId: raw.sys.id, teamId, teamMembershipId },
      }).then((data) => wrapTeamMembership(makeRequest, data))
    },
    /**
     * Get all Team Memberships. If teamID is provided in the optional config object, it will return all Team Memberships in that team. By default, returns all team memberships for the organization.
     * @return Promise for a Team Membership Collection
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((organization) => organization.getTeamMemberships('teamId'))
     * .then((teamMemberships) => console.log(teamMemberships))
     * .catch(console.error)
     * ```
     */
    getTeamMemberships(opts: { teamId?: string; query?: QueryOptions } = {}) {
      const { teamId, query = {} } = opts
      const raw = this.toPlainObject() as OrganizationProp

      if (teamId) {
        return makeRequest({
          entityType: 'TeamMembership',
          action: 'getManyForTeam',
          params: {
            organizationId: raw.sys.id,
            teamId,
            query: createRequestConfig({ query }).params,
          },
        }).then((data) => wrapTeamMembershipCollection(makeRequest, data))
      }

      return makeRequest({
        entityType: 'TeamMembership',
        action: 'getManyForOrganization',
        params: {
          organizationId: raw.sys.id,
          query: createRequestConfig({ query }).params,
        },
      }).then((data) => wrapTeamMembershipCollection(makeRequest, data))
    },

    /**
     * Get all Team Space Memberships. If teamID is provided in the optional config object, it will return all Team Space Memberships in that team. By default, returns all team space memberships across all teams in the organization.
     * @return Promise for a Team Space Membership Collection
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((organization) => organization.getTeamSpaceMemberships('teamId'))
     * .then((teamSpaceMemberships) => console.log(teamSpaceMemberships))
     * .catch(console.error)
     * ```
     */
    getTeamSpaceMemberships(opts: { teamId?: string; query?: QueryOptions } = {}) {
      const raw = this.toPlainObject() as OrganizationProp
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'getManyForOrganization',
        params: {
          organizationId: raw.sys.id,
          query: createRequestConfig({ query: opts.query || {} }).params,
          teamId: opts.teamId,
        },
      }).then((data) => wrapTeamSpaceMembershipCollection(makeRequest, data))
    },

    /**
     * Get a Team Space Membership with given teamSpaceMembershipId
     * @return Promise for a Team Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((organization) => organization.getTeamSpaceMembership('teamSpaceMembershipId'))
     * .then((teamSpaceMembership) => console.log(teamSpaceMembership))
     * .catch(console.error)]
     * ```
     */
    getTeamSpaceMembership(teamSpaceMembershipId: string) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'getForOrganization',
        params: {
          organizationId: raw.sys.id,
          teamSpaceMembershipId,
        },
      }).then((data) => wrapTeamSpaceMembership(makeRequest, data))
    },
    /**
     * Gets an Space Membership in Organization
     * @param id - Organiztion Space Membership ID
     * @return Promise for a Space Membership in an organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organization_id')
     * .then((organization) => organization.getOrganizationSpaceMembership('organizationSpaceMembership_id'))
     * .then((organizationMembership) => console.log(organizationMembership))
     * .catch(console.error)
     * ```
     */
    getOrganizationSpaceMembership(id: string) {
      const raw = this.toPlainObject() as OrganizationProp
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'getForOrganization',
        params: {
          organizationId: raw.sys.id,
          spaceMembershipId: id,
        },
      }).then((data) => wrapSpaceMembership(makeRequest, data))
    },
    /**
     * Gets a collection Space Memberships in organization
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a Space Membership collection across all spaces in the organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organization_id')
     * .then((organization) => organization.getOrganizationSpaceMemberships()) // you can add queries like 'limit': 100
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getOrganizationSpaceMemberships(query: QueryOptions = {}) {
      const raw = this.toPlainObject() as OrganizationProp
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'getManyForOrganization',
        params: {
          organizationId: raw.sys.id,
          query: createRequestConfig({ query }).params,
        },
      }).then((data) => wrapSpaceMembershipCollection(makeRequest, data))
    },
    /**
     * Gets an Invitation in Organization
     * @return Promise for a OrganizationInvitation in an organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((organization) => organization.getOrganizationInvitation('invitation_id'))
     * .then((invitation) => console.log(invitation))
     * .catch(console.error)
     * ```
     */
    getOrganizationInvitation(invitationId: string) {
      const raw = this.toPlainObject() as OrganizationProp
      return makeRequest({
        entityType: 'OrganizationInvitation',
        action: 'get',
        params: {
          organizationId: raw.sys.id,
          invitationId,
        },
      }).then((data) => wrapOrganizationInvitation(makeRequest, data))
    },
    /**
     * Create an Invitation in Organization
     * @return Promise for a OrganizationInvitation in an organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     *  .then((organization) => organization.createOrganizationInvitation({
     *    email: 'user.email@example.com'
     *    firstName: 'User First Name'
     *    lastName: 'User Last Name'
     *    role: 'developer'
     *  })
     * .catch(console.error)
     * ```
     */
    createOrganizationInvitation(data: CreateOrganizationInvitationProps) {
      const raw = this.toPlainObject() as OrganizationProp
      return makeRequest({
        entityType: 'OrganizationInvitation',
        action: 'create',
        params: {
          organizationId: raw.sys.id,
        },
        payload: data,
      }).then((data) => wrapOrganizationInvitation(makeRequest, data))
    },
    /**
     * Creates an app definition
     * @param Object representation of the App Definition to be created
     * @return Promise for the newly created AppDefinition
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.createAppDefinition({
     *    name: 'Example app',
     *    locations: [{ location: 'app-config' }],
     *    src: "http://my-app-host.com/my-app"
     *  }))
     * .then((appDefinition) => console.log(appDefinition))
     * .catch(console.error)
     * ```
     */
    createAppDefinition(data: CreateAppDefinitionProps) {
      const raw = this.toPlainObject() as OrganizationProp
      return makeRequest({
        entityType: 'AppDefinition',
        action: 'create',
        params: { organizationId: raw.sys.id },
        payload: data,
      }).then((data) => wrapAppDefinition(makeRequest, data))
    },
    /**
     * Gets all app definitions
     * @return Promise for a collection of App Definitions
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinitions())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getAppDefinitions(query: QueryOptions = {}) {
      const raw = this.toPlainObject() as OrganizationProp
      return makeRequest({
        entityType: 'AppDefinition',
        action: 'getMany',
        params: { organizationId: raw.sys.id, query: query },
      }).then((data) => wrapAppDefinitionCollection(makeRequest, data))
    },

    /**
     * Gets an app definition
     * @return Promise for an App Definition
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_definition_id>'))
     * .then((appDefinition) => console.log(appDefinition))
     * .catch(console.error)
     * ```
     */
    getAppDefinition(id: string) {
      const raw = this.toPlainObject() as OrganizationProp
      return makeRequest({
        entityType: 'AppDefinition',
        action: 'get',
        params: { organizationId: raw.sys.id, appDefinitionId: id },
      }).then((data) => wrapAppDefinition(makeRequest, data))
    },

    /**
     * Gets an app upload
     * @return Promise for an App Upload
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppUpload('<app_upload_id>'))
     * .then((appUpload) => console.log(appUpload))
     * .catch(console.error)
     * ```
     */
    getAppUpload(appUploadId: string) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppUpload',
        action: 'get',
        params: { organizationId: raw.sys.id, appUploadId },
      }).then((data) => wrapAppUpload(makeRequest, data))
    },

    /**
     * Creates an app upload
     * @return Promise for an App Upload
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.createAppUpload('some_zip_file'))
     * .then((appUpload) => console.log(appUpload))
     * .catch(console.error)
     * ```
     */
    createAppUpload(file: string | ArrayBuffer | Stream) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppUpload',
        action: 'create',
        params: { organizationId: raw.sys.id },
        payload: { file },
      }).then((data) => wrapAppUpload(makeRequest, data))
    },
    /**
     * Creates or updates an app signing secret
     * @return Promise for an App SigningSecret
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.upsertAppSigningSecret('app_definition_id', { value: 'tsren3s1....wn1e' }))
     * .then((appSigningSecret) => console.log(appSigningSecret))
     * .catch(console.error)
     * ```
     */
    upsertAppSigningSecret(appDefinitionId: string, data: CreateAppSigningSecretProps) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppSigningSecret',
        action: 'upsert',
        params: { organizationId: raw.sys.id, appDefinitionId },
        payload: data,
      }).then((payload) => wrapAppSigningSecret(makeRequest, payload))
    },
    /**
     * Gets an app signing secret
     * @return Promise for an App SigningSecret
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppSigningSecret('app_definition_id'))
     * .then((appSigningSecret) => console.log(appSigningSecret))
     * .catch(console.error)
     * ```
     */
    getAppSigningSecret(appDefinitionId: string) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppSigningSecret',
        action: 'get',
        params: { organizationId: raw.sys.id, appDefinitionId },
      }).then((payload) => wrapAppSigningSecret(makeRequest, payload))
    },
    /**
     * Deletes an app signing secret
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.deleteAppSigningSecret('app_definition_id'))
     * .then((result) => console.log(result))
     * .catch(console.error)
     * ```
     */
    deleteAppSigningSecret(appDefinitionId: string) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppSigningSecret',
        action: 'delete',
        params: { organizationId: raw.sys.id, appDefinitionId },
      }).then(() => {
        /* noop*/
      })
    },
    /**
     * Creates or updates an app event subscription
     * @return Promise for an App Event Subscription
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.upsertAppEventSubscription('app_definition_id', { targetUrl: '<target_url>', topics: ['<topic>'] }))
     * .then((appEventSubscription) => console.log(appEventSubscription))
     * .catch(console.error)
     * ```
     */
    upsertAppEventSubscription(appDefinitionId: string, data: CreateAppEventSubscriptionProps) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppEventSubscription',
        action: 'upsert',
        params: { organizationId: raw.sys.id, appDefinitionId },
        payload: data,
      }).then((payload) => wrapAppEventSubscription(makeRequest, payload))
    },
    /**
     * Gets an app event subscription
     * @return Promise for an App Event Subscription
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppEventSubscription('app_definition_id'))
     * .then((appEventSubscription) => console.log(appEventSubscription))
     * .catch(console.error)
     * ```
     */
    getAppEventSubscription(appDefinitionId: string) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppEventSubscription',
        action: 'get',
        params: { organizationId: raw.sys.id, appDefinitionId },
      }).then((payload) => wrapAppEventSubscription(makeRequest, payload))
    },
    /**
     * Deletes the current App Event Subscription for the given App
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.deleteAppEventSubscription('app_definition_id'))
     * .then((result) => console.log(result))
     * .catch(console.error)
     * ```
     */
    deleteAppEventSubscription(appDefinitionId: string) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppEventSubscription',
        action: 'delete',
        params: { organizationId: raw.sys.id, appDefinitionId },
      }).then(() => {
        /* noop*/
      })
    },
    /**
     * Creates or updates an app event subscription
     * @return Promise for an App Event Subscription
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * // generate a new private key
     * client.getOrganization('<org_id>')
     * .then((org) => org.upsertAppEventSubscription('app_definition_id', { generate: true }))
     * .then((appEventSubscription) => console.log(appEventSubscription))
     * .catch(console.error)
     *
     * // or use an existing JSON Web Key
     * client.getOrganization('<org_id>')
     * .then((org) => org.upsertAppEventSubscription('app_definition_id', { jwk: 'jwk' }))
     * .then((appEventSubscription) => console.log(appEventSubscription))
     * .catch(console.error)
     * ```
     */
    createAppKey(appDefinitionId: string, data: CreateAppKeyProps) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppKey',
        action: 'create',
        params: { organizationId: raw.sys.id, appDefinitionId },
        payload: data,
      }).then((payload) => wrapAppKey(makeRequest, payload))
    },
    /**
     * Gets an app key by fingerprint
     * @return Promise for an App Key
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppKey('app_definition_id', 'fingerprint'))
     * .then((appKey) => console.log(appKey))
     * .catch(console.error)
     * ```
     */
    getAppKey(appDefinitionId: string, fingerprint: string) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppKey',
        action: 'get',
        params: { organizationId: raw.sys.id, appDefinitionId, fingerprint },
      }).then((payload) => wrapAppKey(makeRequest, payload))
    },
    /**
     * Gets all keys for the given app
     * @return Promise for an array of App Keys
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * // with default pagination
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppKeys('app_definition_id'))
     * .then((appKeys) => console.log(appKeys))
     * .catch(console.error)
     *
     * // with explicit pagination
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppKeys('app_definition_id', { skip: 'skip', limit: 'limit' }))
     * .then((appKeys) => console.log(appKeys))
     * .catch(console.error)
     * ```
     */
    getAppKeys(appDefinitionId: string, query: BasicQueryOptions = {}) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppKey',
        action: 'getMany',
        params: {
          organizationId: raw.sys.id,
          appDefinitionId,
          query: createRequestConfig({ query }).params,
        },
      }).then((payload) => wrapAppKeyCollection(makeRequest, payload))
    },
    /**
     * Deletes an app key by fingerprint.
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.deleteAppKey('app_definition_id', 'fingerprint'))
     * .then((result) => console.log(result))
     * .catch(console.error)
     * ```
     */
    deleteAppKey(appDefinitionId: string, fingerprint: string) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppKey',
        action: 'delete',
        params: { organizationId: raw.sys.id, appDefinitionId, fingerprint },
      }).then(() => {
        /* noop*/
      })
    },
    /**
     * Creates or updates an app details entity
     * @return Promise for an App Details
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.upsertAppDetails('app_definition_id',
     *   { icon: { value: 'base_64_image', type: 'base64' }}
     *  ))
     * .then((appDetails) => console.log(appDetails))
     * .catch(console.error)
     * ```
     */
    upsertAppDetails(appDefinitionId: string, data: CreateAppDetailsProps) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppDetails',
        action: 'upsert',
        params: { organizationId: raw.sys.id, appDefinitionId },
        payload: data,
      }).then((payload) => wrapAppDetails(makeRequest, payload))
    },
    /**
     * Gets an app details entity
     * @return Promise for an App Details
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDetails('app_definition_id'))
     * .then((appDetails) => console.log(appDetails))
     * .catch(console.error)
     * ```
     */
    getAppDetails(appDefinitionId: string) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppDetails',
        action: 'get',
        params: { organizationId: raw.sys.id, appDefinitionId },
      }).then((payload) => wrapAppDetails(makeRequest, payload))
    },
    /**
     * Deletes an app details entity.
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.deleteAppDetails('app_definition_id'))
     * .then((result) => console.log(result))
     * .catch(console.error)
     * ```
     */
    deleteAppDetails(appDefinitionId: string) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppDetails',
        action: 'delete',
        params: { organizationId: raw.sys.id, appDefinitionId },
      }).then(() => {
        /* noop*/
      })
    },
    /**
     * Creates an app action entity.
     * @return Promise that resolves an App Action entity
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.createAppAction('app_definition_id', {
     *    type: 'endpoint',
     *    name: 'my nice new app action',
     *    url: 'https://www.somewhere.com/action'
     *  }))
     * .then((appAction) => console.log(appAction))
     * .catch(console.error)
     * ```
     */
    createAppAction(appDefinitionId: string, data: CreateAppActionProps) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppAction',
        action: 'create',
        params: { organizationId: raw.sys.id, appDefinitionId },
        payload: data,
      }).then((payload) => wrapAppAction(makeRequest, payload))
    },
    /**
     * Updates an existing app action entity.
     * @return Promise that resolves an App Action entity
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.updateAppAction('app_definition_id', 'app_action_id', {
     *    type: 'endpoint',
     *    name: 'my nice updated app action',
     *    url: 'https://www.somewhere-else.com/action'
     *  }))
     * .then((appAction) => console.log(appAction))
     * .catch(console.error)
     * ```
     */
    updateAppAction(appDefinitionId: string, appActionId: string, data: CreateAppActionProps) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppAction',
        action: 'update',
        params: { organizationId: raw.sys.id, appDefinitionId, appActionId },
        payload: data,
      }).then((payload) => wrapAppAction(makeRequest, payload))
    },
    /**
     * Deletes an app action entity.
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.deleteAppAction('app_definition_id', 'app_action_id'))
     * .then((result) => console.log(result))
     * .catch(console.error)
     * ```
     */
    deleteAppAction(appDefinitionId: string, appActionId: string) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppAction',
        action: 'delete',
        params: { organizationId: raw.sys.id, appDefinitionId, appActionId },
      }).then((payload) => {
        /* noop*/
      })
    },
    /**
     * Gets an existing app action entity.
     * @return Promise that resolves an App Action entity
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppAction('app_definition_id', 'app_action_id'))
     * .then((appAction) => console.log(appAction))
     * .catch(console.error)
     * ```
     */
    getAppAction(appDefinitionId: string, appActionId: string) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppAction',
        action: 'get',
        params: { organizationId: raw.sys.id, appDefinitionId, appActionId },
      }).then((payload) => wrapAppAction(makeRequest, payload))
    },
    /**
     * Gets existing app actions for an App Definition.
     * @return Promise that resolves an App Action entity
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppActions('app_definition_id'))
     * .then((appActions) => console.log(appActions))
     * .catch(console.error)
     * ```
     */
    getAppActions(appDefinitionId: string) {
      const raw = this.toPlainObject() as OrganizationProp

      return makeRequest({
        entityType: 'AppAction',
        action: 'getMany',
        params: { organizationId: raw.sys.id, appDefinitionId },
      }).then((payload) => wrapAppActionCollection(makeRequest, payload))
    },
  }
}
