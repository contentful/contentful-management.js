import copy from 'fast-copy'
import { toPlainObject } from 'contentful-sdk-core'
import { Except } from 'type-fest'
import { BasicMetaSysProps, DefaultElements, MakeRequest, SysLink } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'

type AppSigningSecretSys = Except<BasicMetaSysProps, 'version' | 'id'> & {
  appDefinition: SysLink
  organization: SysLink
}

export type AppSigningSecretProps = {
  /**
   * System metadata
   */
  sys: AppSigningSecretSys
  /** The last four characters of the signing secret */
  redactedValue: string
}

export type CreateAppSigningSecretProps = {
  /** A 64 character matching the regular expression /^[0-9a-zA-Z+/=_-]+$/  */
  value: string
}

export interface AppSigningSecret
  extends AppSigningSecretProps,
    DefaultElements<AppSigningSecretProps> {
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
   * .then((organization) => organization.getAppSigningSecret(<api-key-id>))
   * .then((signingSecret) => signingSecret.delete())
   * .then(() => console.log('signingSecret deleted'))
   * .catch(console.error)
   * ```
   */
  delete(): Promise<void>
}

function createSigningSecretApi(makeRequest: MakeRequest) {
  const getParams = (data: AppSigningSecretProps) => ({
    organizationId: data.sys.organization.sys.id,
    appDefinitionId: data.sys.appDefinition.sys.id,
  })

  return {
    delete: function del() {
      const self = this as AppSigningSecretProps
      return makeRequest({
        entityType: 'AppSigningSecret',
        action: 'delete',
        params: getParams(self),
      })
    },
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw AppSigningSecret data
 * @return Wrapped AppSigningSecret data
 */
export function wrapAppSigningSecret(
  makeRequest: MakeRequest,
  data: AppSigningSecretProps
): AppSigningSecret {
  const signingSecret = toPlainObject(copy(data))
  return enhanceWithMethods(signingSecret, createSigningSecretApi(makeRequest))
}
