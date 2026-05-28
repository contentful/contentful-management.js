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

// Query options for getMany - cursor-based pagination with typed filter fields
export type ComponentTypeQueryOptions = CursorPaginationParams &
  ExoQueryFilters & {
    order?: string
  }

// Viewport definition
export type ComponentTypeViewport = {
  id: string
  query: string
  displayName: string
  previewSize: string
}

// Content property — DataTypeDefinition extended with id, name, required, defaultValue
export type ComponentTypeContentProperty = DataTypeDefinition & {
  id: string
  name: string
  required: boolean
  defaultValue?: unknown
}

// Validation entry for legacy design property validations.in
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

// DTCG token type literals
export type DTCGDesignPropertyType =
  | 'DTCG.Color'
  | 'DTCG.Dimension'
  | 'DTCG.FontFamily'
  | 'DTCG.FontWeight'
  | 'DTCG.Duration'
  | 'DTCG.CubicBezier'
  | 'DTCG.Number'
  | 'DTCG.StrokeStyle'
  | 'DTCG.Border'
  | 'DTCG.Transition'
  | 'DTCG.Shadow'
  | 'DTCG.Gradient'
  | 'DTCG.Typography'

type DesignPropertyCommonFields = {
  id: string
  name: string
  required: boolean
  description?: string
}

// Legacy design property — Symbol, Number, Boolean
export type LegacyDesignProperty = DesignPropertyCommonFields & {
  type: 'Symbol' | 'Number' | 'Boolean'
  defaultValue?: DesignPropertyDefinitionValue
  validations?: {
    in?: ComponentTypeDesignPropertyValidation[]
  }
}

// String design property — free-text with optional regexp validations
export type StringDesignProperty = DesignPropertyCommonFields & {
  type: 'String'
  defaultValue?: { type: 'ManualDesignValue'; value: string }
  validations?: StringDesignPropertyRegexpValidation[]
}

// Token-backed design property — DTCG types with optional allowedResources
export type TokenBackedDesignProperty = DesignPropertyCommonFields & {
  type: DTCGDesignPropertyType
  defaultValue?: DesignTokenValue
  allowedResources?: DesignTokenAllowedResource[]
}

// Discriminated union covering all three upstream arms
export type ComponentTypeDesignProperty =
  | LegacyDesignProperty
  | StringDesignProperty
  | TokenBackedDesignProperty

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

export type DesignPropertyDefinitionValue = ManualDesignValue | DesignTokenValue

export type DesignPropertyValue = ManualDesignValue | DesignTokenValue

export type DimensionedDesignPropertyValue = Record<string, DesignPropertyValue>

export type ComponentTreeDesignPropertyValue =
  | DesignPropertyValue
  | DesignPropertyPointerValue
  | DimensionedDesignPropertyValue

// Tree node types for component tree
export type ComponentNode = {
  id: string
  name?: string
  nodeType: 'Component'
  componentType: ResourceLink<'Contentful:ComponentType'>
  contentProperties: Record<string, ContentPropertyPointerValue | unknown> | string
  designProperties: Record<string, ComponentTreeDesignPropertyValue>
  slots: Record<string, TreeNode[]>
}

export type FragmentNode = {
  id: string
  name?: string
  nodeType: 'Fragment'
  fragment: ResourceLink<'Contentful:Fragment'>
}

export type SlotNode = {
  id: string
  nodeType: 'Slot'
  slotId: string
}

export type TreeNode = ComponentNode | FragmentNode | SlotNode

// DataAssembly link type
export type DataAssemblyLink = ResourceLink<'Contentful:DataAssembly'>

// Slot definition
export type ComponentTypeSlotDefinition = {
  id: string
  name: string
  required: boolean
  validations: Array<{ size?: { min?: number; max?: number } }>
  allowedResources?: Array<{
    type: 'Contentful:ComponentType'
    source: string
    allowedTypes: string[]
  }>
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
  slots?: ComponentTypeSlotDefinition[]
  metadata?: ExoMetadataProps
  dataAssemblies?: DataAssemblyLink[]
  source?: ResourceLink<'Contentful:DesignSystemSource'>
}

export type CreateComponentTypeProps = Except<ComponentTypeProps, 'sys'>

export type UpsertComponentTypeProps = Except<ComponentTypeProps, 'sys'> & {
  sys: {
    id: string
    type: 'ComponentType'
    version?: number
  }
}

export type ComponentTypeCollection = ExoCursorPaginatedCollectionProp<ComponentTypeProps>
