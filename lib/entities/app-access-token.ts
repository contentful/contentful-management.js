/**
 * @module
 * @category Entities
 */
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

/** Properties of an app access token for authenticating app requests. */
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

/** Properties required to create a new app access token. */
export type CreateAppAccessTokenProps = {
  /**
   * JSON Web Token
   */
  jwt: string
}

/** A Contentful app access token used to authenticate app API requests. */
export interface AppAccessToken extends AppAccessTokenProps, DefaultElements<AppAccessTokenProps> {}

/**
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw app access token data
 * @returns {AppAccessToken} Wrapped AppAccessToken data
 */
export function wrapAppAccessToken(
  _makeRequest: MakeRequest,
  data: AppAccessTokenProps,
): AppAccessToken {
  const appAccessToken = toPlainObject(copy(data))
  return freezeSys(appAccessToken)
}
