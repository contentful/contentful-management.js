import type {
  CursorPaginationParams,
  ExoCursorPaginatedCollectionProp,
  ExperienceMetadataProps,
  ExoQueryFilters,
  Link,
} from '../common-types'
import type {
  ComponentTypeViewport,
  DimensionedDesignPropertyValue,
  FragmentNode,
} from './component-type'

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
  componentType?: Link<'ComponentType'>
  template?: Link<'Template'>
  createdAt: string
  updatedAt: string
  createdBy: Link<'User'>
  updatedBy: Link<'User'>
  archivedAt?: string
  archivedBy?: Link<'User'>
  archivedVersion?: number
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
  designProperties: Record<string, DimensionedDesignPropertyValue>
  dimensionKeyMap: ExperienceDimensionKeyMap
  contentBindings?: ExperienceContentBindings
  metadata?: ExperienceMetadataProps
  slots?: Record<string, Array<FragmentNode | InlineFragmentNode>>
}

export type ExperienceProps = ExperienceCommonProps & {
  sys: ExperienceSys
}

// Query options for getMany - cursor-based pagination with typed filter fields
export type ExperienceQueryOptions = CursorPaginationParams &
  ExoQueryFilters & {
    order?: string
  }

// Locale-based publish payload — add or remove specific locales.
// Omit the payload entirely for a full publish (all locales).
export type ExperienceLocalePublishPayload = { add: string[] } | { remove: string[] }

// Create payload — no sys, uses either componentTypeId (component-type-backed) or
// templateId (template-backed). The two fields are mutually exclusive.
export type CreateExperienceProps = ExperienceCommonProps &
  (
    | { componentTypeId: string; templateId?: never }
    | { templateId: string; componentTypeId?: never }
  )

export type ExperienceUpsertProps = ExperienceCommonProps & {
  templateId?: string
}

export type InlineFragmentNode = {
  id: string
  nodeType: 'InlineFragment'
  componentTypeId: string
  designProperties: Record<string, DimensionedDesignPropertyValue>
  contentBindings?: ExperienceContentBindings
  slots?: Record<string, Array<FragmentNode | InlineFragmentNode>>
}

export type ExperienceCollection = ExoCursorPaginatedCollectionProp<ExperienceProps>

export type ReleaseExperienceSys = Omit<
  ExperienceSys,
  'variant' | 'variantType' | 'variantDimension'
> & {
  release: Link<'Release'>
}

export type ReleaseExperience = Omit<ExperienceProps, 'sys'> & {
  sys: ReleaseExperienceSys
}

export type ReleaseExperienceCollection = ExoCursorPaginatedCollectionProp<ReleaseExperience>
