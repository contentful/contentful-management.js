import { createCMAHttpClient, ClientParams } from '../create-cma-http-client'
import * as endpoints from './index'
import { AxiosInstance } from 'axios'

export type DefaultParams = {
  spaceId?: string
  environmentId?: string
  organizationId?: string
}

export type Optional<B, O> = Omit<B, keyof O> & Partial<O>

const withHttp = <T extends any[], R>(
  http: AxiosInstance,
  fn: (http: AxiosInstance, ...rest: T) => R
) => {
  return (...rest: T) => fn(http, ...rest)
}

const withDefaults = <F extends {}, T extends any[], R>(
  defaults: DefaultParams | undefined,
  fn: (params: F, ...rest: T) => R
) => {
  return (params: Optional<F, DefaultParams>, ...rest: T) =>
    fn({ ...defaults, ...params } as F, ...rest)
}

export const createPlainClient = (params: ClientParams, defaults?: DefaultParams) => {
  const http = createCMAHttpClient(params)

  return {
    space: {
      get: withDefaults(defaults, withHttp(http, endpoints.space.get)),
      update: withDefaults(defaults, withHttp(http, endpoints.space.update)),
      delete: withDefaults(defaults, withHttp(http, endpoints.space.delete)),
    },
    environment: {
      get: withDefaults(defaults, withHttp(http, endpoints.environment.get)),
      update: withDefaults(defaults, withHttp(http, endpoints.environment.update)),
    },
    contentType: {
      getMany: withDefaults(defaults, withHttp(http, endpoints.contentType.getMany)),
    },
    user: {
      getManyForSpace: withDefaults(defaults, withHttp(http, endpoints.user.getManyForSpace)),
    },
    entry: {
      getMany: withDefaults(defaults, withHttp(http, endpoints.entry.getMany)),
    },
  }
}
