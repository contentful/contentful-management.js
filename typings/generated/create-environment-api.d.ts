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
import { Stream } from "stream";
import { AxiosInstance } from 'axios';
/**
 * Creates API object with methods to access the Environment API
 * @private
 */
export default function createEnvironmentApi({ http, httpUpload }: {
    http: AxiosInstance;
    httpUpload: AxiosInstance;
}): {
    getEntryFromData: (entryData: EntryProp) => entry.EntryProp & {
        toPlainObject(): entry.EntryProp;
    };
    getAssetFromData: (assetData: AssetProps) => asset.AssetProps & {
        toPlainObject(): asset.AssetProps;
    };
    delete: () => Promise<void>;
    update: () => Promise<any & environment.EnvironmentProps & {
        toPlainObject(): environment.EnvironmentProps;
    }>;
    getContentType: (id: string) => Promise<contentType.ContentTypeProps & {
        toPlainObject(): contentType.ContentTypeProps;
    }>;
    getContentTypes: (query?: QueryOptions) => Promise<import("./common-types").CollectionProp<contentType.ContentTypeProps> & {
        toPlainObject(): import("./common-types").CollectionProp<contentType.ContentTypeProps>;
    }>;
    createContentType: (data: Omit<ContentTypeProps, 'sys'>) => Promise<contentType.ContentTypeProps & {
        toPlainObject(): contentType.ContentTypeProps;
    }>;
    createContentTypeWithId: (id: string, data: Omit<ContentTypeProps, 'sys'>) => Promise<contentType.ContentTypeProps & {
        toPlainObject(): contentType.ContentTypeProps;
    }>;
    getEditorInterfaceForContentType: (contentTypeId: string) => Promise<editorInterface.EditorInterface>;
    getEntry: (id: string, query?: QueryOptions) => Promise<entry.EntryProp & {
        toPlainObject(): entry.EntryProp;
    }>;
    getEntries: (query?: QueryOptions) => Promise<import("./common-types").CollectionProp<entry.EntryProp> & {
        toPlainObject(): import("./common-types").CollectionProp<entry.EntryProp>;
    }>;
    createEntry: (contentTypeId: string, data: Omit<EntryProp, 'sys'>) => Promise<entry.EntryProp & {
        toPlainObject(): entry.EntryProp;
    }>;
    createEntryWithId: (contentTypeId: string, id: string, data: Omit<EntryProp, 'sys'>) => Promise<entry.EntryProp & {
        toPlainObject(): entry.EntryProp;
    }>;
    getAsset: (id: string, query?: QueryOptions) => Promise<asset.AssetProps & {
        toPlainObject(): asset.AssetProps;
    }>;
    getAssets: (query?: QueryOptions) => Promise<import("./common-types").CollectionProp<asset.AssetProps> & {
        toPlainObject(): import("./common-types").CollectionProp<asset.AssetProps>;
    }>;
    createAsset: (data: Omit<AssetProps, 'sys'>) => Promise<asset.AssetProps & {
        toPlainObject(): asset.AssetProps;
    }>;
    createAssetWithId: (id: string, data: Omit<AssetProps, 'sys'>) => Promise<asset.AssetProps & {
        toPlainObject(): asset.AssetProps;
    }>;
    createAssetFromFiles: (data: Omit<AssetFileProp, 'sys'>) => Promise<asset.AssetProps & {
        toPlainObject(): asset.AssetProps;
    }>;
    getUpload: (id: string) => Promise<upload.UploadProps & {
        toPlainObject(): upload.UploadProps;
    }>;
    createUpload: (data: {
        file: string | ArrayBuffer | Stream;
    }) => Promise<upload.UploadProps & {
        toPlainObject(): upload.UploadProps;
    }>;
    getLocale: (id: string) => Promise<locale.LocaleProps & {
        toPlainObject(): locale.LocaleProps;
    }>;
    getLocales: () => Promise<import("./common-types").CollectionProp<locale.LocaleProps> & {
        toPlainObject(): import("./common-types").CollectionProp<locale.LocaleProps>;
    }>;
    createLocale: (data: Omit<LocaleProps, 'sys'>) => Promise<locale.LocaleProps & {
        toPlainObject(): locale.LocaleProps;
    }>;
    getUiExtension: (id: string) => Promise<uiExtension.UIExtensionProps & {
        toPlainObject(): uiExtension.UIExtensionProps;
    }>;
    getUiExtensions: () => Promise<import("./common-types").CollectionProp<uiExtension.UIExtensionProps> & {
        toPlainObject(): import("./common-types").CollectionProp<uiExtension.UIExtensionProps>;
    }>;
    createUiExtension: (data: Omit<UIExtensionProps, 'sys'>) => Promise<uiExtension.UIExtensionProps & {
        toPlainObject(): uiExtension.UIExtensionProps;
    }>;
    createUiExtensionWithId: (id: string, data: Omit<UIExtensionProps, 'sys'>) => Promise<uiExtension.UIExtensionProps & {
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
    getAppInstallations: () => Promise<import("./common-types").CollectionProp<appInstallation.AppInstallationProps> & {
        toPlainObject(): import("./common-types").CollectionProp<appInstallation.AppInstallationProps>;
    }>;
    getEntrySnapshots: (entryId: string, query?: QueryOptions) => Promise<import("./common-types").CollectionProp<snapshot.SnapshotProps<unknown>> & {
        toPlainObject(): import("./common-types").CollectionProp<snapshot.SnapshotProps<unknown>>;
    }>;
    getContentTypeSnapshots: (contentTypeId: string, query?: QueryOptions) => Promise<import("./common-types").CollectionProp<snapshot.SnapshotProps<unknown>> & {
        toPlainObject(): import("./common-types").CollectionProp<snapshot.SnapshotProps<unknown>>;
    }>;
};
