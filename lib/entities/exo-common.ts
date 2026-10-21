import type { ResourceLink } from '../common-types'

// Types shared by several ExO entities (Component, ExperienceTemplate, Experience,
// ExperienceFragment, DesignToken).

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

export type DesignPropertyValue = ManualDesignValue | DesignTokenValue

export type DimensionedDesignPropertyValue = Record<string, DesignPropertyValue>

export type EntityDesignProperties = Record<
  string,
  DesignPropertyValue | DimensionedDesignPropertyValue
>

export type ComponentTreeDesignPropertyValue =
  DesignPropertyValue | DesignPropertyPointerValue | DimensionedDesignPropertyValue

// Reference to an ExperienceFragment from a Component tree or an Experience slot.
export type ExperienceFragmentNode = {
  id: string
  name?: string
  nodeType: 'ExperienceFragment'
  experienceFragment: ResourceLink<'Contentful:ExperienceFragment'>
}

export type SlotNode = {
  id: string
  nodeType: 'Slot'
  slotId: string
}

// DataAssembly link type
export type DataAssemblyLink = ResourceLink<'Contentful:DataAssembly'>
