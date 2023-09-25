import axios, { RawAxiosRequestHeaders } from 'axios'
import { AxiosInstance, createHttpClient, CreateHttpClientParams } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { OpPatch } from 'json-patch'
import { Adapter, MakeRequestOptions, MakeRequestPayload } from '../../common-types'
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

    this.params = {
      ...defaultHostParameters,
      ...copy(params),
    }

    this.axiosInstance = createHttpClient(axios, {
      ...this.params,
      headers: {
        'Content-Type': 'application/vnd.contentful.management.v1+json',
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
      'X-Contentful-User-Agent': userAgent,
    })
  }
}
