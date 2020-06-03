import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { SpaceProps } from '../types/space';
import { EnvironmentProps } from '../types/environment';
import { ContentTypeProps } from '../types/content-type';
import { EntryProps, CreateEntryProps } from '../types/entry';
import { UserProps } from '../entities/user';
import { LocaleProps } from '../types/locale';
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
    get(http: AxiosInstance, params: GetEnvironmentParams & {
        entryId: string;
    } & QueryParams): Promise<EntryProps<Record<string, any>>>;
    getMany(http: AxiosInstance, params: GetManyEntriesParams): Promise<CollectionProp<EntryProps<Record<string, any>>>>;
    update(http: AxiosInstance, params: GetEnvironmentParams & {
        entryId: string;
    }, raw: EntryProps): Promise<EntryProps<Record<string, any>>>;
    delete(http: AxiosInstance, params: GetEnvironmentParams & {
        entryId: string;
    }): Promise<any>;
    publish(http: AxiosInstance, params: GetEnvironmentParams & {
        entryId: string;
    }, raw: EntryProps): Promise<EntryProps<Record<string, any>>>;
    unpublish(http: AxiosInstance, params: GetEnvironmentParams & {
        entryId: string;
    }): Promise<EntryProps<Record<string, any>>>;
    archive(http: AxiosInstance, params: GetEnvironmentParams & {
        entryId: string;
    }): Promise<EntryProps<Record<string, any>>>;
    unarchive(http: AxiosInstance, params: GetEnvironmentParams & {
        entryId: string;
    }): Promise<EntryProps<Record<string, any>>>;
    create(http: AxiosInstance, params: GetEnvironmentParams & {
        contentTypeId: string;
    }, raw: CreateEntryProps): Promise<EntryProps<Record<string, any>>>;
    createWithId(http: AxiosInstance, params: GetEnvironmentParams & {
        entryId: string;
        contentTypeId: string;
    }, raw: CreateEntryProps): Promise<EntryProps<Record<string, any>>>;
};
/**
 * Locale
 */
export declare const locale: {
    getMany(http: AxiosInstance, params: GetEnvironmentParams & QueryParams): Promise<CollectionProp<LocaleProps>>;
};
export {};
