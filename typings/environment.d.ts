import { DefaultElements } from './defaultElements'
import { MetaSys, MetaSysProps } from './meta'
import { Search } from './search'
import { Collection } from './collection'
import { ContentType } from './contentType'
import { Entry, EntryProp } from './entry'
import { Locale, CreateLocaleProps } from './locale'
import { UIExtensionProps, UIExtension } from './uiExtension'

export interface EnvironmentProps {
  name: string
}

export interface Environment extends DefaultElements<EnvironmentProps>, MetaSys<MetaSysProps>, EnvironmentProps {
  getContentTypes(object?: Search): Promise<Collection<ContentType>>,
  getContentType(id: string): Promise<ContentType>,
  getEntry(id: string): Promise<Entry>,
  getEntries(object?: Search): Promise<Collection<Entry>>,
  createEntry(contentTypeId: string, data: EntryProp): Promise<Entry>,
  createEntryWithId(contentTypeId: string, id: string, data: EntryProp): Promise<Entry>,
  createLocale(data: CreateLocaleProps): Promise<Locale>,
  createUiExtension(data: UIExtensionProps): Promise<UIExtension>,
  createUiExtensionWithId(id: string, data: UIExtensionProps): Promise<UIExtension>,
}
