import { DEFAULT_EDITOR_ID, WidgetNamespace } from './types'

export const EntryEditorWidgetTypes = {
  DEFAULT_EDITOR: {
    name: 'Editor',
    id: DEFAULT_EDITOR_ID,
    icon: 'Entry',
  },
  REFERENCE_TREE: {
    name: 'References',
    id: 'reference-tree',
    icon: 'References',
  },
  TAGS_EDITOR: {
    name: 'Tags',
    id: 'tags-editor',
    icon: 'Tags',
  },
};

const DefaultEntryEditor = {
  widgetId: EntryEditorWidgetTypes.DEFAULT_EDITOR.id,
  widgetNamespace: WidgetNamespace.EDITOR_BUILTIN,
  name: EntryEditorWidgetTypes.DEFAULT_EDITOR.name,
};

const ReferencesEntryEditor = {
  widgetId: EntryEditorWidgetTypes.REFERENCE_TREE.id,
  widgetNamespace: WidgetNamespace.EDITOR_BUILTIN,
  name: EntryEditorWidgetTypes.REFERENCE_TREE.name,
};

const TagsEditor = {
  widgetId: EntryEditorWidgetTypes.TAGS_EDITOR.id,
  widgetNamespace: WidgetNamespace.EDITOR_BUILTIN,
  name: EntryEditorWidgetTypes.TAGS_EDITOR.name,
};

export const EntryConfiguration = [DefaultEntryEditor, ReferencesEntryEditor, TagsEditor];