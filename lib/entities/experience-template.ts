import type { Except } from 'type-fest'
import type {
  CursorPaginationParams,
  ExoCursorPaginatedCollectionProp,
  ExoMetadataProps,
  ExoQueryFilters,
  Link,
} from '../common-types'
import type {
  ComponentContentProperty,
  ComponentDesignProperty,
  ComponentSlotDefinition,
  TreeNode,
} from './component'
import type { DataAssemblyLink } from './exo-common'

// ExperienceTemplate sys properties (management API shape).
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

// `componentTree` is required: `null` marks a coded template (no tree), `[]` a composed
// template with an empty tree.
export type ExperienceTemplateProps = {
  sys: ExperienceTemplateSys
  name: string
  description: string
  contentProperties: ComponentContentProperty[]
  designProperties: ComponentDesignProperty[]
  componentTree: TreeNode[] | null
  slots?: ComponentSlotDefinition[]
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

export type ExperienceTemplateCollection = ExoCursorPaginatedCollectionProp<ExperienceTemplateProps>
