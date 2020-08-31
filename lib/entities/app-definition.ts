import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import { MetaSysProps, DefaultElements } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'
import { createUpdateEntity, createDeleteEntity } from '../instance-actions'
import { AxiosInstance } from 'axios'
import { wrapCollection } from '../common-utils'
import { SetOptional, Except } from 'type-fest'

const entityPath = 'app_definitions'

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

// Locations
type AppLocation = 'app-config' | 'entry-sidebar' | 'entry-editor' | 'dialog' | 'page'

interface SingleLocationDefinition {
  location: AppLocation
}

interface EntryFieldLocationDefinition {
  location: 'entry-field'
  fieldTypes: FieldType[]
}

interface PageLocationDefinition {
  location: 'page'
  navigationItem?: NavigationItem
}

export type LocationDefinition =
  | SingleLocationDefinition
  | EntryFieldLocationDefinition
  | PageLocationDefinition

export type AppDefinitionProps = {
  /**
   * System metadata
   */
  sys: MetaSysProps
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
  locations: LocationDefinition[]
}

export type CreateAppDefinitionProps = SetOptional<
  Except<AppDefinitionProps, 'sys'>,
  'src' | 'locations'
>

export type UpdateAppDefinitionProps = SetOptional<
  Except<AppDefinitionProps, 'sys'>,
  'name' | 'src' | 'locations'
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
  return {
    update: createUpdateEntity({
      http,
      entityPath,
      wrapperMethod: wrapAppDefinition,
    }),

    delete: createDeleteEntity({
      http,
      entityPath,
    }),
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
