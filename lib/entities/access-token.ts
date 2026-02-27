/**
 * @module
 * @category Entities
 */
import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import type { DefaultElements, MakeRequest, BasicMetaSysProps, SysLink } from '../common-types'

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

/** Properties of a Contentful personal access token. */
export type AccessTokenProps = {
  sys: AccessTokenSysProps
  name: string
  scopes: 'content_management_manage'[]
  revokedAt: null | string
  token?: string
}

/**
 * @deprecated Use `AccessTokenProps` instead.
 */
export type AccessTokenProp = AccessTokenProps

/** Properties required to create a new personal access token. */
export type CreatePersonalAccessTokenProps = Pick<AccessToken, 'name' | 'scopes'> & {
  expiresIn: number
}

/** A Contentful personal access token with methods for revoking it. */
export interface AccessToken extends AccessTokenProps, DefaultElements<AccessTokenProps> {
  /**
   * Revokes access token
   * @returns Object the revoked access token
   * @example
   * ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *  accessToken: '<content_management_api_key>'
   * })
   *
   * client.getAccessToken('<token-id>')
   *  .then((accessToken) => {
   *    return accessToken.revoke()
   *  })
   *  .catch(console.error)
   * ```
   */
  revoke(): Promise<AccessToken>
}

/**
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw  access token data
 * @returns Wrapped access token
 */
export function wrapAccessToken(makeRequest: MakeRequest, data: AccessTokenProps): AccessToken {
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
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw access collection data
 * @returns Wrapped access token collection data
 */
export const wrapAccessTokenCollection = wrapCollection(wrapAccessToken)
