import copy from 'fast-copy'
import { toPlainObject } from 'contentful-sdk-core'
import { Except } from 'type-fest'
import { BasicMetaSysProps, DefaultElements, MakeRequest, SysLink } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'

type AppMetadataSys = Except<BasicMetaSysProps, 'version' | 'id'> & {
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

export type AppMetadataProps = {
  /**
   * System metadata
   */
  sys: AppMetadataSys
  /**
   * An Icon that represents the App
   */
  icon?: AppIcon
}

export type CreateAppMetadataProps = {
  /**
   * An Icon that represents the App
   */
  icon?: AppIcon
}

export interface AppMetadata extends AppMetadataProps, DefaultElements<AppMetadataProps> {
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
   * .then((organization) => organization.getAppMetadata(<app-id>))
   * .then((appMetadata) => appMetadata.delete())
   * .then(() => console.log('appMetadata deleted'))
   * .catch(console.error)
   * ```
   */
  delete(): Promise<void>
}

function createMetadataApi(makeRequest: MakeRequest) {
  const getParams = (data: AppMetadataProps) => ({
    organizationId: data.sys.organization.sys.id,
    appDefinitionId: data.sys.appDefinition.sys.id,
  })

  return {
    delete: function del() {
      const self = this as AppMetadataProps
      return makeRequest({
        entityType: 'AppMetadata',
        action: 'delete',
        params: getParams(self),
      })
    },
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw AppMetadata data
 * @return Wrapped AppMetadata data
 */
export function wrapAppMetadata(makeRequest: MakeRequest, data: AppMetadataProps): AppMetadata {
  const signingSecret = toPlainObject(copy(data))
  return enhanceWithMethods(signingSecret, createMetadataApi(makeRequest))
}
