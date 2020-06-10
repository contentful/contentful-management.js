/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 * @packageDocumentation
 */

import createContentfulApi from './create-contentful-api'
import { createCMAHttpClient } from './create-cma-http-client'
export { createCMAHttpClient } from './create-cma-http-client'
export { createPlainClient } from './plain/plain-client'
export { asIterator } from './plain/as-iterator'

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
export function createClient(params) {
  const http = createCMAHttpClient(params)
  const api = createContentfulApi({
    http: http,
  })
  return api
}
