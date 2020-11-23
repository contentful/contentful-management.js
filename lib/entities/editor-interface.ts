import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { AxiosInstance } from 'axios'
import { MetaSysProps, MetaLinkProps, DefaultElements } from '../common-types'
import { wrapCollection } from '../common-utils'
import * as endpoints from '../plain/endpoints'

export interface Control {
  /**
   * the id of the customized field
   */
  fieldId: string
  /**
   * customization associated to the field
   */
  widgetId: string
  widgetNamespace: string
  settings?: Record<string, any>
}

export interface Editor {
  widgetId: string
  widgetNamespace: string
  /**
   * Widget will be enabled if disabled property is missing
   */
  disabled?: boolean
  settings?: Record<string, any>
}

export type EditorInterfaceProps = {
  sys: MetaSysProps & {
    space: { sys: MetaLinkProps }
    environment: { sys: MetaLinkProps }
    contentType: { sys: MetaLinkProps }
  }
  /**
   * Array of fields and it's associated widgetId
   */
  controls: Control[]
  /**
   * Array of editors. Defaults will be used if property is missing.
   */
  editors?: Editor[]
  /**
   * Array of sidebar widgerts. Defaults will be used if property is missing.
   */
  sidebar?: Editor[]
}

export interface EditorInterface
  extends EditorInterfaceProps,
    DefaultElements<EditorInterfaceProps> {
  /**
   * Gets a control for a specific field
   * @return control object for specific field
   * ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getContentType('<contentType_id>'))
   * .then((contentType) => contentType.getEditorInterface())
   * .then((editorInterface) => {
   *  control = editorInterface.getControlForField('<field-id>')
   *  console.log(control)
   * })
   * .catch(console.error)
   * ```
   */
  getControlForField(id: string): null | Control
  /**
   * Sends an update to the server with any changes made to the object's properties
   * @return Object returned from the server with updated changes.
   * ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment_id>'))
   * .then((environment) => environment.getContentType('<contentType_id>'))
   * .then((contentType) => contentType.getEditorInterface())
   * .then((editorInterface) => {
   *  editorInterface.controls[0] = { "fieldId": "title", "widgetId": "singleLine"}
   *  editorInterface.editors = [
   *    { "widgetId": "custom-widget", "widgetNamespace": "app" }
   *  ]
   *  return editorInterface.update()
   * })
   * .catch(console.error)
   * ```
   */
  update(): Promise<EditorInterface>
}

function createEditorInterfaceApi(http: AxiosInstance) {
  return {
    update: function () {
      const self = this as EditorInterface
      const raw = self.toPlainObject()
      return endpoints.editorInterface
        .update(
          http,
          {
            spaceId: self.sys.space.sys.id,
            environmentId: self.sys.environment.sys.id,
            contentTypeId: self.sys.contentType.sys.id,
          },
          raw
        )
        .then((response) => wrapEditorInterface(http, response))
    },

    getControlForField: function (fieldId: string) {
      const self = this as EditorInterface
      const result = self.controls.filter((control) => {
        return control.fieldId === fieldId
      })
      return result && result.length > 0 ? result[0] : null
    },
  }
}

/**
 * @private
 */
export function wrapEditorInterface(
  http: AxiosInstance,
  data: EditorInterfaceProps
): EditorInterface {
  const editorInterface = toPlainObject(cloneDeep(data))
  const editorInterfaceWithMethods = enhanceWithMethods(
    editorInterface,
    createEditorInterfaceApi(http)
  )
  return freezeSys(editorInterfaceWithMethods)
}

/**
 * @private
 */
export const wrapEditorInterfaceCollection = wrapCollection(wrapEditorInterface)
