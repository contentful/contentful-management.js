import cloneDeep from 'lodash/cloneDeep'
import { AxiosInstance } from 'axios'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { createUpdateEntity, createDeleteEntity } from '../instance-actions'
import { EntryFields } from './entry-fields'
import { CollectionProp, DefaultElements, MetaSysProps } from '../types/common-types'

export type UIExtensionProps = {
  sys: MetaSysProps
  extension: {
    /**
     * Extension name
     */
    name: string
    /**
     * Field types where an extension can be used
     */
    fieldTypes: EntryFields[]
    /**
     * URL where the root HTML document of the extension can be found
     */
    src?: string
    /**
     * String representation of the extension (e.g. inline HTML code)
     */
    srcdoc?: string
    /**
     * Controls the location of the extension. If true it will be rendered on the sidebar instead of replacing the field's editing control
     */
    sidebar: boolean
  }
}

export interface UIExtension extends UIExtensionProps, DefaultElements<UIExtensionProps> {
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
   * .then((space) => space.getUiExtension('<ui_extension_id>'))
   * .then((uiExtension) => {
   *   uiExtension.extension.name = 'New UI Extension name'
   *   return uiExtension.update()
   * })
   * .then((uiExtension) => console.log(`UI Extension ${uiExtension.sys.id} updated.`))
   * .catch(console.error)
   * ```
   */
  update(): Promise<UIExtension>
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
   * .then((space) => space.getUiExtension('<ui_extension_id>'))
   * .then((uiExtension) => uiExtension.delete())
   * .then(() => console.log(`UI Extension deleted.`))
   * .catch(console.error)
   * ```
   */
  delete(): Promise<void>
}

function createUiExtensionApi(http: AxiosInstance) {
  return {
    update: createUpdateEntity({
      http: http,
      entityPath: 'extensions',
      wrapperMethod: wrapUiExtension,
    }),
    delete: createDeleteEntity({
      http: http,
      entityPath: 'extensions',
    }),
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw UI Extension data
 * @return Wrapped UI Extension data
 */
export function wrapUiExtension(http: AxiosInstance, data: UIExtensionProps) {
  const uiExtension = toPlainObject(cloneDeep(data))
  enhanceWithMethods(uiExtension, createUiExtensionApi(http))
  return freezeSys(uiExtension)
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw UI Extension collection data
 * @return Wrapped UI Extension collection data
 */
export function wrapUiExtensionCollection(
  http: AxiosInstance,
  data: CollectionProp<UIExtensionProps>
) {
  const uiExtensions = toPlainObject(cloneDeep(data))
  uiExtensions.items = uiExtensions.items.map((entity) => wrapUiExtension(http, entity))
  return freezeSys(uiExtensions)
}
