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

// DataTypeField — DataTypeDefinition extended with id, name, and optional source
export type DataAssemblyDataTypeField = DataTypeDefinition & {
  id: string
  name: string
  source?: string
}

export type DataAssemblyResourceLinkParameter = {
  name?: string
  description?: string
  type: 'ResourceLink'
  linkType: 'Contentful:Entry'
  allowedResources: Array<{
    type: 'Contentful:Entry'
    source: typeof SAME_SPACE_CONTENT_SOURCE
    allowedTypes: string[]
  }>
}

export type DataAssemblyParameterConfig = Record<string, DataAssemblyResourceLinkParameter>

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

export type DataAssemblyReturnMappingConfig = Record<string, PointerExpressionValue>

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
