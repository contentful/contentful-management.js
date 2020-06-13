/**
 * Contentful Space API. Contains methods to access any operations at a space
 * level, such as creating and reading entities contained in a space.
 */
/// <reference types="node" />
import { AxiosInstance } from 'axios';
import { Stream } from 'stream';
import { EnvironmentProps } from './entities/environment';
import { ContentTypeProps } from './entities/content-type';
import { EntryProp } from './entities/entry';
import { AssetProps, AssetFileProp } from './entities/asset';
import { TeamSpaceMembershipProps } from './entities/team-space-membership';
import { SpaceMembershipProps } from './entities/space-membership';
import { RoleProps } from './entities/role';
import { LocaleProps } from './entities/locale';
import { WebhookProps } from './entities/webhook';
import { QueryOptions } from './common-types';
import { UIExtensionProps } from './entities/ui-extension';
import { CreateApiKeyProps } from './entities/api-key';
export declare type ContentfulSpaceAPI = ReturnType<typeof createSpaceApi>;
/**
 * Creates API object with methods to access the Space API
 * @param {object} params - API initialization params
 * @prop {object} http - HTTP client instance
 * @prop {object} entities - Object with wrapper methods for each kind of entity
 * @return {ContentfulSpaceAPI}
 */
export default function createSpaceApi({ http, httpUpload, }: {
    http: AxiosInstance;
    httpUpload: AxiosInstance;
}): {
    delete: () => Promise<void>;
    update: () => Promise<import("./entities/space").Space>;
    getEnvironment: (id: string) => Promise<{
        getEntryFromData: (entryData: EntryProp) => {
            update(): Promise<import("./entities/entry").Entry>;
            archive(): Promise<import("./entities/entry").Entry>;
            delete(): Promise<void>;
            publish(): Promise<import("./entities/entry").Entry>;
            unarchive(): Promise<import("./entities/entry").Entry>;
            unpublish(): Promise<import("./entities/entry").Entry>;
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
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
        update: () => Promise<any & EnvironmentProps & {
            toPlainObject(): EnvironmentProps;
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
        } & ContentTypeProps & {
            toPlainObject(): ContentTypeProps;
        }, ContentTypeProps>>;
        createContentType: (data: Pick<ContentTypeProps, "description" | "name" | "displayField" | "fields">) => Promise<{
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
        } & ContentTypeProps & {
            toPlainObject(): ContentTypeProps;
        }>;
        createContentTypeWithId: (id: string, data: Pick<ContentTypeProps, "description" | "name" | "displayField" | "fields">) => Promise<{
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
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
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
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
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
            isArchived(): boolean;
            isDraft(): boolean;
            isPublished(): boolean;
            isUpdated(): boolean;
        } & EntryProp & {
            toPlainObject(): EntryProp;
        }, EntryProp>>;
        createEntry: (contentTypeId: string, data: Pick<EntryProp, "fields">) => Promise<{
            update(): Promise<import("./entities/entry").Entry>;
            archive(): Promise<import("./entities/entry").Entry>;
            delete(): Promise<void>;
            publish(): Promise<import("./entities/entry").Entry>;
            unarchive(): Promise<import("./entities/entry").Entry>;
            unpublish(): Promise<import("./entities/entry").Entry>;
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
            isArchived(): boolean;
            isDraft(): boolean;
            isPublished(): boolean;
            isUpdated(): boolean;
        } & EntryProp & {
            toPlainObject(): EntryProp;
        }>;
        createEntryWithId: (contentTypeId: string, id: string, data: Pick<EntryProp, "fields">) => Promise<{
            update(): Promise<import("./entities/entry").Entry>;
            archive(): Promise<import("./entities/entry").Entry>;
            delete(): Promise<void>;
            publish(): Promise<import("./entities/entry").Entry>;
            unarchive(): Promise<import("./entities/entry").Entry>;
            unpublish(): Promise<import("./entities/entry").Entry>;
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
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
        }, AssetProps>>;
        createAsset: (data: Pick<AssetProps, "fields">) => Promise<{
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
        createAssetWithId: (id: string, data: Pick<AssetProps, "fields">) => Promise<{
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
        createAssetFromFiles: (data: Pick<AssetFileProp, "fields">) => Promise<{
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
        }, LocaleProps>>;
        createLocale: (data: Pick<LocaleProps, "optional" | "default" | "code" | "name" | "fallbackCode" | "contentDeliveryApi" | "contentManagementApi">) => Promise<{
            update: () => Promise<import("./entities/locale").Locale>;
            delete: () => Promise<void>;
        } & LocaleProps & {
            toPlainObject(): LocaleProps;
        }>;
        getUiExtension: (id: string) => Promise<import("./entities/ui-extension").UIExtension>;
        getUiExtensions: () => Promise<import("./common-types").Collection<import("./entities/ui-extension").UIExtension, UIExtensionProps>>;
        createUiExtension: (data: Pick<UIExtensionProps, "extension">) => Promise<import("./entities/ui-extension").UIExtension>;
        createUiExtensionWithId: (id: string, data: Pick<UIExtensionProps, "extension">) => Promise<import("./entities/ui-extension").UIExtension>;
        createAppInstallation: (appDefinitionId: string, data: Pick<import("./entities/app-installation").AppInstallationProps, "parameters">) => Promise<{
            update: () => Promise<any & import("./entities/app-installation").AppInstallationProps & {
                toPlainObject(): import("./entities/app-installation").AppInstallationProps;
            }>;
            delete: () => Promise<void>;
        } & import("./entities/app-installation").AppInstallationProps & {
            toPlainObject(): import("./entities/app-installation").AppInstallationProps;
        }>;
        getAppInstallation: (id: string) => Promise<{
            update: () => Promise<any & import("./entities/app-installation").AppInstallationProps & {
                toPlainObject(): import("./entities/app-installation").AppInstallationProps;
            }>;
            delete: () => Promise<void>;
        } & import("./entities/app-installation").AppInstallationProps & {
            toPlainObject(): import("./entities/app-installation").AppInstallationProps;
        }>;
        getAppInstallations: () => Promise<import("./common-types").Collection<{
            update: () => Promise<any & import("./entities/app-installation").AppInstallationProps & {
                toPlainObject(): import("./entities/app-installation").AppInstallationProps;
            }>;
            delete: () => Promise<void>;
        } & import("./entities/app-installation").AppInstallationProps & {
            toPlainObject(): import("./entities/app-installation").AppInstallationProps;
        }, import("./entities/app-installation").AppInstallationProps>>;
        getEntrySnapshots: (entryId: string, query?: QueryOptions) => Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<unknown> & {
            toPlainObject(): import("./entities/snapshot").SnapshotProps<unknown>;
        }, import("./entities/snapshot").SnapshotProps<unknown>>>;
        getContentTypeSnapshots: (contentTypeId: string, query?: QueryOptions) => Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<unknown> & {
            toPlainObject(): import("./entities/snapshot").SnapshotProps<unknown>;
        }, import("./entities/snapshot").SnapshotProps<unknown>>>;
    } & EnvironmentProps & {
        toPlainObject(): EnvironmentProps;
    }>;
    getEnvironments: () => Promise<import("./common-types").Collection<{
        getEntryFromData: (entryData: EntryProp) => {
            update(): Promise<import("./entities/entry").Entry>;
            archive(): Promise<import("./entities/entry").Entry>;
            delete(): Promise<void>;
            publish(): Promise<import("./entities/entry").Entry>;
            unarchive(): Promise<import("./entities/entry").Entry>;
            unpublish(): Promise<import("./entities/entry").Entry>;
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
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
        update: () => Promise<any & EnvironmentProps & {
            toPlainObject(): EnvironmentProps;
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
        } & ContentTypeProps & {
            toPlainObject(): ContentTypeProps;
        }, ContentTypeProps>>;
        createContentType: (data: Pick<ContentTypeProps, "description" | "name" | "displayField" | "fields">) => Promise<{
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
        } & ContentTypeProps & {
            toPlainObject(): ContentTypeProps;
        }>;
        createContentTypeWithId: (id: string, data: Pick<ContentTypeProps, "description" | "name" | "displayField" | "fields">) => Promise<{
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
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
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
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
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
            isArchived(): boolean;
            isDraft(): boolean;
            isPublished(): boolean;
            isUpdated(): boolean;
        } & EntryProp & {
            toPlainObject(): EntryProp;
        }, EntryProp>>;
        createEntry: (contentTypeId: string, data: Pick<EntryProp, "fields">) => Promise<{
            update(): Promise<import("./entities/entry").Entry>;
            archive(): Promise<import("./entities/entry").Entry>;
            delete(): Promise<void>;
            publish(): Promise<import("./entities/entry").Entry>;
            unarchive(): Promise<import("./entities/entry").Entry>;
            unpublish(): Promise<import("./entities/entry").Entry>;
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
            isArchived(): boolean;
            isDraft(): boolean;
            isPublished(): boolean;
            isUpdated(): boolean;
        } & EntryProp & {
            toPlainObject(): EntryProp;
        }>;
        createEntryWithId: (contentTypeId: string, id: string, data: Pick<EntryProp, "fields">) => Promise<{
            update(): Promise<import("./entities/entry").Entry>;
            archive(): Promise<import("./entities/entry").Entry>;
            delete(): Promise<void>;
            publish(): Promise<import("./entities/entry").Entry>;
            unarchive(): Promise<import("./entities/entry").Entry>;
            unpublish(): Promise<import("./entities/entry").Entry>;
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
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
        }, AssetProps>>;
        createAsset: (data: Pick<AssetProps, "fields">) => Promise<{
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
        createAssetWithId: (id: string, data: Pick<AssetProps, "fields">) => Promise<{
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
        createAssetFromFiles: (data: Pick<AssetFileProp, "fields">) => Promise<{
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
        }, LocaleProps>>;
        createLocale: (data: Pick<LocaleProps, "optional" | "default" | "code" | "name" | "fallbackCode" | "contentDeliveryApi" | "contentManagementApi">) => Promise<{
            update: () => Promise<import("./entities/locale").Locale>;
            delete: () => Promise<void>;
        } & LocaleProps & {
            toPlainObject(): LocaleProps;
        }>;
        getUiExtension: (id: string) => Promise<import("./entities/ui-extension").UIExtension>;
        getUiExtensions: () => Promise<import("./common-types").Collection<import("./entities/ui-extension").UIExtension, UIExtensionProps>>;
        createUiExtension: (data: Pick<UIExtensionProps, "extension">) => Promise<import("./entities/ui-extension").UIExtension>;
        createUiExtensionWithId: (id: string, data: Pick<UIExtensionProps, "extension">) => Promise<import("./entities/ui-extension").UIExtension>;
        createAppInstallation: (appDefinitionId: string, data: Pick<import("./entities/app-installation").AppInstallationProps, "parameters">) => Promise<{
            update: () => Promise<any & import("./entities/app-installation").AppInstallationProps & {
                toPlainObject(): import("./entities/app-installation").AppInstallationProps;
            }>;
            delete: () => Promise<void>;
        } & import("./entities/app-installation").AppInstallationProps & {
            toPlainObject(): import("./entities/app-installation").AppInstallationProps;
        }>;
        getAppInstallation: (id: string) => Promise<{
            update: () => Promise<any & import("./entities/app-installation").AppInstallationProps & {
                toPlainObject(): import("./entities/app-installation").AppInstallationProps;
            }>;
            delete: () => Promise<void>;
        } & import("./entities/app-installation").AppInstallationProps & {
            toPlainObject(): import("./entities/app-installation").AppInstallationProps;
        }>;
        getAppInstallations: () => Promise<import("./common-types").Collection<{
            update: () => Promise<any & import("./entities/app-installation").AppInstallationProps & {
                toPlainObject(): import("./entities/app-installation").AppInstallationProps;
            }>;
            delete: () => Promise<void>;
        } & import("./entities/app-installation").AppInstallationProps & {
            toPlainObject(): import("./entities/app-installation").AppInstallationProps;
        }, import("./entities/app-installation").AppInstallationProps>>;
        getEntrySnapshots: (entryId: string, query?: QueryOptions) => Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<unknown> & {
            toPlainObject(): import("./entities/snapshot").SnapshotProps<unknown>;
        }, import("./entities/snapshot").SnapshotProps<unknown>>>;
        getContentTypeSnapshots: (contentTypeId: string, query?: QueryOptions) => Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<unknown> & {
            toPlainObject(): import("./entities/snapshot").SnapshotProps<unknown>;
        }, import("./entities/snapshot").SnapshotProps<unknown>>>;
    } & EnvironmentProps & {
        toPlainObject(): EnvironmentProps;
    }, EnvironmentProps>>;
    createEnvironment: (data?: {}) => Promise<{
        getEntryFromData: (entryData: EntryProp) => {
            update(): Promise<import("./entities/entry").Entry>;
            archive(): Promise<import("./entities/entry").Entry>;
            delete(): Promise<void>;
            publish(): Promise<import("./entities/entry").Entry>;
            unarchive(): Promise<import("./entities/entry").Entry>;
            unpublish(): Promise<import("./entities/entry").Entry>;
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
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
        update: () => Promise<any & EnvironmentProps & {
            toPlainObject(): EnvironmentProps;
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
        } & ContentTypeProps & {
            toPlainObject(): ContentTypeProps;
        }, ContentTypeProps>>;
        createContentType: (data: Pick<ContentTypeProps, "description" | "name" | "displayField" | "fields">) => Promise<{
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
        } & ContentTypeProps & {
            toPlainObject(): ContentTypeProps;
        }>;
        createContentTypeWithId: (id: string, data: Pick<ContentTypeProps, "description" | "name" | "displayField" | "fields">) => Promise<{
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
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
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
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
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
            isArchived(): boolean;
            isDraft(): boolean;
            isPublished(): boolean;
            isUpdated(): boolean;
        } & EntryProp & {
            toPlainObject(): EntryProp;
        }, EntryProp>>;
        createEntry: (contentTypeId: string, data: Pick<EntryProp, "fields">) => Promise<{
            update(): Promise<import("./entities/entry").Entry>;
            archive(): Promise<import("./entities/entry").Entry>;
            delete(): Promise<void>;
            publish(): Promise<import("./entities/entry").Entry>;
            unarchive(): Promise<import("./entities/entry").Entry>;
            unpublish(): Promise<import("./entities/entry").Entry>;
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
            isArchived(): boolean;
            isDraft(): boolean;
            isPublished(): boolean;
            isUpdated(): boolean;
        } & EntryProp & {
            toPlainObject(): EntryProp;
        }>;
        createEntryWithId: (contentTypeId: string, id: string, data: Pick<EntryProp, "fields">) => Promise<{
            update(): Promise<import("./entities/entry").Entry>;
            archive(): Promise<import("./entities/entry").Entry>;
            delete(): Promise<void>;
            publish(): Promise<import("./entities/entry").Entry>;
            unarchive(): Promise<import("./entities/entry").Entry>;
            unpublish(): Promise<import("./entities/entry").Entry>;
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
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
        }, AssetProps>>;
        createAsset: (data: Pick<AssetProps, "fields">) => Promise<{
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
        createAssetWithId: (id: string, data: Pick<AssetProps, "fields">) => Promise<{
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
        createAssetFromFiles: (data: Pick<AssetFileProp, "fields">) => Promise<{
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
        }, LocaleProps>>;
        createLocale: (data: Pick<LocaleProps, "optional" | "default" | "code" | "name" | "fallbackCode" | "contentDeliveryApi" | "contentManagementApi">) => Promise<{
            update: () => Promise<import("./entities/locale").Locale>;
            delete: () => Promise<void>;
        } & LocaleProps & {
            toPlainObject(): LocaleProps;
        }>;
        getUiExtension: (id: string) => Promise<import("./entities/ui-extension").UIExtension>;
        getUiExtensions: () => Promise<import("./common-types").Collection<import("./entities/ui-extension").UIExtension, UIExtensionProps>>;
        createUiExtension: (data: Pick<UIExtensionProps, "extension">) => Promise<import("./entities/ui-extension").UIExtension>;
        createUiExtensionWithId: (id: string, data: Pick<UIExtensionProps, "extension">) => Promise<import("./entities/ui-extension").UIExtension>;
        createAppInstallation: (appDefinitionId: string, data: Pick<import("./entities/app-installation").AppInstallationProps, "parameters">) => Promise<{
            update: () => Promise<any & import("./entities/app-installation").AppInstallationProps & {
                toPlainObject(): import("./entities/app-installation").AppInstallationProps;
            }>;
            delete: () => Promise<void>;
        } & import("./entities/app-installation").AppInstallationProps & {
            toPlainObject(): import("./entities/app-installation").AppInstallationProps;
        }>;
        getAppInstallation: (id: string) => Promise<{
            update: () => Promise<any & import("./entities/app-installation").AppInstallationProps & {
                toPlainObject(): import("./entities/app-installation").AppInstallationProps;
            }>;
            delete: () => Promise<void>;
        } & import("./entities/app-installation").AppInstallationProps & {
            toPlainObject(): import("./entities/app-installation").AppInstallationProps;
        }>;
        getAppInstallations: () => Promise<import("./common-types").Collection<{
            update: () => Promise<any & import("./entities/app-installation").AppInstallationProps & {
                toPlainObject(): import("./entities/app-installation").AppInstallationProps;
            }>;
            delete: () => Promise<void>;
        } & import("./entities/app-installation").AppInstallationProps & {
            toPlainObject(): import("./entities/app-installation").AppInstallationProps;
        }, import("./entities/app-installation").AppInstallationProps>>;
        getEntrySnapshots: (entryId: string, query?: QueryOptions) => Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<unknown> & {
            toPlainObject(): import("./entities/snapshot").SnapshotProps<unknown>;
        }, import("./entities/snapshot").SnapshotProps<unknown>>>;
        getContentTypeSnapshots: (contentTypeId: string, query?: QueryOptions) => Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<unknown> & {
            toPlainObject(): import("./entities/snapshot").SnapshotProps<unknown>;
        }, import("./entities/snapshot").SnapshotProps<unknown>>>;
    } & EnvironmentProps & {
        toPlainObject(): EnvironmentProps;
    }>;
    createEnvironmentWithId: (id: string, data: Omit<EnvironmentProps, 'sys'>, sourceEnvironmentId?: string | undefined) => Promise<{
        getEntryFromData: (entryData: EntryProp) => {
            update(): Promise<import("./entities/entry").Entry>;
            archive(): Promise<import("./entities/entry").Entry>;
            delete(): Promise<void>;
            publish(): Promise<import("./entities/entry").Entry>;
            unarchive(): Promise<import("./entities/entry").Entry>;
            unpublish(): Promise<import("./entities/entry").Entry>;
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
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
        update: () => Promise<any & EnvironmentProps & {
            toPlainObject(): EnvironmentProps;
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
        } & ContentTypeProps & {
            toPlainObject(): ContentTypeProps;
        }, ContentTypeProps>>;
        createContentType: (data: Pick<ContentTypeProps, "description" | "name" | "displayField" | "fields">) => Promise<{
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
        } & ContentTypeProps & {
            toPlainObject(): ContentTypeProps;
        }>;
        createContentTypeWithId: (id: string, data: Pick<ContentTypeProps, "description" | "name" | "displayField" | "fields">) => Promise<{
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
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
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
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
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
            isArchived(): boolean;
            isDraft(): boolean;
            isPublished(): boolean;
            isUpdated(): boolean;
        } & EntryProp & {
            toPlainObject(): EntryProp;
        }, EntryProp>>;
        createEntry: (contentTypeId: string, data: Pick<EntryProp, "fields">) => Promise<{
            update(): Promise<import("./entities/entry").Entry>;
            archive(): Promise<import("./entities/entry").Entry>;
            delete(): Promise<void>;
            publish(): Promise<import("./entities/entry").Entry>;
            unarchive(): Promise<import("./entities/entry").Entry>;
            unpublish(): Promise<import("./entities/entry").Entry>;
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
            isArchived(): boolean;
            isDraft(): boolean;
            isPublished(): boolean;
            isUpdated(): boolean;
        } & EntryProp & {
            toPlainObject(): EntryProp;
        }>;
        createEntryWithId: (contentTypeId: string, id: string, data: Pick<EntryProp, "fields">) => Promise<{
            update(): Promise<import("./entities/entry").Entry>;
            archive(): Promise<import("./entities/entry").Entry>;
            delete(): Promise<void>;
            publish(): Promise<import("./entities/entry").Entry>;
            unarchive(): Promise<import("./entities/entry").Entry>;
            unpublish(): Promise<import("./entities/entry").Entry>;
            getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
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
        }, AssetProps>>;
        createAsset: (data: Pick<AssetProps, "fields">) => Promise<{
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
        createAssetWithId: (id: string, data: Pick<AssetProps, "fields">) => Promise<{
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
        createAssetFromFiles: (data: Pick<AssetFileProp, "fields">) => Promise<{
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
        }, LocaleProps>>;
        createLocale: (data: Pick<LocaleProps, "optional" | "default" | "code" | "name" | "fallbackCode" | "contentDeliveryApi" | "contentManagementApi">) => Promise<{
            update: () => Promise<import("./entities/locale").Locale>;
            delete: () => Promise<void>;
        } & LocaleProps & {
            toPlainObject(): LocaleProps;
        }>;
        getUiExtension: (id: string) => Promise<import("./entities/ui-extension").UIExtension>;
        getUiExtensions: () => Promise<import("./common-types").Collection<import("./entities/ui-extension").UIExtension, UIExtensionProps>>;
        createUiExtension: (data: Pick<UIExtensionProps, "extension">) => Promise<import("./entities/ui-extension").UIExtension>;
        createUiExtensionWithId: (id: string, data: Pick<UIExtensionProps, "extension">) => Promise<import("./entities/ui-extension").UIExtension>;
        createAppInstallation: (appDefinitionId: string, data: Pick<import("./entities/app-installation").AppInstallationProps, "parameters">) => Promise<{
            update: () => Promise<any & import("./entities/app-installation").AppInstallationProps & {
                toPlainObject(): import("./entities/app-installation").AppInstallationProps;
            }>;
            delete: () => Promise<void>;
        } & import("./entities/app-installation").AppInstallationProps & {
            toPlainObject(): import("./entities/app-installation").AppInstallationProps;
        }>;
        getAppInstallation: (id: string) => Promise<{
            update: () => Promise<any & import("./entities/app-installation").AppInstallationProps & {
                toPlainObject(): import("./entities/app-installation").AppInstallationProps;
            }>;
            delete: () => Promise<void>;
        } & import("./entities/app-installation").AppInstallationProps & {
            toPlainObject(): import("./entities/app-installation").AppInstallationProps;
        }>;
        getAppInstallations: () => Promise<import("./common-types").Collection<{
            update: () => Promise<any & import("./entities/app-installation").AppInstallationProps & {
                toPlainObject(): import("./entities/app-installation").AppInstallationProps;
            }>;
            delete: () => Promise<void>;
        } & import("./entities/app-installation").AppInstallationProps & {
            toPlainObject(): import("./entities/app-installation").AppInstallationProps;
        }, import("./entities/app-installation").AppInstallationProps>>;
        getEntrySnapshots: (entryId: string, query?: QueryOptions) => Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<unknown> & {
            toPlainObject(): import("./entities/snapshot").SnapshotProps<unknown>;
        }, import("./entities/snapshot").SnapshotProps<unknown>>>;
        getContentTypeSnapshots: (contentTypeId: string, query?: QueryOptions) => Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<unknown> & {
            toPlainObject(): import("./entities/snapshot").SnapshotProps<unknown>;
        }, import("./entities/snapshot").SnapshotProps<unknown>>>;
    } & EnvironmentProps & {
        toPlainObject(): EnvironmentProps;
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
        getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
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
        getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
    } & ContentTypeProps & {
        toPlainObject(): ContentTypeProps;
    }, ContentTypeProps>>;
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
        getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
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
        getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<ContentTypeProps>, import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
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
        getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
        getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
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
        getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
        getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
        isArchived(): boolean;
        isDraft(): boolean;
        isPublished(): boolean;
        isUpdated(): boolean;
    } & EntryProp & {
        toPlainObject(): EntryProp;
    }, EntryProp>>;
    createEntry: (contentTypeId: string, data: Omit<EntryProp, 'sys'>) => Promise<{
        update(): Promise<import("./entities/entry").Entry>;
        archive(): Promise<import("./entities/entry").Entry>;
        delete(): Promise<void>;
        publish(): Promise<import("./entities/entry").Entry>;
        unarchive(): Promise<import("./entities/entry").Entry>;
        unpublish(): Promise<import("./entities/entry").Entry>;
        getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
        getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
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
        getSnapshot(id: string): Promise<import("./entities/snapshot").Snapshot<EntryProp>>;
        getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").Snapshot<EntryProp>, import("./entities/snapshot").SnapshotProps<EntryProp>>>;
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
    }, AssetProps>>;
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
    }, LocaleProps>>;
    createLocale: (data: Omit<LocaleProps, 'sys'>) => Promise<{
        update: () => Promise<import("./entities/locale").Locale>;
        delete: () => Promise<void>;
    } & LocaleProps & {
        toPlainObject(): LocaleProps;
    }>;
    getWebhook: (id: string) => Promise<import("./entities/webhook").WebHooks>;
    getWebhooks: () => Promise<import("./common-types").Collection<import("./entities/webhook").WebHooks, WebhookProps>>;
    createWebhook: (data: Omit<WebhookProps, 'sys'>) => Promise<import("./entities/webhook").WebHooks>;
    createWebhookWithId: (id: string, data: Omit<WebhookProps, 'sys'>) => Promise<import("./entities/webhook").WebHooks>;
    getRole: (id: string) => Promise<{
        update: () => Promise<import("./entities/role").Role>;
        delete: () => Promise<void>;
    } & RoleProps & {
        toPlainObject(): RoleProps;
    }>;
    getRoles: () => Promise<import("./common-types").Collection<{
        update: () => Promise<import("./entities/role").Role>;
        delete: () => Promise<void>;
    } & RoleProps & {
        toPlainObject(): RoleProps;
    }, RoleProps>>;
    createRole: (data: Omit<RoleProps, 'sys'>) => Promise<{
        update: () => Promise<import("./entities/role").Role>;
        delete: () => Promise<void>;
    } & RoleProps & {
        toPlainObject(): RoleProps;
    }>;
    createRoleWithId: (id: string, data: Omit<RoleProps, 'sys'>) => Promise<{
        update: () => Promise<import("./entities/role").Role>;
        delete: () => Promise<void>;
    } & RoleProps & {
        toPlainObject(): RoleProps;
    }>;
    getSpaceUser: (id: string) => Promise<import("./entities/user").User>;
    getSpaceUsers: (query?: QueryOptions) => Promise<import("./common-types").Collection<import("./entities/user").User, import("./entities/user").UserProps>>;
    getSpaceMember: (id: string) => Promise<import("./entities/space-member").SpaceMemberProps & {
        toPlainObject(): import("./entities/space-member").SpaceMemberProps;
    }>;
    getSpaceMembers: (query?: QueryOptions) => Promise<import("./common-types").Collection<import("./entities/space-member").SpaceMemberProps & {
        toPlainObject(): import("./entities/space-member").SpaceMemberProps;
    }, import("./entities/space-member").SpaceMemberProps>>;
    getSpaceMembership: (id: string) => Promise<{
        update: () => Promise<import("./entities/space-membership").SpaceMembership>;
        delete: () => Promise<void>;
    } & SpaceMembershipProps & {
        toPlainObject(): SpaceMembershipProps;
    }>;
    getSpaceMemberships: (query?: QueryOptions) => Promise<import("./common-types").Collection<{
        update: () => Promise<import("./entities/space-membership").SpaceMembership>;
        delete: () => Promise<void>;
    } & SpaceMembershipProps & {
        toPlainObject(): SpaceMembershipProps;
    }, SpaceMembershipProps>>;
    createSpaceMembership: (data: Omit<SpaceMembershipProps, 'sys'>) => Promise<{
        update: () => Promise<import("./entities/space-membership").SpaceMembership>;
        delete: () => Promise<void>;
    } & SpaceMembershipProps & {
        toPlainObject(): SpaceMembershipProps;
    }>;
    createSpaceMembershipWithId: (id: string, data: Omit<SpaceMembershipProps, 'sys'>) => Promise<{
        update: () => Promise<import("./entities/space-membership").SpaceMembership>;
        delete: () => Promise<void>;
    } & SpaceMembershipProps & {
        toPlainObject(): SpaceMembershipProps;
    }>;
    getTeamSpaceMembership: (teamSpaceMembershipId: string) => Promise<import("./entities/team-space-membership").TeamSpaceMembership>;
    getTeamSpaceMemberships: (query?: QueryOptions) => Promise<import("./common-types").Collection<import("./entities/team-space-membership").TeamSpaceMembership, TeamSpaceMembershipProps>>;
    createTeamSpaceMembership: (teamId: string, data: Omit<TeamSpaceMembershipProps, 'sys'>) => Promise<import("./entities/team-space-membership").TeamSpaceMembership>;
    getApiKey: (id: string) => Promise<import("./entities/api-key").ApiKey>;
    getApiKeys: () => Promise<import("./common-types").Collection<import("./entities/api-key").ApiKey, import("./entities/api-key").ApiKeyProps>>;
    getPreviewApiKeys: () => Promise<import("./common-types").Collection<import("./entities/preview-api-key").PreviewApiKeyProps & {
        toPlainObject(): import("./entities/preview-api-key").PreviewApiKeyProps;
    }, import("./entities/preview-api-key").PreviewApiKeyProps>>;
    getPreviewApiKey: (id: string) => Promise<import("./entities/preview-api-key").PreviewApiKeyProps & {
        toPlainObject(): import("./entities/preview-api-key").PreviewApiKeyProps;
    }>;
    /**
     * Creates a Api Key
     * @param data - Object representation of the Api Key to be created
     * @return Promise for the newly created Api Key
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createApiKey({
     *   name: 'API Key name',
     *   environments:[
     *    {
     *     sys: {
     *      type: 'Link'
     *      linkType: 'Environment',
     *      id:'<environment_id>'
     *     }
     *    }
     *   ]
     *   }
     * }))
     * .then((apiKey) => console.log(apiKey))
     * .catch(console.error)
     * ```
     */
    createApiKey: (data: CreateApiKeyProps) => Promise<import("./entities/api-key").ApiKey>;
    createApiKeyWithId: (id: string, data: CreateApiKeyProps) => Promise<import("./entities/api-key").ApiKey>;
    getUiExtension: (id: string) => Promise<import("./entities/ui-extension").UIExtension>;
    /**
     * Gets a collection of UI Extension
     * @deprecated since version 5.0
     * @return Promise for a collection of UI Extensions
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getUiExtensions()
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getUiExtensions(): Promise<import("./common-types").Collection<import("./entities/ui-extension").UIExtension, UIExtensionProps>>;
    /**
     * Creates a UI Extension
     * @deprecated since version 5.0
     * @param data - Object representation of the UI Extension to be created
     * @return Promise for the newly created UI Extension
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createUiExtension({
     *   extension: {
     *     name: 'My awesome extension',
     *     src: 'https://example.com/my',
     *     fieldTypes: [
     *       {
     *         type: 'Symbol'
     *       },
     *       {
     *         type: 'Text'
     *       }
     *     ],
     *     sidebar: false
     *   }
     * }))
     * .then((uiExtension) => console.log(uiExtension))
     * .catch(console.error)
     * ```
     */
    createUiExtension(data: Omit<UIExtensionProps, 'sys'>): Promise<import("./entities/ui-extension").UIExtension>;
    /**
     * Creates a UI Extension with a custom ID
     * @deprecated since version 5.0
     * @param id - UI Extension ID
     * @param data - Object representation of the UI Extension to be created
     * @return Promise for the newly created UI Extension
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createUiExtensionWithId('<extension_id>', {
     *   extension: {
     *     name: 'My awesome extension',
     *     src: 'https://example.com/my',
     *     fieldTypes: [
     *       {
     *         type: 'Symbol'
     *       },
     *       {
     *         type: 'Text'
     *       }
     *     ],
     *     sidebar: false
     *   }
     * }))
     * .then((uiExtension) => console.log(uiExtension))
     * .catch(console.error)
     * ```
     */
    createUiExtensionWithId(id: string, data: Omit<UIExtensionProps, 'sys'>): Promise<import("./entities/ui-extension").UIExtension>;
    /**
     * Gets all snapshots of an entry
     * @deprecated since version 5.0
     * @param entryId - Entry ID
     * @param query - additional query paramaters
     * @return Promise for a collection of Entry Snapshots
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEntrySnapshots('<entry_id>'))
     * .then((snapshots) => console.log(snapshots.items))
     * .catch(console.error)
     * ```
     */
    getEntrySnapshots(entryId: string, query?: QueryOptions): Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<unknown> & {
        toPlainObject(): import("./entities/snapshot").SnapshotProps<unknown>;
    }, import("./entities/snapshot").SnapshotProps<unknown>>>;
    /**
     * Gets all snapshots of a contentType
     * @deprecated since version 5.0
     * @param contentTypeId - Content Type ID
     * @param query - additional query paramaters
     * @return Promise for a collection of Content Type Snapshots
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getContentTypeSnapshots('<contentTypeId>'))
     * .then((snapshots) => console.log(snapshots.items))
     * .catch(console.error)
     * ```
     */
    getContentTypeSnapshots(contentTypeId: string, query?: QueryOptions): Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<unknown> & {
        toPlainObject(): import("./entities/snapshot").SnapshotProps<unknown>;
    }, import("./entities/snapshot").SnapshotProps<unknown>>>;
    /**
     * Gets an Environment Alias
     * @param Environment Alias ID
     * @return Promise for an Environment Alias
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironmentAlias('<alias-id>'))
     * .then((alias) => console.log(alias))
     * .catch(console.error)
     * ```
     */
    getEnvironmentAlias(id: string): Promise<{
        update: () => Promise<import("./entities/environment-alias").EnvironmentAlias>;
    } & import("./entities/environment-alias").EnvironmentAliasProps & {
        toPlainObject(): import("./entities/environment-alias").EnvironmentAliasProps;
    }>;
    /**
     * Gets a collection of Environment Aliases
     * @return Promise for a collection of Environment Aliases
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironmentAliases()
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getEnvironmentAliases(): Promise<import("./common-types").Collection<{
        update: () => Promise<import("./entities/environment-alias").EnvironmentAlias>;
    } & import("./entities/environment-alias").EnvironmentAliasProps & {
        toPlainObject(): import("./entities/environment-alias").EnvironmentAliasProps;
    }, import("./entities/environment-alias").EnvironmentAliasProps>>;
};
