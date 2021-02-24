import axios from 'axios'
import {
  AxiosInstance,
  createHttpClient,
  CreateHttpClientParams,
  getUserAgentHeader,
} from 'contentful-sdk-core'
import copy from 'fast-copy'
import { Adapter, MakeRequestOptions } from '../../common-types'
import * as endpoints from './endpoints'

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

export class RestAdapter implements Adapter {
  public readonly http: AxiosInstance

  private params: RestAdapterParams

  // TODO
  private plainClient = false

  public constructor(params: RestAdapterParams) {
    if (!params.accessToken) {
      throw new TypeError('Expected parameter accessToken')
    }

    this.params = {
      ...defaultHostParameters,
      ...copy(params),
    }

    const sdkMain = this.plainClient ? 'contentful-management-plain.js' : 'contentful-management.js'
    const userAgentHeader = getUserAgentHeader(
      // @ts-expect-error
      `${sdkMain}/${__VERSION__}`,
      this.params.application,
      this.params.integration,
      this.params.feature
    )
    const requiredHeaders = {
      'Content-Type': 'application/vnd.contentful.management.v1+json',
      'X-Contentful-User-Agent': userAgentHeader,
    }

    this.http = createHttpClient(axios, {
      ...this.params,
      headers: {
        ...requiredHeaders,
        ...this.params.headers,
      },
    })
  }

  public async makeRequest<R>({
    entityType,
    action,
    params,
    payload,
    headers,
  }: MakeRequestOptions): Promise<R> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const endpoint = endpoints[entityType]?.[action]

    if (endpoint === undefined) {
      throw new Error('Could not find valid endpoint')
    }

    return await endpoint(params, payload, headers)
  }
}
