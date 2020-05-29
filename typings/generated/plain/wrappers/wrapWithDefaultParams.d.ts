import { FunctionWithAtLeastOneParam, RestParamsType, FirstParamType } from './wrapWithHttp';
declare type Except<ObjectType, KeysType extends keyof ObjectType> = Pick<ObjectType, Exclude<keyof ObjectType, KeysType>>;
export declare type SetOptional<BaseType, Keys extends keyof BaseType = keyof BaseType> = Except<BaseType, Keys> & Partial<Pick<BaseType, Keys>>;
declare type ModifiedFirstParamType<F extends FunctionWithAtLeastOneParam, D extends object> = (params: SetOptional<FirstParamType<F>, keyof (D | FirstParamType<F>)>, ...rest: RestParamsType<F>) => ReturnType<F>;
declare type ModifiedFirstParamObject<O extends Record<string, FunctionWithAtLeastOneParam>, D extends object> = {
    [fnName in keyof O]: ModifiedFirstParamType<O[fnName], D>;
};
export declare const wrapWithDefaultParams: <O extends Record<string, FunctionWithAtLeastOneParam>, D extends object>(o: O, defaultParams?: D) => ModifiedFirstParamObject<O, D>;
export {};
