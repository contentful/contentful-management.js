import { DefaultElements } from './defaultElements'
import { MetaLinkProps, MetaSys, MetaSysProps } from './meta'
import { Collection } from './collection'

export interface EntryProp<TFields = any> {
  fields: {
    [key: string]: any
  } & TFields
}

export interface EntrySys extends MetaSysProps {
  contentType: { sys: MetaLinkProps },
  environment: { sys: MetaLinkProps },
  publishedBy?: { sys: MetaLinkProps },
  publishedVersion?: number,
  publishedAt?: string,
  firstPublishedAt?: string,
  publishedCounter?: number,
}

export interface Entry<TEntryFields = any>
  extends EntryProp<TEntryFields>,
    DefaultElements<EntryProp & EntrySys>,
    MetaSys<EntrySys> {
  archive<TFieldType = any>(): Promise<Entry<TFieldType>>,
  delete(): Promise<void>,
  getSnapshot(id: string): Promise<any>,
  getSnapshots(): Promise<Collection<any>>,
  isArchived(): boolean,
  isDraft(): boolean,
  isPublished(): boolean,
  isUpdated(): boolean,
  publish<TFieldType = any>(): Promise<Entry<TFieldType>>,
  unarchive<TFieldType = any>(): Promise<Entry<TFieldType>>,
  unpublish<TFieldType = any>(): Promise<Entry<TFieldType>>,
  update<TFieldType = any>(): Promise<Entry<TFieldType>>,
}
