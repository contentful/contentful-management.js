import type {
  CursorPaginationParams,
  ExoCursorPaginatedCollectionProp,
  ExperienceMetadataProps,
  ExoQueryFilters,
  Link,
  ResourceLink,
} from '../common-types'
import type {
  ComponentTypeViewport,
  DimensionedDesignPropertyValue,
  ExperienceFragmentNode,
} from './component-type'

export type ExperienceContentBindings = {
  sys: ResourceLink<'Contentful:DataAssembly'>['sys']
  parameters: Record<string, ResourceLink<string>>
}

export type ExperienceSys = {
  id: string
  type: 'Experience'
  version: number
  space: Link<'Space'>
  environment: Link<'Environment'>
  experienceTemplate: ResourceLink<'Contentful:ExperienceTemplate'>
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
  designProperties: Record<string, DimensionedDesignPropertyValue>
  contentBindings?: ExperienceContentBindings
  metadata?: ExperienceMetadataProps
  slots?: Record<string, Array<ExperienceFragmentNode | InlineExperienceFragmentNode>>
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

export type CreateExperienceProps = ExperienceCommonProps & {
  experienceTemplate: ResourceLink<'Contentful:ExperienceTemplate'>
}

export type UpsertExperienceProps = ExperienceCommonProps & {
  sys: {
    id: string
    type: 'Experience'
    version?: number
  }
  experienceTemplate?: ResourceLink<'Contentful:ExperienceTemplate'>
}

export type InlineExperienceFragmentNode = {
  id: string
  nodeType: 'InlineExperienceFragment'
  component: ResourceLink<'Contentful:Component'>
  designProperties: Record<string, DimensionedDesignPropertyValue>
  contentBindings?: ExperienceContentBindings
  slots?: Record<string, Array<ExperienceFragmentNode | InlineExperienceFragmentNode>>
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
