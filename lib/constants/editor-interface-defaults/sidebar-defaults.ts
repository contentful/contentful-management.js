import { WidgetNamespace } from './types'

const SidebarWidgetTypes = {
  USERS: 'users-widget',
  CONTENT_PREVIEW: 'content-preview-widget',
  TRANSLATION: 'translation-widget',
  INCOMING_LINKS: 'incoming-links-widget',
  PUBLICATION: 'publication-widget',
  RELEASES: 'releases-widget',
  VERSIONS: 'versions-widget',
  INFO_PANEL: 'info-panel',
  JOBS: 'jobs-widget',
  COMMENTS_PANEL: 'comments-panel',
}

const Publication = {
  widgetId: SidebarWidgetTypes.PUBLICATION,
  widgetNamespace: WidgetNamespace.SIDEBAR_BUILTIN,
  name: 'Publish & Status',
  description: 'Built-in - View entry status, publish, etc.',
}

const Releases = {
  widgetId: SidebarWidgetTypes.RELEASES,
  widgetNamespace: WidgetNamespace.SIDEBAR_BUILTIN,
  name: 'Release',
  description: 'Built-in - View release, add to it, etc.',
}

const ContentPreview = {
  widgetId: SidebarWidgetTypes.CONTENT_PREVIEW,
  widgetNamespace: WidgetNamespace.SIDEBAR_BUILTIN,
  name: 'Preview',
  description: 'Built-in - Displays preview functionality.',
}

const Links = {
  widgetId: SidebarWidgetTypes.INCOMING_LINKS,
  widgetNamespace: WidgetNamespace.SIDEBAR_BUILTIN,
  name: 'Links',
  description: 'Built-in - Shows where an entry is linked.',
}

const Translation = {
  widgetId: SidebarWidgetTypes.TRANSLATION,
  widgetNamespace: WidgetNamespace.SIDEBAR_BUILTIN,
  name: 'Translation',
  description: 'Built-in - Manage which translations are visible.',
}

const Versions = {
  widgetId: SidebarWidgetTypes.VERSIONS,
  widgetNamespace: WidgetNamespace.SIDEBAR_BUILTIN,
  name: 'Versions',
  description:
    'Built-in - View previously published versions. Available only for master environment.',
}

const Users = {
  widgetId: SidebarWidgetTypes.USERS,
  widgetNamespace: WidgetNamespace.SIDEBAR_BUILTIN,
  name: 'Users',
  description: 'Built-in - Displays users on the same entry.',
}

export const SidebarEntryConfiguration = [
  Publication,
  Releases,
  ContentPreview,
  Links,
  Translation,
  Versions,
  Users,
]

export const SidebarAssetConfiguration = [Publication, Releases, Links, Translation, Users]
