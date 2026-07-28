import type { Except } from 'type-fest'
import type {
  CursorPaginationParams,
  ExoCursorPaginatedCollectionProp,
  ExoQueryFilters,
  ExperienceMetadataProps,
  Link,
  ResourceLink,
} from '../common-types'
import type {
  ComponentTypeViewport,
  DimensionedDesignPropertyValue,
  ExperienceFragmentNode,
} from './component-type'
import type { ExperienceContentBindings, InlineExperienceFragmentNode } from './experience'

export type ExperienceFragmentSys = {
  id: string
  type: 'ExperienceFragment'
  version: number
  space: Link<'Space'>
  environment: Link<'Environment'>
  component: ResourceLink<'Contentful:Component'>
  archivedAt?: string
  archivedBy?: Link<'User'>
  archivedVersion?: number
  createdAt: string
  updatedAt: string
  createdBy: Link<'User'>
  updatedBy: Link<'User'>
  variant?: string
  variantType?: string
  variantDimension?: string
  publishedAt?: string
  publishedVersion?: number
  publishedCounter?: number
  firstPublishedAt?: string
  publishedBy?: Link<'User'> | Link<'AppDefinition'>
}

export type ExperienceFragmentProps = {
  sys: ExperienceFragmentSys
  name: string
  description: string
  viewports: ComponentTypeViewport[]
  designProperties: Record<string, DimensionedDesignPropertyValue>
  contentBindings?: ExperienceContentBindings
  metadata?: ExperienceMetadataProps
  slots?: Record<string, Array<ExperienceFragmentNode | InlineExperienceFragmentNode>>
}

export type CreateExperienceFragmentProps = Except<ExperienceFragmentProps, 'sys'> & {
  component: ResourceLink<'Contentful:Component'>
}

export type UpsertExperienceFragmentProps = Omit<ExperienceFragmentProps, 'sys'> & {
  sys: {
    id: string
    type: 'ExperienceFragment'
    version?: number
  }
  component?: ResourceLink<'Contentful:Component'>
}

export type ExperienceFragmentQueryOptions = CursorPaginationParams &
  ExoQueryFilters & {
    order?: string
  }

export type ExperienceFragmentCollection =
  ExoCursorPaginatedCollectionProp<ExperienceFragmentProps>
