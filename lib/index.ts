/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 */

import createContentfulApi from './create-contentful-api'
import { createCMAHttpClient, ClientParams } from './create-cma-http-client'

export function createClient(params: ClientParams) {
  const http = createCMAHttpClient(params)
  const api = createContentfulApi({
    http: http,
  })
  return api
}
