/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionWithAtLeastOneParam, RestParamsType, FirstParamType } from './wrapWithHttp'

type Except<ObjectType, KeysType extends keyof ObjectType> = Pick<
  ObjectType,
  Exclude<keyof ObjectType, KeysType>
>

export type SetOptional<BaseType, Keys extends keyof BaseType = keyof BaseType> =
  // Pick just the keys that are not optional from the base type.
  Except<BaseType, Keys> &
    // Pick the keys that should be optional from the base type and make them optional.
    Partial<Pick<BaseType, Keys>>

type ModifiedFirstParamType<F extends FunctionWithAtLeastOneParam, D extends object> = (
  params: SetOptional<FirstParamType<F>, keyof (D | FirstParamType<F>)>,
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
