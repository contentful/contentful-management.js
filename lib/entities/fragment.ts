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
  FragmentNode,
} from './component-type'
import type {
  ExperienceContentBindings,
  ExperienceDimensionKeyMap,
  InlineFragmentNode,
} from './experience'

export type FragmentSys = {
  id: string
  type: 'Fragment'
  version: number
  space: Link<'Space'>
  environment: Link<'Environment'>
  componentType: ResourceLink<'Contentful:ComponentType'>
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

export type FragmentProps = {
  sys: FragmentSys
  name: string
  description: string
  viewports: ComponentTypeViewport[]
  designProperties: Record<string, DimensionedDesignPropertyValue>
  dimensionKeyMap: ExperienceDimensionKeyMap
  contentBindings?: ExperienceContentBindings
  metadata?: ExperienceMetadataProps
  slots?: Record<string, Array<FragmentNode | InlineFragmentNode>>
}

export type CreateFragmentProps = Except<FragmentProps, 'sys'> & {
  componentType: ResourceLink<'Contentful:ComponentType'>
}

export type UpsertFragmentProps = Omit<FragmentProps, 'sys'> & {
  sys: {
    id: string
    type: 'Fragment'
    version: number
  }
  componentType?: ResourceLink<'Contentful:ComponentType'>
}

export type FragmentQueryOptions = CursorPaginationParams &
  ExoQueryFilters & {
    order?: string
  }

export type FragmentCollection = ExoCursorPaginatedCollectionProp<FragmentProps>
