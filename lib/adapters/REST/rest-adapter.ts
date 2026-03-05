import axios from 'axios'
import type { AxiosInstance, CreateHttpClientParams } from 'contentful-sdk-core'
import { createHttpClient } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { Adapter, MakeRequestOptions } from '../../common-types'
import { makeRequest } from './make-request'

export type RestAdapterParams = CreateHttpClientParams & {
  /**
   * Contentful CMA Access Token
   */
  accessToken: CreateHttpClientParams['accessToken']
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

  userAgent?: string | undefined
}

/**
 * @internal
 */
const defaultHostParameters = {
  defaultHostname: 'api.contentful.com',
  defaultHostnameUpload: 'upload.contentful.com',
}

export class RestAdapter implements Adapter {
  private readonly params: RestAdapterParams
  private readonly axiosInstance: AxiosInstance

  public constructor(params: RestAdapterParams) {
    if (!params.accessToken) {
      throw new TypeError('Expected parameter accessToken')
    }

    const copiedParams = copy(params)
    // httpAgent and httpsAgent cannot be copied because they can contain private fields
    copiedParams.httpAgent = params.httpAgent
    copiedParams.httpsAgent = params.httpsAgent

    this.params = {
      ...defaultHostParameters,
      ...copiedParams,
    }

    this.axiosInstance = createHttpClient(axios, {
      ...this.params,
      headers: {
        'Content-Type': 'application/vnd.contentful.management.v1+json',
        // possibly define a default user agent?
        ...(params.userAgent ? { 'X-Contentful-User-Agent': params.userAgent } : {}),
        ...this.params.headers,
      },
    })
  }

  public async makeRequest<R>(opts: MakeRequestOptions): Promise<R> {
    return makeRequest({ ...opts, axiosInstance: this.axiosInstance })
  }
}
