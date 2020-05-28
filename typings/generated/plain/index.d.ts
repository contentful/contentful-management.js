import { AxiosInstance } from 'axios';
/**
 * Space
 */
export declare const space: {
    get(http: AxiosInstance, params: {
        spaceId: string;
    }): Promise<any>;
    update(http: AxiosInstance, params: {
        spaceId: string;
    }, raw: any): Promise<any>;
    delete(http: AxiosInstance, params: {
        spaceId: string;
    }): Promise<any>;
};
export declare const environment: {
    get(http: AxiosInstance, params: {
        spaceId: string;
        environmentId: string;
    }): Promise<any>;
    update(http: AxiosInstance, params: {
        spaceId: string;
        environmentId: string;
    }, raw: any): Promise<any>;
};
export declare const contentType: {
    getAll(http: AxiosInstance, params: {
        spaceId: string;
        environmentId: string;
        query?: object;
    }): Promise<any>;
};
export declare const user: {
    getAllForSpace(http: AxiosInstance, params: {
        spaceId: string;
        query?: object;
    }): Promise<any>;
};
export declare const entry: {
    getMany(http: AxiosInstance, params: {
        spaceId: string;
        environmentId: string;
        query?: object;
    }): Promise<any>;
};
