/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 * @namespace contentfulManagement
 * @see ContentfulClientAPI
 */
import createContentfulApi from './create-contentful-api'
import { createCMAHttpClient } from './create-cma-http-client'

/**
 * Create a client instance
 * @func
 * @name createClient
 * @memberof contentfulManagement
 * @param {ClientParams} params - Client initialization parameters
 * @returns {ContentfulClientAPI.ClientAPI}
 * @example
 * const client = contentfulManagement.createClient({
 *  accessToken: 'myAccessToken'
 * })
 */
export function createClient (params) {
  const http = createCMAHttpClient(params)
  const api = createContentfulApi({
    http: http
  })
  return api
}
