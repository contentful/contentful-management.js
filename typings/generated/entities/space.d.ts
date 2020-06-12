/// <reference types="node" />
import { AxiosInstance } from 'axios';
import createSpaceApi from '../create-space-api';
import { MetaSysProps, CollectionProp, DefaultElements } from '../common-types';
export declare type ContentfulSpaceAPI = ReturnType<typeof createSpaceApi>;
export declare type SpaceProps = {
    sys: MetaSysProps;
    name: string;
};
export interface Space extends SpaceProps, DefaultElements<SpaceProps>, ContentfulSpaceAPI {
}
/**
 * This method creates the API for the given space with all the methods for
 * reading and creating other entities. It also passes down a clone of the
 * http client with a space id, so the base path for requests now has the
 * space id already set.
 * @private
 * @param http - HTTP client instance
 * @param data - API response for a Space
 * @return {Space}
 */
export declare function wrapSpace(http: AxiosInstance, data: SpaceProps): {
    delete: () => Promise<void>;
    update: () => Promise<any & SpaceProps & {
        toPlainObject(): SpaceProps;
    }>;
    getEnvironment: (id: string) => Promise<{
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
        update: () => Promise<any & import("./environment").EnvironmentProps & {
            toPlainObject(): import("./environment").EnvironmentProps;
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
    } & import("./environment").EnvironmentProps & {
        toPlainObject(): import("./environment").EnvironmentProps;
    }>;
    getEnvironments: () => Promise<{
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
            update: () => Promise<any & import("./environment").EnvironmentProps & {
                toPlainObject(): import("./environment").EnvironmentProps;
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
        } & import("./environment").EnvironmentProps & {
            toPlainObject(): import("./environment").EnvironmentProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): CollectionProp<import("./environment").EnvironmentProps>;
    }>;
    createEnvironment: (data?: {}) => Promise<{
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
        update: () => Promise<any & import("./environment").EnvironmentProps & {
            toPlainObject(): import("./environment").EnvironmentProps;
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
    } & import("./environment").EnvironmentProps & {
        toPlainObject(): import("./environment").EnvironmentProps;
    }>;
    createEnvironmentWithId: (id: string, data: Pick<import("./environment").EnvironmentProps, "name">, sourceEnvironmentId?: string | undefined) => Promise<{
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
        update: () => Promise<any & import("./environment").EnvironmentProps & {
            toPlainObject(): import("./environment").EnvironmentProps;
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
    } & import("./environment").EnvironmentProps & {
        toPlainObject(): import("./environment").EnvironmentProps;
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
    getWebhook: (id: string) => Promise<{
        update: () => Promise<import("./webhook").WebHooks>;
        delete: () => Promise<void>;
        getCalls: () => Promise<Record<string, unknown>>;
        getCall: (id: string) => Promise<Record<string, unknown>>;
        getHealth: () => Promise<Record<string, unknown>>;
    } & import("./webhook").WebhookProps & {
        toPlainObject(): import("./webhook").WebhookProps;
    }>;
    getWebhooks: () => Promise<{
        items: ({
            update: () => Promise<import("./webhook").WebHooks>;
            delete: () => Promise<void>;
            getCalls: () => Promise<Record<string, unknown>>;
            getCall: (id: string) => Promise<Record<string, unknown>>;
            getHealth: () => Promise<Record<string, unknown>>;
        } & import("./webhook").WebhookProps & {
            toPlainObject(): import("./webhook").WebhookProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): CollectionProp<import("./webhook").WebhookProps>;
    }>;
    createWebhook: (data: Pick<import("./webhook").WebhookProps, "headers" | "name" | "url" | "httpBasicUsername" | "httpBasicPassword" | "topics" | "transformation">) => Promise<{
        update: () => Promise<import("./webhook").WebHooks>;
        delete: () => Promise<void>;
        getCalls: () => Promise<Record<string, unknown>>;
        getCall: (id: string) => Promise<Record<string, unknown>>;
        getHealth: () => Promise<Record<string, unknown>>;
    } & import("./webhook").WebhookProps & {
        toPlainObject(): import("./webhook").WebhookProps;
    }>;
    createWebhookWithId: (id: string, data: Pick<import("./webhook").WebhookProps, "headers" | "name" | "url" | "httpBasicUsername" | "httpBasicPassword" | "topics" | "transformation">) => Promise<{
        update: () => Promise<import("./webhook").WebHooks>;
        delete: () => Promise<void>;
        getCalls: () => Promise<Record<string, unknown>>;
        getCall: (id: string) => Promise<Record<string, unknown>>;
        getHealth: () => Promise<Record<string, unknown>>;
    } & import("./webhook").WebhookProps & {
        toPlainObject(): import("./webhook").WebhookProps;
    }>;
    getRole: (id: string) => Promise<{
        update: () => Promise<import("./role").Role>;
        delete: () => Promise<void>;
    } & import("./role").RoleProps & {
        toPlainObject(): import("./role").RoleProps;
    }>;
    getRoles: () => Promise<{
        items: ({
            update: () => Promise<import("./role").Role>;
            delete: () => Promise<void>;
        } & import("./role").RoleProps & {
            toPlainObject(): import("./role").RoleProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): CollectionProp<import("./role").RoleProps>;
    }>;
    createRole: (data: Pick<import("./role").RoleProps, "name" | "policies" | "permissions">) => Promise<{
        update: () => Promise<import("./role").Role>;
        delete: () => Promise<void>;
    } & import("./role").RoleProps & {
        toPlainObject(): import("./role").RoleProps;
    }>;
    createRoleWithId: (id: string, data: Pick<import("./role").RoleProps, "name" | "policies" | "permissions">) => Promise<{
        update: () => Promise<import("./role").Role>;
        delete: () => Promise<void>;
    } & import("./role").RoleProps & {
        toPlainObject(): import("./role").RoleProps;
    }>;
    getSpaceUser: (id: string) => Promise<import("./user").UserProps & {
        toPlainObject(): import("./user").UserProps;
    }>;
    getSpaceUsers: (query?: import("../common-types").QueryOptions) => Promise<{
        items: (import("./user").UserProps & {
            toPlainObject(): import("./user").UserProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): CollectionProp<import("./user").UserProps>;
    }>;
    getSpaceMember: (id: string) => Promise<import("./space-member").SpaceMemberProps & {
        toPlainObject(): import("./space-member").SpaceMemberProps;
    }>;
    getSpaceMembers: (query?: import("../common-types").QueryOptions) => Promise<{
        items: (import("./space-member").SpaceMemberProps & {
            toPlainObject(): import("./space-member").SpaceMemberProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): CollectionProp<import("./space-member").SpaceMemberProps>;
    }>;
    getSpaceMembership: (id: string) => Promise<{
        update: () => Promise<import("./space-membership").SpaceMembership>;
        delete: () => Promise<void>;
    } & import("./space-membership").SpaceMembershipProps & {
        toPlainObject(): import("./space-membership").SpaceMembershipProps;
    }>;
    getSpaceMemberships: (query?: import("../common-types").QueryOptions) => Promise<{
        items: ({
            update: () => Promise<import("./space-membership").SpaceMembership>;
            delete: () => Promise<void>;
        } & import("./space-membership").SpaceMembershipProps & {
            toPlainObject(): import("./space-membership").SpaceMembershipProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): CollectionProp<import("./space-membership").SpaceMembershipProps>;
    }>;
    createSpaceMembership: (data: Pick<import("./space-membership").SpaceMembershipProps, "roles" | "name" | "admin">) => Promise<{
        update: () => Promise<import("./space-membership").SpaceMembership>;
        delete: () => Promise<void>;
    } & import("./space-membership").SpaceMembershipProps & {
        toPlainObject(): import("./space-membership").SpaceMembershipProps;
    }>;
    createSpaceMembershipWithId: (id: string, data: Pick<import("./space-membership").SpaceMembershipProps, "roles" | "name" | "admin">) => Promise<{
        update: () => Promise<import("./space-membership").SpaceMembership>;
        delete: () => Promise<void>;
    } & import("./space-membership").SpaceMembershipProps & {
        toPlainObject(): import("./space-membership").SpaceMembershipProps;
    }>;
    getTeamSpaceMembership: (teamSpaceMembershipId: string) => Promise<{
        update: () => Promise<any & import("./team-space-membership").TeamSpaceMembershipProps & {
            toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
        }>;
        delete: () => Promise<void>;
    } & import("./team-space-membership").TeamSpaceMembershipProps & {
        toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
    }>;
    getTeamSpaceMemberships: (query?: import("../common-types").QueryOptions) => Promise<{
        items: ({
            update: () => Promise<any & import("./team-space-membership").TeamSpaceMembershipProps & {
                toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
            }>;
            delete: () => Promise<void>;
        } & import("./team-space-membership").TeamSpaceMembershipProps & {
            toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): CollectionProp<import("./team-space-membership").TeamSpaceMembershipProps>;
    }>;
    createTeamSpaceMembership: (teamId: string, data: Pick<import("./team-space-membership").TeamSpaceMembershipProps, "roles" | "admin">) => Promise<{
        update: () => Promise<any & import("./team-space-membership").TeamSpaceMembershipProps & {
            toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
        }>;
        delete: () => Promise<void>;
    } & import("./team-space-membership").TeamSpaceMembershipProps & {
        toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
    }>;
    getApiKey: (id: string) => Promise<import("./api-key").ApiKey>;
    getApiKeys: () => Promise<{
        items: import("./api-key").ApiKey[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): CollectionProp<import("./api-key").ApiKeyProps>;
    }>;
    getPreviewApiKeys: () => Promise<{
        items: (import("./preview-api-key").PreviewApiKeyProps & {
            toPlainObject(): import("./preview-api-key").PreviewApiKeyProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): CollectionProp<import("./preview-api-key").PreviewApiKeyProps>;
    }>;
    getPreviewApiKey: (id: string) => Promise<import("./preview-api-key").PreviewApiKeyProps & {
        toPlainObject(): import("./preview-api-key").PreviewApiKeyProps;
    }>;
    createApiKey: (data: Pick<import("./api-key").ApiKeyProps, "description" | "name" | "environments">) => Promise<import("./api-key").ApiKey>;
    createApiKeyWithId: (id: string, data: Pick<import("./api-key").ApiKeyProps, "description" | "name" | "environments">) => Promise<import("./api-key").ApiKey>;
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
    getEnvironmentAlias: (id: string) => Promise<{
        update: () => Promise<unknown>;
    } & import("./environment-alias").EnvironmentAliasProps & {
        toPlainObject(): import("./environment-alias").EnvironmentAliasProps;
    }>;
    getEnvironmentAliases: () => Promise<{
        items: ({
            update: () => Promise<unknown>;
        } & import("./environment-alias").EnvironmentAliasProps & {
            toPlainObject(): import("./environment-alias").EnvironmentAliasProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): CollectionProp<import("./environment-alias").EnvironmentAliasProps>;
    }>;
} & SpaceProps & {
    toPlainObject(): SpaceProps;
};
/**
 * This method wraps each space in a collection with the space API. See wrapSpace
 * above for more details.
 * @private
 * @param  http - HTTP client instance
 * @param  data - API response for a Space collection
 */
export declare function wrapSpaceCollection(http: AxiosInstance, data: CollectionProp<SpaceProps>): {
    items: ({
        delete: () => Promise<void>;
        update: () => Promise<any & SpaceProps & {
            toPlainObject(): SpaceProps;
        }>;
        getEnvironment: (id: string) => Promise<{
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
            update: () => Promise<any & import("./environment").EnvironmentProps & {
                toPlainObject(): import("./environment").EnvironmentProps;
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
        } & import("./environment").EnvironmentProps & {
            toPlainObject(): import("./environment").EnvironmentProps;
        }>;
        getEnvironments: () => Promise<{
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
                update: () => Promise<any & import("./environment").EnvironmentProps & {
                    toPlainObject(): import("./environment").EnvironmentProps;
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
            } & import("./environment").EnvironmentProps & {
                toPlainObject(): import("./environment").EnvironmentProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
            toPlainObject(): CollectionProp<import("./environment").EnvironmentProps>;
        }>;
        createEnvironment: (data?: {}) => Promise<{
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
            update: () => Promise<any & import("./environment").EnvironmentProps & {
                toPlainObject(): import("./environment").EnvironmentProps;
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
        } & import("./environment").EnvironmentProps & {
            toPlainObject(): import("./environment").EnvironmentProps;
        }>;
        createEnvironmentWithId: (id: string, data: Pick<import("./environment").EnvironmentProps, "name">, sourceEnvironmentId?: string | undefined) => Promise<{
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
            update: () => Promise<any & import("./environment").EnvironmentProps & {
                toPlainObject(): import("./environment").EnvironmentProps;
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
        } & import("./environment").EnvironmentProps & {
            toPlainObject(): import("./environment").EnvironmentProps;
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
        getWebhook: (id: string) => Promise<{
            update: () => Promise<import("./webhook").WebHooks>;
            delete: () => Promise<void>;
            getCalls: () => Promise<Record<string, unknown>>;
            getCall: (id: string) => Promise<Record<string, unknown>>;
            getHealth: () => Promise<Record<string, unknown>>;
        } & import("./webhook").WebhookProps & {
            toPlainObject(): import("./webhook").WebhookProps;
        }>;
        getWebhooks: () => Promise<{
            items: ({
                update: () => Promise<import("./webhook").WebHooks>;
                delete: () => Promise<void>;
                getCalls: () => Promise<Record<string, unknown>>;
                getCall: (id: string) => Promise<Record<string, unknown>>;
                getHealth: () => Promise<Record<string, unknown>>;
            } & import("./webhook").WebhookProps & {
                toPlainObject(): import("./webhook").WebhookProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
            toPlainObject(): CollectionProp<import("./webhook").WebhookProps>;
        }>;
        createWebhook: (data: Pick<import("./webhook").WebhookProps, "headers" | "name" | "url" | "httpBasicUsername" | "httpBasicPassword" | "topics" | "transformation">) => Promise<{
            update: () => Promise<import("./webhook").WebHooks>;
            delete: () => Promise<void>;
            getCalls: () => Promise<Record<string, unknown>>;
            getCall: (id: string) => Promise<Record<string, unknown>>;
            getHealth: () => Promise<Record<string, unknown>>;
        } & import("./webhook").WebhookProps & {
            toPlainObject(): import("./webhook").WebhookProps;
        }>;
        createWebhookWithId: (id: string, data: Pick<import("./webhook").WebhookProps, "headers" | "name" | "url" | "httpBasicUsername" | "httpBasicPassword" | "topics" | "transformation">) => Promise<{
            update: () => Promise<import("./webhook").WebHooks>;
            delete: () => Promise<void>;
            getCalls: () => Promise<Record<string, unknown>>;
            getCall: (id: string) => Promise<Record<string, unknown>>;
            getHealth: () => Promise<Record<string, unknown>>;
        } & import("./webhook").WebhookProps & {
            toPlainObject(): import("./webhook").WebhookProps;
        }>;
        getRole: (id: string) => Promise<{
            update: () => Promise<import("./role").Role>;
            delete: () => Promise<void>;
        } & import("./role").RoleProps & {
            toPlainObject(): import("./role").RoleProps;
        }>;
        getRoles: () => Promise<{
            items: ({
                update: () => Promise<import("./role").Role>;
                delete: () => Promise<void>;
            } & import("./role").RoleProps & {
                toPlainObject(): import("./role").RoleProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
            toPlainObject(): CollectionProp<import("./role").RoleProps>;
        }>;
        createRole: (data: Pick<import("./role").RoleProps, "name" | "policies" | "permissions">) => Promise<{
            update: () => Promise<import("./role").Role>;
            delete: () => Promise<void>;
        } & import("./role").RoleProps & {
            toPlainObject(): import("./role").RoleProps;
        }>;
        createRoleWithId: (id: string, data: Pick<import("./role").RoleProps, "name" | "policies" | "permissions">) => Promise<{
            update: () => Promise<import("./role").Role>;
            delete: () => Promise<void>;
        } & import("./role").RoleProps & {
            toPlainObject(): import("./role").RoleProps;
        }>;
        getSpaceUser: (id: string) => Promise<import("./user").UserProps & {
            toPlainObject(): import("./user").UserProps;
        }>;
        getSpaceUsers: (query?: import("../common-types").QueryOptions) => Promise<{
            items: (import("./user").UserProps & {
                toPlainObject(): import("./user").UserProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
            toPlainObject(): CollectionProp<import("./user").UserProps>;
        }>;
        getSpaceMember: (id: string) => Promise<import("./space-member").SpaceMemberProps & {
            toPlainObject(): import("./space-member").SpaceMemberProps;
        }>;
        getSpaceMembers: (query?: import("../common-types").QueryOptions) => Promise<{
            items: (import("./space-member").SpaceMemberProps & {
                toPlainObject(): import("./space-member").SpaceMemberProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
            toPlainObject(): CollectionProp<import("./space-member").SpaceMemberProps>;
        }>;
        getSpaceMembership: (id: string) => Promise<{
            update: () => Promise<import("./space-membership").SpaceMembership>;
            delete: () => Promise<void>;
        } & import("./space-membership").SpaceMembershipProps & {
            toPlainObject(): import("./space-membership").SpaceMembershipProps;
        }>;
        getSpaceMemberships: (query?: import("../common-types").QueryOptions) => Promise<{
            items: ({
                update: () => Promise<import("./space-membership").SpaceMembership>;
                delete: () => Promise<void>;
            } & import("./space-membership").SpaceMembershipProps & {
                toPlainObject(): import("./space-membership").SpaceMembershipProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
            toPlainObject(): CollectionProp<import("./space-membership").SpaceMembershipProps>;
        }>;
        createSpaceMembership: (data: Pick<import("./space-membership").SpaceMembershipProps, "roles" | "name" | "admin">) => Promise<{
            update: () => Promise<import("./space-membership").SpaceMembership>;
            delete: () => Promise<void>;
        } & import("./space-membership").SpaceMembershipProps & {
            toPlainObject(): import("./space-membership").SpaceMembershipProps;
        }>;
        createSpaceMembershipWithId: (id: string, data: Pick<import("./space-membership").SpaceMembershipProps, "roles" | "name" | "admin">) => Promise<{
            update: () => Promise<import("./space-membership").SpaceMembership>;
            delete: () => Promise<void>;
        } & import("./space-membership").SpaceMembershipProps & {
            toPlainObject(): import("./space-membership").SpaceMembershipProps;
        }>;
        getTeamSpaceMembership: (teamSpaceMembershipId: string) => Promise<{
            update: () => Promise<any & import("./team-space-membership").TeamSpaceMembershipProps & {
                toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
            }>;
            delete: () => Promise<void>;
        } & import("./team-space-membership").TeamSpaceMembershipProps & {
            toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
        }>;
        getTeamSpaceMemberships: (query?: import("../common-types").QueryOptions) => Promise<{
            items: ({
                update: () => Promise<any & import("./team-space-membership").TeamSpaceMembershipProps & {
                    toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
                }>;
                delete: () => Promise<void>;
            } & import("./team-space-membership").TeamSpaceMembershipProps & {
                toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
            toPlainObject(): CollectionProp<import("./team-space-membership").TeamSpaceMembershipProps>;
        }>;
        createTeamSpaceMembership: (teamId: string, data: Pick<import("./team-space-membership").TeamSpaceMembershipProps, "roles" | "admin">) => Promise<{
            update: () => Promise<any & import("./team-space-membership").TeamSpaceMembershipProps & {
                toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
            }>;
            delete: () => Promise<void>;
        } & import("./team-space-membership").TeamSpaceMembershipProps & {
            toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
        }>;
        getApiKey: (id: string) => Promise<import("./api-key").ApiKey>;
        getApiKeys: () => Promise<{
            items: import("./api-key").ApiKey[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
            toPlainObject(): CollectionProp<import("./api-key").ApiKeyProps>;
        }>;
        getPreviewApiKeys: () => Promise<{
            items: (import("./preview-api-key").PreviewApiKeyProps & {
                toPlainObject(): import("./preview-api-key").PreviewApiKeyProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
            toPlainObject(): CollectionProp<import("./preview-api-key").PreviewApiKeyProps>;
        }>;
        getPreviewApiKey: (id: string) => Promise<import("./preview-api-key").PreviewApiKeyProps & {
            toPlainObject(): import("./preview-api-key").PreviewApiKeyProps;
        }>;
        createApiKey: (data: Pick<import("./api-key").ApiKeyProps, "description" | "name" | "environments">) => Promise<import("./api-key").ApiKey>;
        createApiKeyWithId: (id: string, data: Pick<import("./api-key").ApiKeyProps, "description" | "name" | "environments">) => Promise<import("./api-key").ApiKey>;
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
        getEnvironmentAlias: (id: string) => Promise<{
            update: () => Promise<unknown>;
        } & import("./environment-alias").EnvironmentAliasProps & {
            toPlainObject(): import("./environment-alias").EnvironmentAliasProps;
        }>;
        getEnvironmentAliases: () => Promise<{
            items: ({
                update: () => Promise<unknown>;
            } & import("./environment-alias").EnvironmentAliasProps & {
                toPlainObject(): import("./environment-alias").EnvironmentAliasProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
            toPlainObject(): CollectionProp<import("./environment-alias").EnvironmentAliasProps>;
        }>;
    } & SpaceProps & {
        toPlainObject(): SpaceProps;
    })[];
    sys: {
        type: "Array";
    };
    total: number;
    skip: number;
    limit: number;
    toPlainObject(): CollectionProp<SpaceProps>;
};
