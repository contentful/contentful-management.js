/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionWithAtLeastOneParam, RestParamsType, FirstParamType } from './wrapWithHttp'

type Optional<B, O> = Omit<B, keyof O> & Partial<O>

type ModifiedFirstParamType<F extends FunctionWithAtLeastOneParam, D extends object> = (
  params: Optional<FirstParamType<F>, D>,
  ...rest: RestParamsType<F>
) => ReturnType<F>

type ModifiedFirstParamObject<
  O extends Record<string, FunctionWithAtLeastOneParam>,
  D extends object
> = {
  [fnName in keyof O]: ModifiedFirstParamType<O[fnName], D>
}

export const wrapWithDefaultParams: <
  O extends Record<string, FunctionWithAtLeastOneParam>,
  D extends object
>(
  o: O,
  defaultParams?: D
) => ModifiedFirstParamObject<O, D> = <
  O extends Record<string, FunctionWithAtLeastOneParam>,
  D extends object
>(
  o: O,
  defaultParams?: D
) => {
  const result: Record<string, any> = {}
  for (const k of Object.keys(o)) {
    const fn = (first: any, ...rest: any[]) => {
      return o[k](
        {
          ...defaultParams,
          ...first,
        },
        ...rest
      )
    }
    result[k] = fn
  }
  return result as ModifiedFirstParamObject<O, D>
}
