/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 * @packageDocumentation
 */

import { getUserAgentHeader } from 'contentful-sdk-core'
import type { RestAdapterParams } from './adapters/REST/rest-adapter.js'
import type { MakeRequest, XOR } from './common-types.js'
import type { AdapterParams } from './create-adapter.js'
import { createAdapter } from './create-adapter.js'
import type { ClientAPI } from './create-contentful-api.js'
import createContentfulApi from './create-contentful-api.js'
import type { PlainClientAPI } from './plain/common-types.js'
import type { DefaultParams } from './plain/plain-client.js'
import { createPlainClient } from './plain/plain-client.js'
import * as editorInterfaceDefaults from './constants/editor-interface-defaults/index.js'
import { ScheduledActionStatus } from './entities/scheduled-action.js'

export type { ClientAPI } from './create-contentful-api.js'
export { asIterator } from './plain/as-iterator.js'
export { fetchAll } from './plain/pagination-helper.js'
export { isDraft, isPublished, isUpdated } from './plain/checks.js'
export type { PlainClientAPI } from './plain/common-types.js'
export { createClient }
export { RestAdapter } from './adapters/REST/rest-adapter.js'
export type { RestAdapterParams } from './adapters/REST/rest-adapter.js'
export { makeRequest } from './adapters/REST/make-request.js'
export { editorInterfaceDefaults }
export type PlainClientDefaultParams = DefaultParams
export * from './export-types.js'
export { ScheduledActionStatus }
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

export type ClientOptions = UserAgentParams & XOR<RestAdapterParams, AdapterParams>

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
  },
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
  },
): ClientAPI | PlainClientAPI
function createClient(
  params: ClientOptions,
  opts: {
    type?: 'plain'
    defaults?: DefaultParams
  } = {},
): ClientAPI | PlainClientAPI {
  const sdkMain =
    opts.type === 'plain' ? 'contentful-management-plain.js' : 'contentful-management.js'
  const userAgent = getUserAgentHeader(
    `${sdkMain}/${__VERSION__}`,
    params.application,
    params.integration,
    params.feature,
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
