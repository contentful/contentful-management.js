import type { MockedFunction } from 'vitest'
import { vi } from 'vitest'
import { RestAdapter } from '../../../../../lib/adapters/REST/rest-adapter'
import setupHttpMock from '../../../mocks/http'
import type contentfulSdkCore from 'contentful-sdk-core'

import type { AxiosInstance } from 'contentful-sdk-core'
import { createHttpClient } from 'contentful-sdk-core'

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
