/**
 * @module
 * @category Entities
 */
import copy from 'fast-copy'
import { toPlainObject } from 'contentful-sdk-core'
import type { Except } from 'type-fest'
import type { BasicMetaSysProps, DefaultElements, MakeRequest, SysLink } from '../common-types'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'

type AppKeySys = Except<BasicMetaSysProps, 'version'> & {
  appDefinition: SysLink
  organization: SysLink
}

/** A JSON Web Key used for app authentication. */
export interface JWK {
  alg: 'RS256'
  kty: 'RSA'
  use: 'sig'
  x5c: [string]
  kid: string
  x5t: string
}

/** Properties of a Contentful app key. */
export type AppKeyProps = {
  /**
   * System metadata
   */
  sys: AppKeySys
  /**
   * JSON Web Key
   */
  jwk: JWK
  /**
   * If generated, private key is returned
   */
  generated?: {
    /**
     * Base64 PEM
     */
    privateKey: string
  }
}

/** Properties required to create a new app key. */
export type CreateAppKeyProps = {
  /**
   * Toggle for automatic private key generation
   */
  generate?: boolean
  /**
   * JSON Web Key, required if generate is falsy
   */
  jwk?: JWK
}

/** A Contentful app key with methods for deleting. */
export interface AppKey extends AppKeyProps, DefaultElements<AppKeyProps> {
  /**
   * Deletes this object on the server.
   * @returns Promise for the deletion. It contains no data, but the Promise error case should be handled.
   * @example
   * ```javascript
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
 * @internal
 * @param http - HTTP client instance
 * @param data - Raw AppKey data
 * @returns Wrapped AppKey data
 */
export function wrapAppKey(makeRequest: MakeRequest, data: AppKeyProps): AppKey {
  const key = toPlainObject(copy(data))
  return enhanceWithMethods(key, createKeyApi(makeRequest))
}

/**
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Key collection data
 * @returns Wrapped App Key collection data
 */
export const wrapAppKeyCollection = wrapCollection(wrapAppKey)
