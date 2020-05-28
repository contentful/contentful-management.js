import { ClientParams } from '../create-cma-http-client';
export declare type DefaultParams = {
    spaceId?: string;
    environmentId?: string;
    organizationId?: string;
};
export declare type PlainClientParams = ClientParams & {
    defaults: DefaultParams;
};
export declare type Optional<B, O> = Omit<B, keyof O> & Partial<O>;
export declare const createPlainClient: ({ defaults, ...clientParams }: PlainClientParams) => {
    space: {
        get: (params: Optional<{
            spaceId: string;
        }, DefaultParams>) => Promise<import("../types/space").SpaceProps>;
        update: (params: Optional<{
            spaceId: string;
        }, DefaultParams>, raw: import("../types/space").SpaceProps) => Promise<import("../types/space").SpaceProps>;
        delete: (params: {
            spaceId: string;
        }) => Promise<any>;
    };
    environment: {
        get: (params: {
            spaceId: string;
            environmentId: string;
        }) => Promise<import("../types/environment").EnvironmentProps>;
        update: (params: {
            spaceId: string;
            environmentId: string;
        }, raw: import("../types/environment").EnvironmentProps) => Promise<import("../types/environment").EnvironmentProps>;
    };
    contentType: {
        getMany: (params: {
            spaceId: string;
            environmentId: string;
            query?: import("../types/common-types").QueryOptions | undefined;
        }) => Promise<import("../types/common-types").CollectionProp<import("../types/content-type").ContentTypeProps>>;
    };
    user: {
        getManyForSpace: (params: {
            spaceId: string;
            query?: import("../types/common-types").QueryOptions | undefined;
        }) => Promise<import("../types/common-types").CollectionProp<import("../types/user").UserProps>>;
    };
    entry: {
        getMany: (params: {
            spaceId: string;
            environmentId: string;
            query?: import("../types/common-types").QueryOptions | undefined;
        }) => Promise<import("../types/common-types").CollectionProp<import("../types/entry").EntryProps>>;
    };
};
