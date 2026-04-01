import type { CursorPaginationParams, Link, MetadataProps } from '../common-types'
import type { ComponentTypeViewport, DesignPropertyValue, ViewNode } from './component-type'

export type ViewDimensionKeyMap = {
  designProperties: Record<string, { breakpoint: string }>
}

export type ViewContentBindings = {
  sys: {
    type: 'Link'
    id: string
    linkType: 'DataAssembly'
  }
  parameters: Record<string, Link<string>>
}

export type ViewSys = {
  id: string
  type: 'View'
  version: number
  space: Link<'Space'>
  environment: Link<'Environment'>
  componentType: Link<'ComponentType'>
  createdAt?: string
  updatedAt?: string
  createdBy?: Link<'User'>
  updatedBy?: Link<'User'>
  variant?: string
  publishedAt?: string
  publishedVersion?: number
  publishedCounter?: number
  firstPublishedAt?: string
  publishedBy?: Link<'User'> | Link<'AppDefinition'>
  localeStatus?: Record<string, 'draft' | 'published' | 'changed'>
}

type ViewCommonProps = {
  name: string
  description: string
  viewports: ComponentTypeViewport[]
  contentProperties: Record<string, unknown>
  designProperties: Record<string, DesignPropertyValue>
  dimensionKeyMap: ViewDimensionKeyMap
  contentBindings?: ViewContentBindings
  metadata?: Pick<MetadataProps, 'tags'>
  slots?: Record<string, ViewNode[]>
}

export type ViewProps = ViewCommonProps & {
  sys: ViewSys
}

// Query options for getMany - cursor-based pagination with mutual exclusivity
export type ViewQueryOptions = CursorPaginationParams & {
  order?: string
  [key: string]: unknown
}

// Locale-based publish payload — add or remove specific locales.
// Omit the payload entirely for a full publish (all locales).
export type ViewLocalePublishPayload = { add: string[] } | { remove: string[] }

// Create payload — no sys, uses componentTypeId instead of sys.componentType link
export type CreateViewProps = ViewCommonProps & {
  componentTypeId: string
}

export type UpdateViewProps = ViewProps
