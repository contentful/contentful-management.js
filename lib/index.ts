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
export { OptionalDefaults } from './plain/wrappers/wrap'
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
declare global {
  const __VERSION__: string
}

/**
 * Create a client instance
 * @param clientOptions - Client initialization parameters
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
export function createClient(clientOptions: ClientOptions): PlainClientAPI
/**
 * @deprecated The nested (legacy) client is deprecated and will be removed in the next major version. Use the plain client instead.
 */
export function createClient(
  clientOptions: ClientOptions,
  opts: {
    type: 'legacy'
  },
): ClientAPI
// Usually, overloads with more specific signatures should come first but some IDEs are often not able to handle overloads with separate TSDocs correctly
export function createClient(
  clientOptions: ClientOptions,
  opts: {
    type?: 'plain' | 'legacy'
    defaults?: PlainClientDefaultParams
  } = {},
): ClientAPI | PlainClientAPI {
  const sdkMain =
    opts.type === 'legacy' ? 'contentful-management.js' : 'contentful-management-plain.js'
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

  if (opts.type === 'legacy') {
    console.warn(
      '[contentful-management] The nested (legacy) client is deprecated and will be removed in the next major version. Please migrate to the plain client. See the README for migration guidance.',
    )
    return createClientApi(makeRequest) as ClientAPI
  } else {
    return createPlainClient(makeRequest, opts.defaults)
  }
}
