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
/**
 * Creates API object with methods to access the Space API
 * @private
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
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
        createEntry: (contentTypeId: string, data: Pick<EntryProp, "fields">) => Promise<{
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
        createEntryWithId: (contentTypeId: string, id: string, data: Pick<EntryProp, "fields">) => Promise<{
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
        }> & {
            toPlainObject(): import("./common-types").CollectionProp<LocaleProps>;
        }>;
        createLocale: (data: Pick<LocaleProps, "optional" | "default" | "code" | "name" | "fallbackCode" | "contentDeliveryApi" | "contentManagementApi">) => Promise<{
            update: () => Promise<import("./entities/locale").Locale>;
            delete: () => Promise<void>;
        } & LocaleProps & {
            toPlainObject(): LocaleProps;
        }>;
        getUiExtension: (id: string) => Promise<import("./entities/ui-extension").UIExtension>;
        getUiExtensions: () => Promise<import("./common-types").Collection<import("./entities/ui-extension").UIExtension> & {
            toPlainObject(): import("./common-types").CollectionProp<UIExtensionProps>;
        }>;
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
        }> & {
            toPlainObject(): import("./common-types").CollectionProp<import("./entities/app-installation").AppInstallationProps>;
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
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
        createEntry: (contentTypeId: string, data: Pick<EntryProp, "fields">) => Promise<{
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
        createEntryWithId: (contentTypeId: string, id: string, data: Pick<EntryProp, "fields">) => Promise<{
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
        }> & {
            toPlainObject(): import("./common-types").CollectionProp<LocaleProps>;
        }>;
        createLocale: (data: Pick<LocaleProps, "optional" | "default" | "code" | "name" | "fallbackCode" | "contentDeliveryApi" | "contentManagementApi">) => Promise<{
            update: () => Promise<import("./entities/locale").Locale>;
            delete: () => Promise<void>;
        } & LocaleProps & {
            toPlainObject(): LocaleProps;
        }>;
        getUiExtension: (id: string) => Promise<import("./entities/ui-extension").UIExtension>;
        getUiExtensions: () => Promise<import("./common-types").Collection<import("./entities/ui-extension").UIExtension> & {
            toPlainObject(): import("./common-types").CollectionProp<UIExtensionProps>;
        }>;
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
        }> & {
            toPlainObject(): import("./common-types").CollectionProp<import("./entities/app-installation").AppInstallationProps>;
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
    } & EnvironmentProps & {
        toPlainObject(): EnvironmentProps;
    }> & {
        toPlainObject(): import("./common-types").CollectionProp<EnvironmentProps>;
    }>;
    createEnvironment: (data?: {}) => Promise<{
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
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
        createEntry: (contentTypeId: string, data: Pick<EntryProp, "fields">) => Promise<{
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
        createEntryWithId: (contentTypeId: string, id: string, data: Pick<EntryProp, "fields">) => Promise<{
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
        }> & {
            toPlainObject(): import("./common-types").CollectionProp<LocaleProps>;
        }>;
        createLocale: (data: Pick<LocaleProps, "optional" | "default" | "code" | "name" | "fallbackCode" | "contentDeliveryApi" | "contentManagementApi">) => Promise<{
            update: () => Promise<import("./entities/locale").Locale>;
            delete: () => Promise<void>;
        } & LocaleProps & {
            toPlainObject(): LocaleProps;
        }>;
        getUiExtension: (id: string) => Promise<import("./entities/ui-extension").UIExtension>;
        getUiExtensions: () => Promise<import("./common-types").Collection<import("./entities/ui-extension").UIExtension> & {
            toPlainObject(): import("./common-types").CollectionProp<UIExtensionProps>;
        }>;
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
        }> & {
            toPlainObject(): import("./common-types").CollectionProp<import("./entities/app-installation").AppInstallationProps>;
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
            getSnapshots(): Promise<import("./common-types").Collection<import("./entities/snapshot").SnapshotProps<ContentTypeProps>>>;
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
        createEntry: (contentTypeId: string, data: Pick<EntryProp, "fields">) => Promise<{
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
        createEntryWithId: (contentTypeId: string, id: string, data: Pick<EntryProp, "fields">) => Promise<{
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
        }> & {
            toPlainObject(): import("./common-types").CollectionProp<LocaleProps>;
        }>;
        createLocale: (data: Pick<LocaleProps, "optional" | "default" | "code" | "name" | "fallbackCode" | "contentDeliveryApi" | "contentManagementApi">) => Promise<{
            update: () => Promise<import("./entities/locale").Locale>;
            delete: () => Promise<void>;
        } & LocaleProps & {
            toPlainObject(): LocaleProps;
        }>;
        getUiExtension: (id: string) => Promise<import("./entities/ui-extension").UIExtension>;
        getUiExtensions: () => Promise<import("./common-types").Collection<import("./entities/ui-extension").UIExtension> & {
            toPlainObject(): import("./common-types").CollectionProp<UIExtensionProps>;
        }>;
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
        }> & {
            toPlainObject(): import("./common-types").CollectionProp<import("./entities/app-installation").AppInstallationProps>;
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
    getWebhook: (id: string) => Promise<import("./entities/webhook").WebHooks>;
    getWebhooks: () => Promise<import("./common-types").Collection<import("./entities/webhook").WebHooks> & {
        toPlainObject(): import("./common-types").CollectionProp<WebhookProps>;
    }>;
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
    }> & {
        toPlainObject(): import("./common-types").CollectionProp<RoleProps>;
    }>;
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
    getSpaceUsers: (query?: QueryOptions) => Promise<import("./common-types").Collection<import("./entities/user").User> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./entities/user").UserProps>;
    }>;
    getSpaceMember: (id: string) => Promise<import("./entities/space-member").SpaceMemberProps & {
        toPlainObject(): import("./entities/space-member").SpaceMemberProps;
    }>;
    getSpaceMembers: (query?: QueryOptions) => Promise<import("./common-types").Collection<import("./entities/space-member").SpaceMemberProps & {
        toPlainObject(): import("./entities/space-member").SpaceMemberProps;
    }> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./entities/space-member").SpaceMemberProps>;
    }>;
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
    }> & {
        toPlainObject(): import("./common-types").CollectionProp<SpaceMembershipProps>;
    }>;
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
    getTeamSpaceMemberships: (query?: QueryOptions) => Promise<import("./common-types").Collection<import("./entities/team-space-membership").TeamSpaceMembership> & {
        toPlainObject(): import("./common-types").CollectionProp<TeamSpaceMembershipProps>;
    }>;
    createTeamSpaceMembership: (teamId: string, data: Omit<TeamSpaceMembershipProps, 'sys'>) => Promise<import("./entities/team-space-membership").TeamSpaceMembership>;
    getApiKey: (id: string) => Promise<import("./entities/api-key").ApiKey>;
    getApiKeys: () => Promise<import("./common-types").Collection<import("./entities/api-key").ApiKey> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./entities/api-key").ApiKeyProps>;
    }>;
    getPreviewApiKeys: () => Promise<import("./common-types").Collection<import("./entities/preview-api-key").PreviewApiKeyProps & {
        toPlainObject(): import("./entities/preview-api-key").PreviewApiKeyProps;
    }> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./entities/preview-api-key").PreviewApiKeyProps>;
    }>;
    getPreviewApiKey: (id: string) => Promise<import("./entities/preview-api-key").PreviewApiKeyProps & {
        toPlainObject(): import("./entities/preview-api-key").PreviewApiKeyProps;
    }>;
    createApiKey: (data: CreateApiKeyProps) => Promise<import("./entities/api-key").ApiKey>;
    createApiKeyWithId: (id: string, data: CreateApiKeyProps) => Promise<import("./entities/api-key").ApiKey>;
    getUiExtension: (id: string) => Promise<import("./entities/ui-extension").UIExtension>;
    getUiExtensions: () => Promise<import("./common-types").Collection<import("./entities/ui-extension").UIExtension> & {
        toPlainObject(): import("./common-types").CollectionProp<UIExtensionProps>;
    }>;
    createUiExtension: (data: Omit<UIExtensionProps, 'sys'>) => Promise<import("./entities/ui-extension").UIExtension>;
    createUiExtensionWithId: (id: string, data: Omit<UIExtensionProps, 'sys'>) => Promise<import("./entities/ui-extension").UIExtension>;
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
    getEnvironmentAlias: (id: string) => Promise<{
        update: () => Promise<import("./entities/environment-alias").EnvironmentAlias>;
    } & import("./entities/environment-alias").EnvironmentAliasProps & {
        toPlainObject(): import("./entities/environment-alias").EnvironmentAliasProps;
    }>;
    getEnvironmentAliases: () => Promise<import("./common-types").Collection<{
        update: () => Promise<import("./entities/environment-alias").EnvironmentAlias>;
    } & import("./entities/environment-alias").EnvironmentAliasProps & {
        toPlainObject(): import("./entities/environment-alias").EnvironmentAliasProps;
    }> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./entities/environment-alias").EnvironmentAliasProps>;
    }>;
};
