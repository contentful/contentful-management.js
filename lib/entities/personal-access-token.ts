import type { AxiosInstance } from 'contentful-sdk-core'
import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import { MetaSysProps, DefaultElements } from '../common-types'
import * as endpoints from '../plain/endpoints'

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
 * @param http - HTTP client instance
 * @param data - Raw  personal access token data
 * @return Wrapped personal access token
 */
export function wrapPersonalAccessToken(
  http: AxiosInstance,
  data: PersonalAccessTokenProp
): PersonalAccessToken {
  const personalAccessToken = toPlainObject(cloneDeep(data))
  const personalAccessTokenWithMethods = enhanceWithMethods(personalAccessToken, {
    revoke: function () {
      return endpoints.personalAccessToken
        .revoke(http, { tokenId: data.sys.id })
        .then((data) => wrapPersonalAccessToken(http, data))
    },
  })
  return freezeSys(personalAccessTokenWithMethods)
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw personal access collection data
 * @return Wrapped personal access token collection data
 */
export const wrapPersonalAccessTokenCollection = wrapCollection(wrapPersonalAccessToken)
