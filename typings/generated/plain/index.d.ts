import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { SpaceProps } from '../types/space';
import { EnvironmentProps } from '../types/environment';
import { ContentTypeProps } from '../types/content-type';
import { EntryProps, CreateEntryProps } from '../types/entry';
import { UserProps } from '../entities/user';
import { LocaleProps } from '../entities/locale';
import { CollectionProp, QueryOptions } from '../types/common-types';
declare function get<T = any>(http: AxiosInstance, url: string, config?: AxiosRequestConfig): Promise<T>;
declare function post<T = any>(http: AxiosInstance, url: string, payload?: any, config?: AxiosRequestConfig): Promise<T>;
declare function put<T = any>(http: AxiosInstance, url: string, payload?: any, config?: AxiosRequestConfig): Promise<T>;
declare function del<T = any>(http: AxiosInstance, url: string, config?: AxiosRequestConfig): Promise<T>;
export declare type QueryParams = {
    query?: QueryOptions;
};
export declare const raw: {
    get: typeof get;
    post: typeof post;
    put: typeof put;
    delete: typeof del;
};
/**
 * Space
 */
export declare type GetSpaceParams = {
    spaceId: string;
};
export declare const space: {
    get(http: AxiosInstance, params: GetSpaceParams): Promise<SpaceProps>;
    update(http: AxiosInstance, params: GetSpaceParams, raw: SpaceProps): Promise<SpaceProps>;
    delete(http: AxiosInstance, params: GetSpaceParams): Promise<any>;
};
export declare type GetEnvironmentParams = GetSpaceParams & {
    environmentId: string;
};
/**
 * Environment
 */
export declare const environment: {
    get(http: AxiosInstance, params: GetEnvironmentParams): Promise<EnvironmentProps>;
    update(http: AxiosInstance, params: GetEnvironmentParams, raw: EnvironmentProps): Promise<EnvironmentProps>;
};
/**
 * Content type
 */
export declare type GetManyContentTypesParams = GetEnvironmentParams & QueryParams;
export declare const contentType: {
    getMany(http: AxiosInstance, params: GetManyContentTypesParams): Promise<CollectionProp<ContentTypeProps>>;
};
/**
 * User
 */
export declare type GetManyUsersParams = GetSpaceParams & QueryParams;
export declare const user: {
    getManyForSpace(http: AxiosInstance, params: GetManyUsersParams): Promise<CollectionProp<UserProps>>;
};
export declare type GetManyEntriesParams = GetEnvironmentParams & QueryParams;
/**
 * Entry
 */
export declare const entry: {
    get<T extends Record<string, any> = Record<string, any>>(http: AxiosInstance, params: GetEnvironmentParams & {
        entryId: string;
    } & QueryParams): Promise<EntryProps<T>>;
    getMany<T_1 extends Record<string, any> = Record<string, any>>(http: AxiosInstance, params: GetManyEntriesParams): Promise<CollectionProp<EntryProps<T_1>>>;
    update<T_2 extends Record<string, any> = Record<string, any>>(http: AxiosInstance, params: GetEnvironmentParams & {
        entryId: string;
    }, raw: EntryProps<T_2>): Promise<EntryProps<T_2>>;
    delete(http: AxiosInstance, params: GetEnvironmentParams & {
        entryId: string;
    }): Promise<any>;
    publish<T_3 extends Record<string, any> = Record<string, any>>(http: AxiosInstance, params: GetEnvironmentParams & {
        entryId: string;
    }, raw: EntryProps<T_3>): Promise<EntryProps<T_3>>;
    unpublish<T_4 extends Record<string, any> = Record<string, any>>(http: AxiosInstance, params: GetEnvironmentParams & {
        entryId: string;
    }): Promise<EntryProps<T_4>>;
    archive<T_5 extends Record<string, any> = Record<string, any>>(http: AxiosInstance, params: GetEnvironmentParams & {
        entryId: string;
    }): Promise<EntryProps<T_5>>;
    unarchive<T_6 extends Record<string, any> = Record<string, any>>(http: AxiosInstance, params: GetEnvironmentParams & {
        entryId: string;
    }): Promise<EntryProps<T_6>>;
    create<T_7 extends Record<string, any> = Record<string, any>>(http: AxiosInstance, params: GetEnvironmentParams & {
        contentTypeId: string;
    }, raw: Pick<EntryProps<T_7>, "fields">): Promise<EntryProps<T_7>>;
    createWithId<T_8 extends Record<string, any> = Record<string, any>>(http: AxiosInstance, params: GetEnvironmentParams & {
        entryId: string;
        contentTypeId: string;
    }, raw: Pick<EntryProps<T_8>, "fields">): Promise<EntryProps<T_8>>;
};
/**
 * Locale
 */
export declare const locale: {
    getMany(http: AxiosInstance, params: GetEnvironmentParams & QueryParams): Promise<CollectionProp<LocaleProps>>;
};
export {};
