import { ClientParams } from '../create-cma-http-client';
declare type DefaultParams = {
    spaceId?: string;
    environmentId?: string;
    organizationId?: string;
};
export declare const createPlainClient: (params: ClientParams, defaults?: DefaultParams | undefined) => {
    space: {
        get: (params: import("./wrappers/wrapWithDefaultParams").SetOptional<{
            spaceId: string;
        }, "spaceId">) => Promise<import("../types/space").SpaceProps>;
        update: (params: import("./wrappers/wrapWithDefaultParams").SetOptional<{
            spaceId: string;
        }, "spaceId">, raw: import("../types/space").SpaceProps) => Promise<import("../types/space").SpaceProps>;
        delete: (params: import("./wrappers/wrapWithDefaultParams").SetOptional<{
            spaceId: string;
        }, "spaceId">) => Promise<any>;
    };
    environment: {
        get: (params: import("./wrappers/wrapWithDefaultParams").SetOptional<{
            spaceId: string;
            environmentId: string;
        }, "spaceId" | "environmentId">) => Promise<import("../types/environment").EnvironmentProps>;
        update: (params: import("./wrappers/wrapWithDefaultParams").SetOptional<{
            spaceId: string;
            environmentId: string;
        }, "spaceId" | "environmentId">, raw: import("../types/environment").EnvironmentProps) => Promise<import("../types/environment").EnvironmentProps>;
    };
    contentType: {
        getMany: (params: import("./wrappers/wrapWithDefaultParams").SetOptional<{
            spaceId: string;
            environmentId: string;
            query?: import("../types/common-types").QueryOptions | undefined;
        }, "spaceId" | "environmentId">) => Promise<import("../types/common-types").CollectionProp<import("../types/content-type").ContentTypeProps>>;
    };
    user: {
        getManyForSpace: (params: import("./wrappers/wrapWithDefaultParams").SetOptional<{
            spaceId: string;
            query?: import("../types/common-types").QueryOptions | undefined;
        }, "spaceId">) => Promise<import("../types/common-types").CollectionProp<import("../types/user").UserProps>>;
    };
    entry: {
        getMany: (params: import("./wrappers/wrapWithDefaultParams").SetOptional<{
            spaceId: string;
            environmentId: string;
            query?: import("../types/common-types").QueryOptions | undefined;
        }, "spaceId" | "environmentId">) => Promise<import("../types/common-types").CollectionProp<import("../types/entry").EntryProps>>;
    };
};
export {};
