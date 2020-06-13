import type { ContentTypeProps } from './entities/content-type';
import type { QueryOptions } from './common-types';
import type { EntryProp } from './entities/entry';
import type { AssetFileProp, AssetProps } from './entities/asset';
import type { LocaleProps } from './entities/locale';
import type { UIExtensionProps } from './entities/ui-extension';
import type { AppInstallationProps } from './entities/app-installation';
import { Stream } from 'stream';
import { AxiosInstance } from 'axios';
/**
 * Creates API object with methods to access the Environment API
 * @private
 */
export default function createEnvironmentApi({ http, httpUpload, }: {
    http: AxiosInstance;
    httpUpload: AxiosInstance;
}): {
    getEntryFromData: (entryData: EntryProp) => {
        update(): Promise<import("./entities/entry").Entry>;
        archive(): Promise<import("./entities/entry").Entry>;
        delete(): Promise<void>;
        publish(): Promise<import("./entities/entry").Entry>;
        unarchive(): Promise<import("./entities/entry").Entry>;
        unpublish(): Promise<import("./entities/entry").Entry>;
        getSnapshot(id: string): Promise<import("./entities/snapshot").SnapshotProps<EntryProp>>;
        getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<EntryProp>>>;
        isArchived(): boolean;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
    } & EntryProp & {
        toPlainObject(): EntryProp;
    };
    getAssetFromData: (assetData: AssetProps) => {
        processForAllLocales(options?: import("./entities/asset").AssetProcessingForLocale | undefined): Promise<import("./entities/asset").Asset>;
        processForLocale(locale: string, Options?: import("./entities/asset").AssetProcessingForLocale | undefined): Promise<import("./entities/asset").Asset>;
        publish(): Promise<import("./entities/asset").Asset>;
        archive(): Promise<import("./entities/asset").Asset>;
        delete(): Promise<void>;
        unarchive(): Promise<import("./entities/asset").Asset>;
        unpublish(): Promise<import("./entities/asset").Asset>;
        update(): Promise<import("./entities/asset").Asset>;
        isPublished(): boolean;
        isUpdated(): boolean;
        isDraft(): boolean;
        isArchived(): boolean;
    } & AssetProps & {
        toPlainObject(): AssetProps;
    };
    delete: () => Promise<void>;
    update: () => Promise<any & import("./entities/environment").EnvironmentProps & {
        toPlainObject(): import("./entities/environment").EnvironmentProps;
    }>;
    getContentType: (id: string) => Promise<{
        update(): Promise<import("./entities/content-type").ContentType>;
        delete(): Promise<void>;
        publish(): Promise<import("./entities/content-type").ContentType>;
        unpublish(): Promise<import("./entities/content-type").ContentType>;
        getEditorInterface(): Promise<import("./entities/editor-interface").EditorInterface>;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
        omitAndDeleteField(id: string): Promise<import("./entities/content-type").ContentType>;
        getSnapshot(id: string): Promise<import("./entities/snapshot").SnapshotProps<ContentTypeProps>>;
        getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
    } & ContentTypeProps & {
        toPlainObject(): ContentTypeProps;
    }>;
    getContentTypes: (query?: QueryOptions) => Promise<import("./common-types").Collection<{
        update(): Promise<import("./entities/content-type").ContentType>;
        delete(): Promise<void>;
        publish(): Promise<import("./entities/content-type").ContentType>;
        unpublish(): Promise<import("./entities/content-type").ContentType>;
        getEditorInterface(): Promise<import("./entities/editor-interface").EditorInterface>;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
        omitAndDeleteField(id: string): Promise<import("./entities/content-type").ContentType>;
        getSnapshot(id: string): Promise<import("./entities/snapshot").SnapshotProps<ContentTypeProps>>;
        getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
    } & ContentTypeProps & {
        toPlainObject(): ContentTypeProps;
    }> & {
        toPlainObject(): import("./common-types").CollectionProp<ContentTypeProps>;
    }>;
    createContentType: (data: Omit<ContentTypeProps, 'sys'>) => Promise<{
        update(): Promise<import("./entities/content-type").ContentType>;
        delete(): Promise<void>;
        publish(): Promise<import("./entities/content-type").ContentType>;
        unpublish(): Promise<import("./entities/content-type").ContentType>;
        getEditorInterface(): Promise<import("./entities/editor-interface").EditorInterface>;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
        omitAndDeleteField(id: string): Promise<import("./entities/content-type").ContentType>;
        getSnapshot(id: string): Promise<import("./entities/snapshot").SnapshotProps<ContentTypeProps>>;
        getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
    } & ContentTypeProps & {
        toPlainObject(): ContentTypeProps;
    }>;
    createContentTypeWithId: (id: string, data: Omit<ContentTypeProps, 'sys'>) => Promise<{
        update(): Promise<import("./entities/content-type").ContentType>;
        delete(): Promise<void>;
        publish(): Promise<import("./entities/content-type").ContentType>;
        unpublish(): Promise<import("./entities/content-type").ContentType>;
        getEditorInterface(): Promise<import("./entities/editor-interface").EditorInterface>;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
        omitAndDeleteField(id: string): Promise<import("./entities/content-type").ContentType>;
        getSnapshot(id: string): Promise<import("./entities/snapshot").SnapshotProps<ContentTypeProps>>;
        getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
    } & ContentTypeProps & {
        toPlainObject(): ContentTypeProps;
    }>;
    getEditorInterfaceForContentType: (contentTypeId: string) => Promise<import("./entities/editor-interface").EditorInterface>;
    getEntry: (id: string, query?: QueryOptions) => Promise<{
        update(): Promise<import("./entities/entry").Entry>;
        archive(): Promise<import("./entities/entry").Entry>;
        delete(): Promise<void>;
        publish(): Promise<import("./entities/entry").Entry>;
        unarchive(): Promise<import("./entities/entry").Entry>;
        unpublish(): Promise<import("./entities/entry").Entry>;
        getSnapshot(id: string): Promise<import("./entities/snapshot").SnapshotProps<EntryProp>>;
        getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<EntryProp>>>;
        isArchived(): boolean;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
    } & EntryProp & {
        toPlainObject(): EntryProp;
    }>;
    getEntries: (query?: QueryOptions) => Promise<import("./common-types").Collection<{
        update(): Promise<import("./entities/entry").Entry>;
        archive(): Promise<import("./entities/entry").Entry>;
        delete(): Promise<void>;
        publish(): Promise<import("./entities/entry").Entry>;
        unarchive(): Promise<import("./entities/entry").Entry>;
        unpublish(): Promise<import("./entities/entry").Entry>;
        getSnapshot(id: string): Promise<import("./entities/snapshot").SnapshotProps<EntryProp>>;
        getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<EntryProp>>>;
        isArchived(): boolean;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
    } & EntryProp & {
        toPlainObject(): EntryProp;
    }> & {
        toPlainObject(): import("./common-types").CollectionProp<EntryProp>;
    }>;
    createEntry: (contentTypeId: string, data: Omit<EntryProp, 'sys'>) => Promise<{
        update(): Promise<import("./entities/entry").Entry>;
        archive(): Promise<import("./entities/entry").Entry>;
        delete(): Promise<void>;
        publish(): Promise<import("./entities/entry").Entry>;
        unarchive(): Promise<import("./entities/entry").Entry>;
        unpublish(): Promise<import("./entities/entry").Entry>;
        getSnapshot(id: string): Promise<import("./entities/snapshot").SnapshotProps<EntryProp>>;
        getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<EntryProp>>>;
        isArchived(): boolean;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
    } & EntryProp & {
        toPlainObject(): EntryProp;
    }>;
    createEntryWithId: (contentTypeId: string, id: string, data: Omit<EntryProp, 'sys'>) => Promise<{
        update(): Promise<import("./entities/entry").Entry>;
        archive(): Promise<import("./entities/entry").Entry>;
        delete(): Promise<void>;
        publish(): Promise<import("./entities/entry").Entry>;
        unarchive(): Promise<import("./entities/entry").Entry>;
        unpublish(): Promise<import("./entities/entry").Entry>;
        getSnapshot(id: string): Promise<import("./entities/snapshot").SnapshotProps<EntryProp>>;
        getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<EntryProp>>>;
        isArchived(): boolean;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
    } & EntryProp & {
        toPlainObject(): EntryProp;
    }>;
    getAsset: (id: string, query?: QueryOptions) => Promise<{
        processForAllLocales(options?: import("./entities/asset").AssetProcessingForLocale | undefined): Promise<import("./entities/asset").Asset>;
        processForLocale(locale: string, Options?: import("./entities/asset").AssetProcessingForLocale | undefined): Promise<import("./entities/asset").Asset>;
        publish(): Promise<import("./entities/asset").Asset>;
        archive(): Promise<import("./entities/asset").Asset>;
        delete(): Promise<void>;
        unarchive(): Promise<import("./entities/asset").Asset>;
        unpublish(): Promise<import("./entities/asset").Asset>;
        update(): Promise<import("./entities/asset").Asset>;
        isPublished(): boolean;
        isUpdated(): boolean;
        isDraft(): boolean;
        isArchived(): boolean;
    } & AssetProps & {
        toPlainObject(): AssetProps;
    }>;
    getAssets: (query?: QueryOptions) => Promise<import("./common-types").Collection<{
        processForAllLocales(options?: import("./entities/asset").AssetProcessingForLocale | undefined): Promise<import("./entities/asset").Asset>;
        processForLocale(locale: string, Options?: import("./entities/asset").AssetProcessingForLocale | undefined): Promise<import("./entities/asset").Asset>;
        publish(): Promise<import("./entities/asset").Asset>;
        archive(): Promise<import("./entities/asset").Asset>;
        delete(): Promise<void>;
        unarchive(): Promise<import("./entities/asset").Asset>;
        unpublish(): Promise<import("./entities/asset").Asset>;
        update(): Promise<import("./entities/asset").Asset>;
        isPublished(): boolean;
        isUpdated(): boolean;
        isDraft(): boolean;
        isArchived(): boolean;
    } & AssetProps & {
        toPlainObject(): AssetProps;
    }> & {
        toPlainObject(): import("./common-types").CollectionProp<AssetProps>;
    }>;
    createAsset: (data: Omit<AssetProps, 'sys'>) => Promise<{
        processForAllLocales(options?: import("./entities/asset").AssetProcessingForLocale | undefined): Promise<import("./entities/asset").Asset>;
        processForLocale(locale: string, Options?: import("./entities/asset").AssetProcessingForLocale | undefined): Promise<import("./entities/asset").Asset>;
        publish(): Promise<import("./entities/asset").Asset>;
        archive(): Promise<import("./entities/asset").Asset>;
        delete(): Promise<void>;
        unarchive(): Promise<import("./entities/asset").Asset>;
        unpublish(): Promise<import("./entities/asset").Asset>;
        update(): Promise<import("./entities/asset").Asset>;
        isPublished(): boolean;
        isUpdated(): boolean;
        isDraft(): boolean;
        isArchived(): boolean;
    } & AssetProps & {
        toPlainObject(): AssetProps;
    }>;
    createAssetWithId: (id: string, data: Omit<AssetProps, 'sys'>) => Promise<{
        processForAllLocales(options?: import("./entities/asset").AssetProcessingForLocale | undefined): Promise<import("./entities/asset").Asset>;
        processForLocale(locale: string, Options?: import("./entities/asset").AssetProcessingForLocale | undefined): Promise<import("./entities/asset").Asset>;
        publish(): Promise<import("./entities/asset").Asset>;
        archive(): Promise<import("./entities/asset").Asset>;
        delete(): Promise<void>;
        unarchive(): Promise<import("./entities/asset").Asset>;
        unpublish(): Promise<import("./entities/asset").Asset>;
        update(): Promise<import("./entities/asset").Asset>;
        isPublished(): boolean;
        isUpdated(): boolean;
        isDraft(): boolean;
        isArchived(): boolean;
    } & AssetProps & {
        toPlainObject(): AssetProps;
    }>;
    createAssetFromFiles: (data: Omit<AssetFileProp, 'sys'>) => Promise<{
        processForAllLocales(options?: import("./entities/asset").AssetProcessingForLocale | undefined): Promise<import("./entities/asset").Asset>;
        processForLocale(locale: string, Options?: import("./entities/asset").AssetProcessingForLocale | undefined): Promise<import("./entities/asset").Asset>;
        publish(): Promise<import("./entities/asset").Asset>;
        archive(): Promise<import("./entities/asset").Asset>;
        delete(): Promise<void>;
        unarchive(): Promise<import("./entities/asset").Asset>;
        unpublish(): Promise<import("./entities/asset").Asset>;
        update(): Promise<import("./entities/asset").Asset>;
        isPublished(): boolean;
        isUpdated(): boolean;
        isDraft(): boolean;
        isArchived(): boolean;
    } & AssetProps & {
        toPlainObject(): AssetProps;
    }>;
    getUpload: (id: string) => Promise<{
        delete: () => Promise<void>;
    } & import("./entities/upload").UploadProps & {
        toPlainObject(): import("./entities/upload").UploadProps;
    }>;
    createUpload: (data: {
        file: string | ArrayBuffer | Stream;
    }) => Promise<{
        delete: () => Promise<void>;
    } & import("./entities/upload").UploadProps & {
        toPlainObject(): import("./entities/upload").UploadProps;
    }>;
    getLocale: (id: string) => Promise<{
        update: () => Promise<import("./entities/locale").Locale>;
        delete: () => Promise<void>;
    } & LocaleProps & {
        toPlainObject(): LocaleProps;
    }>;
    getLocales: () => Promise<import("./common-types").Collection<{
        update: () => Promise<import("./entities/locale").Locale>;
        delete: () => Promise<void>;
    } & LocaleProps & {
        toPlainObject(): LocaleProps;
    }> & {
        toPlainObject(): import("./common-types").CollectionProp<LocaleProps>;
    }>;
    createLocale: (data: Omit<LocaleProps, 'sys'>) => Promise<{
        update: () => Promise<import("./entities/locale").Locale>;
        delete: () => Promise<void>;
    } & LocaleProps & {
        toPlainObject(): LocaleProps;
    }>;
    getUiExtension: (id: string) => Promise<import("./entities/ui-extension").UIExtension>;
    getUiExtensions: () => Promise<import("./common-types").Collection<import("./entities/ui-extension").UIExtension> & {
        toPlainObject(): import("./common-types").CollectionProp<UIExtensionProps>;
    }>;
    createUiExtension: (data: Omit<UIExtensionProps, 'sys'>) => Promise<import("./entities/ui-extension").UIExtension>;
    createUiExtensionWithId: (id: string, data: Omit<UIExtensionProps, 'sys'>) => Promise<import("./entities/ui-extension").UIExtension>;
    createAppInstallation: (appDefinitionId: string, data: Omit<AppInstallationProps, 'sys'>) => Promise<{
        update: () => Promise<any & AppInstallationProps & {
            toPlainObject(): AppInstallationProps;
        }>;
        delete: () => Promise<void>;
    } & AppInstallationProps & {
        toPlainObject(): AppInstallationProps;
    }>;
    getAppInstallation: (id: string) => Promise<{
        update: () => Promise<any & AppInstallationProps & {
            toPlainObject(): AppInstallationProps;
        }>;
        delete: () => Promise<void>;
    } & AppInstallationProps & {
        toPlainObject(): AppInstallationProps;
    }>;
    getAppInstallations: () => Promise<import("./common-types").Collection<{
        update: () => Promise<any & AppInstallationProps & {
            toPlainObject(): AppInstallationProps;
        }>;
        delete: () => Promise<void>;
    } & AppInstallationProps & {
        toPlainObject(): AppInstallationProps;
    }> & {
        toPlainObject(): import("./common-types").CollectionProp<AppInstallationProps>;
    }>;
    getEntrySnapshots: (entryId: string, query?: QueryOptions) => Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<unknown> & {
        toPlainObject(): import("./entities/snapshot").SnapshotProps<unknown>;
    }> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./entities/snapshot").SnapshotProps<unknown>>;
    }>;
    getContentTypeSnapshots: (contentTypeId: string, query?: QueryOptions) => Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<unknown> & {
        toPlainObject(): import("./entities/snapshot").SnapshotProps<unknown>;
    }> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./entities/snapshot").SnapshotProps<unknown>>;
    }>;
};
