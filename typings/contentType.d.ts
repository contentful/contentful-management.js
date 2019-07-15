import { Fields } from './fields'
import { MetaSys, MetaSysProps } from './meta'
import { DefaultElements } from './defaultElements'
import { Collection } from './collection'

export interface ContentTypeProps {
  name: string,
  description: string,
  displayField: string,
  fields: Fields[],
}

export interface ContentType
  extends ContentTypeProps,
    MetaSys<MetaSysProps>,
    DefaultElements<ContentTypeProps & MetaSysProps> {
  delete(): Promise<void>,
  isDraft(): boolean,
  isPublished(): boolean,
  isUpdated(): boolean,
  omitAndDeleteField(): Promise<ContentType>,
  publish(): Promise<ContentType>,
  unpublish(): Promise<ContentType>,
  update(): Promise<ContentType>,

  // TODO: Handle these one correctly!
  getEditorInterface(): Promise<any>,
  getSnapshot(id: string): Promise<any>,
  getSnapshots(): Promise<Collection<any>>,
}
