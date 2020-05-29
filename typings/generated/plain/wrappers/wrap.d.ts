import { AxiosInstance } from 'axios';
export declare type DefaultParams = {
    spaceId?: string;
    environmentId?: string;
    organizationId?: string;
};
export declare type WrapParams = {
    http: AxiosInstance;
    defaults?: DefaultParams;
};
declare type Except<ObjectType, KeysType extends keyof ObjectType> = Pick<ObjectType, Exclude<keyof ObjectType, KeysType>>;
declare type SetOptional<BaseType, Keys extends keyof BaseType = keyof BaseType> = Except<BaseType, Keys> & Partial<Pick<BaseType, Keys>>;
declare type EndpointDefinition<T extends any[], P extends {}, R> = (http: AxiosInstance, params: P, ...rest: T) => R;
export declare const wrap: <T extends any[], P extends {}, R>({ http, defaults }: WrapParams, fn: EndpointDefinition<T, P, R>) => (params: SetOptional<P, (keyof P & "spaceId") | (keyof P & "environmentId") | (keyof P & "organizationId")>, ...rest: T) => R;
export {};
