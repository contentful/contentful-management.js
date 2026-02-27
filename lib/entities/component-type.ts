/**
 * @module
 * @category Entities
 */
import type { Link, SysLink } from '../common-types'

// Query options for getMany - matches Bridge API contract
/** Query options for retrieving component types. */
export type ComponentTypeQueryOptions = {
  _experienceCtId: string
  skip?: number
  limit?: number
}

// Viewport definition
/** A viewport definition for responsive component rendering. */
export type ComponentTypeViewport = {
  id: string
  query: string
  displayName: string
  previewSize: string
}

// Content property definition
/** A content property definition within a component type. */
export type ComponentTypeContentProperty = {
  id: string
  name: string
  type: string
  required: boolean
}

// Design property validation option
/** A validation option for a design property. */
export type ComponentTypeDesignPropertyValidation = {
  value: string | number | boolean
  name: string
  description?: string
}

// Design property definition
/** A design property definition within a component type. */
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
/** Mapping of design property keys to dimension-specific values. */
export type ComponentTypeDimensionKeyMap = {
  designProperties: Record<string, Record<string, string>>
}

// Content property value types
/** A reference to a content property or content binding value. */
export type ContentPropertyValue = `$contentProperties/${string}` | `$contentBindings/${string}`

// Design property value types
/** A manually specified design value. */
export type ManualDesignValue = {
  type: 'ManualDesignValue'
  value: string | number | boolean | Record<string, unknown>
}

/** A design value referencing a design token. */
export type DesignTokenValue = {
  type: 'DesignValue'
  token: string
}

/** A design property value, either a simple string or responsive design values. */
export type DesignPropertyValue = string | Record<string, ManualDesignValue | DesignTokenValue>

// Tree node types for component tree
/** A component node in a component tree. */
export type ComponentNode = {
  id: string
  nodeType: 'Component'
  componentTypeId: string
  contentProperties: Record<string, ContentPropertyValue>
  designProperties: Record<string, DesignPropertyValue>
  slots: Record<string, TreeNode[]>
  contentBindings?: string
}

/** A view reference node in a component tree. */
export type ViewNode = {
  id: string
  nodeType: 'View'
  viewId: string
}

/** A slot node in a component tree. */
export type SlotNode = {
  id: string
  nodeType: 'Slot'
  slotId: string
}

/** A node in a component tree, either a component, view, or slot. */
export type TreeNode = ComponentNode | ViewNode | SlotNode

// Data type field for content bindings
/** A data type field definition for content bindings. */
export type ComponentTypeDataTypeField = {
  id: string
  name: string
  type: string
  required: boolean
  source?: string
}

// Content bindings definition
/** Content bindings definition linking a component to a data assembly. */
export type ComponentTypeContentBindings = {
  id: string
  type: 'Link'
  linkType: 'DataAssembly'
  required: boolean
  dataType: ComponentTypeDataTypeField[]
}

// Slot definition
/** A slot definition within a component type. */
export type ComponentTypeSlotDefinition = {
  id: string
  name: string
  componentTypeId: string[]
  required: boolean
  validations: unknown[]
}

// ComponentType sys properties (management API shape)
/** System metadata properties of a component type. */
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
/** Properties of a Contentful component type for Experiences. */
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
