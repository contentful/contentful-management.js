import {
  RestAdapter,
  __Rewire__,
  __ResetDependency__,
} from '../../../../../lib/adapters/REST/rest-adapter'
import setupHttpMock from '../../../mocks/http'

export default function setupRestAdapter(httpPromise, params = {}) {
  const httpMock = setupHttpMock(httpPromise)
  __Rewire__('createHttpClient', () => httpMock)

  return {
    adapterMock: new RestAdapter({
      accessToken: 'token',
      ...params,
    }),
    httpMock,
  }
}

export function resetRestAdapterRewire() {
  __ResetDependency__('createHttpClient')
}
