import type { Except } from 'type-fest'
import type {
  CursorPaginationParams,
  DataTypeDefinition,
  ExoCursorPaginatedCollectionProp,
  ExoMetadataProps,
  ExoQueryFilters,
  Link,
  ResourceLink,
} from '../common-types'
import type {
  ComponentTreeDesignPropertyValue,
  ContentPropertyPointerValue,
  DataAssemblyLink,
  DesignTokenValue,
  DTCGDesignPropertyType,
  ExperienceFragmentNode,
  SlotNode,
} from './exo-common'

// Content property — DataTypeDefinition extended with id, name, required, defaultValue
export type ComponentContentProperty = DataTypeDefinition & {
  id: string
  name: string
  required: boolean
  defaultValue?: unknown
}

// Regexp validation shape for String design properties
export type StringDesignPropertyRegexpValidation = {
  regexp: {
    pattern: string
  }
}

// Allowed resource entry for token-backed design properties
export type DesignTokenAllowedResource = {
  type: 'DesignToken'
  value: string
  name?: string
}

type DesignPropertyCommonFields = {
  id: string
  name: string
  description?: string
}

// String design property — free-text with optional regexp validations
export type StringDesignProperty = DesignPropertyCommonFields & {
  type: 'String'
  fallbackValue?: { type: 'ManualDesignValue'; value: string }
  validations?: StringDesignPropertyRegexpValidation[]
}

// Boolean design property — narrowed fallbackValue to boolean only
export type BooleanDesignProperty = DesignPropertyCommonFields & {
  type: 'Boolean'
  fallbackValue?: { type: 'ManualDesignValue'; value: boolean }
}

// Token-backed design property — DTCG types with optional allowedResources
export type TokenBackedDesignProperty = DesignPropertyCommonFields & {
  type: DTCGDesignPropertyType
  fallbackValue?: DesignTokenValue
  allowedResources?: DesignTokenAllowedResource[]
}

// Discriminated union covering all upstream design property arms
export type ComponentDesignProperty =
  StringDesignProperty | BooleanDesignProperty | TokenBackedDesignProperty

// Component node in a component tree. Slots recurse over the tree nodes.
export type ComponentNode = {
  id: string
  name?: string
  nodeType: 'Component'
  component: ResourceLink<'Contentful:Component'>
  contentProperties: Record<string, ContentPropertyPointerValue | unknown> | string
  designProperties: Record<string, ComponentTreeDesignPropertyValue>
  slots: Record<string, TreeNode[]>
}

// Node in a Component / ExperienceTemplate component tree.
export type TreeNode = ComponentNode | ExperienceFragmentNode | SlotNode

export const COMPONENT_ALLOWED_RESOURCE_SOURCE =
  'crn:contentful:::experience:spaces/$self/environments/$self' as const

// Slot definition
export type ComponentSlotDefinition = {
  id: string
  name: string
  required: boolean
  validations: Array<{ size?: { min?: number; max?: number } }>
  allowedResources?: Array<{
    type: 'Contentful:Component'
    source: typeof COMPONENT_ALLOWED_RESOURCE_SOURCE
    allowedTypes: string[]
  }>
}

// Component sys properties (management API shape).
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
// `componentTree` is required: `null` marks a coded component (no tree), `[]` a composed
// component with an empty tree. Design system source provenance is stored inside `metadata`.
export type ComponentProps = {
  sys: ComponentSys
  name: string
  description: string
  contentProperties: ComponentContentProperty[]
  designProperties: ComponentDesignProperty[]
  componentTree: TreeNode[] | null
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
