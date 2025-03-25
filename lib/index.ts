/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 * @packageDocumentation
 */

import { getUserAgentHeader } from 'contentful-sdk-core'
import type { RestAdapterParams } from './adapters/REST/rest-adapter'
import type { MakeRequest, XOR } from './common-types'
import type { AdapterParams } from './create-adapter'
import { createAdapter } from './create-adapter'
import type { ClientAPI } from './create-contentful-api'
import createClientApi from './create-contentful-api'
import type { PlainClientAPI } from './plain/plain-client-types'
import type { PlainClientDefaultParams } from './plain/plain-client'
import { createPlainClient } from './plain/plain-client'
import * as editorInterfaceDefaults from './constants/editor-interface-defaults'
import { ScheduledActionStatus } from './entities/scheduled-action'

export type { ClientAPI } from './create-contentful-api'
export { asIterator } from './plain/as-iterator'
export { fetchAll } from './plain/pagination-helper'
export { isDraft, isPublished, isUpdated } from './plain/checks'
export type { PlainClientAPI } from './plain/plain-client-types'
export { RestAdapter } from './adapters/REST/rest-adapter'
export type { RestAdapterParams } from './adapters/REST/rest-adapter'
export { makeRequest } from './adapters/REST/make-request'
export { editorInterfaceDefaults }
export type { PlainClientDefaultParams } from './plain/plain-client'
export { ScheduledActionStatus }
export type * from './export-types'

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
 * Create a client instance
 * @param clientOptions - Client initialization parameters
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
export function createClient(clientOptions: ClientOptions): ClientAPI
export function createClient(
  clientOptions: ClientOptions,
  opts: {
    type: 'plain'
    defaults?: PlainClientDefaultParams
  },
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
 * Please check the responding section below:
 *
 * * [Plain Client](#createclient)
 * * [Legacy Chainable Client](#createclient-1)
 */
export function createClient(
  clientOptions: ClientOptions,
  opts?: {
    type?: string
    defaults?: PlainClientDefaultParams
  },
): ClientAPI | PlainClientAPI {
  const sdkMain =
    opts && opts.type === 'plain' ? 'contentful-management-plain.js' : 'contentful-management.js'
  const userAgent = getUserAgentHeader(
    `${sdkMain}/${__VERSION__}`,
    clientOptions.application,
    clientOptions.integration,
    clientOptions.feature,
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
