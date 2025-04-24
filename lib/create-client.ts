/**
 * Navigate below to the `createClient` function to get started with using this library.
 * @module
 * @category Core
 */
import type { AdapterParams } from './create-adapter'
import type { ClientAPI } from './create-contentful-api'
import type { PlainClientDefaultParams } from './plain/plain-client'
import type { MakeRequest, XOR } from './common-types'
import type { PlainClientAPI } from './plain/plain-client-types'
import type { RestAdapterParams } from './adapters/REST/rest-adapter'

import { createAdapter } from './create-adapter'
import { createPlainClient } from './plain/plain-client'
import { getUserAgentHeader } from 'contentful-sdk-core'
import { createClientApi } from './create-contentful-api'

interface UserAgentParams {
  /**
   * Application name and version e.g myApp/version
   */
  application?: string
  /**
   * Integration name and version e.g react/version
   */
  integration?: string

  feature?: string
}

export type ClientOptions = UserAgentParams & XOR<RestAdapterParams, AdapterParams>

declare global {
  const __VERSION__: string
}

/**
 * Create a plain client instance
 *
 * @param clientOptions
 * @param opts
 *
 * @example Plain Client
 * ```javascript
 * const client = contentfulManagement.createClient({
 *   accessToken: 'myAccessToken',
 *   opts: {
 *     type: 'plain'
 *   }
 * })
 * ```
 * @example Plain Client with defaults
 * ```javascript
 * const client = contentfulManagement.createClient({
 *   accessToken: 'myAccessToken',
 *   opts: {
 *     type: 'plain',
 *     defaults: {
 *        ...
 *     }
 *   }
 * })
 * ```
 */
export function createClient(
  clientOptions: ClientOptions,
  opts: {
    type: 'plain'
    defaults?: PlainClientDefaultParams
  }
): PlainClientAPI
/**
 * Create a legacy, chainable client instance
 * @param clientOptions
 *
 * @example Legacy Chainable Client
 * ```javascript
 * const client = contentfulManagement.createClient({
 *   accessToken: 'myAccessToken'
 * })
 * ```
 */
export function createClient(clientOptions: ClientOptions): ClientAPI
/**
 * Create a legacy or plain client instance
 *
 * Please check the corresponding section below:
 *
 * * [Plain Client](#createclient)
 * * [Legacy Chainable Client](#createclient-1)
 */
export function createClient(
  clientOptions: ClientOptions,
  opts?: {
    type?: string
    defaults?: PlainClientDefaultParams
  }
): ClientAPI | PlainClientAPI {
  const sdkMain =
    opts && opts.type === 'plain' ? 'contentful-management-plain.js' : 'contentful-management.js'
  const userAgent = getUserAgentHeader(
    `${sdkMain}/${__VERSION__}`,
    clientOptions.application,
    clientOptions.integration,
    clientOptions.feature
  )

  const adapter = createAdapter({ ...clientOptions, userAgent })

  // @ts-expect-error Parameters<?> and ReturnType<?> only return the types of the last overload (https://github.com/microsoft/TypeScript/issues/26591)
  const makeRequest: MakeRequest = (options: Parameters<MakeRequest>[0]): ReturnType<MakeRequest> =>
    adapter.makeRequest({ ...options, userAgent })

  if (opts && opts.type === 'plain') {
    return createPlainClient(makeRequest, opts.defaults)
  } else {
    return createClientApi(makeRequest) as ClientAPI
  }
}
