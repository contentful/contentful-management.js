/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosInstance } from 'axios'

export type FunctionWithAtLeastOneParam = (p1: any, ...rest: any[]) => any

export type FirstParamType<F> = F extends (p1: infer P, ...rest: any[]) => any ? P : never

export type RestParamsType<F> = F extends (p1: any, ...rest: infer REST) => any ? REST : never

type RemoveFirstParam<F extends FunctionWithAtLeastOneParam> = (
  ...rest: RestParamsType<F>
) => ReturnType<F>

type CurriedObject<O extends Record<string, FunctionWithAtLeastOneParam>> = {
  [fnName in keyof O]: RemoveFirstParam<O[fnName]>
}

const curryMe = <F extends FunctionWithAtLeastOneParam>(
  fn: F,
  p1: FirstParamType<F>
): RemoveFirstParam<F> => (...rest: RestParamsType<F>) => fn(p1, ...rest)

export const wrapWithHttp: <O extends Record<string, FunctionWithAtLeastOneParam>>(
  o: O,
  http: AxiosInstance
) => CurriedObject<O> = <O extends Record<string, FunctionWithAtLeastOneParam>>(
  o: O,
  http: AxiosInstance
) => {
  const result: Record<string, any> = {}
  for (const k of Object.keys(o)) {
    const fn = curryMe(o[k], http)
    result[k] = fn
  }
  return result as CurriedObject<O>
}
