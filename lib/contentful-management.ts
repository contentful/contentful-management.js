/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 * @packageDocumentation
 */

import { getUserAgentHeader } from 'contentful-sdk-core'
import type { RestAdapterParams } from './adapters/REST/rest-adapter'
import type { MakeRequest, XOR } from './common-types'
import { AdapterParams, createAdapter } from './create-adapter'
import createContentfulApi, { ClientAPI } from './create-contentful-api'
import type { PlainClientAPI } from './plain/common-types'
import type { DefaultParams } from './plain/plain-client'
import { createPlainClient } from './plain/plain-client'
import * as editorInterfaceDefaults from './constants/editor-interface-defaults'

export type { ClientAPI } from './create-contentful-api'
export { asIterator } from './plain/as-iterator'
export { isDraft, isPublished, isUpdated } from './plain/checks'
export type { PlainClientAPI } from './plain/common-types'
export { createClient }
export { RestAdapter } from './adapters/REST/rest-adapter'
export { editorInterfaceDefaults }
export type PlainClientDefaultParams = DefaultParams
export * from './export-types'

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

/**
 * @deprecated
 */
export type ClientParams = RestAdapterParams & UserAgentParams
type ClientOptions = UserAgentParams & XOR<RestAdapterParams, AdapterParams>

/**
 * Create a client instance
 * @param params - Client initialization parameters
 *
 * ```javascript
 * const client = contentfulManagement.createClient({
 *  accessToken: 'myAccessToken'
 * })
 * ```
 */
function createClient(params: ClientOptions): ClientAPI
function createClient(
  params: ClientOptions,
  opts: {
    type: 'plain'
    defaults?: DefaultParams
  }
): PlainClientAPI
// Usually, overloads with more specific signatures should come first but some IDEs are often not able to handle overloads with separate TSDocs correctly
/**
 * @deprecated The `alphaFeatures` option is no longer supported. Please use the function without this option.
 */
function createClient(
  params: ClientOptions,
  opts: {
    type?: 'plain'
    alphaFeatures: string[]
    defaults?: DefaultParams
  }
): ClientAPI | PlainClientAPI
function createClient(
  params: ClientOptions,
  opts: {
    type?: 'plain'
    defaults?: DefaultParams
  } = {}
): ClientAPI | PlainClientAPI {
  const sdkMain =
    opts.type === 'plain' ? 'contentful-management-plain.js' : 'contentful-management.js'
  const userAgent = getUserAgentHeader(
    // @ts-expect-error
    `${sdkMain}/${__VERSION__}`,
    params.application,
    params.integration,
    params.feature
  )

  const adapter = createAdapter({ ...params, userAgent })

  // Parameters<?> and ReturnType<?> only return the types of the last overload
  // https://github.com/microsoft/TypeScript/issues/26591
  // @ts-expect-error
  const makeRequest: MakeRequest = (options: Parameters<MakeRequest>[0]): ReturnType<MakeRequest> =>
    adapter.makeRequest({ ...options, userAgent })

  if (opts.type === 'plain') {
    return createPlainClient(makeRequest, opts.defaults)
  } else {
    return createContentfulApi(makeRequest) as ClientAPI
  }
}
