import { toPlainObject, freezeSys } from 'contentful-sdk-core'
import { AxiosInstance } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import errorHandler from '../error-handler'
import enhanceWithMethods from '../enhance-with-methods'
import { createDeleteEntity } from '../instance-actions'
import { wrapCollection } from '../common-utils'
import { MetaSysProps, MetaLinkProps, DefaultElements } from '../common-types'

export type AppInstallationProps = {
  sys: MetaSysProps & {
    appDefinition: { sys: MetaLinkProps }
  }
  /** App Installation specific configuration variables */
  parameters: {
    [key: string]: string
  }
}

export interface AppInstallation
  extends AppInstallationProps,
    DefaultElements<AppInstallationProps> {
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
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getAppInstallation('<app_definition_id>'))
   * .then((appInstallation) => {
   *    appInstallation.parameters.someParameter = 'New Value'
   *    return appInstallation.update()
   * })
   * .then((appInstallation) => console.log(`App installation ${appInstallation.sys.id} was updated`))
   * .catch(console.error)
   * ```
   */
  update(): Promise<AppInstallation>
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
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getAppInstallation('<app_definition_id>'))
   * .then((appInstallation) => appInstallation.delete())
   * .then(() => console.log(`App installation deleted.`))
   * .catch(console.error)
   * ```
   */
  delete(): Promise<void>
}

function createAppInstallationApi(http: AxiosInstance) {
  return {
    update: function () {
      const self = this as AppInstallation
      const raw = self.toPlainObject()
      const data = cloneDeep(raw)
      delete data.sys
      return http
        .put(`app_installations/${self.sys.appDefinition.sys.id}`, data)
        .then((response) => wrapAppInstallation(http, response.data), errorHandler)
    },

    delete: createDeleteEntity({
      http: http,
      entityPath: 'app_installations',
    }),
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw App Installation data
 * @return Wrapped App installation data
 */
export function wrapAppInstallation(http: AxiosInstance, data: AppInstallationProps) {
  const appInstallation = toPlainObject(cloneDeep(data))
  const appInstallationWithMethods = enhanceWithMethods(
    appInstallation,
    createAppInstallationApi(http)
  )
  return freezeSys(appInstallationWithMethods)
}

/**
 * @private
 */
export const wrapAppInstallationCollection = wrapCollection(wrapAppInstallation)
