import { MakeRequest, QueryOptions } from './common-types'
import entities from './entities'
import { AppDefinitionProps, wrapAppDefinition } from './entities/app-definition'

export type ContentfulAppDefinitionAPI = ReturnType<typeof createAppDefinitionApi>

export default function createAppDefinitionApi(makeRequest: MakeRequest) {
  const { wrapAppBundle, wrapAppBundleCollection } = entities.appBundle

  const getParams = (data: AppDefinitionProps) => ({
    appDefinitionId: data.sys.id,
    organizationId: data.sys.organization.sys.id,
  })

  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @return Object returned from the server with updated changes.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_def_id>'))
     * .then((appDefinition) => {
     *   appDefinition.name = 'New App Definition name'
     *   return appDefinition.update()
     * })
     * .then((appDefinition) => console.log(`App Definition ${appDefinition.sys.id} updated.`))
     * .catch(console.error)
     * ```
     */
    update: function update() {
      const data = this.toPlainObject() as AppDefinitionProps
      return makeRequest({
        entityType: 'AppDefinition',
        action: 'update',
        params: getParams(data),
        headers: {},
        payload: data,
      }).then((data) => wrapAppDefinition(makeRequest, data))
    },

    /**
     * Deletes this object on the server.
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_def_id>'))
     * .then((appDefinition) => appDefinition.delete())
     * .then(() => console.log(`App Definition deleted.`))
     * .catch(console.error)
     * ```
     */
    delete: function del() {
      const data = this.toPlainObject() as AppDefinitionProps
      return makeRequest({
        entityType: 'AppDefinition',
        action: 'delete',
        params: getParams(data),
      })
    },

    /**
     * Gets an app bundle
     * @param id - AppBundle ID
     * @return Promise for an AppBundle
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_def_id>'))
     * .then((appDefinition) => appDefinition.getAppBundle('<app_upload_id>')
     * .then((appBundle) => console.log(appBundle))
     * .catch(console.error)
     * ```
     */
    getAppBundle(id: string) {
      const raw = this.toPlainObject() as AppDefinitionProps
      return makeRequest({
        entityType: 'AppBundle',
        action: 'get',
        params: {
          appBundleId: id,
          appDefinitionId: raw.sys.id,
          organizationId: raw.sys.organization.sys.id,
        },
      }).then((data) => wrapAppBundle(makeRequest, data))
    },

    /**
     * Gets a collection of AppBundles
     * @return Promise for a collection of AppBundles
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_def_id>'))
     * .then((appDefinition) => appDefinition.getAppBundles()
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getAppBundles(query: QueryOptions = {}) {
      const raw = this.toPlainObject() as AppDefinitionProps
      return makeRequest({
        entityType: 'AppBundle',
        action: 'getMany',
        params: { organizationId: raw.sys.organization.sys.id, appDefinitionId: raw.sys.id, query },
      }).then((data) => wrapAppBundleCollection(makeRequest, data))
    },

    /**
     * Creates an app bundle
     * @param Object representation of the App Bundle to be created
     * @return Promise for the newly created AppBundle
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_def_id>'))
     * .then((appDefinition) => appDefinition.createAppBundle('<app_upload_id>')
     * .then((appBundle) => console.log(appBundle))
     * .catch(console.error)
     * ```
     */
    createAppBundle(appUploadId: string) {
      const raw = this.toPlainObject() as AppDefinitionProps
      return makeRequest({
        entityType: 'AppBundle',
        action: 'create',
        params: {
          appDefinitionId: raw.sys.id,
          organizationId: raw.sys.organization.sys.id,
        },
        payload: { appUploadId },
      }).then((data) => wrapAppBundle(makeRequest, data))
    },
  }
}
