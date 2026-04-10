/**
 * @module
 * @category Entities
 */
import { toPlainObject, freezeSys } from 'contentful-sdk-core'
import copy from 'fast-copy'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import type { DefaultElements, BasicMetaSysProps, SysLink, MakeRequest } from '../common-types'
import type { Except } from 'type-fest'
import type { FreeFormParameters } from './widget-parameters'

export type AppInstallationProps = {
  sys: Omit<BasicMetaSysProps, 'id'> & {
    appDefinition: SysLink
    environment: SysLink
    space: SysLink
    organization: SysLink
  }
  /**
   * Free-form installation parameters (API limits stringified length to 32KB)
   */
  parameters?: FreeFormParameters
}

export type CreateAppInstallationProps = Except<AppInstallationProps, 'sys'>

export interface AppInstallation
  extends AppInstallationProps,
    DefaultElements<AppInstallationProps> {
  /**
   * Sends an update to the server with any changes made to the object's properties
   * @returns Object returned from the server with updated changes.
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
   * @returns Promise for the deletion. It contains no data, but the Promise error case should be handled.
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

/**
 * @internal
 */
function createAppInstallationApi(makeRequest: MakeRequest) {
  const getParams = (data: AppInstallationProps) => ({
    spaceId: data.sys.space.sys.id,
    environmentId: data.sys.environment.sys.id,
    appDefinitionId: data.sys.appDefinition.sys.id,
  })

  return {
    update: function update() {
      const data = this.toPlainObject() as AppInstallationProps
      return makeRequest({
        entityType: 'AppInstallation',
        action: 'upsert',
        params: getParams(data),
        headers: {},
        payload: data,
      }).then((data) => wrapAppInstallation(makeRequest, data))
    },

    delete: function del() {
      const data = this.toPlainObject() as AppInstallationProps
      return makeRequest({
        entityType: 'AppInstallation',
        action: 'delete',
        params: getParams(data),
      })
    },
  }
}

/**
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Installation data
 * @returns Wrapped App installation data
 */
export function wrapAppInstallation(
  makeRequest: MakeRequest,
  data: AppInstallationProps,
): AppInstallation {
  const appInstallation = toPlainObject(copy(data))
  const appInstallationWithMethods = enhanceWithMethods(
    appInstallation,
    createAppInstallationApi(makeRequest),
  )
  return freezeSys(appInstallationWithMethods)
}

/**
 * @internal
 */
export const wrapAppInstallationCollection = wrapCollection(wrapAppInstallation)
