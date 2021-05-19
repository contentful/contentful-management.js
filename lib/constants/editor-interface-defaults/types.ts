export enum WidgetNamespace {
  BUILTIN = 'builtin',
  EXTENSION = 'extension',
  SIDEBAR_BUILTIN = 'sidebar-builtin',
  APP = 'app',
  EDITOR_BUILTIN = 'editor-builtin',
}

export const DEFAULT_EDITOR_ID = 'default-editor'

export const in_ = <K extends string, O>(key: K, object: O): key is K & keyof O => key in object
