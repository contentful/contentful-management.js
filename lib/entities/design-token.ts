import type { Except } from 'type-fest'
import type {
  CursorPaginationParams,
  ExoCursorPaginatedCollectionProp,
  ExoMetadataProps,
  ExoQueryFilters,
  Link,
  ResourceLink,
} from '../common-types'
import type { DTCGDesignPropertyType } from './component-type'

export type DesignTokenType = DTCGDesignPropertyType

// DesignToken sys properties (management API shape)
export type DesignTokenSys = {
  id: string
  type: 'DesignToken'
  version: number
  space: Link<'Space'>
  environment: Link<'Environment'>
  createdAt: string
  updatedAt: string
  createdBy: Link<'User'> | Link<'App'>
  updatedBy: Link<'User'> | Link<'App'>
  designSystemSource?: ResourceLink<'Contentful:DesignSystemSource'>
}

// Main DesignToken props
export type DesignTokenProps = {
  sys: DesignTokenSys
  name: string
  type: DesignTokenType
  metadata?: ExoMetadataProps
}

export type UpsertDesignTokenProps = Except<DesignTokenProps, 'sys'> & {
  sys: {
    id: string
    type: 'DesignToken'
    version?: number
  }
}

// Query options for getMany - cursor-based pagination with typed filter fields
export type DesignTokenQueryOptions = CursorPaginationParams &
  ExoQueryFilters & {
    type?: string
    'type[in]'?: string
    'type[nin]'?: string
  }

export type DesignTokenCollection = ExoCursorPaginatedCollectionProp<DesignTokenProps>
