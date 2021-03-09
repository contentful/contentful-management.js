import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import { DefaultElements, BasicMetaSysProps, SysLink, MakeRequest } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import { SetOptional, Except } from 'type-fest'
import { FieldType } from './field-type'
import { ParameterDefinition } from './widget-parameters'

interface NavigationItem {
  name: string
  path: string
}

type LocationType = 'app-config' | 'entry-sidebar' | 'entry-editor' | 'dialog' | 'page'

interface SimpleLocation {
  location: LocationType
}

interface EntryFieldLocation {
  location: 'entry-field'
  fieldTypes: FieldType[]
}

interface PageLocation {
  location: 'page'
  navigationItem?: NavigationItem
}

export type AppLocation = SimpleLocation | EntryFieldLocation | PageLocation

export type AppDefinitionProps = {
  /**
   * System metadata
   */
  sys: BasicMetaSysProps & { organization: SysLink }
  /**
   * App name
   */
  name: string
  /**
   * URL where the root HTML document of the app can be found
   */
  src?: string
  /**
   * Locations where the app can be installed
   */
  locations?: AppLocation[]
  /**
   * Instance parameter definitions
   */
  parameters?: {
    instance?: ParameterDefinition[]
  }
}

export type CreateAppDefinitionProps = SetOptional<
  Except<AppDefinitionProps, 'sys'>,
  'src' | 'locations'
>

export interface AppDefinition extends AppDefinitionProps, DefaultElements<AppDefinitionProps> {
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
  delete(): Promise<void>
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
  update(): Promise<AppDefinition>
}

function createAppDefinitionApi(makeRequest: MakeRequest) {
  const getParams = (data: AppDefinitionProps) => ({
    appDefinitionId: data.sys.id,
    organizationId: data.sys.organization.sys.id,
  })

  return {
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

    delete: function del() {
      const data = this.toPlainObject() as AppDefinitionProps
      return makeRequest({
        entityType: 'AppDefinition',
        action: 'delete',
        params: getParams(data),
      })
    },
  }
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Definition data
 * @return Wrapped App Definition data
 */
export function wrapAppDefinition(
  makeRequest: MakeRequest,
  data: AppDefinitionProps
): AppDefinition {
  const appDefinition = toPlainObject(copy(data))
  const appDefinitionWithMethods = enhanceWithMethods(
    appDefinition,
    createAppDefinitionApi(makeRequest)
  )
  return freezeSys(appDefinitionWithMethods)
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Definition collection data
 * @return Wrapped App Definition collection data
 */
export const wrapAppDefinitionCollection = wrapCollection(wrapAppDefinition)
