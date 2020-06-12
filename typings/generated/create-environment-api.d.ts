import * as contentType from './entities/content-type';
import * as environment from './entities/environment';
import * as entry from './entities/entry';
import * as asset from './entities/asset';
import * as locale from './entities/locale';
import * as uiExtension from './entities/ui-extension';
import * as snapshot from './entities/snapshot';
import * as editorInterface from './entities/editor-interface';
import * as upload from './entities/upload';
import * as appInstallation from './entities/app-installation';
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
        update(): Promise<entry.Entry>;
        archive(): Promise<entry.Entry>;
        delete(): Promise<void>;
        publish(): Promise<entry.Entry>;
        unarchive(): Promise<entry.Entry>;
        unpublish(): Promise<entry.Entry>;
        getSnapshot(id: string): Promise<snapshot.SnapshotProps<entry.EntryProp>>;
        getSnapshots(): Promise<import("./common-types").Collection<snapshot.SnapshotProps<entry.EntryProp>>>;
        isArchived(): boolean;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
    } & entry.EntryProp & {
        toPlainObject(): entry.EntryProp;
    };
    getAssetFromData: (assetData: AssetProps) => {
        processForAllLocales(options?: asset.AssetProcessingForLocale | undefined): Promise<asset.Asset>;
        processForLocale(locale: string, Options?: asset.AssetProcessingForLocale | undefined): Promise<asset.Asset>;
        publish(): Promise<asset.Asset>;
        archive(): Promise<asset.Asset>;
        delete(): Promise<void>;
        unarchive(): Promise<asset.Asset>;
        unpublish(): Promise<asset.Asset>;
        update(): Promise<asset.Asset>;
        isPublished(): boolean;
        isUpdated(): boolean;
        isDraft(): boolean;
        isArchived(): boolean;
    } & asset.AssetProps & {
        toPlainObject(): asset.AssetProps;
    };
    delete: () => Promise<void>;
    update: () => Promise<any & environment.EnvironmentProps & {
        toPlainObject(): environment.EnvironmentProps;
    }>;
    getContentType: (id: string) => Promise<{
        update(): Promise<contentType.ContentType>;
        delete(): Promise<void>;
        publish(): Promise<contentType.ContentType>;
        unpublish(): Promise<contentType.ContentType>;
        getEditorInterface(): Promise<editorInterface.EditorInterface>;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
        omitAndDeleteField(id: string): Promise<contentType.ContentType>;
        getSnapshot(id: string): Promise<snapshot.SnapshotProps<contentType.ContentTypeProps>>;
        getSnapshots(): Promise<import("./common-types").Collection<snapshot.SnapshotProps<contentType.ContentTypeProps>>>;
    } & contentType.ContentTypeProps & {
        toPlainObject(): contentType.ContentTypeProps;
    }>;
    getContentTypes: (query?: QueryOptions) => Promise<{
        items: ({
            update(): Promise<contentType.ContentType>;
            delete(): Promise<void>;
            publish(): Promise<contentType.ContentType>;
            unpublish(): Promise<contentType.ContentType>;
            getEditorInterface(): Promise<editorInterface.EditorInterface>;
            isDraft(): boolean;
            isPublished(): boolean;
            isUpdated(): boolean;
            omitAndDeleteField(id: string): Promise<contentType.ContentType>;
            getSnapshot(id: string): Promise<snapshot.SnapshotProps<contentType.ContentTypeProps>>;
            getSnapshots(): Promise<import("./common-types").Collection<snapshot.SnapshotProps<contentType.ContentTypeProps>>>;
        } & contentType.ContentTypeProps & {
            toPlainObject(): contentType.ContentTypeProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): import("./common-types").CollectionProp<contentType.ContentTypeProps>;
    }>;
    createContentType: (data: Omit<ContentTypeProps, 'sys'>) => Promise<{
        update(): Promise<contentType.ContentType>;
        delete(): Promise<void>;
        publish(): Promise<contentType.ContentType>;
        unpublish(): Promise<contentType.ContentType>;
        getEditorInterface(): Promise<editorInterface.EditorInterface>;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
        omitAndDeleteField(id: string): Promise<contentType.ContentType>;
        getSnapshot(id: string): Promise<snapshot.SnapshotProps<contentType.ContentTypeProps>>;
        getSnapshots(): Promise<import("./common-types").Collection<snapshot.SnapshotProps<contentType.ContentTypeProps>>>;
    } & contentType.ContentTypeProps & {
        toPlainObject(): contentType.ContentTypeProps;
    }>;
    createContentTypeWithId: (id: string, data: Omit<ContentTypeProps, 'sys'>) => Promise<{
        update(): Promise<contentType.ContentType>;
        delete(): Promise<void>;
        publish(): Promise<contentType.ContentType>;
        unpublish(): Promise<contentType.ContentType>;
        getEditorInterface(): Promise<editorInterface.EditorInterface>;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
        omitAndDeleteField(id: string): Promise<contentType.ContentType>;
        getSnapshot(id: string): Promise<snapshot.SnapshotProps<contentType.ContentTypeProps>>;
        getSnapshots(): Promise<import("./common-types").Collection<snapshot.SnapshotProps<contentType.ContentTypeProps>>>;
    } & contentType.ContentTypeProps & {
        toPlainObject(): contentType.ContentTypeProps;
    }>;
    getEditorInterfaceForContentType: (contentTypeId: string) => Promise<editorInterface.EditorInterface>;
    getEntry: (id: string, query?: QueryOptions) => Promise<{
        update(): Promise<entry.Entry>;
        archive(): Promise<entry.Entry>;
        delete(): Promise<void>;
        publish(): Promise<entry.Entry>;
        unarchive(): Promise<entry.Entry>;
        unpublish(): Promise<entry.Entry>;
        getSnapshot(id: string): Promise<snapshot.SnapshotProps<entry.EntryProp>>;
        getSnapshots(): Promise<import("./common-types").Collection<snapshot.SnapshotProps<entry.EntryProp>>>;
        isArchived(): boolean;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
    } & entry.EntryProp & {
        toPlainObject(): entry.EntryProp;
    }>;
    getEntries: (query?: QueryOptions) => Promise<{
        items: ({
            update(): Promise<entry.Entry>;
            archive(): Promise<entry.Entry>;
            delete(): Promise<void>;
            publish(): Promise<entry.Entry>;
            unarchive(): Promise<entry.Entry>;
            unpublish(): Promise<entry.Entry>;
            getSnapshot(id: string): Promise<snapshot.SnapshotProps<entry.EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<snapshot.SnapshotProps<entry.EntryProp>>>;
            isArchived(): boolean;
            isDraft(): boolean;
            isPublished(): boolean;
            isUpdated(): boolean;
        } & entry.EntryProp & {
            toPlainObject(): entry.EntryProp;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): import("./common-types").CollectionProp<entry.EntryProp>;
    }>;
    createEntry: (contentTypeId: string, data: Omit<EntryProp, 'sys'>) => Promise<{
        update(): Promise<entry.Entry>;
        archive(): Promise<entry.Entry>;
        delete(): Promise<void>;
        publish(): Promise<entry.Entry>;
        unarchive(): Promise<entry.Entry>;
        unpublish(): Promise<entry.Entry>;
        getSnapshot(id: string): Promise<snapshot.SnapshotProps<entry.EntryProp>>;
        getSnapshots(): Promise<import("./common-types").Collection<snapshot.SnapshotProps<entry.EntryProp>>>;
        isArchived(): boolean;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
    } & entry.EntryProp & {
        toPlainObject(): entry.EntryProp;
    }>;
    createEntryWithId: (contentTypeId: string, id: string, data: Omit<EntryProp, 'sys'>) => Promise<{
        update(): Promise<entry.Entry>;
        archive(): Promise<entry.Entry>;
        delete(): Promise<void>;
        publish(): Promise<entry.Entry>;
        unarchive(): Promise<entry.Entry>;
        unpublish(): Promise<entry.Entry>;
        getSnapshot(id: string): Promise<snapshot.SnapshotProps<entry.EntryProp>>;
        getSnapshots(): Promise<import("./common-types").Collection<snapshot.SnapshotProps<entry.EntryProp>>>;
        isArchived(): boolean;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
    } & entry.EntryProp & {
        toPlainObject(): entry.EntryProp;
    }>;
    getAsset: (id: string, query?: QueryOptions) => Promise<{
        processForAllLocales(options?: asset.AssetProcessingForLocale | undefined): Promise<asset.Asset>;
        processForLocale(locale: string, Options?: asset.AssetProcessingForLocale | undefined): Promise<asset.Asset>;
        publish(): Promise<asset.Asset>;
        archive(): Promise<asset.Asset>;
        delete(): Promise<void>;
        unarchive(): Promise<asset.Asset>;
        unpublish(): Promise<asset.Asset>;
        update(): Promise<asset.Asset>;
        isPublished(): boolean;
        isUpdated(): boolean;
        isDraft(): boolean;
        isArchived(): boolean;
    } & asset.AssetProps & {
        toPlainObject(): asset.AssetProps;
    }>;
    getAssets: (query?: QueryOptions) => Promise<{
        items: ({
            processForAllLocales(options?: asset.AssetProcessingForLocale | undefined): Promise<asset.Asset>;
            processForLocale(locale: string, Options?: asset.AssetProcessingForLocale | undefined): Promise<asset.Asset>;
            publish(): Promise<asset.Asset>;
            archive(): Promise<asset.Asset>;
            delete(): Promise<void>;
            unarchive(): Promise<asset.Asset>;
            unpublish(): Promise<asset.Asset>;
            update(): Promise<asset.Asset>;
            isPublished(): boolean;
            isUpdated(): boolean;
            isDraft(): boolean;
            isArchived(): boolean;
        } & asset.AssetProps & {
            toPlainObject(): asset.AssetProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): import("./common-types").CollectionProp<asset.AssetProps>;
    }>;
    createAsset: (data: Omit<AssetProps, 'sys'>) => Promise<{
        processForAllLocales(options?: asset.AssetProcessingForLocale | undefined): Promise<asset.Asset>;
        processForLocale(locale: string, Options?: asset.AssetProcessingForLocale | undefined): Promise<asset.Asset>;
        publish(): Promise<asset.Asset>;
        archive(): Promise<asset.Asset>;
        delete(): Promise<void>;
        unarchive(): Promise<asset.Asset>;
        unpublish(): Promise<asset.Asset>;
        update(): Promise<asset.Asset>;
        isPublished(): boolean;
        isUpdated(): boolean;
        isDraft(): boolean;
        isArchived(): boolean;
    } & asset.AssetProps & {
        toPlainObject(): asset.AssetProps;
    }>;
    createAssetWithId: (id: string, data: Omit<AssetProps, 'sys'>) => Promise<{
        processForAllLocales(options?: asset.AssetProcessingForLocale | undefined): Promise<asset.Asset>;
        processForLocale(locale: string, Options?: asset.AssetProcessingForLocale | undefined): Promise<asset.Asset>;
        publish(): Promise<asset.Asset>;
        archive(): Promise<asset.Asset>;
        delete(): Promise<void>;
        unarchive(): Promise<asset.Asset>;
        unpublish(): Promise<asset.Asset>;
        update(): Promise<asset.Asset>;
        isPublished(): boolean;
        isUpdated(): boolean;
        isDraft(): boolean;
        isArchived(): boolean;
    } & asset.AssetProps & {
        toPlainObject(): asset.AssetProps;
    }>;
    createAssetFromFiles: (data: Omit<AssetFileProp, 'sys'>) => Promise<{
        processForAllLocales(options?: asset.AssetProcessingForLocale | undefined): Promise<asset.Asset>;
        processForLocale(locale: string, Options?: asset.AssetProcessingForLocale | undefined): Promise<asset.Asset>;
        publish(): Promise<asset.Asset>;
        archive(): Promise<asset.Asset>;
        delete(): Promise<void>;
        unarchive(): Promise<asset.Asset>;
        unpublish(): Promise<asset.Asset>;
        update(): Promise<asset.Asset>;
        isPublished(): boolean;
        isUpdated(): boolean;
        isDraft(): boolean;
        isArchived(): boolean;
    } & asset.AssetProps & {
        toPlainObject(): asset.AssetProps;
    }>;
    getUpload: (id: string) => Promise<{
        delete: () => Promise<void>;
    } & upload.UploadProps & {
        toPlainObject(): upload.UploadProps;
    }>;
    createUpload: (data: {
        file: string | ArrayBuffer | Stream;
    }) => Promise<{
        delete: () => Promise<void>;
    } & upload.UploadProps & {
        toPlainObject(): upload.UploadProps;
    }>;
    getLocale: (id: string) => Promise<{
        update: () => Promise<locale.Locale>;
        delete: () => Promise<void>;
    } & locale.LocaleProps & {
        toPlainObject(): locale.LocaleProps;
    }>;
    getLocales: () => Promise<{
        items: ({
            update: () => Promise<locale.Locale>;
            delete: () => Promise<void>;
        } & locale.LocaleProps & {
            toPlainObject(): locale.LocaleProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): import("./common-types").CollectionProp<locale.LocaleProps>;
    }>;
    createLocale: (data: Omit<LocaleProps, 'sys'>) => Promise<{
        update: () => Promise<locale.Locale>;
        delete: () => Promise<void>;
    } & locale.LocaleProps & {
        toPlainObject(): locale.LocaleProps;
    }>;
    getUiExtension: (id: string) => Promise<{
        update: () => Promise<uiExtension.UIExtension>;
        delete: () => Promise<void>;
    } & uiExtension.UIExtensionProps & {
        toPlainObject(): uiExtension.UIExtensionProps;
    }>;
    getUiExtensions: () => Promise<{
        items: ({
            update: () => Promise<uiExtension.UIExtension>;
            delete: () => Promise<void>;
        } & uiExtension.UIExtensionProps & {
            toPlainObject(): uiExtension.UIExtensionProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): import("./common-types").CollectionProp<uiExtension.UIExtensionProps>;
    }>;
    createUiExtension: (data: Omit<UIExtensionProps, 'sys'>) => Promise<{
        update: () => Promise<uiExtension.UIExtension>;
        delete: () => Promise<void>;
    } & uiExtension.UIExtensionProps & {
        toPlainObject(): uiExtension.UIExtensionProps;
    }>;
    createUiExtensionWithId: (id: string, data: Omit<UIExtensionProps, 'sys'>) => Promise<{
        update: () => Promise<uiExtension.UIExtension>;
        delete: () => Promise<void>;
    } & uiExtension.UIExtensionProps & {
        toPlainObject(): uiExtension.UIExtensionProps;
    }>;
    createAppInstallation: (appDefinitionId: string, data: Omit<AppInstallationProps, 'sys'>) => Promise<{
        update: () => Promise<any & appInstallation.AppInstallationProps & {
            toPlainObject(): appInstallation.AppInstallationProps;
        }>;
        delete: () => Promise<void>;
    } & appInstallation.AppInstallationProps & {
        toPlainObject(): appInstallation.AppInstallationProps;
    }>;
    getAppInstallation: (id: string) => Promise<{
        update: () => Promise<any & appInstallation.AppInstallationProps & {
            toPlainObject(): appInstallation.AppInstallationProps;
        }>;
        delete: () => Promise<void>;
    } & appInstallation.AppInstallationProps & {
        toPlainObject(): appInstallation.AppInstallationProps;
    }>;
    getAppInstallations: () => Promise<{
        items: ({
            update: () => Promise<any & appInstallation.AppInstallationProps & {
                toPlainObject(): appInstallation.AppInstallationProps;
            }>;
            delete: () => Promise<void>;
        } & appInstallation.AppInstallationProps & {
            toPlainObject(): appInstallation.AppInstallationProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): import("./common-types").CollectionProp<appInstallation.AppInstallationProps>;
    }>;
    getEntrySnapshots: (entryId: string, query?: QueryOptions) => Promise<{
        items: (snapshot.SnapshotProps<unknown> & {
            toPlainObject(): snapshot.SnapshotProps<unknown>;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): import("./common-types").CollectionProp<snapshot.SnapshotProps<unknown>>;
    }>;
    getContentTypeSnapshots: (contentTypeId: string, query?: QueryOptions) => Promise<{
        items: (snapshot.SnapshotProps<unknown> & {
            toPlainObject(): snapshot.SnapshotProps<unknown>;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): import("./common-types").CollectionProp<snapshot.SnapshotProps<unknown>>;
    }>;
};
