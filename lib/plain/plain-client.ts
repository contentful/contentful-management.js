import { createCMAHttpClient, ClientParams } from '../create-cma-http-client'
import * as endpoints from './index'
import { wrap, DefaultParams } from './wrappers/wrap'

export const createPlainClient = (params: ClientParams, defaults?: DefaultParams) => {
  const http = createCMAHttpClient(params)
  const wrapParams = { http, defaults }

  return {
    space: {
      get: wrap(wrapParams, endpoints.space.get),
      update: wrap(wrapParams, endpoints.space.update),
      delete: wrap(wrapParams, endpoints.space.delete),
    },
    environment: {
      get: wrap(wrapParams, endpoints.environment.get),
      update: wrap(wrapParams, endpoints.environment.update),
    },
    contentType: {
      getMany: wrap(wrapParams, endpoints.contentType.getMany),
    },
    user: {
      getManyForSpace: wrap(wrapParams, endpoints.user.getManyForSpace),
    },
    entry: {
      getMany: wrap(wrapParams, endpoints.entry.getMany),
      get: wrap(wrapParams, endpoints.entry.get),
    },
    locale: {
      getMany: wrap(wrapParams, endpoints.locale.getMany),
    },
  }
}
