import { QueryOptions, MetaSys, MetaSysProps, DefaultElements, Collection } from './generated/common-types'
import { ContentType, ContentTypeProps } from './contentType'
import { Entry, EntryProp } from './entry'
import { Locale, CreateLocaleProps } from './locale'
import { UIExtensionProps, UIExtension } from './uiExtension'
import { Stream } from 'stream'
import { Upload } from './upload'
import { EditorInterface } from './generated/entities/editor-interface'
import { Snapshot } from './snapshot'
import { Asset, AssetProps, AssetFileProp } from './asset'
import { AppInstallation, AppInstallationProps } from './generated/entities/app-installation'

export interface EnvironmentProps {
  name: string
}

export interface ContentfulEnvironmentAPI {
  createAppInstallation(id: string, data: AppInstallationProps): Promise<AppInstallation>
  createAsset(data: AssetProps): Promise<Asset>
  createAssetFromFiles(data: AssetFileProp): Promise<Asset>
  createAssetWithId(id: string, data: AssetProps): Promise<Asset>
  createContentType(data: ContentTypeProps): Promise<ContentType>
  createContentTypeWithId(id: string, data: ContentTypeProps): Promise<ContentType>
  createEntry(contentTypeId: string, data: EntryProp): Promise<Entry>
  createEntryWithId(contentTypeId: string, id: string, data: EntryProp): Promise<Entry>
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
