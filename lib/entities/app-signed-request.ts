/**
 * @module
 * @category Entities
 */
import copy from 'fast-copy'
import { toPlainObject } from 'contentful-sdk-core'
import type { Except } from 'type-fest'
import type { BasicMetaSysProps, DefaultElements, MakeRequest, SysLink } from '../common-types'

type AppSignedRequestSys = Except<BasicMetaSysProps, 'version' | 'id'> & {
  appDefinition: SysLink
  space: SysLink
  environment: SysLink
}

/** Properties of a Contentful app signed request. */
export type AppSignedRequestProps = {
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

/** Properties required to create a new app signed request. */
export type CreateAppSignedRequestProps = {
  /** the request method */
  method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH' | 'HEAD'
  /** the path of the request method */
  path: string
  /** optional stringified body of the request */
  body?: string
  /** optional headers of the request */
  headers?: Record<string, string>
}

/** A Contentful app signed request containing verification headers. */
export interface AppSignedRequest
  extends AppSignedRequestProps,
    DefaultElements<AppSignedRequestProps> {}

/**
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw AppSignedRequest data
 * @returns Wrapped AppSignedRequest data
 */
export function wrapAppSignedRequest(
  _makeRequest: MakeRequest,
  data: AppSignedRequestProps,
): AppSignedRequest {
  const signedRequest = toPlainObject(copy(data))
  return signedRequest
}
