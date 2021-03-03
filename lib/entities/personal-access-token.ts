import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import { MetaSysProps, DefaultElements, MakeRequestWithoutUserAgent } from '../common-types'

export type PersonalAccessTokenProp = {
  sys: MetaSysProps
  name: string
  scopes: 'content_management_manage'[]
  revokedAt: null | string
  token?: string
}

export type CreatePersonalAccessTokenProps = Pick<PersonalAccessToken, 'name' | 'scopes'>

export interface PersonalAccessToken
  extends PersonalAccessTokenProp,
    DefaultElements<PersonalAccessTokenProp> {
  /**
   * Revokes a personal access token
   * @return Object the revoked personal access token
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *  accessToken: <content_management_api_key>
   * })
   *
   * client.getPersonalAccessToken('<token-id>')
   *  .then((personalAccessToken) => {
   *    return personalAccessToken.revoke()
   *  })
   *  .catch(console.error)
   * ```
   */
  revoke(): Promise<PersonalAccessToken>
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw  personal access token data
 * @return Wrapped personal access token
 */
export function wrapPersonalAccessToken(
  makeRequest: MakeRequestWithoutUserAgent,
  data: PersonalAccessTokenProp
): PersonalAccessToken {
  const personalAccessToken = toPlainObject(copy(data))
  const personalAccessTokenWithMethods = enhanceWithMethods(personalAccessToken, {
    revoke: function () {
      return makeRequest({
        entityType: 'PersonalAccessToken',
        action: 'revoke',
        params: { tokenId: data.sys.id },
      }).then((data) => wrapPersonalAccessToken(makeRequest, data))
    },
  })
  return freezeSys(personalAccessTokenWithMethods)
}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw personal access collection data
 * @return Wrapped personal access token collection data
 */
export const wrapPersonalAccessTokenCollection = wrapCollection(wrapPersonalAccessToken)
