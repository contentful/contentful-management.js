import { AxiosInstance } from 'axios';
import { Except } from 'type-fest';
export declare type DefaultParams = {
    spaceId?: string;
    environmentId?: string;
    organizationId?: string;
};
export declare type WrapParams = {
    http: AxiosInstance;
    defaults?: DefaultParams;
};
declare type MarkOptional<BaseType, Keys extends keyof BaseType = keyof BaseType> = Except<BaseType, Keys> & Partial<Pick<BaseType, Keys>>;
declare type EndpointDefinition<T extends any[], P extends {}, R> = (http: AxiosInstance, params: P, ...rest: T) => R;
export declare const wrap: <T extends any[], P extends {}, R>({ http, defaults }: WrapParams, fn: EndpointDefinition<T, P, R>) => (params: MarkOptional<P, (keyof P & "spaceId") | (keyof P & "environmentId") | (keyof P & "organizationId")>, ...rest: T) => R;
export {};
