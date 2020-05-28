import { ClientParams } from '../create-cma-http-client';
export declare const createPlainClient: (params: ClientParams) => {
    space: {
        get: (params: {
            spaceId: string;
        }) => Promise<any>;
        update: (params: {
            spaceId: string;
        }, raw: any) => Promise<any>;
        delete: (params: {
            spaceId: string;
        }) => Promise<any>;
    };
    environment: {
        get: (params: {
            spaceId: string;
            environmentId: string;
        }) => Promise<any>;
        update: (params: {
            spaceId: string;
            environmentId: string;
        }, raw: any) => Promise<any>;
    };
    contentType: {
        getAll: (params: {
            spaceId: string;
            environmentId: string;
            query?: object | undefined;
        }) => Promise<any>;
    };
    user: {
        getAllForSpace: (params: {
            spaceId: string;
            query?: object | undefined;
        }) => Promise<any>;
    };
    entry: {
        getMany: (params: {
            spaceId: string;
            environmentId: string;
            query?: object | undefined;
        }) => Promise<any>;
    };
};
