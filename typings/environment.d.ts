import { QueryOptions, MetaSys, MetaSysProps, DefaultElements, Collection } from './generated/common-types'
import { ContentType, ContentTypeProps } from './generated/entities/content-type'
import { Entry, EntryProp } from './generated/entities/entry'
import { Locale, CreateLocaleProps } from './generated/entities/locale'
import { UIExtensionProps, UIExtension } from './generated/entities/ui-extension'
import { Stream } from 'stream'
import { Upload } from './generated/entities/upload'
import { EditorInterface } from './generated/entities/editor-interface'
import { Snapshot } from './generated/entities/snapshot'
import { Asset, AssetProps, AssetFileProp } from './generated/entities/asset'
import { AppInstallation, AppInstallationProps } from './generated/entities/app-installation'

export interface EnvironmentProps {
  name: string
}

export interface ContentfulEnvironmentAPI {
  createAppInstallation(id: string, data: AppInstallationProps): Promise<AppInstallation>
  createAsset(data: Omit<AssetProps, 'sys'>): Promise<Asset>
  createAssetFromFiles(data: Omit<AssetFileProp, 'sys'>): Promise<Asset>
  createAssetWithId(id: string, data: Omit<AssetProps, 'sys'>): Promise<Asset>
  createContentType(data: Omit<ContentTypeProps, 'sys'>): Promise<ContentType>
  createContentTypeWithId(id: string, data: Omit<ContentTypeProps, 'sys'>): Promise<ContentType>
  createEntry(contentTypeId: string, data: Omit<EntryProp, 'sys'>): Promise<Entry>
  createEntryWithId(contentTypeId: string, id: string, data: Omit<EntryProp, 'sys'>): Promise<Entry>
  createLocale(data: CreateLocaleProps): Promise<Locale>
  createUiExtension(data: UIExtensionProps): Promise<UIExtension>
  createUiExtensionWithId(id: string, data: UIExtensionProps): Promise<UIExtension>
  createUpload(data: { file: string | ArrayBuffer | Stream }): Promise<Upload>
  delete(): Promise<{}>
  getAsset(id: string, query?: Record<string, any>): Promise<Asset>
  getAssets(query?: Record<string, any>): Promise<Collection<Asset>>
  getContentTypes(object?: QueryOptions): Promise<Collection<ContentType>>
  getContentType(id: string): Promise<ContentType>
  getContentTypeSnapshots(
    contentTypeId: string,
    query?: QueryOptions
  ): Promise<Collection<Snapshot<ContentTypeProps>>>
  getEditorInterfaceForContentType(contentTypeId: string): Promise<EditorInterface>
  getEntry(id: string): Promise<Entry>
  getEntries(object?: QueryOptions): Promise<Collection<Entry>>
  getEntrySnapshots(id: string): Promise<Collection<Snapshot<EntryProp>>>
  getLocale(id: string): Promise<Locale>
  getLocales(): Promise<Collection<Locale>>
  getUiExtension(id: string): Promise<UIExtension>
  getUiExtensions(): Promise<Collection<UIExtension>>
  getAppInstallation(id: string): Promise<AppInstallation>
  getAppInstallations(): Promise<Collection<AppInstallation>>
  getUpload(id: string): Promise<Upload>
}

export interface Environment
  extends EnvironmentProps,
    ContentfulEnvironmentAPI,
    DefaultElements<EnvironmentProps & MetaSys>,
    MetaSys<MetaSysProps> {}
