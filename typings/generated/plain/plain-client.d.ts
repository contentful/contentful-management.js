import { ClientParams } from '../create-cma-http-client';
import * as endpoints from './index';
import { DefaultParams } from './wrappers/wrap';
export declare const createPlainClient: (params: ClientParams, defaults?: DefaultParams | undefined) => {
    space: {
        get: (params: Pick<endpoints.GetSpaceParams, never> & Partial<Pick<endpoints.GetSpaceParams, "spaceId">>) => Promise<import("../types/space").SpaceProps>;
        update: (params: Pick<endpoints.GetSpaceParams, never> & Partial<Pick<endpoints.GetSpaceParams, "spaceId">>, raw: import("../types/space").SpaceProps) => Promise<import("../types/space").SpaceProps>;
        delete: (params: Pick<endpoints.GetSpaceParams, never> & Partial<Pick<endpoints.GetSpaceParams, "spaceId">>) => Promise<any>;
    };
    environment: {
        get: (params: Pick<endpoints.GetEnvironmentParams, never> & Partial<Pick<endpoints.GetEnvironmentParams, "spaceId" | "environmentId">>) => Promise<import("../types/environment").EnvironmentProps>;
        update: (params: Pick<endpoints.GetEnvironmentParams, never> & Partial<Pick<endpoints.GetEnvironmentParams, "spaceId" | "environmentId">>, raw: import("../types/environment").EnvironmentProps) => Promise<import("../types/environment").EnvironmentProps>;
    };
    contentType: {
        getMany: (params: Pick<endpoints.GetManyContentTypesParams, "query"> & Partial<Pick<endpoints.GetManyContentTypesParams, "spaceId" | "environmentId">>) => Promise<import("../types/common-types").CollectionProp<import("../types/content-type").ContentTypeProps>>;
    };
    user: {
        getManyForSpace: (params: Pick<endpoints.GetManyUsersParams, "query"> & Partial<Pick<endpoints.GetManyUsersParams, "spaceId">>) => Promise<import("../types/common-types").CollectionProp<import("../entities/user").UserProps>>;
    };
    entry: {
        getMany: (params: Pick<endpoints.GetManyContentTypesParams, "query"> & Partial<Pick<endpoints.GetManyContentTypesParams, "spaceId" | "environmentId">>) => Promise<import("../types/common-types").CollectionProp<import("../types/entry").EntryProps>>;
    };
    locale: {
        getMany: (params: Pick<endpoints.GetEnvironmentParams, never> & Partial<Pick<endpoints.GetEnvironmentParams, "spaceId" | "environmentId">>) => Promise<import("../types/common-types").CollectionProp<import("../types/locale").LocaleProps>>;
    };
};
