import axios from 'axios'
import { AxiosInstance, createHttpClient, CreateHttpClientParams } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { omit } from 'lodash'
import { Adapter, MakeRequestOptions } from '../../common-types'
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

export const defaultHostParameters = {
  defaultHostname: 'api.contentful.com',
  defaultHostnameUpload: 'upload.contentful.com',
}

export class RestAdapter implements Adapter {
  private readonly params: RestAdapterParams

  public constructor(params: RestAdapterParams) {
    if (!params.accessToken) {
      throw new TypeError('Expected parameter accessToken')
    }

    this.params = {
      ...defaultHostParameters,
      ...copy(params),
    }
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
      payload?: Record<string, unknown>,
      headers?: Record<string, unknown>
    ) => Promise<R> =
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      endpoints[entityType]?.[action]

    if (endpoint === undefined) {
      throw new Error('Unknown endpoint')
    }

    const requiredHeaders = {
      'Content-Type': 'application/vnd.contentful.management.v1+json',
      'X-Contentful-User-Agent': userAgent,
    }

    // TODO: maybe we can avoid creating a new axios instance for each request
    const axiosInstance = createHttpClient(axios, {
      ...this.params,
      headers: {
        ...requiredHeaders,
        ...this.params.headers,
      },
    })

    return await endpoint(axiosInstance, params, payload, headers)
  }
}
