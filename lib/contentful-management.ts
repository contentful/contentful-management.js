/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 * @packageDocumentation
 */

import type { AdapterParams } from './create-adapter'
import type { ClientAPI } from './create-contentful-api'
import type { DefaultParams } from './plain/plain-client'
import type { MakeRequest, XOR } from './common-types'
import type { PlainClientAPI } from './plain/plain-client-types'
import type { RestAdapterParams } from './adapters/REST/rest-adapter'

import { createAdapter } from './create-adapter'
import { createPlainClient } from './plain/plain-client'
import { getUserAgentHeader } from 'contentful-sdk-core'
import createContentfulApi from './create-contentful-api'

export type { ClientAPI } from './create-contentful-api'
export type { PlainClientAPI } from './plain/plain-client-types'
export type { RestAdapterParams } from './adapters/REST/rest-adapter'
export type * from './export-types'
export type PlainClientDefaultParams = DefaultParams

export { asIterator } from './plain/as-iterator'
export { fetchAll } from './plain/pagination-helper'
export { isDraft, isPublished, isUpdated } from './plain/checks'
export { makeRequest } from './adapters/REST/make-request'
export { RestAdapter } from './adapters/REST/rest-adapter'
export * as editorInterfaceDefaults from './constants/editor-interface-defaults/index'

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
function createClient(
  clientOptions: ClientOptions,
  opts: {
    type: 'plain'
    defaults?: DefaultParams
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
function createClient(clientOptions: ClientOptions): ClientAPI
/**
 * Create a legacy or plain client instance
 *
 * Please check the responding section below:
 *
 * * [Plain Client](#createclient)
 * * [Legacy Chainable Client](#createclient-1)
 */
function createClient(
  clientOptions: ClientOptions,
  opts?: {
    type?: string
    defaults?: DefaultParams
  }
): ClientAPI | PlainClientAPI {
  const sdkMain =
    opts && opts.type === 'plain' ? 'contentful-management-plain.js' : 'contentful-management.js'
  const userAgent = getUserAgentHeader(
    // @ts-expect-error
    `${sdkMain}/${__VERSION__}`,
    clientOptions.application,
    clientOptions.integration,
    clientOptions.feature
  )

  const adapter = createAdapter({ ...clientOptions, userAgent })

  // Parameters<?> and ReturnType<?> only return the types of the last overload
  // https://github.com/microsoft/TypeScript/issues/26591
  // @ts-expect-error
  const makeRequest: MakeRequest = (options: Parameters<MakeRequest>[0]): ReturnType<MakeRequest> =>
    adapter.makeRequest({ ...options, userAgent })

  if (opts && opts.type === 'plain') {
    return createPlainClient(makeRequest, opts.defaults)
  } else {
    return createContentfulApi(makeRequest) as ClientAPI
  }
}

export { createClient }
