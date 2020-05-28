import { DefaultElements, Collection } from './generated/types/common-types'
import { EditorInterface } from './editorInterface'
import { ContentTypeProps} from './generated/types/content-type'

export interface ContentType
  extends ContentTypeProps,
    DefaultElements<ContentTypeProps> {
  delete(): Promise<void>
  isDraft(): boolean
  isPublished(): boolean
  isUpdated(): boolean
  omitAndDeleteField(): Promise<ContentType>
  publish(): Promise<ContentType>
  unpublish(): Promise<ContentType>
  update(): Promise<ContentType>
  getEditorInterface(): Promise<EditorInterface>
  getSnapshot(id: string): Promise<any>
  getSnapshots(): Promise<Collection<any>>
}
