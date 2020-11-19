/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 * @packageDocumentation
 */

import createContentfulApi, { ClientAPI } from './create-contentful-api'
import { createCMAHttpClient, ClientParams } from './create-cma-http-client'
import type { DefaultParams, PlainClientAPI } from './plain/plain-client'

import { createPlainClient } from './plain/plain-client'

export { asIterator } from './plain/as-iterator'
export { isDraft, isPublished, isUpdated } from './plain/checks'
export type { PlainClientAPI } from './plain/plain-client'
export type { ClientAPI } from './create-contentful-api'
export type { ClientParams } from './create-cma-http-client'
export type PlainClientDefaultParams = DefaultParams

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
function createClient(params: ClientParams): ClientAPI
function createClient(
  params: ClientParams,
  opts: {
    type: 'plain'
    defaults?: DefaultParams
  }
): PlainClientAPI
function createClient(
  params: ClientParams,
  opts: {
    type?: 'plain'
    defaults?: DefaultParams
  } = {}
): ClientAPI | PlainClientAPI {
  let client: ClientAPI | PlainClientAPI

  if (opts.type === 'plain') {
    client = createPlainClient(params, opts.defaults)
  } else {
    const http = createCMAHttpClient(params)
    client = createContentfulApi({
      http: http,
    }) as ClientAPI
  }

  return client
}

export { createClient }
