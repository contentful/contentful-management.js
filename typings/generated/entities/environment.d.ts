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
    getEntryFromData: (entryData: import("./entry").EntryProp) => {
        update(): Promise<import("./entry").Entry>;
        archive(): Promise<import("./entry").Entry>;
        delete(): Promise<void>;
        publish(): Promise<import("./entry").Entry>;
        unarchive(): Promise<import("./entry").Entry>;
        unpublish(): Promise<import("./entry").Entry>;
        getSnapshot(id: string): Promise<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>;
        getSnapshots(): Promise<import("../common-types").Collection<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>>;
        isArchived(): boolean;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
    } & import("./entry").EntryProp & {
        toPlainObject(): import("./entry").EntryProp;
    };
    getAssetFromData: (assetData: import("./asset").AssetProps) => {
        processForAllLocales(options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
        processForLocale(locale: string, Options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
        publish(): Promise<import("./asset").Asset>;
        archive(): Promise<import("./asset").Asset>;
        delete(): Promise<void>;
        unarchive(): Promise<import("./asset").Asset>;
        unpublish(): Promise<import("./asset").Asset>;
        update(): Promise<import("./asset").Asset>;
        isPublished(): boolean;
        isUpdated(): boolean;
        isDraft(): boolean;
        isArchived(): boolean;
    } & import("./asset").AssetProps & {
        toPlainObject(): import("./asset").AssetProps;
    };
    delete: () => Promise<void>;
    update: () => Promise<any & EnvironmentProps & {
        toPlainObject(): EnvironmentProps;
    }>;
    getContentType: (id: string) => Promise<{
        update(): Promise<import("./content-type").ContentType>;
        delete(): Promise<void>;
        publish(): Promise<import("./content-type").ContentType>;
        unpublish(): Promise<import("./content-type").ContentType>;
        getEditorInterface(): Promise<import("./editor-interface").EditorInterface>;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
        omitAndDeleteField(id: string): Promise<import("./content-type").ContentType>;
        getSnapshot(id: string): Promise<import("./snapshot").SnapshotProps<import("./content-type").ContentTypeProps>>;
        getSnapshots(): Promise<import("../common-types").Collection<import("./snapshot").SnapshotProps<import("./content-type").ContentTypeProps>>>;
    } & import("./content-type").ContentTypeProps & {
        toPlainObject(): import("./content-type").ContentTypeProps;
    }>;
    getContentTypes: (query?: import("../common-types").QueryOptions) => Promise<{
        items: ({
            update(): Promise<import("./content-type").ContentType>;
            delete(): Promise<void>;
            publish(): Promise<import("./content-type").ContentType>;
            unpublish(): Promise<import("./content-type").ContentType>;
            getEditorInterface(): Promise<import("./editor-interface").EditorInterface>;
            isDraft(): boolean;
            isPublished(): boolean;
            isUpdated(): boolean;
            omitAndDeleteField(id: string): Promise<import("./content-type").ContentType>;
            getSnapshot(id: string): Promise<import("./snapshot").SnapshotProps<import("./content-type").ContentTypeProps>>;
            getSnapshots(): Promise<import("../common-types").Collection<import("./snapshot").SnapshotProps<import("./content-type").ContentTypeProps>>>;
        } & import("./content-type").ContentTypeProps & {
            toPlainObject(): import("./content-type").ContentTypeProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): CollectionProp<import("./content-type").ContentTypeProps>;
    }>;
    createContentType: (data: Pick<import("./content-type").ContentTypeProps, "description" | "name" | "displayField" | "fields">) => Promise<{
        update(): Promise<import("./content-type").ContentType>;
        delete(): Promise<void>;
        publish(): Promise<import("./content-type").ContentType>;
        unpublish(): Promise<import("./content-type").ContentType>;
        getEditorInterface(): Promise<import("./editor-interface").EditorInterface>;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
        omitAndDeleteField(id: string): Promise<import("./content-type").ContentType>;
        getSnapshot(id: string): Promise<import("./snapshot").SnapshotProps<import("./content-type").ContentTypeProps>>;
        getSnapshots(): Promise<import("../common-types").Collection<import("./snapshot").SnapshotProps<import("./content-type").ContentTypeProps>>>;
    } & import("./content-type").ContentTypeProps & {
        toPlainObject(): import("./content-type").ContentTypeProps;
    }>;
    createContentTypeWithId: (id: string, data: Pick<import("./content-type").ContentTypeProps, "description" | "name" | "displayField" | "fields">) => Promise<{
        update(): Promise<import("./content-type").ContentType>;
        delete(): Promise<void>;
        publish(): Promise<import("./content-type").ContentType>;
        unpublish(): Promise<import("./content-type").ContentType>;
        getEditorInterface(): Promise<import("./editor-interface").EditorInterface>;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
        omitAndDeleteField(id: string): Promise<import("./content-type").ContentType>;
        getSnapshot(id: string): Promise<import("./snapshot").SnapshotProps<import("./content-type").ContentTypeProps>>;
        getSnapshots(): Promise<import("../common-types").Collection<import("./snapshot").SnapshotProps<import("./content-type").ContentTypeProps>>>;
    } & import("./content-type").ContentTypeProps & {
        toPlainObject(): import("./content-type").ContentTypeProps;
    }>;
    getEditorInterfaceForContentType: (contentTypeId: string) => Promise<import("./editor-interface").EditorInterface>;
    getEntry: (id: string, query?: import("../common-types").QueryOptions) => Promise<{
        update(): Promise<import("./entry").Entry>;
        archive(): Promise<import("./entry").Entry>;
        delete(): Promise<void>;
        publish(): Promise<import("./entry").Entry>;
        unarchive(): Promise<import("./entry").Entry>;
        unpublish(): Promise<import("./entry").Entry>;
        getSnapshot(id: string): Promise<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>;
        getSnapshots(): Promise<import("../common-types").Collection<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>>;
        isArchived(): boolean;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
    } & import("./entry").EntryProp & {
        toPlainObject(): import("./entry").EntryProp;
    }>;
    getEntries: (query?: import("../common-types").QueryOptions) => Promise<{
        items: ({
            update(): Promise<import("./entry").Entry>;
            archive(): Promise<import("./entry").Entry>;
            delete(): Promise<void>;
            publish(): Promise<import("./entry").Entry>;
            unarchive(): Promise<import("./entry").Entry>;
            unpublish(): Promise<import("./entry").Entry>;
            getSnapshot(id: string): Promise<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>;
            getSnapshots(): Promise<import("../common-types").Collection<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>>;
            isArchived(): boolean;
            isDraft(): boolean;
            isPublished(): boolean;
            isUpdated(): boolean;
        } & import("./entry").EntryProp & {
            toPlainObject(): import("./entry").EntryProp;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): CollectionProp<import("./entry").EntryProp>;
    }>;
    createEntry: (contentTypeId: string, data: Pick<import("./entry").EntryProp, "fields">) => Promise<{
        update(): Promise<import("./entry").Entry>;
        archive(): Promise<import("./entry").Entry>;
        delete(): Promise<void>;
        publish(): Promise<import("./entry").Entry>;
        unarchive(): Promise<import("./entry").Entry>;
        unpublish(): Promise<import("./entry").Entry>;
        getSnapshot(id: string): Promise<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>;
        getSnapshots(): Promise<import("../common-types").Collection<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>>;
        isArchived(): boolean;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
    } & import("./entry").EntryProp & {
        toPlainObject(): import("./entry").EntryProp;
    }>;
    createEntryWithId: (contentTypeId: string, id: string, data: Pick<import("./entry").EntryProp, "fields">) => Promise<{
        update(): Promise<import("./entry").Entry>;
        archive(): Promise<import("./entry").Entry>;
        delete(): Promise<void>;
        publish(): Promise<import("./entry").Entry>;
        unarchive(): Promise<import("./entry").Entry>;
        unpublish(): Promise<import("./entry").Entry>;
        getSnapshot(id: string): Promise<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>;
        getSnapshots(): Promise<import("../common-types").Collection<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>>;
        isArchived(): boolean;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
    } & import("./entry").EntryProp & {
        toPlainObject(): import("./entry").EntryProp;
    }>;
    getAsset: (id: string, query?: import("../common-types").QueryOptions) => Promise<{
        processForAllLocales(options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
        processForLocale(locale: string, Options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
        publish(): Promise<import("./asset").Asset>;
        archive(): Promise<import("./asset").Asset>;
        delete(): Promise<void>;
        unarchive(): Promise<import("./asset").Asset>;
        unpublish(): Promise<import("./asset").Asset>;
        update(): Promise<import("./asset").Asset>;
        isPublished(): boolean;
        isUpdated(): boolean;
        isDraft(): boolean;
        isArchived(): boolean;
    } & import("./asset").AssetProps & {
        toPlainObject(): import("./asset").AssetProps;
    }>;
    getAssets: (query?: import("../common-types").QueryOptions) => Promise<{
        items: ({
            processForAllLocales(options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
            processForLocale(locale: string, Options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
            publish(): Promise<import("./asset").Asset>;
            archive(): Promise<import("./asset").Asset>;
            delete(): Promise<void>;
            unarchive(): Promise<import("./asset").Asset>;
            unpublish(): Promise<import("./asset").Asset>;
            update(): Promise<import("./asset").Asset>;
            isPublished(): boolean;
            isUpdated(): boolean;
            isDraft(): boolean;
            isArchived(): boolean;
        } & import("./asset").AssetProps & {
            toPlainObject(): import("./asset").AssetProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): CollectionProp<import("./asset").AssetProps>;
    }>;
    createAsset: (data: Pick<import("./asset").AssetProps, "fields">) => Promise<{
        processForAllLocales(options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
        processForLocale(locale: string, Options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
        publish(): Promise<import("./asset").Asset>;
        archive(): Promise<import("./asset").Asset>;
        delete(): Promise<void>;
        unarchive(): Promise<import("./asset").Asset>;
        unpublish(): Promise<import("./asset").Asset>;
        update(): Promise<import("./asset").Asset>;
        isPublished(): boolean;
        isUpdated(): boolean;
        isDraft(): boolean;
        isArchived(): boolean;
    } & import("./asset").AssetProps & {
        toPlainObject(): import("./asset").AssetProps;
    }>;
    createAssetWithId: (id: string, data: Pick<import("./asset").AssetProps, "fields">) => Promise<{
        processForAllLocales(options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
        processForLocale(locale: string, Options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
        publish(): Promise<import("./asset").Asset>;
        archive(): Promise<import("./asset").Asset>;
        delete(): Promise<void>;
        unarchive(): Promise<import("./asset").Asset>;
        unpublish(): Promise<import("./asset").Asset>;
        update(): Promise<import("./asset").Asset>;
        isPublished(): boolean;
        isUpdated(): boolean;
        isDraft(): boolean;
        isArchived(): boolean;
    } & import("./asset").AssetProps & {
        toPlainObject(): import("./asset").AssetProps;
    }>;
    createAssetFromFiles: (data: Pick<import("./asset").AssetFileProp, "fields">) => Promise<{
        processForAllLocales(options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
        processForLocale(locale: string, Options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
        publish(): Promise<import("./asset").Asset>;
        archive(): Promise<import("./asset").Asset>;
        delete(): Promise<void>;
        unarchive(): Promise<import("./asset").Asset>;
        unpublish(): Promise<import("./asset").Asset>;
        update(): Promise<import("./asset").Asset>;
        isPublished(): boolean;
        isUpdated(): boolean;
        isDraft(): boolean;
        isArchived(): boolean;
    } & import("./asset").AssetProps & {
        toPlainObject(): import("./asset").AssetProps;
    }>;
    getUpload: (id: string) => Promise<{
        delete: () => Promise<void>;
    } & import("./upload").UploadProps & {
        toPlainObject(): import("./upload").UploadProps;
    }>;
    createUpload: (data: {
        file: string | ArrayBuffer | import("stream").Stream;
    }) => Promise<{
        delete: () => Promise<void>;
    } & import("./upload").UploadProps & {
        toPlainObject(): import("./upload").UploadProps;
    }>;
    getLocale: (id: string) => Promise<{
        update: () => Promise<import("./locale").Locale>;
        delete: () => Promise<void>;
    } & import("./locale").LocaleProps & {
        toPlainObject(): import("./locale").LocaleProps;
    }>;
    getLocales: () => Promise<{
        items: ({
            update: () => Promise<import("./locale").Locale>;
            delete: () => Promise<void>;
        } & import("./locale").LocaleProps & {
            toPlainObject(): import("./locale").LocaleProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): CollectionProp<import("./locale").LocaleProps>;
    }>;
    createLocale: (data: Pick<import("./locale").LocaleProps, "optional" | "default" | "code" | "name" | "fallbackCode" | "contentDeliveryApi" | "contentManagementApi">) => Promise<{
        update: () => Promise<import("./locale").Locale>;
        delete: () => Promise<void>;
    } & import("./locale").LocaleProps & {
        toPlainObject(): import("./locale").LocaleProps;
    }>;
    getUiExtension: (id: string) => Promise<{
        update: () => Promise<import("./ui-extension").UIExtension>;
        delete: () => Promise<void>;
    } & import("./ui-extension").UIExtensionProps & {
        toPlainObject(): import("./ui-extension").UIExtensionProps;
    }>;
    getUiExtensions: () => Promise<{
        items: ({
            update: () => Promise<import("./ui-extension").UIExtension>;
            delete: () => Promise<void>;
        } & import("./ui-extension").UIExtensionProps & {
            toPlainObject(): import("./ui-extension").UIExtensionProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): CollectionProp<import("./ui-extension").UIExtensionProps>;
    }>;
    createUiExtension: (data: Pick<import("./ui-extension").UIExtensionProps, "extension">) => Promise<{
        update: () => Promise<import("./ui-extension").UIExtension>;
        delete: () => Promise<void>;
    } & import("./ui-extension").UIExtensionProps & {
        toPlainObject(): import("./ui-extension").UIExtensionProps;
    }>;
    createUiExtensionWithId: (id: string, data: Pick<import("./ui-extension").UIExtensionProps, "extension">) => Promise<{
        update: () => Promise<import("./ui-extension").UIExtension>;
        delete: () => Promise<void>;
    } & import("./ui-extension").UIExtensionProps & {
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
    getAppInstallations: () => Promise<{
        items: ({
            update: () => Promise<any & import("./app-installation").AppInstallationProps & {
                toPlainObject(): import("./app-installation").AppInstallationProps;
            }>;
            delete: () => Promise<void>;
        } & import("./app-installation").AppInstallationProps & {
            toPlainObject(): import("./app-installation").AppInstallationProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): CollectionProp<import("./app-installation").AppInstallationProps>;
    }>;
    getEntrySnapshots: (entryId: string, query?: import("../common-types").QueryOptions) => Promise<{
        items: (import("./snapshot").SnapshotProps<unknown> & {
            toPlainObject(): import("./snapshot").SnapshotProps<unknown>;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): CollectionProp<import("./snapshot").SnapshotProps<unknown>>;
    }>;
    getContentTypeSnapshots: (contentTypeId: string, query?: import("../common-types").QueryOptions) => Promise<{
        items: (import("./snapshot").SnapshotProps<unknown> & {
            toPlainObject(): import("./snapshot").SnapshotProps<unknown>;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
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
        getEntryFromData: (entryData: import("./entry").EntryProp) => {
            update(): Promise<import("./entry").Entry>;
            archive(): Promise<import("./entry").Entry>;
            delete(): Promise<void>;
            publish(): Promise<import("./entry").Entry>;
            unarchive(): Promise<import("./entry").Entry>;
            unpublish(): Promise<import("./entry").Entry>;
            getSnapshot(id: string): Promise<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>;
            getSnapshots(): Promise<import("../common-types").Collection<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>>;
            isArchived(): boolean;
            isDraft(): boolean;
            isPublished(): boolean;
            isUpdated(): boolean;
        } & import("./entry").EntryProp & {
            toPlainObject(): import("./entry").EntryProp;
        };
        getAssetFromData: (assetData: import("./asset").AssetProps) => {
            processForAllLocales(options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
            processForLocale(locale: string, Options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
            publish(): Promise<import("./asset").Asset>;
            archive(): Promise<import("./asset").Asset>;
            delete(): Promise<void>;
            unarchive(): Promise<import("./asset").Asset>;
            unpublish(): Promise<import("./asset").Asset>;
            update(): Promise<import("./asset").Asset>;
            isPublished(): boolean;
            isUpdated(): boolean;
            isDraft(): boolean;
            isArchived(): boolean;
        } & import("./asset").AssetProps & {
            toPlainObject(): import("./asset").AssetProps;
        };
        delete: () => Promise<void>;
        update: () => Promise<any & EnvironmentProps & {
            toPlainObject(): EnvironmentProps;
        }>;
        getContentType: (id: string) => Promise<{
            update(): Promise<import("./content-type").ContentType>;
            delete(): Promise<void>;
            publish(): Promise<import("./content-type").ContentType>;
            unpublish(): Promise<import("./content-type").ContentType>;
            getEditorInterface(): Promise<import("./editor-interface").EditorInterface>;
            isDraft(): boolean;
            isPublished(): boolean;
            isUpdated(): boolean;
            omitAndDeleteField(id: string): Promise<import("./content-type").ContentType>;
            getSnapshot(id: string): Promise<import("./snapshot").SnapshotProps<import("./content-type").ContentTypeProps>>;
            getSnapshots(): Promise<import("../common-types").Collection<import("./snapshot").SnapshotProps<import("./content-type").ContentTypeProps>>>;
        } & import("./content-type").ContentTypeProps & {
            toPlainObject(): import("./content-type").ContentTypeProps;
        }>;
        getContentTypes: (query?: import("../common-types").QueryOptions) => Promise<{
            items: ({
                update(): Promise<import("./content-type").ContentType>;
                delete(): Promise<void>;
                publish(): Promise<import("./content-type").ContentType>;
                unpublish(): Promise<import("./content-type").ContentType>;
                getEditorInterface(): Promise<import("./editor-interface").EditorInterface>;
                isDraft(): boolean;
                isPublished(): boolean;
                isUpdated(): boolean;
                omitAndDeleteField(id: string): Promise<import("./content-type").ContentType>;
                getSnapshot(id: string): Promise<import("./snapshot").SnapshotProps<import("./content-type").ContentTypeProps>>;
                getSnapshots(): Promise<import("../common-types").Collection<import("./snapshot").SnapshotProps<import("./content-type").ContentTypeProps>>>;
            } & import("./content-type").ContentTypeProps & {
                toPlainObject(): import("./content-type").ContentTypeProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
            toPlainObject(): CollectionProp<import("./content-type").ContentTypeProps>;
        }>;
        createContentType: (data: Pick<import("./content-type").ContentTypeProps, "description" | "name" | "displayField" | "fields">) => Promise<{
            update(): Promise<import("./content-type").ContentType>;
            delete(): Promise<void>;
            publish(): Promise<import("./content-type").ContentType>;
            unpublish(): Promise<import("./content-type").ContentType>;
            getEditorInterface(): Promise<import("./editor-interface").EditorInterface>;
            isDraft(): boolean;
            isPublished(): boolean;
            isUpdated(): boolean;
            omitAndDeleteField(id: string): Promise<import("./content-type").ContentType>;
            getSnapshot(id: string): Promise<import("./snapshot").SnapshotProps<import("./content-type").ContentTypeProps>>;
            getSnapshots(): Promise<import("../common-types").Collection<import("./snapshot").SnapshotProps<import("./content-type").ContentTypeProps>>>;
        } & import("./content-type").ContentTypeProps & {
            toPlainObject(): import("./content-type").ContentTypeProps;
        }>;
        createContentTypeWithId: (id: string, data: Pick<import("./content-type").ContentTypeProps, "description" | "name" | "displayField" | "fields">) => Promise<{
            update(): Promise<import("./content-type").ContentType>;
            delete(): Promise<void>;
            publish(): Promise<import("./content-type").ContentType>;
            unpublish(): Promise<import("./content-type").ContentType>;
            getEditorInterface(): Promise<import("./editor-interface").EditorInterface>;
            isDraft(): boolean;
            isPublished(): boolean;
            isUpdated(): boolean;
            omitAndDeleteField(id: string): Promise<import("./content-type").ContentType>;
            getSnapshot(id: string): Promise<import("./snapshot").SnapshotProps<import("./content-type").ContentTypeProps>>;
            getSnapshots(): Promise<import("../common-types").Collection<import("./snapshot").SnapshotProps<import("./content-type").ContentTypeProps>>>;
        } & import("./content-type").ContentTypeProps & {
            toPlainObject(): import("./content-type").ContentTypeProps;
        }>;
        getEditorInterfaceForContentType: (contentTypeId: string) => Promise<import("./editor-interface").EditorInterface>;
        getEntry: (id: string, query?: import("../common-types").QueryOptions) => Promise<{
            update(): Promise<import("./entry").Entry>;
            archive(): Promise<import("./entry").Entry>;
            delete(): Promise<void>;
            publish(): Promise<import("./entry").Entry>;
            unarchive(): Promise<import("./entry").Entry>;
            unpublish(): Promise<import("./entry").Entry>;
            getSnapshot(id: string): Promise<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>;
            getSnapshots(): Promise<import("../common-types").Collection<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>>;
            isArchived(): boolean;
            isDraft(): boolean;
            isPublished(): boolean;
            isUpdated(): boolean;
        } & import("./entry").EntryProp & {
            toPlainObject(): import("./entry").EntryProp;
        }>;
        getEntries: (query?: import("../common-types").QueryOptions) => Promise<{
            items: ({
                update(): Promise<import("./entry").Entry>;
                archive(): Promise<import("./entry").Entry>;
                delete(): Promise<void>;
                publish(): Promise<import("./entry").Entry>;
                unarchive(): Promise<import("./entry").Entry>;
                unpublish(): Promise<import("./entry").Entry>;
                getSnapshot(id: string): Promise<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>;
                getSnapshots(): Promise<import("../common-types").Collection<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>>;
                isArchived(): boolean;
                isDraft(): boolean;
                isPublished(): boolean;
                isUpdated(): boolean;
            } & import("./entry").EntryProp & {
                toPlainObject(): import("./entry").EntryProp;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
            toPlainObject(): CollectionProp<import("./entry").EntryProp>;
        }>;
        createEntry: (contentTypeId: string, data: Pick<import("./entry").EntryProp, "fields">) => Promise<{
            update(): Promise<import("./entry").Entry>;
            archive(): Promise<import("./entry").Entry>;
            delete(): Promise<void>;
            publish(): Promise<import("./entry").Entry>;
            unarchive(): Promise<import("./entry").Entry>;
            unpublish(): Promise<import("./entry").Entry>;
            getSnapshot(id: string): Promise<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>;
            getSnapshots(): Promise<import("../common-types").Collection<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>>;
            isArchived(): boolean;
            isDraft(): boolean;
            isPublished(): boolean;
            isUpdated(): boolean;
        } & import("./entry").EntryProp & {
            toPlainObject(): import("./entry").EntryProp;
        }>;
        createEntryWithId: (contentTypeId: string, id: string, data: Pick<import("./entry").EntryProp, "fields">) => Promise<{
            update(): Promise<import("./entry").Entry>;
            archive(): Promise<import("./entry").Entry>;
            delete(): Promise<void>;
            publish(): Promise<import("./entry").Entry>;
            unarchive(): Promise<import("./entry").Entry>;
            unpublish(): Promise<import("./entry").Entry>;
            getSnapshot(id: string): Promise<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>;
            getSnapshots(): Promise<import("../common-types").Collection<import("./snapshot").SnapshotProps<import("./entry").EntryProp>>>;
            isArchived(): boolean;
            isDraft(): boolean;
            isPublished(): boolean;
            isUpdated(): boolean;
        } & import("./entry").EntryProp & {
            toPlainObject(): import("./entry").EntryProp;
        }>;
        getAsset: (id: string, query?: import("../common-types").QueryOptions) => Promise<{
            processForAllLocales(options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
            processForLocale(locale: string, Options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
            publish(): Promise<import("./asset").Asset>;
            archive(): Promise<import("./asset").Asset>;
            delete(): Promise<void>;
            unarchive(): Promise<import("./asset").Asset>;
            unpublish(): Promise<import("./asset").Asset>;
            update(): Promise<import("./asset").Asset>;
            isPublished(): boolean;
            isUpdated(): boolean;
            isDraft(): boolean;
            isArchived(): boolean;
        } & import("./asset").AssetProps & {
            toPlainObject(): import("./asset").AssetProps;
        }>;
        getAssets: (query?: import("../common-types").QueryOptions) => Promise<{
            items: ({
                processForAllLocales(options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
                processForLocale(locale: string, Options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
                publish(): Promise<import("./asset").Asset>;
                archive(): Promise<import("./asset").Asset>;
                delete(): Promise<void>;
                unarchive(): Promise<import("./asset").Asset>;
                unpublish(): Promise<import("./asset").Asset>;
                update(): Promise<import("./asset").Asset>;
                isPublished(): boolean;
                isUpdated(): boolean;
                isDraft(): boolean;
                isArchived(): boolean;
            } & import("./asset").AssetProps & {
                toPlainObject(): import("./asset").AssetProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
            toPlainObject(): CollectionProp<import("./asset").AssetProps>;
        }>;
        createAsset: (data: Pick<import("./asset").AssetProps, "fields">) => Promise<{
            processForAllLocales(options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
            processForLocale(locale: string, Options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
            publish(): Promise<import("./asset").Asset>;
            archive(): Promise<import("./asset").Asset>;
            delete(): Promise<void>;
            unarchive(): Promise<import("./asset").Asset>;
            unpublish(): Promise<import("./asset").Asset>;
            update(): Promise<import("./asset").Asset>;
            isPublished(): boolean;
            isUpdated(): boolean;
            isDraft(): boolean;
            isArchived(): boolean;
        } & import("./asset").AssetProps & {
            toPlainObject(): import("./asset").AssetProps;
        }>;
        createAssetWithId: (id: string, data: Pick<import("./asset").AssetProps, "fields">) => Promise<{
            processForAllLocales(options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
            processForLocale(locale: string, Options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
            publish(): Promise<import("./asset").Asset>;
            archive(): Promise<import("./asset").Asset>;
            delete(): Promise<void>;
            unarchive(): Promise<import("./asset").Asset>;
            unpublish(): Promise<import("./asset").Asset>;
            update(): Promise<import("./asset").Asset>;
            isPublished(): boolean;
            isUpdated(): boolean;
            isDraft(): boolean;
            isArchived(): boolean;
        } & import("./asset").AssetProps & {
            toPlainObject(): import("./asset").AssetProps;
        }>;
        createAssetFromFiles: (data: Pick<import("./asset").AssetFileProp, "fields">) => Promise<{
            processForAllLocales(options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
            processForLocale(locale: string, Options?: import("./asset").AssetProcessingForLocale | undefined): Promise<import("./asset").Asset>;
            publish(): Promise<import("./asset").Asset>;
            archive(): Promise<import("./asset").Asset>;
            delete(): Promise<void>;
            unarchive(): Promise<import("./asset").Asset>;
            unpublish(): Promise<import("./asset").Asset>;
            update(): Promise<import("./asset").Asset>;
            isPublished(): boolean;
            isUpdated(): boolean;
            isDraft(): boolean;
            isArchived(): boolean;
        } & import("./asset").AssetProps & {
            toPlainObject(): import("./asset").AssetProps;
        }>;
        getUpload: (id: string) => Promise<{
            delete: () => Promise<void>;
        } & import("./upload").UploadProps & {
            toPlainObject(): import("./upload").UploadProps;
        }>;
        createUpload: (data: {
            file: string | ArrayBuffer | import("stream").Stream;
        }) => Promise<{
            delete: () => Promise<void>;
        } & import("./upload").UploadProps & {
            toPlainObject(): import("./upload").UploadProps;
        }>;
        getLocale: (id: string) => Promise<{
            update: () => Promise<import("./locale").Locale>;
            delete: () => Promise<void>;
        } & import("./locale").LocaleProps & {
            toPlainObject(): import("./locale").LocaleProps;
        }>;
        getLocales: () => Promise<{
            items: ({
                update: () => Promise<import("./locale").Locale>;
                delete: () => Promise<void>;
            } & import("./locale").LocaleProps & {
                toPlainObject(): import("./locale").LocaleProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
            toPlainObject(): CollectionProp<import("./locale").LocaleProps>;
        }>;
        createLocale: (data: Pick<import("./locale").LocaleProps, "optional" | "default" | "code" | "name" | "fallbackCode" | "contentDeliveryApi" | "contentManagementApi">) => Promise<{
            update: () => Promise<import("./locale").Locale>;
            delete: () => Promise<void>;
        } & import("./locale").LocaleProps & {
            toPlainObject(): import("./locale").LocaleProps;
        }>;
        getUiExtension: (id: string) => Promise<{
            update: () => Promise<import("./ui-extension").UIExtension>;
            delete: () => Promise<void>;
        } & import("./ui-extension").UIExtensionProps & {
            toPlainObject(): import("./ui-extension").UIExtensionProps;
        }>;
        getUiExtensions: () => Promise<{
            items: ({
                update: () => Promise<import("./ui-extension").UIExtension>;
                delete: () => Promise<void>;
            } & import("./ui-extension").UIExtensionProps & {
                toPlainObject(): import("./ui-extension").UIExtensionProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
            toPlainObject(): CollectionProp<import("./ui-extension").UIExtensionProps>;
        }>;
        createUiExtension: (data: Pick<import("./ui-extension").UIExtensionProps, "extension">) => Promise<{
            update: () => Promise<import("./ui-extension").UIExtension>;
            delete: () => Promise<void>;
        } & import("./ui-extension").UIExtensionProps & {
            toPlainObject(): import("./ui-extension").UIExtensionProps;
        }>;
        createUiExtensionWithId: (id: string, data: Pick<import("./ui-extension").UIExtensionProps, "extension">) => Promise<{
            update: () => Promise<import("./ui-extension").UIExtension>;
            delete: () => Promise<void>;
        } & import("./ui-extension").UIExtensionProps & {
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
        getAppInstallations: () => Promise<{
            items: ({
                update: () => Promise<any & import("./app-installation").AppInstallationProps & {
                    toPlainObject(): import("./app-installation").AppInstallationProps;
                }>;
                delete: () => Promise<void>;
            } & import("./app-installation").AppInstallationProps & {
                toPlainObject(): import("./app-installation").AppInstallationProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
            toPlainObject(): CollectionProp<import("./app-installation").AppInstallationProps>;
        }>;
        getEntrySnapshots: (entryId: string, query?: import("../common-types").QueryOptions) => Promise<{
            items: (import("./snapshot").SnapshotProps<unknown> & {
                toPlainObject(): import("./snapshot").SnapshotProps<unknown>;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
            toPlainObject(): CollectionProp<import("./snapshot").SnapshotProps<unknown>>;
        }>;
        getContentTypeSnapshots: (contentTypeId: string, query?: import("../common-types").QueryOptions) => Promise<{
            items: (import("./snapshot").SnapshotProps<unknown> & {
                toPlainObject(): import("./snapshot").SnapshotProps<unknown>;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
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
