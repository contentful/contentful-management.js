import type {
  CursorPaginationParams,
  DataTypeDefinition,
  ExoCursorPaginatedCollectionProp,
  Link,
  MetadataProps,
  PointerExpressionValue,
  ResourceLink,
} from '../common-types'

export const SAME_SPACE_CONTENT_SOURCE =
  'crn:contentful:::content:spaces/$self/environments/$self' as const

export type CanonicalDataAssemblyDataTypeField = DataTypeDefinition & {
  id: string
  name: string
}

// Permissive shape for pre-cutover stored records. Will be removed after the
// assemblies API completes its backfill to the canonical DataTypeDefinition.
export type LegacyDataAssemblyDataTypeField = {
  id: string
  name: string
  type: string
  required?: boolean
  source?: string
  ref?: unknown
}

export type DataAssemblyDataTypeField =
  | CanonicalDataAssemblyDataTypeField
  | LegacyDataAssemblyDataTypeField

type DataAssemblyParameterMetadata = {
  name?: string
  description?: string
  required?: boolean
}

export type DataAssemblyAllowedEntryResource = {
  type: 'Contentful:Entry'
  source: typeof SAME_SPACE_CONTENT_SOURCE
  allowedTypes: string[]
}

export type DataAssemblyAllowedAssetResource = {
  type: 'Contentful:Asset'
  source: typeof SAME_SPACE_CONTENT_SOURCE
}

export type DataAssemblyAllowedResource =
  | DataAssemblyAllowedEntryResource
  | DataAssemblyAllowedAssetResource

/**
 * A ResourceLink definition may target entries, assets, or a mixed collection. `linkType` is
 * retained only for compatibility; `allowedResources` is the authoritative discriminator.
 */
export type DataAssemblyResourceLinkParameter = DataAssemblyParameterMetadata & {
  type: 'ResourceLink'
  linkType?: 'Contentful:Entry' | 'Contentful:Asset'
  allowedResources: DataAssemblyAllowedResource[]
}

export type DataAssemblyStringParameter = DataAssemblyParameterMetadata & {
  type: 'String'
  fallbackValue?: string
  locked?: boolean
  validation?: {
    allowedValues?: string[]
  }
}

export type DataAssemblyNumberParameter = DataAssemblyParameterMetadata & {
  type: 'Number'
  fallbackValue?: number
  locked?: boolean
  validation?: {
    min?: number
    max?: number
  }
}

export type DataAssemblyOrderDirection = 'asc' | 'desc'

export type DataAssemblyOrderTerm = {
  path: string
  direction: DataAssemblyOrderDirection
}

export type DataAssemblyOrderExpressionParameter = DataAssemblyParameterMetadata & {
  type: 'OrderExpression'
  fallbackValue?: DataAssemblyOrderTerm[]
  locked?: boolean
  target: {
    resourceLink: string
  }
}

export type DataAssemblyStringRecordField = DataAssemblyStringParameter & {
  id: string
}

export type DataAssemblyNumberRecordField = DataAssemblyNumberParameter & {
  id: string
}

export type DataAssemblyOrderExpressionRecordField = DataAssemblyOrderExpressionParameter & {
  id: string
}

export type DataAssemblyRecordField =
  | DataAssemblyStringRecordField
  | DataAssemblyNumberRecordField
  | DataAssemblyOrderExpressionRecordField

export type DataAssemblyRecordParameter = DataAssemblyParameterMetadata & {
  type: 'Record'
  fields: DataAssemblyRecordField[]
  locked?: boolean
}

/** A definition from either the legacy record or ordered-array representation. */
export type DataAssemblyParameterDefinition =
  | DataAssemblyResourceLinkParameter
  | DataAssemblyStringParameter
  | DataAssemblyNumberParameter
  | DataAssemblyRecordParameter
  | DataAssemblyOrderExpressionParameter

/** Legacy Data Assemblies key parameter definitions by id. */
export type LegacyDataAssemblyParameterConfig = Record<string, DataAssemblyParameterDefinition>

/** An ordered definition carries its stable id alongside the definition. */
export type DataAssemblyParameterDefinitionWithId = DataAssemblyParameterDefinition & {
  id: string
  required: boolean
}

/** Ordered Data Assemblies retain the exact caller-supplied item order. */
export type OrderedDataAssemblyParameterConfig = DataAssemblyParameterDefinitionWithId[]

export type DataAssemblyParameterConfig =
  | LegacyDataAssemblyParameterConfig
  | OrderedDataAssemblyParameterConfig

export type DataAssemblyGraphQLResolver = {
  source: 'Contentful:GraphQL'
  query: string
  parameters?: PointerExpressionValue
}

export type DataAssemblyNestedResolver = {
  source: 'Contentful:DataAssembly'
  dataAssembly: ResourceLink<'Contentful:DataAssembly'>
  parameters?: PointerExpressionValue
}

export type DataAssemblyResolverDefinition =
  | DataAssemblyGraphQLResolver
  | DataAssemblyNestedResolver

export type DataAssemblyResolverConfig = Record<string, DataAssemblyResolverDefinition>

export type DataAssemblyReturnMappingConfig = PointerExpressionValue

export type DataAssemblySys = {
  id: string
  type: 'DataAssembly'
  dataType: DataAssemblyDataTypeField[]
  version: number
  space: Link<'Space'>
  environment: Link<'Environment'>
  createdBy: Link<'User'>
  createdAt: string | Date
  updatedAt: string | Date
  updatedBy?: Link<'User'>
  publishedAt?: string | Date
  publishedVersion?: number
  publishedCounter?: number
  firstPublishedAt?: string | Date
  publishedBy?: Link<'User'> | Link<'AppDefinition'>
  variant?: string
}

type DataAssemblyCommonProps = {
  metadata: Pick<MetadataProps, 'tags'>
  name: string
  description: string
  parameters: DataAssemblyParameterConfig
  resolvers: DataAssemblyResolverConfig
  return: DataAssemblyReturnMappingConfig
}

export type DataAssemblyProps = DataAssemblyCommonProps & {
  sys: DataAssemblySys
}

// Create payload
export type CreateDataAssemblyProps = DataAssemblyCommonProps & {
  sys: {
    type: 'DataAssembly'
    variant?: string
    dataType: DataAssemblyDataTypeField[]
  }
}

// Update payload
export type UpdateDataAssemblyProps = DataAssemblyCommonProps & {
  sys: {
    id: string
    type: 'DataAssembly'
    variant?: string
    version: number
    dataType: DataAssemblyDataTypeField[]
  }
}

// Query options for getMany - cursor-based pagination with mutual exclusivity
export type DataAssemblyQueryOptions = CursorPaginationParams & {
  'sys.id[in]'?: string
}

export type DataAssemblyCollection = ExoCursorPaginatedCollectionProp<DataAssemblyProps> & {
  errors?: {
    notFoundIds: string[]
  }
}
