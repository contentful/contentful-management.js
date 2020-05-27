import { ContentFields } from './contentFields'
import { MetaSys, MetaSysProps, DefaultElements, Collection } from './generated/common-types'
import { EditorInterface } from './editorInterface'

export interface ContentTypeProps {
  name: string
  description: string
  displayField: string
  fields: ContentFields[]
}

export interface ContentType
  extends ContentTypeProps,
    MetaSys<MetaSysProps>,
    DefaultElements<ContentTypeProps & MetaSys<MetaSysProps>> {
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
