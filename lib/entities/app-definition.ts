import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import { MetaSysProps, DefaultElements, CollectionProp } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'
import { createUpdateEntity, createDeleteEntity } from '../instance-actions'
import { AxiosInstance } from 'axios'

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

type FieldType = SingleFieldType | LinkFieldType | ArrayFieldType

// Locations
type AppLocation = 'app-config' | 'entry-sidebar' | 'entry-editor' | 'dialog'

interface SingleLocationDefinition {
  location: AppLocation
}

interface EntryFieldLocationDefinition {
  location: 'entry-field'
  fieldTypes: FieldType[]
}

type LocationDefinition = SingleLocationDefinition | EntryFieldLocationDefinition

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
    update: createUpdateEntity<AppDefinition>({
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
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw App Definition data
 * @return {AppDefinition} Wrapped App Definition data
 */
export function wrapAppDefinition(http: AxiosInstance, data: AppDefinitionProps) {
  const appDefinition = toPlainObject(cloneDeep(data))
  const appDefinitionWithMethods = enhanceWithMethods(appDefinition, createAppDefinitionApi(http))
  return freezeSys(appDefinitionWithMethods)
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw App Definition collection data
 * @return {AppDefinitionCollection} Wrapped App Definition collection data
 */
export function wrapAppDefinitionCollection(
  http: AxiosInstance,
  data: CollectionProp<AppDefinitionProps>
) {
  const appDefinitions = toPlainObject(cloneDeep(data))
  appDefinitions.items = appDefinitions.items.map((entity) => wrapAppDefinition(http, entity))
  return freezeSys(appDefinitions)
}
