import { MetaSys, MetaSysProps } from './generated/types/common-types'
import { ContentTypeProps } from './generated/types/content-type'
import { EntryProps } from './generated/types/entry'

export interface Snapshot<T extends ContentTypeProps | EntryProps> {
  sys: MetaSys<MetaSysProps & { snapshotType: string; snapshotEntityType: string }>
  snapshot: T & MetaSys<MetaSysProps>
}
