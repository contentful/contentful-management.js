import { DefaultElements } from './defaultElements'
import { MetaLinkProps, MetaSys, MetaSysProps } from './meta'
import { Collection } from './collection'

export interface EntryProp<TFields = {
  [key: string]: any
}> {
  fields: TFields
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
  archive<TFieldType = {}>(): Promise<Entry<TFieldType>>,
  delete(): Promise<void>,
  getSnapshot(id: string): Promise<any>,
  getSnapshots(): Promise<Collection<any>>,
  isArchived(): boolean,
  isDraft(): boolean,
  isPublished(): boolean,
  isUpdated(): boolean,
  publish<TFieldType = {}>(): Promise<Entry<TFieldType>>,
  unarchive<TFieldType = {}>(): Promise<Entry<TFieldType>>,
  unpublish<TFieldType = {}>(): Promise<Entry<TFieldType>>,
  update<TFieldType = {}>(): Promise<Entry<TFieldType>>,
}
