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
    contentType: {
      getMany: withHttp(http, endpoints.contentType.getMany),
    },
    user: {
      getManyForSpace: withHttp(http, endpoints.user.getManyForSpace),
    },
    entry: {
      getMany: withHttp(http, endpoints.entry.getMany),
    },
  }
}
