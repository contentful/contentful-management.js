import copy from 'fast-copy'
import { toPlainObject } from 'contentful-sdk-core'
import { Except } from 'type-fest'
import { BasicMetaSysProps, DefaultElements, MakeRequest, SysLink } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'

type AppDetailsSys = Except<BasicMetaSysProps, 'version' | 'id'> & {
  appDefinition: SysLink
  organization: SysLink
}

// TODO should these be exported?
enum IconType {
  Base64 = 'base64',
}
interface AppIcon {
  value: string
  type: IconType
}

export type AppDetailsProps = {
  /**
   * System metadata
   */
  sys: AppDetailsSys
  /**
   * An Icon that represents the App
   */
  icon?: AppIcon
}

export type CreateAppDetailsProps = {
  /**
   * An Icon that represents the App
   */
  icon?: AppIcon
}

export interface AppDetails extends AppDetailsProps, DefaultElements<AppDetailsProps> {
  /**
   * Deletes this object on the server.
   * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   * client.getOrganization('<organization_id>')
   * .then((organization) => organization.getAppDetails(<app-id>))
   * .then((appDetails) => appDetails.delete())
   * .then(() => console.log('appDetails deleted'))
   * .catch(console.error)
   * ```
   */
  delete(): Promise<void>
}

function createDetailsApi(makeRequest: MakeRequest) {
  const getParams = (data: AppDetailsProps) => ({
    organizationId: data.sys.organization.sys.id,
    appDefinitionId: data.sys.appDefinition.sys.id,
  })

  return {
    delete: function del() {
      const self = this as AppDetailsProps
      return makeRequest({
        entityType: 'AppDetails',
        action: 'delete',
        params: getParams(self),
      })
    },
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw AppDetails data
 * @return Wrapped AppDetails data
 */
export function wrapAppDetails(makeRequest: MakeRequest, data: AppDetailsProps): AppDetails {
  const signingSecret = toPlainObject(copy(data))
  return enhanceWithMethods(signingSecret, createDetailsApi(makeRequest))
}
