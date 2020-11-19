import cloneDeep from 'lodash/cloneDeep'
import { AxiosInstance } from 'axios'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { EntryFields } from './entry-fields'
import * as endpoints from '../plain/endpoints'
import { wrapCollection } from '../common-utils'
import { DefaultElements, BasicMetaSysProps, SysLink } from '../common-types'
import { SetRequired, RequireExactlyOne } from 'type-fest'

export type UIExtensionProps = {
  sys: BasicMetaSysProps & { space: SysLink; environment: SysLink }
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

export type CreateUIExtensionProps = RequireExactlyOne<
  SetRequired<UIExtensionProps['extension'], 'name' | 'fieldTypes' | 'sidebar'>,
  'src' | 'srcdoc'
>

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
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getUiExtension('<ui_extension_id>'))
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
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getUiExtension('<ui_extension_id>'))
   * .then((uiExtension) => uiExtension.delete())
   * .then(() => console.log(`UI Extension deleted.`))
   * .catch(console.error)
   * ```
   */
  delete(): Promise<void>
}

function createUiExtensionApi(http: AxiosInstance) {
  const getParams = (data: UIExtensionProps) => ({
    spaceId: data.sys.space.sys.id,
    environmentId: data.sys.environment.sys.id,
    extensionId: data.sys.id,
  })

  return {
    update: function update() {
      const data = this.toPlainObject() as UIExtensionProps
      return endpoints.uiExtension
        .update(http, getParams(data), data)
        .then((data) => wrapUiExtension(http, data))
    },
    delete: function del() {
      const data = this.toPlainObject() as UIExtensionProps
      return endpoints.uiExtension.del(http, getParams(data))
    },
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw UI Extension data
 * @return Wrapped UI Extension data
 */
export function wrapUiExtension(http: AxiosInstance, data: UIExtensionProps): UIExtension {
  const uiExtension = toPlainObject(cloneDeep(data))
  const uiExtensionWithMethods = enhanceWithMethods(uiExtension, createUiExtensionApi(http))
  return freezeSys(uiExtensionWithMethods)
}

/**
 * @private
 */
export const wrapUiExtensionCollection = wrapCollection(wrapUiExtension)
