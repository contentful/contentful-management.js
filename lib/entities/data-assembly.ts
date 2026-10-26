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

export type DataAssemblyDataTypeField = DataTypeDefinition & {
  id: string
  name: string
}

type DataAssemblyParameterMetadata = {
  name?: string
  description?: string
  required: boolean
}

export type DataAssemblyResourceLinkParameter = DataAssemblyParameterMetadata & {
  type: 'ResourceLink'
  linkType?: 'Contentful:Entry' | 'Contentful:Asset'
  allowedResources: Array<
    | {
        type: 'Contentful:Entry'
        source: typeof SAME_SPACE_CONTENT_SOURCE
        allowedTypes: string[]
      }
    | {
        type: 'Contentful:Asset'
        source: typeof SAME_SPACE_CONTENT_SOURCE
      }
  >
}

export type DataAssemblyStringParameter = DataAssemblyParameterMetadata & {
  type: 'String'
  fallbackValue?: string
  locked?: boolean
  validation?: { allowedValues?: string[] }
}

export type DataAssemblyNumberParameter = DataAssemblyParameterMetadata & {
  type: 'Number'
  fallbackValue?: number
  locked?: boolean
  validation?: { min?: number; max?: number }
}

export type DataAssemblyOrderTerm = {
  path: string
  direction: 'asc' | 'desc'
}

export type DataAssemblyOrderExpressionBinding = DataAssemblyOrderTerm[]

export type DataAssemblyOrderExpressionParameter = DataAssemblyParameterMetadata & {
  type: 'OrderExpression'
  fallbackValue?: DataAssemblyOrderExpressionBinding
  locked?: boolean
  target: { resourceLink: string }
}

/** Nested Record fields declare their own IDs and explicit requiredness. */
export type DataAssemblyRecordField = (
  DataAssemblyStringParameter | DataAssemblyNumberParameter | DataAssemblyOrderExpressionParameter
) & { id: string }

export type DataAssemblyRecordParameter = DataAssemblyParameterMetadata & {
  type: 'Record'
  fields: DataAssemblyRecordField[]
  locked?: boolean
}

export type DataAssemblyParameterDefinition =
  | DataAssemblyResourceLinkParameter
  | DataAssemblyStringParameter
  | DataAssemblyNumberParameter
  | DataAssemblyRecordParameter
  | DataAssemblyOrderExpressionParameter

/** A top-level parameter declares its identifier and explicit requiredness. */
export type DataAssemblyParameterDefinitionWithId = DataAssemblyParameterDefinition & {
  id: string
}

/** Ordered top-level declarations used by DataAssembly responses, creates and updates. */
export type DataAssemblyParameterConfig = DataAssemblyParameterDefinitionWithId[]

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
  DataAssemblyGraphQLResolver | DataAssemblyNestedResolver

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

// Write payloads carry no top-level sys. The API infers sys.dataType from the return mapping.
type DataAssemblyWriteProps = DataAssemblyCommonProps & {
  sys?: never
}

// Create payload
export type CreateDataAssemblyProps = DataAssemblyWriteProps

// Update payload
export type UpdateDataAssemblyProps = DataAssemblyWriteProps

// Query options for getMany - cursor-based pagination with mutual exclusivity
export type DataAssemblyQueryOptions = CursorPaginationParams & {
  'sys.id[in]'?: string
}

export type DataAssemblyCollection = ExoCursorPaginatedCollectionProp<DataAssemblyProps> & {
  errors?: {
    notFoundIds: string[]
  }
}
