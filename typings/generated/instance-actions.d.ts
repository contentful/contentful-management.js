import { AxiosInstance } from 'axios';
/**
 * @private
 */
export declare function createUpdateEntity({ http, entityPath, wrapperMethod, headers }: {
    http: AxiosInstance;
    entityPath: string;
    wrapperMethod: Function;
    headers?: Record<string, any>;
}): () => Promise<any>;
/**
 * @private
 */
export declare function createDeleteEntity({ http, entityPath }: {
    http: AxiosInstance;
    entityPath: string;
}): () => Promise<void>;
/**
 * @private
 */
export declare function createPublishEntity({ http, entityPath, wrapperMethod }: {
    http: AxiosInstance;
    entityPath: string;
    wrapperMethod: Function;
}): () => Promise<any>;
/**
 * @private
 */
export declare function createUnpublishEntity({ http, entityPath, wrapperMethod }: {
    http: AxiosInstance;
    entityPath: string;
    wrapperMethod: Function;
}): () => Promise<any>;
/**
 * @private
 */
export declare function createArchiveEntity({ http, entityPath, wrapperMethod }: {
    http: AxiosInstance;
    entityPath: string;
    wrapperMethod: Function;
}): () => Promise<any>;
/**
 * @private
 */
export declare function createUnarchiveEntity({ http, entityPath, wrapperMethod }: {
    http: AxiosInstance;
    entityPath: string;
    wrapperMethod: Function;
}): () => Promise<any>;
/**
 * @private
 */
export declare function createPublishedChecker(): () => boolean;
/**
 * @private
 */
export declare function createUpdatedChecker(): () => boolean;
/**
 * @private
 */
export declare function createDraftChecker(): () => boolean;
/**
 * @private
 */
export declare function createArchivedChecker(): () => boolean;
