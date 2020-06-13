/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 * @packageDocumentation
 */

import createContentfulApi, { ClientAPI } from './create-contentful-api'
import { createCMAHttpClient, ClientParams } from './create-cma-http-client'

/**
 * Creates API object with methods to access functionality from Contentful's
 * Management API
 */
export function createClient(params: ClientParams): ClientAPI {
  const http = createCMAHttpClient(params)
  const api = createContentfulApi({
    http: http,
  })
  return api
}
