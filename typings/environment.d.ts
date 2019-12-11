import { DefaultElements } from './defaultElements'
import { MetaSys, MetaSysProps } from './meta'
import { QueryOptions } from './queryOptions'
import { Collection } from './collection'
import { ContentType, ContentTypeProps } from './contentType'
import { Entry, EntryProp, KeyValueMap } from './entry'
import { Locale, CreateLocaleProps } from './locale'
import { UIExtensionProps, UIExtension } from './uiExtension'
import { Stream } from 'stream'
import { Upload } from './upload'
import { EditorInterface } from './editorInterface'
import { Snapshot } from './snapshot'
import { Asset, AssetProps, AssetFileProp } from './asset'

export interface EnvironmentProps {
  name: string
}

export interface Environment extends DefaultElements<EnvironmentProps>, MetaSys<MetaSysProps>, EnvironmentProps {

  createAsset(data: AssetProps): Promise<Asset>,
  createAssetFromFiles(data: AssetFileProp): Promise<Asset>,
  createAssetWithId(id: string, data: AssetProps): Promise<Asset>,
  createContentType(data: ContentTypeProps): Promise<ContentType>,
  createContentTypeWithId(id: string, data: ContentTypeProps): Promise<ContentType>,
  createEntry<TFieldType = any>(contentTypeId: string, data: EntryProp): Promise<Entry<TFieldType>>,
  createEntryWithId<TFieldType = any>(contentTypeId: string, id: string, data: EntryProp): Promise<Entry<TFieldType>>,
  createLocale(data: CreateLocaleProps): Promise<Locale>,
  createUiExtension(data: UIExtensionProps): Promise<UIExtension>,
  createUiExtensionWithId(id: string, data: UIExtensionProps): Promise<UIExtension>,
  createUpload(data: {
    file: string | ArrayBuffer | Stream
  }): Promise<Upload>,
  getAsset(id: string, query?: Object): Promise<Asset>,
  getAssets(query?: Object): Promise<Collection<Asset>>,
  getContentTypes(object?: QueryOptions): Promise<Collection<ContentType>>,
  getContentType(id: string): Promise<ContentType>,
  getContentTypeSnapshots(contentTypeId: string, query?: QueryOptions): Promise<Collection<Snapshot<ContentTypeProps>>>,
  getEditorInterfaceForContentType(contentTypeId: string): Promise<EditorInterface>,
  getEntry<TFieldType = KeyValueMap>(id: string): Promise<Entry<TFieldType>>,
  getEntries<TFieldType = KeyValueMap>(object?: QueryOptions): Promise<Collection<Entry<TFieldType>>>,
  getEntrySnapshots(id: string): Promise<Collection<Snapshot<EntryProp>>>,
  getLocale(id: string): Promise<Locale>,
  getLocales(): Promise<Collection<Locale>>,
  getUiExtension(id: string): Promise<UIExtension>,
  getUiExtensions(): Promise<Collection<UIExtension>>,
  getUpload(id: string): Promise<Upload>
}
