import type { Except } from 'type-fest'
import type {
  CursorPaginatedCollectionProp,
  CursorPaginationParams,
  ExoMetadataProps,
  Link,
} from '../common-types'
import type {
  ComponentTypeViewport,
  DimensionedDesignPropertyValue,
  FragmentNode,
} from './component-type'
import type { ExperienceContentBindings, ExperienceDimensionKeyMap, InlineFragmentNode } from './experience'

export type FragmentSys = {
  id: string
  type: 'Fragment'
  version: number
  space: Link<'Space'>
  environment: Link<'Environment'>
  componentType: Link<'ComponentType'>
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
  localeStatus?: Record<string, 'draft' | 'published' | 'changed'>
}

export type FragmentProps = {
  sys: FragmentSys
  name: string
  description: string
  viewports: ComponentTypeViewport[]
  designProperties: Record<string, DimensionedDesignPropertyValue>
  dimensionKeyMap: ExperienceDimensionKeyMap
  contentBindings?: ExperienceContentBindings
  metadata?: ExoMetadataProps
  slots?: Record<string, Array<FragmentNode | InlineFragmentNode>>
}

export type CreateFragmentProps = Except<FragmentProps, 'sys'> & {
  componentTypeId: string
}

export type UpdateFragmentProps = Omit<FragmentProps, 'sys'> & {
  sys: {
    id: string
    type: 'Fragment'
    version: number
  }
  componentTypeId: string
}

export type FragmentQueryOptions = CursorPaginationParams & {
  order?: string
  [key: string]: unknown
}

export type FragmentCollection = CursorPaginatedCollectionProp<FragmentProps>
