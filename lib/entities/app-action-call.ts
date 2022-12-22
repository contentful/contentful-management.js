import copy from 'fast-copy'
import { toPlainObject } from 'contentful-sdk-core'
import { Except } from 'type-fest'
import { BasicMetaSysProps, DefaultElements, MakeRequest, SysLink } from '../common-types'

type AppActionCallSys = Except<BasicMetaSysProps, 'version'> & {
  type: 'AppActionCall'
  appDefinition: SysLink
  space: SysLink
  environment: SysLink
  action: SysLink
  category: SysLink
}

export type AppActionCallProps = {
  /**
   * System metadata
   */
  sys: AppActionCallSys
}

export type CreateAppActionCallProps = {
  /** The body for the call */
  parameters: { [key: string]: any }
}

export interface AppActionCall extends AppActionCallProps, DefaultElements<AppActionCallProps> {}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw AppActionCall data
 * @return Wrapped AppActionCall data
 */
export function wrapAppActionCall(
  _makeRequest: MakeRequest,
  data: AppActionCallProps
): AppActionCall {
  const signedRequest = toPlainObject(copy(data))
  return signedRequest
}
