import copy from 'fast-copy'
import { toPlainObject } from 'contentful-sdk-core'
import { Except } from 'type-fest'
import { BasicMetaSysProps, DefaultElements, MakeRequest, SysLink } from '../common-types'

type AppSignedRequestSys = Except<BasicMetaSysProps, 'version' | 'id'> & {
  appDefinition: SysLink
  space: SysLink
  environment: SysLink
}

export type AppSignedRequestProps = {
  /** the request method */
  method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH' | 'HEAD'
  /** the path of the request method */
  path: string
  /** optional stringified body of the request */
  body?: string
  /** optional headers of the request */
  headers?: Record<string, string>
}

export type CreateAppSignedRequestProps = {
  /**
   * System metadata
   */
  sys: AppSignedRequestSys
  /** new headers to be included in the request */
  additionalHeaders: {
    'x-contentful-signature': string
    'x-contentful-signed-headers': string
    'x-contentful-timestamp': string
    'x-contentful-space-id': string
    'x-contentful-environment-id': string
    'x-contentful-user-id': string
  }
}

export interface AppSignedRequest
  extends AppSignedRequestProps,
    DefaultElements<AppSignedRequestProps> {}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw AppSignedRequest data
 * @return Wrapped AppSignedRequest data
 */
export function wrapAppSignedRequest(
  _makeRequest: MakeRequest,
  data: AppSignedRequestProps
): AppSignedRequest {
  const signedRequest = toPlainObject(copy(data))
  return signedRequest
}
