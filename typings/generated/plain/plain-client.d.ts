import { ClientParams } from '../create-cma-http-client';
export declare type DefaultParams = {
    spaceId?: string;
    environmentId?: string;
    organizationId?: string;
};
export declare type Optional<B, O> = Omit<B, keyof O> & Partial<O>;
export declare const createPlainClient: (params: ClientParams, defaults?: DefaultParams | undefined) => {
    space: {
        get: (params: Optional<{
            spaceId: string;
        }, DefaultParams>) => Promise<import("../types/space").SpaceProps>;
        update: (params: Optional<{
            spaceId: string;
        }, DefaultParams>, raw: import("../types/space").SpaceProps) => Promise<import("../types/space").SpaceProps>;
        delete: (params: Optional<{
            spaceId: string;
        }, DefaultParams>) => Promise<any>;
    };
    environment: {
        get: (params: Optional<{
            spaceId: string;
            environmentId: string;
        }, DefaultParams>) => Promise<import("../types/environment").EnvironmentProps>;
        update: (params: Optional<{
            spaceId: string;
            environmentId: string;
        }, DefaultParams>, raw: import("../types/environment").EnvironmentProps) => Promise<import("../types/environment").EnvironmentProps>;
    };
    contentType: {
        getMany: (params: Optional<{
            spaceId: string;
            environmentId: string;
            query?: import("../types/common-types").QueryOptions | undefined;
        }, DefaultParams>) => Promise<import("../types/common-types").CollectionProp<import("../types/content-type").ContentTypeProps>>;
    };
    user: {
        getManyForSpace: (params: Optional<{
            spaceId: string;
            query?: import("../types/common-types").QueryOptions | undefined;
        }, DefaultParams>) => Promise<import("../types/common-types").CollectionProp<import("../types/user").UserProps>>;
    };
    entry: {
        getMany: (params: Optional<{
            spaceId: string;
            environmentId: string;
            query?: import("../types/common-types").QueryOptions | undefined;
        }, DefaultParams>) => Promise<import("../types/common-types").CollectionProp<import("../types/entry").EntryProps>>;
    };
};
