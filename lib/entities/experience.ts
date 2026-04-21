import type { CursorPaginationParams, Link, MetadataProps } from '../common-types'
import type { ComponentTypeViewport, DesignPropertyValue, FragmentNode } from './component-type'

export type ExperienceDimensionKeyMap = {
  designProperties: Record<string, { breakpoint: string }>
}

export type ExperienceContentBindings = {
  sys: {
    type: 'Link'
    id: string
    linkType: 'DataAssembly'
  }
  parameters: Record<string, Link<string>>
}

export type ExperienceSys = {
  id: string
  type: 'Experience'
  version: number
  space: Link<'Space'>
  environment: Link<'Environment'>
  componentType: Link<'ComponentType'>
  template?: Link<'Template'>
  createdAt?: string
  updatedAt?: string
  createdBy?: Link<'User'>
  updatedBy?: Link<'User'>
  variant?: string
  variantType?: string
  variantDimension?: string
  publishedAt?: string
  publishedVersion?: number
  publishedCounter?: number
  firstPublishedAt?: string
  publishedBy?: Link<'User'> | Link<'AppDefinition'>
  localeStatus?: Record<string, 'draft' | 'published' | 'changed'>
}

type ExperienceCommonProps = {
  name: string
  description: string
  viewports: ComponentTypeViewport[]
  contentProperties: Record<string, unknown>
  designProperties: Record<string, DesignPropertyValue>
  dimensionKeyMap: ExperienceDimensionKeyMap
  contentBindings?: ExperienceContentBindings
  metadata?: Pick<MetadataProps, 'tags'>
  slots?: Record<string, Array<FragmentNode | InlineFragmentNode>>
}

export type ExperienceProps = ExperienceCommonProps & {
  sys: ExperienceSys
}

// Query options for getMany - cursor-based pagination with mutual exclusivity
export type ExperienceQueryOptions = CursorPaginationParams & {
  order?: string
  [key: string]: unknown
}

// Locale-based publish payload — add or remove specific locales.
// Omit the payload entirely for a full publish (all locales).
export type ExperienceLocalePublishPayload = { add: string[] } | { remove: string[] }

// Create payload — no sys, uses componentTypeId instead of sys.componentType link
export type CreateExperienceProps = ExperienceCommonProps & {
  componentTypeId: string
}

export type UpdateExperienceProps = ExperienceProps

export type InlineFragmentNode = {
  id: string
  nodeType: 'InlineFragment'
  componentTypeId: string
  designProperties: Record<string, DesignPropertyValue>
  contentBindings?: ExperienceContentBindings
  slots?: Record<string, Array<FragmentNode | InlineFragmentNode>>
}
