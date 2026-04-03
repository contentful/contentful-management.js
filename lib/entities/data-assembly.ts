import type { CursorPaginationParams, Link, MetadataProps } from '../common-types'

export type DataAssemblyDataTypeField = {
  id: string
  name: string
  type: string
  required: boolean
  source?: string
}

export type DataAssemblyLinkParameter = {
  name?: string
  description?: string
  type: 'Link'
  linkType: string
  allowedContentTypes: string[]
}

export type DataAssemblyParameterConfig = Record<string, DataAssemblyLinkParameter>

export type DataAssemblyGraphQLResolver = {
  source: 'Contentful:GraphQL'
  query: string
  parameters?: Record<string, unknown>
}

export type DataAssemblyNestedResolver = {
  source: `Contentful:DataAssembly:${string}`
  parameters?: Record<string, unknown>
}

export type DataAssemblyResolverDefinition =
  | DataAssemblyGraphQLResolver
  | DataAssemblyNestedResolver

export type DataAssemblyResolverConfig = Record<string, DataAssemblyResolverDefinition>

export type DataAssemblyReturnMappingValue =
  | string
  | { [key: string]: DataAssemblyReturnMappingValue }

export type DataAssemblyReturnMappingConfig = Record<string, DataAssemblyReturnMappingValue>

export type DataAssemblySys = {
  id: string
  type: 'DataAssembly'
  dataType: DataAssemblyDataTypeField[]
  version: number
  space: Link<string>
  environment: Link<string>
  createdBy: Link<string>
  createdAt: string | Date
  updatedAt: string | Date
  updatedBy?: Link<string>
  publishedAt?: string | Date
  publishedVersion?: number
  publishedCounter?: number
  firstPublishedAt?: string | Date
  publishedBy?: Link<string>
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
