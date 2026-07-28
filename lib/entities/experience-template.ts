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
  ExperienceTreeNode,
} from './component-type'

// ExperienceTemplate sys properties (management API shape).
// Renamed form of Template: sys.type is 'ExperienceTemplate'.
export type ExperienceTemplateSys = {
  id: string
  type: 'ExperienceTemplate'
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

// componentTree uses the renamed ExperienceTreeNode nodes.
export type ExperienceTemplateProps = {
  sys: ExperienceTemplateSys
  name: string
  description: string
  viewports: ComponentTypeViewport[]
  contentProperties: ComponentTypeContentProperty[]
  designProperties: ComponentTypeDesignProperty[]
  componentTree?: ExperienceTreeNode[]
  slots?: ComponentTypeSlotDefinition[]
  metadata?: ExoMetadataProps
  dataAssemblies?: DataAssemblyLink[]
}

export type CreateExperienceTemplateProps = Except<ExperienceTemplateProps, 'sys'>

export type UpsertExperienceTemplateProps = Except<ExperienceTemplateProps, 'sys'> & {
  sys: {
    id: string
    type: 'ExperienceTemplate'
    version?: number
  }
}

// Query options for getMany - cursor-based pagination with typed filter fields
export type ExperienceTemplateQueryOptions = CursorPaginationParams &
  ExoQueryFilters & {
    order?: string
  }

export type ExperienceTemplateCollection =
  ExoCursorPaginatedCollectionProp<ExperienceTemplateProps>
