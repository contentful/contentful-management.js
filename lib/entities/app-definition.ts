import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import { DefaultElements, BasicMetaSysProps, SysLink } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'
import { AxiosInstance } from 'axios'
import { wrapCollection } from '../common-utils'
import { SetOptional, Except } from 'type-fest'
import * as endpoints from '../plain/endpoints'

type Field =
  | 'Symbol'
  | 'Text'
  | 'RichText'
  | 'Integer'
  | 'Number'
  | 'Date'
  | 'Location'
  | 'Boolean'
  | 'Object'

type LinkType = 'Asset' | 'Entry'

// Fields Types
interface SingleFieldType {
  type: Field
}

interface LinkFieldType {
  type: 'Link'
  linkType: LinkType
}

interface ArrayFieldType {
  type: 'Array'
  items: SingleFieldType | LinkFieldType
}

interface NavigationItem {
  name: string
  path: string
}

type FieldType = SingleFieldType | LinkFieldType | ArrayFieldType

type LocationType = 'app-config' | 'entry-sidebar' | 'entry-editor' | 'dialog' | 'page'

interface AppLocation {
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

export type Location = AppLocation | EntryFieldLocation | PageLocation

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
  src: string
  /**
   * Locations where the app can be installed
   */
  locations: Location[]
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
   * client.getSpace('<space_id>')
   * .then((space) => space.getAppDefinition('<ui_extension_id>'))
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
   * client.getSpace('<space_id>')
   * .then((space) => space.getAppDefinition('<ui_extension_id>'))
   * .then((appDefinition) => {
   *   appDefinition.extension.name = 'New App Definition name'
   *   return appDefinition.update()
   * })
   * .then((appDefinition) => console.log(`App Definition ${appDefinition.sys.id} updated.`))
   * .catch(console.error)
   * ```
   */
  update(): Promise<AppDefinition>
}

function createAppDefinitionApi(http: AxiosInstance) {
  const getParams = (data: AppDefinitionProps) => ({
    appDefinitionId: data.sys.id,
    organizationId: data.sys.organization.sys.id,
  })

  return {
    update: function update() {
      const data = this.toPlainObject() as AppDefinitionProps
      return endpoints.appDefinition
        .update(http, getParams(data), data)
        .then((data) => wrapAppDefinition(http, data))
    },

    delete: function del() {
      const data = this.toPlainObject() as AppDefinitionProps
      return endpoints.appDefinition.del(http, getParams(data))
    },
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw App Definition data
 * @return Wrapped App Definition data
 */
export function wrapAppDefinition(http: AxiosInstance, data: AppDefinitionProps): AppDefinition {
  const appDefinition = toPlainObject(cloneDeep(data))
  const appDefinitionWithMethods = enhanceWithMethods(appDefinition, createAppDefinitionApi(http))
  return freezeSys(appDefinitionWithMethods)
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw App Definition collection data
 * @return Wrapped App Definition collection data
 */
export const wrapAppDefinitionCollection = wrapCollection(wrapAppDefinition)
