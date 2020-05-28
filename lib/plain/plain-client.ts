import { createCMAHttpClient, ClientParams } from '../create-cma-http-client'
import * as endpoints from './index'
import { AxiosInstance } from 'axios'

export type DefaultParams = {
  spaceId?: string
  environmentId?: string
  organizationId?: string
}

export type PlainClientParams = ClientParams & { defaults: DefaultParams }

export type Optional<B, O> = Omit<B, keyof O> & Partial<O>

const withHttp = <T extends any[], R>(
  http: AxiosInstance,
  fn: (http: AxiosInstance, ...rest: T) => R
) => {
  return (...rest: T) => fn(http, ...rest)
}

const withDefaults = <F extends {}, T extends any[], R>(
  defaults: PlainClientParams['defaults'],
  fn: (params: F, ...rest: T) => R
) => {
  return (params: Optional<F, DefaultParams>, ...rest: T) =>
    fn({ ...defaults, ...params } as F, ...rest)
}

export const createPlainClient = ({ defaults, ...clientParams }: PlainClientParams) => {
  const http = createCMAHttpClient(clientParams)

  return {
    space: {
      get: withDefaults(defaults, withHttp(http, endpoints.space.get)),
      update: withDefaults(defaults, withHttp(http, endpoints.space.update)),
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
