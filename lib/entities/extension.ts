import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { FieldType } from './field-type'
import { DefinedParameters, ParameterDefinition } from './widget-parameters'
import { wrapCollection } from '../common-utils'
import { DefaultElements, BasicMetaSysProps, SysLink, MakeRequest } from '../common-types'
import { SetRequired, RequireExactlyOne } from 'type-fest'

type ExtensionSysProps = BasicMetaSysProps & {
  space: SysLink
  environment: SysLink
  srcdocSha256?: string
}

export type ExtensionProps = {
  sys: ExtensionSysProps
  extension: {
    /**
     * Extension name
     */
    name: string
    /**
     * Field types where an extension can be used
     */
    fieldTypes: FieldType[]
    /**
     * URL where the root HTML document of the extension can be found
     */
    src?: string
    /**
     * String representation of the extension (e.g. inline HTML code)
     */
    srcdoc?: string
    /**
     * Parameter definitions
     */
    parameters?: {
      instance?: ParameterDefinition[]
      installation?: ParameterDefinition[]
    }
    /**
     * Controls the location of the extension. If true it will be rendered on the sidebar instead of replacing the field's editing control
     */
    sidebar?: boolean
  }
  /**
   * Values for installation parameters
   */
  parameters?: DefinedParameters
}

export type CreateExtensionProps = {
  extension: RequireExactlyOne<
    SetRequired<ExtensionProps['extension'], 'name' | 'fieldTypes' | 'sidebar'>,
    'src' | 'srcdoc'
  >
}

export interface Extension extends ExtensionProps, DefaultElements<ExtensionProps> {
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
   * .then((extension) => {
   *   extension.extension.name = 'New UI Extension name'
   *   return extension.update()
   * })
   * .then((extension) => console.log(`UI Extension ${extension.sys.id} updated.`))
   * .catch(console.error)
   * ```
   */
  update(): Promise<Extension>
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
   * .then((extension) => extension.delete())
   * .then(() => console.log(`UI Extension deleted.`))
   * .catch(console.error)
   * ```
   */
  delete(): Promise<void>
}

/**
 * @private
 */
function createExtensionApi(makeRequest: MakeRequest) {
  const getParams = (data: ExtensionProps) => ({
    spaceId: data.sys.space.sys.id,
    environmentId: data.sys.environment.sys.id,
    extensionId: data.sys.id,
  })

  return {
    update: function update() {
      const data = this.toPlainObject() as ExtensionProps
      return makeRequest({
        entityType: 'Extension',
        action: 'update',
        params: getParams(data),
        payload: data,
      }).then((response) => wrapExtension(makeRequest, response))
    },
    delete: function del() {
      const data = this.toPlainObject() as ExtensionProps
      return makeRequest({
        entityType: 'Extension',
        action: 'delete',
        params: getParams(data),
      })
    },
  }
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw UI Extension data
 * @return Wrapped UI Extension data
 */
export function wrapExtension(makeRequest: MakeRequest, data: ExtensionProps): Extension {
  const extension = toPlainObject(copy(data))
  const extensionWithMethods = enhanceWithMethods(extension, createExtensionApi(makeRequest))
  return freezeSys(extensionWithMethods)
}

/**
 * @private
 */
export const wrapExtensionCollection = wrapCollection(wrapExtension)
