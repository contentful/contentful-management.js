/**
 * @module
 * @category Entities
 */
import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import type { MetaSysProps, MetaLinkProps, DefaultElements, MakeRequest } from '../common-types'
import { wrapCollection } from '../common-utils'
import type { DefinedParameters } from './widget-parameters'

interface WidgetConfig {
  /**
   * Type of the widget used
   */
  widgetNamespace?: string
  /**
   * ID of the widget used
   */
  widgetId?: string
  /**
   * Instance parameter values
   */
  settings?: DefinedParameters
}

/** Configuration for a content type field's editing widget */
export interface Control extends WidgetConfig {
  /**
   * ID of the customized field
   */
  fieldId: string
}

/** Configuration for a field group's editing widget */
export interface GroupControl extends WidgetConfig {
  /**
   * ID of the customized field group
   */
  groupId: string
}

/** A named group of fields in an editor layout */
export interface FieldGroupItem {
  groupId: string
  name: string
  items: EditorLayoutItem[]
}

/** A single field reference in an editor layout */
export interface FieldItem {
  fieldId: string
}

/** An item in an editor layout, either a single field or a field group */
export type EditorLayoutItem = FieldItem | FieldGroupItem

/** Configuration for an entry editor widget */
export interface Editor {
  /**
   * Type of the widget used
   */
  widgetNamespace: string
  /**
   * ID of the widget used
   */
  widgetId: string
  /**
   * Widget will be enabled if disabled property is missing
   */
  disabled?: boolean
  /**
   * Instance parameter values
   */
  settings?: DefinedParameters
}

/** Configuration for a sidebar widget */
export interface SidebarItem {
  /**
   * Type of the widget used
   */
  widgetNamespace: string
  /**
   * ID of the widget used
   */
  widgetId: string
  /**
   * Widget will be enabled if disabled property is missing
   */
  disabled?: boolean
  /**
   * Instance parameter values
   */
  settings?: DefinedParameters
}

/** Properties of an editor interface that defines how a content type's fields are displayed */
export type EditorInterfaceProps = {
  sys: MetaSysProps & {
    space: { sys: MetaLinkProps }
    environment: { sys: MetaLinkProps }
    contentType: { sys: MetaLinkProps }
  }
  /**
   * Array of fields and their associated widgetId
   */
  controls?: Control[]
  /**
   * Array of field groups and their associated widgetId
   */
  groupControls?: GroupControl[]
  /**
   * Array of editors. Defaults will be used if property is missing.
   */
  editors?: Editor[]
  /**
   * Legacy singular editor override
   */
  editor?: Editor
  /**
   * Array of editor layout field groups
   */
  editorLayout?: FieldGroupItem[]
  /**
   * Array of sidebar widgets. Defaults will be used if property is missing.
   */
  sidebar?: SidebarItem[]
}

/** An editor interface with methods to update and query field controls */
export interface EditorInterface
  extends EditorInterfaceProps,
    DefaultElements<EditorInterfaceProps> {
  /**
   * Gets a control for a specific field
   * @returns control object for specific field
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
   * @returns Object returned from the server with updated changes.
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

/**
 * @internal
 */
function createEditorInterfaceApi(makeRequest: MakeRequest) {
  return {
    update: function () {
      const self = this as EditorInterface
      const raw = self.toPlainObject()
      return makeRequest({
        entityType: 'EditorInterface',
        action: 'update',
        params: {
          spaceId: self.sys.space.sys.id,
          environmentId: self.sys.environment.sys.id,
          contentTypeId: self.sys.contentType.sys.id,
        },
        payload: raw,
      }).then((response) => wrapEditorInterface(makeRequest, response))
    },

    getControlForField: function (fieldId: string) {
      const self = this as EditorInterface
      const result = (self.controls || []).filter((control) => {
        return control.fieldId === fieldId
      })
      return result && result.length > 0 ? result[0] : null
    },
  }
}

/**
 * @internal
 */
export function wrapEditorInterface(
  makeRequest: MakeRequest,
  data: EditorInterfaceProps,
): EditorInterface {
  const editorInterface = toPlainObject(copy(data))
  const editorInterfaceWithMethods = enhanceWithMethods(
    editorInterface,
    createEditorInterfaceApi(makeRequest),
  )
  return freezeSys(editorInterfaceWithMethods)
}

/**
 * @internal
 */
export const wrapEditorInterfaceCollection = wrapCollection(wrapEditorInterface)
