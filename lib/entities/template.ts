import type { Except } from 'type-fest'
import type { CursorPaginationParams, ExoMetadataProps, Link } from '../common-types'
import type {
  ComponentTypeContentProperty,
  ComponentTypeDesignProperty,
  ComponentTypeDimensionKeyMap,
  ComponentTypeSlotDefinition,
  ComponentTypeViewport,
  DataAssemblyLink,
  TreeNode,
} from './component-type'

// Template sys properties (management API shape)
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
export type TemplateProps = {
  sys: TemplateSys
  name: string
  description: string
  viewports: ComponentTypeViewport[]
  contentProperties: ComponentTypeContentProperty[]
  designProperties: ComponentTypeDesignProperty[]
  dimensionKeyMap: ComponentTypeDimensionKeyMap
  componentTree?: TreeNode[]
  slots?: ComponentTypeSlotDefinition[]
  metadata?: ExoMetadataProps
  dataAssemblies?: DataAssemblyLink[]
}

export type CreateTemplateProps = Except<TemplateProps, 'sys'>

export type UpdateTemplateProps = Omit<TemplateProps, 'sys'> & {
  sys: {
    id: string
    type: 'Template'
    version: number
  }
}

// Query options for getMany - cursor-based pagination with filter support
export type TemplateQueryOptions = CursorPaginationParams & {
  order?: string
  [key: string]: unknown
}
