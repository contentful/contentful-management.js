import { DefaultElements } from './defaultElements'
import { MetaLinkProps, MetaSys, MetaSysProps } from './meta'
import { Collection } from './collection'

type KeyValueMap = Record<string, any>;
export interface EntryProp<TFields = KeyValueMap> {
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

export interface Entry<TEntryFields = KeyValueMap>
  extends EntryProp<TEntryFields>,
  DefaultElements<EntryProp<TEntryFields> & EntrySys>,
      MetaSys<EntrySys> {
  archive<TEntryField>(): Promise<Entry<TEntryField>>,
  delete(): Promise<void>,
  getSnapshot(id: string): Promise<any>,
  getSnapshots(): Promise<Collection<any>>,
  isArchived(): boolean,
  isDraft(): boolean,
  isPublished(): boolean,
  isUpdated(): boolean,
  publish<TEntryField>(): Promise<Entry<TEntryField>>,
  unarchive<TEntryField>(): Promise<Entry<TEntryField>>,
  unpublish<TEntryField>(): Promise<Entry<TEntryField>>,
  update<TEntryField>(): Promise<Entry<TEntryField>>,
}
