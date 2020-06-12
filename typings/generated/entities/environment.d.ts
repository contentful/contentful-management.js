/// <reference types="node" />
import createEnvironmentApi from '../create-environment-api';
import { CollectionProp, DefaultElements, MetaLinkProps, MetaSysProps } from '../common-types';
import { AxiosInstance } from 'axios';
declare type SdkHttpClient = AxiosInstance & {
    httpClientParams: Record<string, any>;
    cloneWithNewParams: (newParams: Record<string, any>) => SdkHttpClient;
};
export declare type ContentfulEnvironmentAPI = ReturnType<typeof createEnvironmentApi>;
export declare type EnvironmentProps = {
    /**
     * System metadata
     */
    sys: MetaSysProps & {
        space: {
            sys: MetaLinkProps;
        };
    };
    /**
     * Name of the environmant
     */
    name: string;
};
export interface Environment extends ContentfulEnvironmentAPI, EnvironmentProps, DefaultElements<EnvironmentProps> {
}
/**
 * This method creates the API for the given environment with all the methods for
 * reading and creating other entities. It also passes down a clone of the
 * http client with a environment id, so the base path for requests now has the
 * environment id already set.
 * @private
 * @param http - HTTP client instance
 * @param data - API response for a Environment
 * @return
 */
export declare function wrapEnvironment(http: AxiosInstance, data: EnvironmentProps): {
    getEntryFromData: (entryData: import("./entry").EntryProp) => import("./entry").EntryProp & {
        toPlainObject(): import("./entry").EntryProp;
    };
    getAssetFromData: (assetData: import("./asset").AssetProps) => import("./asset").AssetProps & {
        toPlainObject(): import("./asset").AssetProps;
    };
    delete: () => Promise<void>;
    update: () => Promise<any & EnvironmentProps & {
        toPlainObject(): EnvironmentProps;
    }>;
    getContentType: (id: string) => Promise<import("./content-type").ContentTypeProps & {
        toPlainObject(): import("./content-type").ContentTypeProps;
    }>;
    getContentTypes: (query?: import("../common-types").QueryOptions) => Promise<CollectionProp<import("./content-type").ContentTypeProps> & {
        toPlainObject(): CollectionProp<import("./content-type").ContentTypeProps>;
    }>;
    createContentType: (data: Pick<import("./content-type").ContentTypeProps, "description" | "name" | "displayField" | "fields">) => Promise<import("./content-type").ContentTypeProps & {
        toPlainObject(): import("./content-type").ContentTypeProps;
    }>;
    createContentTypeWithId: (id: string, data: Pick<import("./content-type").ContentTypeProps, "description" | "name" | "displayField" | "fields">) => Promise<import("./content-type").ContentTypeProps & {
        toPlainObject(): import("./content-type").ContentTypeProps;
    }>;
    getEditorInterfaceForContentType: (contentTypeId: string) => Promise<import("./editor-interface").EditorInterface>;
    getEntry: (id: string, query?: import("../common-types").QueryOptions) => Promise<import("./entry").EntryProp & {
        toPlainObject(): import("./entry").EntryProp;
    }>;
    getEntries: (query?: import("../common-types").QueryOptions) => Promise<CollectionProp<import("./entry").EntryProp> & {
        toPlainObject(): CollectionProp<import("./entry").EntryProp>;
    }>;
    createEntry: (contentTypeId: string, data: Pick<import("./entry").EntryProp, "fields">) => Promise<import("./entry").EntryProp & {
        toPlainObject(): import("./entry").EntryProp;
    }>;
    createEntryWithId: (contentTypeId: string, id: string, data: Pick<import("./entry").EntryProp, "fields">) => Promise<import("./entry").EntryProp & {
        toPlainObject(): import("./entry").EntryProp;
    }>;
    getAsset: (id: string, query?: import("../common-types").QueryOptions) => Promise<import("./asset").AssetProps & {
        toPlainObject(): import("./asset").AssetProps;
    }>;
    getAssets: (query?: import("../common-types").QueryOptions) => Promise<CollectionProp<import("./asset").AssetProps> & {
        toPlainObject(): CollectionProp<import("./asset").AssetProps>;
    }>;
    createAsset: (data: Pick<import("./asset").AssetProps, "fields">) => Promise<import("./asset").AssetProps & {
        toPlainObject(): import("./asset").AssetProps;
    }>;
    createAssetWithId: (id: string, data: Pick<import("./asset").AssetProps, "fields">) => Promise<import("./asset").AssetProps & {
        toPlainObject(): import("./asset").AssetProps;
    }>;
    createAssetFromFiles: (data: Pick<import("./asset").AssetFileProp, "fields">) => Promise<import("./asset").AssetProps & {
        toPlainObject(): import("./asset").AssetProps;
    }>;
    getUpload: (id: string) => Promise<import("./upload").UploadProps & {
        toPlainObject(): import("./upload").UploadProps;
    }>;
    createUpload: (data: {
        file: string | ArrayBuffer | import("stream").Stream;
    }) => Promise<import("./upload").UploadProps & {
        toPlainObject(): import("./upload").UploadProps;
    }>;
    getLocale: (id: string) => Promise<import("./locale").LocaleProps & {
        toPlainObject(): import("./locale").LocaleProps;
    }>;
    getLocales: () => Promise<CollectionProp<import("./locale").LocaleProps> & {
        toPlainObject(): CollectionProp<import("./locale").LocaleProps>;
    }>;
    createLocale: (data: Pick<import("./locale").LocaleProps, "optional" | "default" | "code" | "name" | "fallbackCode" | "contentDeliveryApi" | "contentManagementApi">) => Promise<import("./locale").LocaleProps & {
        toPlainObject(): import("./locale").LocaleProps;
    }>;
    getUiExtension: (id: string) => Promise<import("./ui-extension").UIExtensionProps & {
        toPlainObject(): import("./ui-extension").UIExtensionProps;
    }>;
    getUiExtensions: () => Promise<CollectionProp<import("./ui-extension").UIExtensionProps> & {
        toPlainObject(): CollectionProp<import("./ui-extension").UIExtensionProps>;
    }>;
    createUiExtension: (data: Pick<import("./ui-extension").UIExtensionProps, "extension">) => Promise<import("./ui-extension").UIExtensionProps & {
        toPlainObject(): import("./ui-extension").UIExtensionProps;
    }>;
    createUiExtensionWithId: (id: string, data: Pick<import("./ui-extension").UIExtensionProps, "extension">) => Promise<import("./ui-extension").UIExtensionProps & {
        toPlainObject(): import("./ui-extension").UIExtensionProps;
    }>;
    createAppInstallation: (appDefinitionId: string, data: Pick<import("./app-installation").AppInstallationProps, "parameters">) => Promise<{
        update: () => Promise<any & import("./app-installation").AppInstallationProps & {
            toPlainObject(): import("./app-installation").AppInstallationProps;
        }>;
        delete: () => Promise<void>;
    } & import("./app-installation").AppInstallationProps & {
        toPlainObject(): import("./app-installation").AppInstallationProps;
    }>;
    getAppInstallation: (id: string) => Promise<{
        update: () => Promise<any & import("./app-installation").AppInstallationProps & {
            toPlainObject(): import("./app-installation").AppInstallationProps;
        }>;
        delete: () => Promise<void>;
    } & import("./app-installation").AppInstallationProps & {
        toPlainObject(): import("./app-installation").AppInstallationProps;
    }>;
    getAppInstallations: () => Promise<CollectionProp<import("./app-installation").AppInstallationProps> & {
        toPlainObject(): CollectionProp<import("./app-installation").AppInstallationProps>;
    }>;
    getEntrySnapshots: (entryId: string, query?: import("../common-types").QueryOptions) => Promise<CollectionProp<import("./snapshot").SnapshotProps<unknown>> & {
        toPlainObject(): CollectionProp<import("./snapshot").SnapshotProps<unknown>>;
    }>;
    getContentTypeSnapshots: (contentTypeId: string, query?: import("../common-types").QueryOptions) => Promise<CollectionProp<import("./snapshot").SnapshotProps<unknown>> & {
        toPlainObject(): CollectionProp<import("./snapshot").SnapshotProps<unknown>>;
    }>;
} & EnvironmentProps & {
    toPlainObject(): EnvironmentProps;
};
/**
 * This method wraps each environment in a collection with the environment API. See wrapEnvironment
 * above for more details.
 * @private
 * @param http - HTTP client instance
 * @param data - API response for a Environment collection
 * @return
 */
export declare function wrapEnvironmentCollection(http: SdkHttpClient, data: CollectionProp<EnvironmentProps>): {
    items: ({
        getEntryFromData: (entryData: import("./entry").EntryProp) => import("./entry").EntryProp & {
            toPlainObject(): import("./entry").EntryProp;
        };
        getAssetFromData: (assetData: import("./asset").AssetProps) => import("./asset").AssetProps & {
            toPlainObject(): import("./asset").AssetProps;
        };
        delete: () => Promise<void>;
        update: () => Promise<any & EnvironmentProps & {
            toPlainObject(): EnvironmentProps;
        }>;
        getContentType: (id: string) => Promise<import("./content-type").ContentTypeProps & {
            toPlainObject(): import("./content-type").ContentTypeProps;
        }>;
        getContentTypes: (query?: import("../common-types").QueryOptions) => Promise<CollectionProp<import("./content-type").ContentTypeProps> & {
            toPlainObject(): CollectionProp<import("./content-type").ContentTypeProps>;
        }>;
        createContentType: (data: Pick<import("./content-type").ContentTypeProps, "description" | "name" | "displayField" | "fields">) => Promise<import("./content-type").ContentTypeProps & {
            toPlainObject(): import("./content-type").ContentTypeProps;
        }>;
        createContentTypeWithId: (id: string, data: Pick<import("./content-type").ContentTypeProps, "description" | "name" | "displayField" | "fields">) => Promise<import("./content-type").ContentTypeProps & {
            toPlainObject(): import("./content-type").ContentTypeProps;
        }>;
        getEditorInterfaceForContentType: (contentTypeId: string) => Promise<import("./editor-interface").EditorInterface>;
        getEntry: (id: string, query?: import("../common-types").QueryOptions) => Promise<import("./entry").EntryProp & {
            toPlainObject(): import("./entry").EntryProp;
        }>;
        getEntries: (query?: import("../common-types").QueryOptions) => Promise<CollectionProp<import("./entry").EntryProp> & {
            toPlainObject(): CollectionProp<import("./entry").EntryProp>;
        }>;
        createEntry: (contentTypeId: string, data: Pick<import("./entry").EntryProp, "fields">) => Promise<import("./entry").EntryProp & {
            toPlainObject(): import("./entry").EntryProp;
        }>;
        createEntryWithId: (contentTypeId: string, id: string, data: Pick<import("./entry").EntryProp, "fields">) => Promise<import("./entry").EntryProp & {
            toPlainObject(): import("./entry").EntryProp;
        }>;
        getAsset: (id: string, query?: import("../common-types").QueryOptions) => Promise<import("./asset").AssetProps & {
            toPlainObject(): import("./asset").AssetProps;
        }>;
        getAssets: (query?: import("../common-types").QueryOptions) => Promise<CollectionProp<import("./asset").AssetProps> & {
            toPlainObject(): CollectionProp<import("./asset").AssetProps>;
        }>;
        createAsset: (data: Pick<import("./asset").AssetProps, "fields">) => Promise<import("./asset").AssetProps & {
            toPlainObject(): import("./asset").AssetProps;
        }>;
        createAssetWithId: (id: string, data: Pick<import("./asset").AssetProps, "fields">) => Promise<import("./asset").AssetProps & {
            toPlainObject(): import("./asset").AssetProps;
        }>;
        createAssetFromFiles: (data: Pick<import("./asset").AssetFileProp, "fields">) => Promise<import("./asset").AssetProps & {
            toPlainObject(): import("./asset").AssetProps;
        }>;
        getUpload: (id: string) => Promise<import("./upload").UploadProps & {
            toPlainObject(): import("./upload").UploadProps;
        }>;
        createUpload: (data: {
            file: string | ArrayBuffer | import("stream").Stream;
        }) => Promise<import("./upload").UploadProps & {
            toPlainObject(): import("./upload").UploadProps;
        }>;
        getLocale: (id: string) => Promise<import("./locale").LocaleProps & {
            toPlainObject(): import("./locale").LocaleProps;
        }>;
        getLocales: () => Promise<CollectionProp<import("./locale").LocaleProps> & {
            toPlainObject(): CollectionProp<import("./locale").LocaleProps>;
        }>;
        createLocale: (data: Pick<import("./locale").LocaleProps, "optional" | "default" | "code" | "name" | "fallbackCode" | "contentDeliveryApi" | "contentManagementApi">) => Promise<import("./locale").LocaleProps & {
            toPlainObject(): import("./locale").LocaleProps;
        }>;
        getUiExtension: (id: string) => Promise<import("./ui-extension").UIExtensionProps & {
            toPlainObject(): import("./ui-extension").UIExtensionProps;
        }>;
        getUiExtensions: () => Promise<CollectionProp<import("./ui-extension").UIExtensionProps> & {
            toPlainObject(): CollectionProp<import("./ui-extension").UIExtensionProps>;
        }>;
        createUiExtension: (data: Pick<import("./ui-extension").UIExtensionProps, "extension">) => Promise<import("./ui-extension").UIExtensionProps & {
            toPlainObject(): import("./ui-extension").UIExtensionProps;
        }>;
        createUiExtensionWithId: (id: string, data: Pick<import("./ui-extension").UIExtensionProps, "extension">) => Promise<import("./ui-extension").UIExtensionProps & {
            toPlainObject(): import("./ui-extension").UIExtensionProps;
        }>;
        createAppInstallation: (appDefinitionId: string, data: Pick<import("./app-installation").AppInstallationProps, "parameters">) => Promise<{
            update: () => Promise<any & import("./app-installation").AppInstallationProps & {
                toPlainObject(): import("./app-installation").AppInstallationProps;
            }>;
            delete: () => Promise<void>;
        } & import("./app-installation").AppInstallationProps & {
            toPlainObject(): import("./app-installation").AppInstallationProps;
        }>;
        getAppInstallation: (id: string) => Promise<{
            update: () => Promise<any & import("./app-installation").AppInstallationProps & {
                toPlainObject(): import("./app-installation").AppInstallationProps;
            }>;
            delete: () => Promise<void>;
        } & import("./app-installation").AppInstallationProps & {
            toPlainObject(): import("./app-installation").AppInstallationProps;
        }>;
        getAppInstallations: () => Promise<CollectionProp<import("./app-installation").AppInstallationProps> & {
            toPlainObject(): CollectionProp<import("./app-installation").AppInstallationProps>;
        }>;
        getEntrySnapshots: (entryId: string, query?: import("../common-types").QueryOptions) => Promise<CollectionProp<import("./snapshot").SnapshotProps<unknown>> & {
            toPlainObject(): CollectionProp<import("./snapshot").SnapshotProps<unknown>>;
        }>;
        getContentTypeSnapshots: (contentTypeId: string, query?: import("../common-types").QueryOptions) => Promise<CollectionProp<import("./snapshot").SnapshotProps<unknown>> & {
            toPlainObject(): CollectionProp<import("./snapshot").SnapshotProps<unknown>>;
        }>;
    } & EnvironmentProps & {
        toPlainObject(): EnvironmentProps;
    })[];
    sys: {
        type: "Array";
    };
    total: number;
    skip: number;
    limit: number;
    toPlainObject(): CollectionProp<EnvironmentProps>;
};
export {};
