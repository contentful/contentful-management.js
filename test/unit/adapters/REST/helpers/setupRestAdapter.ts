import { RestAdapter } from '../../../../../lib/adapters/REST/rest-adapter'
import setupHttpMock from '../../../mocks/http'
import { createHttpClient } from 'contentful-sdk-core'

import type { AxiosInstance } from 'contentful-sdk-core'
import type { MockedFunction } from 'vitest'

const createHttpClientMock = <MockedFunction<typeof createHttpClient>>(<unknown>createHttpClient)

export default function setupRestAdapter(httpPromise, params = {}) {
  const httpMock = setupHttpMock(httpPromise)

  createHttpClientMock.mockReturnValue(httpMock as unknown as AxiosInstance)

  return {
    adapterMock: new RestAdapter({
      accessToken: 'token',
      ...params,
    }),
    httpMock,
  }
}
