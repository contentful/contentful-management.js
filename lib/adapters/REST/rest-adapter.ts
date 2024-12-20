import type { RawAxiosRequestHeaders } from 'axios'
import axios from 'axios'
import type { AxiosInstance, CreateHttpClientParams } from 'contentful-sdk-core'
import { createHttpClient } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { OpPatch } from 'json-patch'
import type { Adapter, MakeRequestOptions, MakeRequestPayload } from '../../common-types'
import endpoints from './endpoints'

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
 * @private
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

  public async makeRequest<R>({
    entityType,
    action: actionInput,
    params,
    payload,
    headers,
    userAgent,
  }: MakeRequestOptions): Promise<R> {
    // `delete` is a reserved keyword. Therefore, the methods are called `del`.
    const action = actionInput === 'delete' ? 'del' : actionInput

    const endpoint: (
      http: AxiosInstance,
      params?: Record<string, unknown>,
      payload?: Record<string, unknown> | OpPatch[] | MakeRequestPayload,
      headers?: RawAxiosRequestHeaders
    ) => Promise<R> =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      endpoints[entityType]?.[action]

    if (endpoint === undefined) {
      throw new Error('Unknown endpoint')
    }

    return await endpoint(this.axiosInstance, params, payload, {
      ...headers,
      // overwrite the userAgent with the one passed in the request
      ...(userAgent ? { 'X-Contentful-User-Agent': userAgent } : {}),
    })
  }
}
