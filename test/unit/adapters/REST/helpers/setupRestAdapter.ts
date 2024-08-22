import { MockedFunction } from 'vitest'
import { RestAdapter } from '../../../../../lib/adapters/REST/rest-adapter'
import setupHttpMock from '../../../mocks/http'

import { AxiosInstance, createHttpClient } from 'contentful-sdk-core'

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
