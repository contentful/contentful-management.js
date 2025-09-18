import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import type { Except } from 'type-fest'
import type { BasicMetaSysProps, DefaultElements, MakeRequest, SysLink } from '../common-types'

type AppAccessTokenSys = Except<BasicMetaSysProps, 'version' | 'id'> & {
  space: SysLink
  environment: SysLink
  appDefinition: SysLink
  expiresAt: string
}

export type AppAccessTokenProps = {
  /**
   * System metadata
   */
  sys: AppAccessTokenSys
  /**
   * Token for an app installation in a space environment
   */
  token: string
}

export type CreateAppAccessTokenProps = {
  /**
   * JSON Web Token
   */
  jwt: string
}

export interface AppAccessToken extends AppAccessTokenProps, DefaultElements<AppAccessTokenProps> {}

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw app access token data
 * @return {AppAccessToken} Wrapped AppAccessToken data
 */
export function wrapAppAccessToken(
  _makeRequest: MakeRequest,
  data: AppAccessTokenProps,
): AppAccessToken {
  const appAccessToken = toPlainObject(copy(data))
  return freezeSys(appAccessToken)
}
