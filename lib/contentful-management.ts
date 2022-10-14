/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 * @packageDocumentation
 */

import { getUserAgentHeader } from 'contentful-sdk-core'
import type { RestAdapterParams } from './adapters/REST/rest-adapter'
import type { MakeRequest } from './common-types'
import { AdapterParams, createAdapter } from './create-adapter'
import createContentfulApi, { ClientAPI } from './create-contentful-api'
import type { AlphaPlainClientAPI, PlainClientAPI } from './plain/common-types'
import type { DefaultParams } from './plain/plain-client'
import { createPlainClient } from './plain/plain-client'
import * as editorInterfaceDefaults from './constants/editor-interface-defaults'

export type { ClientAPI } from './create-contentful-api'
export { asIterator } from './plain/as-iterator'
export { isDraft, isPublished, isUpdated } from './plain/checks'
export type { PlainClientAPI, AlphaPlainClientAPI } from './plain/common-types'
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
type ClientOptions = (RestAdapterParams | AdapterParams) & UserAgentParams

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
function createClient<
  // Originally, we used a magic expression from here: https://stackoverflow.com/a/57958451/4816930
  // Right now it's fixed to this specific array until there is a need to revisit this.
  T extends ['workflows']
>(
  params: ClientOptions,
  opts: {
    type: 'plain'
    alphaFeatures: T
    defaults?: DefaultParams
  }
): AlphaPlainClientAPI
function createClient(
  params: ClientOptions,
  opts: {
    type: 'plain'
    alphaFeatures: string[]
    defaults?: DefaultParams
  }
): PlainClientAPI
function createClient(
  params: ClientOptions,
  opts: {
    type?: 'plain'
    alphaFeatures?: string[]
    defaults?: DefaultParams
  } = {}
): ClientAPI | PlainClientAPI | AlphaPlainClientAPI {
  const sdkMain =
    opts.type === 'plain' ? 'contentful-management-plain.js' : 'contentful-management.js'
  const userAgent = getUserAgentHeader(
    // @ts-expect-error
    `${sdkMain}/${__VERSION__}`,
    params.application,
    params.integration,
    params.feature
  )

  const adapter = createAdapter(params)

  // Parameters<?> and ReturnType<?> only return the types of the last overload
  // https://github.com/microsoft/TypeScript/issues/26591
  // @ts-expect-error
  const makeRequest: MakeRequest = (options: Parameters<MakeRequest>[0]): ReturnType<MakeRequest> =>
    adapter.makeRequest({ ...options, userAgent })

  if (opts.type === 'plain') {
    return createPlainClient(makeRequest, opts.defaults, opts.alphaFeatures)
  } else {
    return createContentfulApi(makeRequest) as ClientAPI
  }
}
