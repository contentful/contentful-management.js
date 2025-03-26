import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { Except } from 'type-fest'
import { wrapCollection } from '../common-utils'
import type {
  BasicMetaSysProps,
  DefaultElements,
  Link,
  MakeRequest,
} from '../common-types'
import type { ParameterDefinition } from './widget-parameters'
import enhanceWithMethods from '../enhance-with-methods'

type AppActionSys = Except<BasicMetaSysProps, 'version'> & {
  appDefinition: Link<'AppDefinition'>
  organization: Link<'Organization'>
}

export type AppActionParameterDefinition = Omit<ParameterDefinition, 'labels'>

export type AppActionCategoryProps = {
  sys: {
    id: AppActionCategoryType
    type: 'AppActionCategory'
    version: string
  }
  name: string
  description: string
  parameters?: AppActionParameterDefinition[]
}

type BuiltInCategoriesProps = {
  /**
   * Category identifying the shape of the action.
   */
  category: 'Entries.v1.0' | 'Notification.v1.0'
}

type CustomAppActionProps = {
  /**
   * "Custom" category requires "parameters"
   */
  category: 'Custom'
  parameters: AppActionParameterDefinition[]
}

type AppActionCategory = BuiltInCategoriesProps | CustomAppActionProps
export type AppActionCategoryType = AppActionCategory['category']

/**
 * 'function' is deprecated, use 'function-invocation' instead
 */
export type AppActionType = 'endpoint' | 'function' | 'function-invocation'

type BaseAppActionProps = AppActionCategory & {
  /**
   * System metadata
   */
  sys: AppActionSys
  /**
   * Human readable name for the action
   */
  name: string
  /**
   * Human readable description of the action
   */
  description?: string
}

type CreateEndpointAppActionProps = {
  /**
   * Type of the action, defaults to endpoint if not provided
   * endpoint: action is sent to specified URL
   */
  type?: 'endpoint'
  /**
   * Url that will be called when the action is invoked
   */
  url: string
}

type EndpointAppActionProps = {
  /**
   * Type of the action
   * endpoint: action is sent to specified URL
   */
  type: 'endpoint'
  /**
   * Url that will be called when the action is invoked
   */
  url: string
}

type CreateFunctionAppActionProps = {
  /**
   * Type of the action
   * function-invocation: action invokes a contentful function
   */
  type: 'function-invocation'
  /**
   * Link to a Function
   */
  function: Link<'Function'>
  /**
   * ID of the action
   */
  id?: string
}

type FunctionAppActionProps = {
  /**
   * Type of the action
   * function-invocation: action invokes a contentful function
   */
  type: 'function-invocation'
  /**
   * Link to a Function
   */
  function: Link<'Function'>
}

/**
 * @deprecated Use FunctionAppActionProps instead
 */
type LegacyFunctionAppActionProps = Record<string, unknown> & {
  type: 'function'
}

export type CreateAppActionProps = AppActionCategory & {
  name: string
  description?: string
} & (CreateEndpointAppActionProps | CreateFunctionAppActionProps | LegacyFunctionAppActionProps)

export type AppActionProps = BaseAppActionProps &
  (EndpointAppActionProps | FunctionAppActionProps | LegacyFunctionAppActionProps)

export type AppAction = AppActionProps &
  DefaultElements<AppActionProps> & {
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
     * .then((appDefinition) => appDefinition.getAppAction('<app-action-id>'))
     * .then((appAction) => appAction.delete())
     * .catch(console.error)
     * ```
     */
    delete(): Promise<void>
  }

/**
 * @private
 */
function createAppActionApi(makeRequest: MakeRequest) {
  const getParams = (data: AppActionProps) => ({
    organizationId: data.sys.organization.sys.id,
    appDefinitionId: data.sys.appDefinition.sys.id,
    appActionId: data.sys.id,
  })

  return {
    delete: function del() {
      const data = this.toPlainObject() as AppActionProps
      return makeRequest({
        entityType: 'AppAction',
        action: 'delete',
        params: getParams(data),
      })
    },
  }
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Bundle data
 * @return Wrapped App Bundle data
 */
export function wrapAppAction(makeRequest: MakeRequest, data: AppActionProps): AppAction {
  const appAction = toPlainObject(copy(data))

  const appActionWithMethods = enhanceWithMethods(appAction, createAppActionApi(makeRequest))

  return freezeSys(appActionWithMethods)
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Bundle collection data
 * @return Wrapped App Bundle collection data
 */
export const wrapAppActionCollection = wrapCollection(wrapAppAction)
