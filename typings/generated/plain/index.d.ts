import { AxiosInstance } from 'axios';
import { SpaceProps } from '../types/space';
import { EnvironmentProps } from '../types/environment';
import { ContentTypeProps } from '../types/content-type';
import { EntryProps } from '../types/entry';
import { UserProps } from '../entities/user';
import { LocaleProps } from '../types/locale';
import { CollectionProp, QueryOptions } from '../types/common-types';
export declare type QueryParams = {
    query?: QueryOptions;
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
export declare const environment: {
    get(http: AxiosInstance, params: GetEnvironmentParams): Promise<EnvironmentProps>;
    update(http: AxiosInstance, params: GetEnvironmentParams, raw: EnvironmentProps): Promise<EnvironmentProps>;
};
export declare type GetManyContentTypesParams = GetEnvironmentParams & QueryParams;
export declare const contentType: {
    getMany(http: AxiosInstance, params: GetManyContentTypesParams): Promise<CollectionProp<ContentTypeProps>>;
};
export declare type GetManyUsersParams = GetSpaceParams & QueryParams;
export declare const user: {
    getManyForSpace(http: AxiosInstance, params: GetManyUsersParams): Promise<CollectionProp<UserProps>>;
};
export declare type GetManyEntriesParams = GetEnvironmentParams & QueryParams;
export declare const entry: {
    getMany(http: AxiosInstance, params: GetManyEntriesParams): Promise<CollectionProp<EntryProps>>;
};
export declare const locale: {
    getMany(http: AxiosInstance, params: GetEnvironmentParams): Promise<CollectionProp<LocaleProps>>;
};
