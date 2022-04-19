import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { Except } from 'type-fest'
import { wrapCollection } from '../common-utils'
import { BasicMetaSysProps, DefaultElements, MakeRequest, SysLink } from '../common-types'
import { ParameterDefinition } from './widget-parameters'
import enhanceWithMethods from '../enhance-with-methods'

type AppActionSys = Except<BasicMetaSysProps, 'version'> & {
  appDefinition: SysLink
  organization: SysLink
}

export type AppActionParameterDefinition = Omit<ParameterDefinition, 'labels'>

export enum AppActionCategory {
  EntryListV1Beta = 'EntryList.v1.0-beta',
  NotificationV1Beta = 'Notification.v1.0-beta',
  Custom = 'Custom',
}

export type CreateAppActionProps = {
  url: string
  category: AppActionCategory
  parameters?: AppActionParameterDefinition[]
  name: string
}

export type AppActionProps = {
  /**
   * System metadata
   */
  sys: AppActionSys
  /**
   * Category identifying the shape of the action. Choose "Custom" for custom schema
   */
  category: AppActionCategory
  /**
   * Url that will be called when the action is invoked
   */
  url: string
  /**
   * An optional schema for which body parameters need to be provided when calling the action
   */
  parameters?: AppActionParameterDefinition[]
  /**
   * Human readable name for the action
   */
  name: string
}

export interface AppAction extends AppActionProps, DefaultElements<AppActionProps> {
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
