import defaults from 'lodash/defaults'
import assign from 'lodash/assign'
import cloneDeep from 'lodash/cloneDeep'
import createHttpClient from 'contentful-sdk-core/create-http-client'
import wrapHttpClient from 'contentful-sdk-core/wrap-http-client'
import version from '../version'
import createContentfulApi from './create-contentful-api'

/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 * @typedef {ContentfulManagement} ContentfulManagement
 * @property {createClient} createClient
 *
 * @see https://www.contentful.com/developers/docs/references/content-management-api/
*/

/**
 * Create a client instance, this is the entry point to the library
 * @method createClient
 * @param  {object}     axios  Vendored version of axios. Our wrapper adds this parameter for you. You can ignore it.
 * @param  {object}     params Client API parameters
 * @param  {string}     params.accessToken Your space access token.
 * @param  {string}     params.space Your space ID
 * @param  {object}     [params.agent] HTTP agent for node
 * @param  {string}     [params.host] Alternate host
 * @param  {object}     [params.headers] Additional request HTTP headers. `Content-Type` and `X-Contentful-User-Agent` are set automatically.
 * @param  {boolean}    [params.insecure=false] If we should use http instead
 * @param  {number}     [params.maxRetries=5]
 * @param  {number}     [params.rateLimit=6]
 * @param  {number}     [params.rateLimitPeriod=1000]
 * @param  {boolean}    [params.retryOnTooManyRequests=true]
 * @return {ClientAPI}  Contentful Management API
 *
 * @example
 * // require contentful-management
 * var contentfulManagement = require('contentful-management')
 * var client = contentfulManagement.createClient({
 * // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
 * accessToken: 'YOUR_ACCESS_TOKEN'
 * })
 */
export default function createClient (axios, params) {
  params = defaults(cloneDeep(params), {
    rateLimit: 6,
    rateLimitPeriod: 1000,
    maxRetries: 5,
    retryOnTooManyRequests: true
  })

  if (!params.accessToken) {
    throw new TypeError('Expected parameter accessToken')
  }

  params.defaultHostname = 'api.contentful.com'
  params.headers = assign(params.headers, {
    'Content-Type': 'application/vnd.contentful.management.v1+json',
    'X-Contentful-User-Agent': 'contentful-management.js/' + version
  })

  const http = wrapHttpClient(createHttpClient(axios, params), {
    concurrency: params.rateLimit,
    delay: params.rateLimitPeriod,
    maxRetries: params.maxRetries,
    retryOnTooManyRequests: params.retryOnTooManyRequests
  })
  const api = createContentfulApi({
    http: http
  })

  return api
}
