import { vi, MockedFunction } from 'vitest'
import { RestAdapter } from '../../../../../lib/adapters/REST/rest-adapter'
import setupHttpMock from '../../../mocks/http'
import contentfulSdkCore from 'contentful-sdk-core'

import { AxiosInstance, createHttpClient } from 'contentful-sdk-core'

vi.mock('contentful-sdk-core', async (importOriginal) => {
  const orig = await importOriginal<typeof contentfulSdkCore>()
  return {
    ...orig,
    createHttpClient: vi.fn(),
  }
})

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
