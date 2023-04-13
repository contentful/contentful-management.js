import copy from 'fast-copy'
import { toPlainObject } from 'contentful-sdk-core'
import { Except } from 'type-fest'
import { BasicMetaSysProps, DefaultElements, MakeRequest, SysLink } from '../common-types'
import { WebhookCallDetailsProps } from './webhook'

type AppActionCallSys = Except<BasicMetaSysProps, 'version'> & {
  appDefinition: SysLink
  space: SysLink
  environment: SysLink
  action: SysLink
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

export interface AppActionCall
  extends WebhookCallDetailsProps,
    DefaultElements<WebhookCallDetailsProps> {}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw AppActionCall data
 * @return Wrapped AppActionCall data
 */
export function wrapAppActionCall(
  _makeRequest: MakeRequest,
  data: WebhookCallDetailsProps
): AppActionCall {
  const signedRequest = toPlainObject(copy(data))
  return signedRequest
}

export async function waitFor(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
