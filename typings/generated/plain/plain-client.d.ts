import { ClientParams } from '../create-cma-http-client';
import { DefaultParams } from './wrappers/wrap';
export declare const createPlainClient: (params: ClientParams, defaults?: DefaultParams | undefined) => {
    space: {
        get: (params: Pick<{
            spaceId: string;
        }, never> & Partial<Pick<{
            spaceId: string;
        }, "spaceId">>) => Promise<import("../types/space").SpaceProps>;
        update: (params: Pick<{
            spaceId: string;
        }, never> & Partial<Pick<{
            spaceId: string;
        }, "spaceId">>, raw: import("../types/space").SpaceProps) => Promise<import("../types/space").SpaceProps>;
        delete: (params: Pick<{
            spaceId: string;
        }, never> & Partial<Pick<{
            spaceId: string;
        }, "spaceId">>) => Promise<any>;
    };
    environment: {
        get: (params: Pick<{
            spaceId: string;
            environmentId: string;
        }, never> & Partial<Pick<{
            spaceId: string;
            environmentId: string;
        }, "spaceId" | "environmentId">>) => Promise<import("../types/environment").EnvironmentProps>;
        update: (params: Pick<{
            spaceId: string;
            environmentId: string;
        }, never> & Partial<Pick<{
            spaceId: string;
            environmentId: string;
        }, "spaceId" | "environmentId">>, raw: import("../types/environment").EnvironmentProps) => Promise<import("../types/environment").EnvironmentProps>;
    };
    contentType: {
        getMany: (params: Pick<{
            spaceId: string;
            environmentId: string;
            query?: import("../types/common-types").QueryOptions | undefined;
        }, "query"> & Partial<Pick<{
            spaceId: string;
            environmentId: string;
            query?: import("../types/common-types").QueryOptions | undefined;
        }, "spaceId" | "environmentId">>) => Promise<import("../types/common-types").CollectionProp<import("../types/content-type").ContentTypeProps>>;
    };
    user: {
        getManyForSpace: (params: Pick<{
            spaceId: string;
            query?: import("../types/common-types").QueryOptions | undefined;
        }, "query"> & Partial<Pick<{
            spaceId: string;
            query?: import("../types/common-types").QueryOptions | undefined;
        }, "spaceId">>) => Promise<import("../types/common-types").CollectionProp<import("../types/user").UserProps>>;
    };
    entry: {
        getMany: (params: Pick<{
            spaceId: string;
            environmentId: string;
            query?: import("../types/common-types").QueryOptions | undefined;
        }, "query"> & Partial<Pick<{
            spaceId: string;
            environmentId: string;
            query?: import("../types/common-types").QueryOptions | undefined;
        }, "spaceId" | "environmentId">>) => Promise<import("../types/common-types").CollectionProp<import("../types/entry").EntryProps>>;
    };
};
