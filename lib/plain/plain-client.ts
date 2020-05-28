import { createCMAHttpClient, ClientParams } from '../create-cma-http-client'
import * as endpoints from './index'
import { AxiosInstance } from 'axios'

export type DefaultParams = {
  spaceId?: string
  environmentId?: string
  organizationId?: string
}

export type Optional<B, O> = Omit<B, keyof O> & Partial<O>

type EndpointDefinition<T extends any[], P extends {}, R> = (
  http: AxiosInstance,
  params: P,
  ...rest: T
) => R

const withHttp = <T extends any[], P extends {}, R>(
  http: AxiosInstance,
  fn: EndpointDefinition<T, P, R>
) => {
  return (params: P, ...rest: T) => fn(http, params, ...rest)
}

const withDefaults = <T extends any[], P extends {}, R>(
  defaults: DefaultParams | undefined,
  fn: (params: P, ...rest: T) => R
) => {
  return (params: Optional<P, DefaultParams>, ...rest: T) =>
    fn({ ...defaults, ...params } as P, ...rest)
}

type WrapParams = {
  http: AxiosInstance
  defaults?: DefaultParams
}

const wrap = <T extends any[], P extends {}, R>(
  { http, defaults }: WrapParams,
  fn: EndpointDefinition<T, P, R>
) => {
  return withDefaults(defaults, withHttp(http, fn))
}

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
    },
  }
}
