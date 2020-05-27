import { createCMAHttpClient, ClientParams } from '../create-cma-http-client'
import * as endpoints from './index'
import { AxiosInstance } from 'axios'

const withHttp = <T extends any[], R>(
  http: AxiosInstance,
  fn: (http: AxiosInstance, ...rest: T) => R
) => {
  return (...rest: T) => fn(http, ...rest)
}

export const createPlainClient = (params: ClientParams) => {
  const http = createCMAHttpClient(params)
  return {
    space: {
      get: withHttp(http, endpoints.space.get),
      update: withHttp(http, endpoints.space.update),
      delete: withHttp(http, endpoints.space.delete),
    },
    environment: {
      get: withHttp(http, endpoints.environment.get),
      update: withHttp(http, endpoints.environment.update),
    },
  }
}

const client = createPlainClient({ accessToken: '' })

client.space.get({ spaceId: '13' })
client.space.delete({ spaceId: '13' })
client.space.update({ spaceId: '123' }, {})

client.environment.get({ spaceId: 'spaceId', environmentId: 'environmentId' })
