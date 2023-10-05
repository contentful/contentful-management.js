import copy from 'fast-copy'
import { toPlainObject } from 'contentful-sdk-core'
import { Except } from 'type-fest'
import { BasicMetaSysProps, DefaultElements, MakeRequest, SysLink } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'

type AppKeySys = Except<BasicMetaSysProps, 'version'> & {
  appDefinition: SysLink
  organization: SysLink
}

export type AppKeyProps = {
  /**
   * System metadata
   */
  sys: AppKeySys
  jwk: JsonWebKey
}

export type CreateAppKeyProps = {
  /** Toggle for automatic private key generation */
  generate?: boolean
  /** JSON Web Key, required if generate is falsy */
  jwk?: string
}

export interface AppKey extends AppKeyProps, DefaultElements<AppKeyProps> {
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
   * .then((organization) => organization.getAppKey(<api-key-id>))
   * .then((signingSecret) => signingSecret.delete())
   * .then(() => console.log('signingSecret deleted'))
   * .catch(console.error)
   * ```
   */
  delete(): Promise<void>
}

function createKeyApi(makeRequest: MakeRequest) {
  const getParams = (data: AppKeyProps) => ({
    organizationId: data.sys.organization.sys.id,
    appDefinitionId: data.sys.appDefinition.sys.id,
    fingerprint: data.sys.id,
  })

  return {
    delete: function del() {
      const self = this as AppKeyProps
      return makeRequest({
        entityType: 'AppKey',
        action: 'delete',
        params: getParams(self),
      })
    },
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw AppKey data
 * @return Wrapped AppKey data
 */
export function wrapAppKey(makeRequest: MakeRequest, data: AppKeyProps): AppKey {
  const key = toPlainObject(copy(data))
  return enhanceWithMethods(key, createKeyApi(makeRequest))
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Key collection data
 * @return Wrapped App Key collection data
 */
export const wrapAppKeyCollection = wrapCollection(wrapAppKey)
