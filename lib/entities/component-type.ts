import type { Except } from 'type-fest'
import type { CursorPaginatedCollectionProp, CursorPaginationParams, ExoMetadataProps, Link } from '../common-types'

// Query options for getMany - cursor-based pagination with mutual exclusivity & query filters
export type ComponentTypeQueryOptions = CursorPaginationParams & {
  order?: string
  [key: string]: unknown
}

// Viewport definition
export type ComponentTypeViewport = {
  id: string
  query: string
  displayName: string
  previewSize: string
}

// Content property definition
export type ComponentTypeContentProperty = {
  id: string
  name: string
  type: string
  required: boolean
  defaultValue?: unknown
}

// Design property validation option
export type ComponentTypeDesignPropertyValidation =
  | {
      type: 'ManualDesignValue'
      value: string | number | boolean
      name?: string
    }
  | {
      type: 'DesignToken'
      value: string
      name?: string
    }

// Design property definition
export type ComponentTypeDesignProperty = {
  id: string
  name: string
  type: 'Symbol' | 'Number' | 'Boolean'
  required: boolean
  description?: string
  defaultValue?: DesignPropertyDefinitionValue
  validations?: {
    in?: ComponentTypeDesignPropertyValidation[]
  }
  designTokenSet: string[]
}

// Dimension key map
export type ComponentTypeDimensionKeyMap = {
  designProperties: Record<string, Record<string, string>>
}

// Content property pointer value types
export type ContentPropertyPointerValue = `$contentProperties/${string}`

// Design property pointer value types
export type DesignPropertyPointerValue = `$designProperties/${string}`

// Design property value types
export type ManualDesignValue = {
  type: 'ManualDesignValue'
  value: string | number | boolean
}

export type DesignTokenValue = {
  type: 'DesignToken'
  /** Must be non-empty (min length 1) */
  value: string
}

// For designProperties[].defaultValue (definition level)
// Upstream: DesignPropertyValueSchema (schema line 86-91)
export type DesignPropertyDefinitionValue = ManualDesignValue | DesignTokenValue

// For componentTree node designProperties (tree-node level)
// Upstream: ComponentTreeDesignPropertyValueSchema (schema line 101-104)
export type DesignPropertyValue =
  | ManualDesignValue
  | DesignTokenValue
  | DesignPropertyPointerValue
  | Record<string, ManualDesignValue | DesignTokenValue | DesignPropertyPointerValue>

export type DimensionedDesignPropertyValue = Record<string, DesignPropertyValue>

// Tree node types for component tree
export type ComponentNode = {
  id: string
  name?: string
  nodeType: 'Component'
  componentTypeId: string
  contentProperties: Record<string, ContentPropertyPointerValue | unknown> | string
  designProperties: Record<string, DesignPropertyValue>
  slots: Record<string, TreeNode[]>
  contentBindings?: string
}

export type FragmentNode = {
  id: string
  name?: string
  nodeType: 'Fragment'
  fragmentId: string
}

export type SlotNode = {
  id: string
  name?: string
  nodeType: 'Slot'
  slotId: string
}

export type TreeNode = ComponentNode | FragmentNode | SlotNode

// Data type field for content bindings
export type ComponentTypeDataTypeField = {
  id: string
  name: string
  type: string
  required: boolean
  source?: string
}

// DataAssembly link type
export type DataAssemblyLink = Link<'DataAssembly'>

// Content bindings definition
export type ComponentTypeContentBindings = DataAssemblyLink['sys'] & {
  required: boolean
  dataType: ComponentTypeDataTypeField[]
}

// Slot definition
export type ComponentTypeSlotDefinition = {
  id: string
  name: string
  componentTypeId: string[]
  required: boolean
  validations: unknown[]
}

// ComponentType sys properties (management API shape)
export type ComponentTypeSys = {
  id: string
  type: 'ComponentType'
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

// Main ComponentType props
export type ComponentTypeProps = {
  sys: ComponentTypeSys
  name: string
  description: string
  viewports: ComponentTypeViewport[]
  contentProperties: ComponentTypeContentProperty[]
  designProperties: ComponentTypeDesignProperty[]
  dimensionKeyMap: ComponentTypeDimensionKeyMap
  componentTree?: TreeNode[]
  contentBindings?: ComponentTypeContentBindings
  slots?: ComponentTypeSlotDefinition[]
  metadata?: ExoMetadataProps
  dataAssemblies?: DataAssemblyLink[]
}

export type CreateComponentTypeProps = Except<ComponentTypeProps, 'sys'>

export type UpdateComponentTypeProps = ComponentTypeProps

export type ComponentTypeCollection = CursorPaginatedCollectionProp<ComponentTypeProps>
