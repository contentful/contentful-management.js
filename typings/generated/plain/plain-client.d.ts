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
        getMany: <T extends Record<string, any> = Record<string, any>>(params: Pick<endpoints.GetManyContentTypesParams, "query"> & Partial<Pick<endpoints.GetManyContentTypesParams, "spaceId" | "environmentId">>) => Promise<import("../types/common-types").CollectionProp<import("../types/entry").EntryProps<T>>>;
        get: <T_1 extends Record<string, any> = Record<string, any>>(params: Pick<endpoints.GetSpaceParams & {
            environmentId: string;
        } & {
            entryId: string;
        } & endpoints.QueryParams, "query" | "entryId"> & Partial<Pick<endpoints.GetSpaceParams & {
            environmentId: string;
        } & {
            entryId: string;
        } & endpoints.QueryParams, "spaceId" | "environmentId">>) => Promise<import("../types/entry").EntryProps<T_1>>;
        update: <T_2 extends Record<string, any> = Record<string, any>>(params: Pick<endpoints.GetSpaceParams & {
            environmentId: string;
        } & {
            entryId: string;
        }, "entryId"> & Partial<Pick<endpoints.GetSpaceParams & {
            environmentId: string;
        } & {
            entryId: string;
        }, "spaceId" | "environmentId">>, raw: import("../types/entry").EntryProps<T_2>) => Promise<import("../types/entry").EntryProps<T_2>>;
        delete: (params: Pick<endpoints.GetSpaceParams & {
            environmentId: string;
        } & {
            entryId: string;
        }, "entryId"> & Partial<Pick<endpoints.GetSpaceParams & {
            environmentId: string;
        } & {
            entryId: string;
        }, "spaceId" | "environmentId">>) => Promise<any>;
        publish: <T_3 extends Record<string, any> = Record<string, any>>(params: Pick<endpoints.GetSpaceParams & {
            environmentId: string;
        } & {
            entryId: string;
        }, "entryId"> & Partial<Pick<endpoints.GetSpaceParams & {
            environmentId: string;
        } & {
            entryId: string;
        }, "spaceId" | "environmentId">>, raw: import("../types/entry").EntryProps<T_3>) => Promise<import("../types/entry").EntryProps<T_3>>;
        unpublish: <T_4 extends Record<string, any> = Record<string, any>>(params: Pick<endpoints.GetSpaceParams & {
            environmentId: string;
        } & {
            entryId: string;
        }, "entryId"> & Partial<Pick<endpoints.GetSpaceParams & {
            environmentId: string;
        } & {
            entryId: string;
        }, "spaceId" | "environmentId">>) => Promise<import("../types/entry").EntryProps<T_4>>;
        archive: <T_5 extends Record<string, any> = Record<string, any>>(params: Pick<endpoints.GetSpaceParams & {
            environmentId: string;
        } & {
            entryId: string;
        }, "entryId"> & Partial<Pick<endpoints.GetSpaceParams & {
            environmentId: string;
        } & {
            entryId: string;
        }, "spaceId" | "environmentId">>) => Promise<import("../types/entry").EntryProps<T_5>>;
        unarchive: <T_6 extends Record<string, any> = Record<string, any>>(params: Pick<endpoints.GetSpaceParams & {
            environmentId: string;
        } & {
            entryId: string;
        }, "entryId"> & Partial<Pick<endpoints.GetSpaceParams & {
            environmentId: string;
        } & {
            entryId: string;
        }, "spaceId" | "environmentId">>) => Promise<import("../types/entry").EntryProps<T_6>>;
        create: <T_7 extends Record<string, any> = Record<string, any>>(params: Pick<endpoints.GetSpaceParams & {
            environmentId: string;
        } & {
            contentTypeId: string;
        }, "contentTypeId"> & Partial<Pick<endpoints.GetSpaceParams & {
            environmentId: string;
        } & {
            contentTypeId: string;
        }, "spaceId" | "environmentId">>, raw: Pick<import("../types/entry").EntryProps<T_7>, "fields">) => Promise<import("../types/entry").EntryProps<T_7>>;
        createWithId: <T_8 extends Record<string, any> = Record<string, any>>(params: Pick<endpoints.GetSpaceParams & {
            environmentId: string;
        } & {
            entryId: string;
            contentTypeId: string;
        }, "entryId" | "contentTypeId"> & Partial<Pick<endpoints.GetSpaceParams & {
            environmentId: string;
        } & {
            entryId: string;
            contentTypeId: string;
        }, "spaceId" | "environmentId">>, raw: Pick<import("../types/entry").EntryProps<T_8>, "fields">) => Promise<import("../types/entry").EntryProps<T_8>>;
    };
    locale: {
        getMany: (params: Pick<endpoints.GetManyContentTypesParams, "query"> & Partial<Pick<endpoints.GetManyContentTypesParams, "spaceId" | "environmentId">>) => Promise<import("../types/common-types").CollectionProp<import("../entities/locale").LocaleProps>>;
    };
    raw: {
        getDefaultParams: () => DefaultParams | undefined;
        get: (url: string, config?: import("axios").AxiosRequestConfig | undefined) => Promise<any>;
        post: (url: string, payload?: any, config?: import("axios").AxiosRequestConfig | undefined) => Promise<any>;
        put: (url: string, payload?: any, config?: import("axios").AxiosRequestConfig | undefined) => Promise<any>;
        delete: (url: string, config?: import("axios").AxiosRequestConfig | undefined) => Promise<any>;
    };
};
