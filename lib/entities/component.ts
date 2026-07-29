import type { Except } from 'type-fest'
import type {
  CursorPaginationParams,
  ExoCursorPaginatedCollectionProp,
  ExoMetadataProps,
  ExoQueryFilters,
  Link,
} from '../common-types'
import type {
  ComponentSlotDefinition,
  ComponentTypeContentProperty,
  ComponentTypeDesignProperty,
  ComponentTypeViewport,
  DataAssemblyLink,
  TreeNodeV2,
} from './component-type'

// Component sys properties (management API shape).
// Renamed form of ComponentType: sys.type is 'Component'.
export type ComponentSys = {
  id: string
  type: 'Component'
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

// Main Component props.
// componentTree uses the renamed TreeNodeV2 nodes and slots use ComponentSlotDefinition.
// Unlike ComponentType, there is no top-level `source` field — design system source
// provenance is stored inside `metadata`.
export type ComponentProps = {
  sys: ComponentSys
  name: string
  description: string
  viewports: ComponentTypeViewport[]
  contentProperties: ComponentTypeContentProperty[]
  designProperties: ComponentTypeDesignProperty[]
  componentTree?: TreeNodeV2[]
  slots?: ComponentSlotDefinition[]
  metadata?: ExoMetadataProps
  dataAssemblies?: DataAssemblyLink[]
}

export type CreateComponentProps = Except<ComponentProps, 'sys'>

export type UpsertComponentProps = Except<ComponentProps, 'sys'> & {
  sys: {
    id: string
    type: 'Component'
    version?: number
  }
}

// Query options for getMany - cursor-based pagination with typed filter fields
export type ComponentQueryOptions = CursorPaginationParams &
  ExoQueryFilters & {
    order?: string
  }

export type ComponentCollection = ExoCursorPaginatedCollectionProp<ComponentProps>
