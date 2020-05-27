import { MetaSys, MetaSysProps, MetaLinkProps, DefaultElements, Collection } from './generated/common-types'

export interface EntryProp {
  fields: {
    [key: string]: any
  }
}

export interface EntrySys extends MetaSysProps {
  contentType: { sys: MetaLinkProps }
  environment: { sys: MetaLinkProps }
  publishedBy?: { sys: MetaLinkProps }
  publishedVersion?: number
  publishedAt?: string
  firstPublishedAt?: string
  publishedCounter?: number
}

export interface Entry extends EntryProp, DefaultElements<EntryProp & EntrySys>, MetaSys<EntrySys> {
  archive(): Promise<Entry>
  delete(): Promise<void>
  getSnapshot(id: string): Promise<any>
  getSnapshots(): Promise<Collection<any>>
  isArchived(): boolean
  isDraft(): boolean
  isPublished(): boolean
  isUpdated(): boolean
  publish(): Promise<Entry>
  unarchive(): Promise<Entry>
  unpublish(): Promise<Entry>
  update(): Promise<Entry>
}
