/**
 * @packageDocumentation
 * @hidden
 */

import axios from 'axios'
import { createHttpClient, getUserAgentHeader } from 'contentful-sdk-core'
import type { CreateHttpClientParams } from 'contentful-sdk-core'
import copy from 'fast-copy'

export type ClientParams = CreateHttpClientParams & {
  /**
   * Contentful CMA Access Token
   */
  accessToken: string
  /**
   * API host
   * @default api.contentful.com
   */
  host?: string
  /**
   * direct file upload host
   * @default upload.contentful.com
   */
  hostUpload?: string

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

export const defaultHostParameters = {
  defaultHostname: 'api.contentful.com',
  defaultHostnameUpload: 'upload.contentful.com',
}

/**
 * @private
 */
export function createCMAHttpClient(params: ClientParams, plainClient = false) {
  const sdkMain = plainClient ? 'contentful-management-plain.js' : 'contentful-management.js'
  const userAgentHeader = getUserAgentHeader(
    // @ts-expect-error
    `${sdkMain}/${__VERSION__}`,
    params.application,
    params.integration,
    params.feature
  )

  const requiredHeaders = {
    'Content-Type': 'application/vnd.contentful.management.v1+json',
    'X-Contentful-User-Agent': userAgentHeader,
  }

  params = {
    ...defaultHostParameters,
    ...copy(params),
  }

  if (!params.accessToken) {
    throw new TypeError('Expected parameter accessToken')
  }

  params.headers = {
    ...params.headers,
    ...requiredHeaders,
  }

  return createHttpClient(axios, params)
}
