import { AxiosInstance } from 'axios';
export declare type FunctionWithAtLeastOneParam = (p1: any, ...rest: any[]) => any;
export declare type FirstParamType<F> = F extends (p1: infer P, ...rest: any[]) => any ? P : never;
export declare type RestParamsType<F> = F extends (p1: any, ...rest: infer REST) => any ? REST : never;
declare type RemoveFirstParam<F extends FunctionWithAtLeastOneParam> = (...rest: RestParamsType<F>) => ReturnType<F>;
declare type CurriedObject<O extends Record<string, FunctionWithAtLeastOneParam>> = {
    [fnName in keyof O]: RemoveFirstParam<O[fnName]>;
};
export declare const wrapWithHttp: <O extends Record<string, FunctionWithAtLeastOneParam>>(o: O, http: AxiosInstance) => CurriedObject<O>;
export {};
