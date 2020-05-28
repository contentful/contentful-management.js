import { AxiosInstance } from 'axios';
import { SpaceProps } from '../types/space';
import { EnvironmentProps } from '../types/environment';
import { ContentTypeProps } from '../types/content-type';
import { UserProps } from '../types/user';
import { EntryProps } from '../types/entry';
import { CollectionProp, QueryOptions } from '../types/common-types';
/**
 * Space
 */
export declare const space: {
    get(http: AxiosInstance, params: {
        spaceId: string;
    }): Promise<SpaceProps>;
    update(http: AxiosInstance, params: {
        spaceId: string;
    }, raw: SpaceProps): Promise<SpaceProps>;
    delete(http: AxiosInstance, params: {
        spaceId: string;
    }): Promise<any>;
};
export declare const environment: {
    get(http: AxiosInstance, params: {
        spaceId: string;
        environmentId: string;
    }): Promise<EnvironmentProps>;
    update(http: AxiosInstance, params: {
        spaceId: string;
        environmentId: string;
    }, raw: EnvironmentProps): Promise<EnvironmentProps>;
};
export declare const contentType: {
    getMany(http: AxiosInstance, params: {
        spaceId: string;
        environmentId: string;
        query?: QueryOptions;
    }): Promise<CollectionProp<ContentTypeProps>>;
};
export declare const user: {
    getManyForSpace(http: AxiosInstance, params: {
        spaceId: string;
        query?: QueryOptions;
    }): Promise<CollectionProp<UserProps>>;
};
export declare const entry: {
    getMany(http: AxiosInstance, params: {
        spaceId: string;
        environmentId: string;
        query?: QueryOptions;
    }): Promise<CollectionProp<EntryProps>>;
};
