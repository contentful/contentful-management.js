import type { Link, SysLink } from '../common-types'

// Query options for getMany - matches Bridge API contract
export type ComponentTypeQueryOptions = {
  _experienceCtId: string
  skip?: number
  limit?: number
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
}

// Design property validation option
export type ComponentTypeDesignPropertyValidation = {
  value: string | number | boolean
  name: string
  description?: string
}

// Design property definition
export type ComponentTypeDesignProperty = {
  id: string
  name: string
  type: string
  required: boolean
  description?: string
  defaultValue?: unknown
  validations?: {
    in: ComponentTypeDesignPropertyValidation[]
  }
  designTokenSet?: string[]
}

// Dimension key map
export type ComponentTypeDimensionKeyMap = {
  designProperties: Record<string, Record<string, string>>
}

// Content property value types
export type ContentPropertyValue = `$contentProperties/${string}` | `$contentBindings/${string}`

// Design property value types
export type ManualDesignValue = {
  type: 'ManualDesignValue'
  value: string | number | boolean | Record<string, unknown>
}

export type DesignTokenValue = {
  type: 'DesignValue'
  token: string
}

export type DesignPropertyValue = string | Record<string, ManualDesignValue | DesignTokenValue>

// Tree node types for component tree
export type ComponentNode = {
  id: string
  nodeType: 'Component'
  componentTypeId: string
  contentProperties: Record<string, ContentPropertyValue>
  designProperties: Record<string, DesignPropertyValue>
  slots: Record<string, TreeNode[]>
  contentBindings?: string
}

export type ViewNode = {
  id: string
  nodeType: 'View'
  viewId: string
}

export type SlotNode = {
  id: string
  nodeType: 'Slot'
  slotId: string
}

export type TreeNode = ComponentNode | ViewNode | SlotNode

// Data type field for content bindings
export type ComponentTypeDataTypeField = {
  id: string
  name: string
  type: string
  required: boolean
  source?: string
}

// Content bindings definition
export type ComponentTypeContentBindings = {
  id: string
  type: 'Link'
  linkType: 'DataAssembly'
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
  space: SysLink
  environment: SysLink
  fieldStatus?: Record<string, Record<string, 'draft' | 'published' | 'changed'>>
  publishedAt?: string
  publishedVersion?: number
  publishedCounter?: number
  firstPublishedAt?: string
  publishedBy?: Link<'User'> | Link<'AppDefinition'>
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
}
