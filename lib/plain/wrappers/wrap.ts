/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AxiosInstance } from 'contentful-sdk-core'
import { Except } from 'type-fest'

export type DefaultParams = {
  spaceId?: string
  environmentId?: string
  organizationId?: string
}

export type WrapParams = {
  http: AxiosInstance
  defaults?: DefaultParams
}

type MarkOptional<BaseType, Keys extends keyof BaseType = keyof BaseType> =
  // Pick just the keys that are not optional from the base type.
  Except<BaseType, Keys> &
    // Pick the keys that should be optional from the base type and make them optional.
    Partial<Pick<BaseType, Keys>>

type EndpointDefinition<T extends any[], P extends {}, R> = (
  http: AxiosInstance,
  params: P,
  ...rest: T
) => R

const withHttp = <T extends any[], P extends {}, R, A>(
  http: AxiosInstance,
  fn: EndpointDefinition<T, P, R>
) => {
  return (params: P, ...rest: T) => fn(http, params, ...rest)
}

const withDefaults = <T extends any[], P extends {}, R, D>(
  defaults: D | undefined,
  fn: (params: P, ...rest: T) => R
) => {
  return (params: MarkOptional<P, keyof (P | D)>, ...rest: T) =>
    fn({ ...defaults, ...params } as P, ...rest)
}

export const wrap = <T extends any[], P extends {}, R>(
  { http, defaults }: WrapParams,
  fn: EndpointDefinition<T, P, R>
) => {
  return withDefaults(defaults, withHttp(http, fn))
}

type EndpointWithHttp<R> = (http: AxiosInstance) => R

export const wrapHttp = <R>(http: AxiosInstance, fn: EndpointWithHttp<R>) => () => fn(http)
