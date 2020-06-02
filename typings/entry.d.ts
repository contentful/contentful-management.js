import { DefaultElements, Collection } from './generated/types/common-types'
import { EntryProps } from './generated/types/entry'

export interface Entry extends EntryProps, DefaultElements<EntryProps> {
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
