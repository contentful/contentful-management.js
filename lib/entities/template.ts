import type { Except } from 'type-fest'
import type {
  CursorPaginationParams,
  ExoCursorPaginatedCollectionProp,
  ExoMetadataProps,
  ExoQueryFilters,
  Link,
} from '../common-types'
import type {
  ComponentTypeContentProperty,
  ComponentTypeDesignProperty,
  ComponentTypeSlotDefinition,
  ComponentTypeViewport,
  DataAssemblyLink,
  TreeNode,
} from './component-type'

// Template sys properties (management API shape)
/**
 * @deprecated Use the ExperienceTemplate entity (see `./experience-template`) instead.
 * The Template endpoint is superseded by the ExperienceTemplate endpoint.
 */
export type TemplateSys = {
  id: string
  type: 'Template'
  version: number
  space: Link<'Space'>
  environment: Link<'Environment'>
  fieldStatus?: Record<string, Record<string, 'draft' | 'published' | 'changed'>>
  publishedAt?: string
  publishedVersion?: number
  publishedCounter?: number
  firstPublishedAt?: string
  publishedBy?: Link<'User'> | Link<'AppDefinition'>
  variant?: string
  variantType?: string
  variantDimension?: string
  createdAt: string
  createdBy: Link<'User'>
  updatedAt: string
  updatedBy: Link<'User'>
}

// Main TemplateProps — config fields are identical to ComponentType (TemplateConfigSchema extends ComponentTypeConfigSchema upstream)
/**
 * @deprecated Use `ExperienceTemplateProps` (see `./experience-template`) instead.
 * The Template entity is superseded by the ExperienceTemplate entity.
 */
export type TemplateProps = {
  sys: TemplateSys
  name: string
  description: string
  viewports: ComponentTypeViewport[]
  contentProperties: ComponentTypeContentProperty[]
  designProperties: ComponentTypeDesignProperty[]
  componentTree?: TreeNode[]
  slots?: ComponentTypeSlotDefinition[]
  metadata?: ExoMetadataProps
  dataAssemblies?: DataAssemblyLink[]
}

/**
 * @deprecated Use `CreateExperienceTemplateProps` (see `./experience-template`) instead.
 * The Template entity is superseded by the ExperienceTemplate entity.
 */
export type CreateTemplateProps = Except<TemplateProps, 'sys'>

/**
 * @deprecated Use `UpsertExperienceTemplateProps` (see `./experience-template`) instead.
 * The Template entity is superseded by the ExperienceTemplate entity.
 */
export type UpsertTemplateProps = Except<TemplateProps, 'sys'> & {
  sys: {
    id: string
    type: 'Template'
    version?: number
  }
}

// Query options for getMany - cursor-based pagination with typed filter fields
/**
 * @deprecated Use `ExperienceTemplateQueryOptions` (see `./experience-template`) instead.
 * The Template entity is superseded by the ExperienceTemplate entity.
 */
export type TemplateQueryOptions = CursorPaginationParams &
  ExoQueryFilters & {
    order?: string
  }

/**
 * @deprecated Use `ExperienceTemplateCollection` (see `./experience-template`) instead.
 * The Template entity is superseded by the ExperienceTemplate entity.
 */
export type TemplateCollection = ExoCursorPaginatedCollectionProp<TemplateProps>
