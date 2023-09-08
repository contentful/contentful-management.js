import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import { DefaultElements, MakeRequest, BasicMetaSysProps, SysLink } from '../common-types'

type Application = {
  id?: string
  name?: string
  sys: SysLink
}

type AccessTokenSysProps = BasicMetaSysProps & {
  application: Application | null
  expiresAt: string | null
  lastUsedAt: string | null
  redactedValue: string
}

export type AccessTokenProp = {
  sys: AccessTokenSysProps
  name: string
  scopes: 'content_management_manage'[]
  revokedAt: null | string
  token?: string
}

export type CreatePersonalAccessTokenProps = Pick<AccessToken, 'name' | 'scopes'> & {
  expiresIn: number
}

export interface AccessToken extends AccessTokenProp, DefaultElements<AccessTokenProp> {
  /**
   * Revokes access token
   * @return Object the revoked access token
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *  accessToken: <content_management_api_key>
   * })
   *
   * client.getAccessToken('<token-id>')
   *  .then((AccessToken) => {
   *    return accessToken.revoke()
   *  })
   *  .catch(console.error)
   * ```
   */
  revoke(): Promise<AccessToken>
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw  access token data
 * @return Wrapped access token
 */
export function wrapAccessToken(makeRequest: MakeRequest, data: AccessTokenProp): AccessToken {
  const AccessToken = toPlainObject(copy(data))
  const accessTokenWithMethods = enhanceWithMethods(AccessToken, {
    revoke: function () {
      return makeRequest({
        entityType: 'AccessToken',
        action: 'revoke',
        params: { tokenId: data.sys.id },
      }).then((data) => wrapAccessToken(makeRequest, data))
    },
  })
  return freezeSys(accessTokenWithMethods)
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw access collection data
 * @return Wrapped access token collection data
 */
export const wrapAccessTokenCollection = wrapCollection(wrapAccessToken)
