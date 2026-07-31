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
import type { ExperienceContentBindings } from './experience'

// Legacy inline node for Fragment slot trees. The Experience entity has migrated to
// InlineExperienceFragmentNode (see ./experience); Fragment retains the legacy shape.
/**
 * @deprecated Use `InlineExperienceFragmentNode` (see `./experience`) instead.
 * The Fragment entity is superseded by the ExperienceFragment entity.
 */
export type InlineFragmentNode = {
  id: string
  nodeType: 'InlineFragment'
  componentType: ResourceLink<'Contentful:ComponentType'>
  designProperties: Record<string, DimensionedDesignPropertyValue>
  contentBindings?: ExperienceContentBindings
  slots?: Record<string, Array<FragmentNode | InlineFragmentNode>>
}

/**
 * @deprecated Use the ExperienceFragment entity (see `./experience-fragment`) instead.
 * The Fragment endpoint is superseded by the ExperienceFragment endpoint.
 */
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

/**
 * @deprecated Use `ExperienceFragmentProps` (see `./experience-fragment`) instead.
 * The Fragment entity is superseded by the ExperienceFragment entity.
 */
export type FragmentProps = {
  sys: FragmentSys
  name: string
  description: string
  viewports: ComponentTypeViewport[]
  designProperties: Record<string, DimensionedDesignPropertyValue>
  contentBindings?: ExperienceContentBindings
  metadata?: ExperienceMetadataProps
  slots?: Record<string, Array<FragmentNode | InlineFragmentNode>>
}

/**
 * @deprecated Use `CreateExperienceFragmentProps` (see `./experience-fragment`) instead.
 * The Fragment entity is superseded by the ExperienceFragment entity.
 */
export type CreateFragmentProps = Except<FragmentProps, 'sys'> & {
  componentType: ResourceLink<'Contentful:ComponentType'>
}

/**
 * @deprecated Use `UpsertExperienceFragmentProps` (see `./experience-fragment`) instead.
 * The Fragment entity is superseded by the ExperienceFragment entity.
 */
export type UpsertFragmentProps = Omit<FragmentProps, 'sys'> & {
  sys: {
    id: string
    type: 'Fragment'
    version?: number
  }
  componentType?: ResourceLink<'Contentful:ComponentType'>
}

/**
 * @deprecated Use `ExperienceFragmentQueryOptions` (see `./experience-fragment`) instead.
 * The Fragment entity is superseded by the ExperienceFragment entity.
 */
export type FragmentQueryOptions = CursorPaginationParams &
  ExoQueryFilters & {
    order?: string
  }

/**
 * @deprecated Use `ExperienceFragmentCollection` (see `./experience-fragment`) instead.
 * The Fragment entity is superseded by the ExperienceFragment entity.
 */
export type FragmentCollection = ExoCursorPaginatedCollectionProp<FragmentProps>
