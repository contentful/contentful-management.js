import { SpaceProps } from './entities/space'
import { GetSpaceParams, QueryParams } from './plain/endpoints/common-types'

export interface DefaultElements<TPlainObject extends object = object> {
  toPlainObject(): TPlainObject
}

/**
 * Link is a reference object to another entity that can be resolved using tools such as contentful-resolve
 */
export interface Link<T extends string> {
  sys: {
    type: 'Link'
    linkType: T
    id: string
  }
}

/** String will be in ISO8601 datetime format e.g. 2013-06-26T13:57:24Z */
export type ISO8601Timestamp = string

export interface PaginationQueryOptions {
  skip?: number
  limit?: number
  order?: string
}

export interface QueryOptions extends PaginationQueryOptions {
  content_type?: string
  include?: number
  select?: string
  links_to_entry?: string
  [key: string]: any
}

export interface BasicMetaSysProps {
  type: string
  id: string
  version: number
  createdBy?: SysLink
  createdAt: string
  updatedBy?: SysLink
  updatedAt: string
}

export interface MetaSysProps extends BasicMetaSysProps {
  space?: SysLink
  status?: SysLink
  publishedVersion?: number
  archivedVersion?: number
  archivedBy?: SysLink
  archivedAt?: string
  deletedVersion?: number
  deletedBy?: SysLink
  deletedAt?: string
}

export interface EntityMetaSysProps extends MetaSysProps {
  space: SysLink
  contentType: SysLink
  environment: SysLink
  publishedBy?: SysLink
  publishedAt?: string
  firstPublishedAt?: string
  publishedCounter?: number
}

export interface MetaLinkProps {
  type: string
  linkType: string
  id: string
}

export interface MetadataProps {
  tags: Link<'Tag'>[]
}

export interface SysLink {
  sys: MetaLinkProps
}

export interface CollectionProp<TObj> {
  sys: {
    type: 'Array'
  }
  total: number
  skip: number
  limit: number
  items: TObj[]
}

export interface Collection<T, TPlain>
  extends CollectionProp<T>,
    DefaultElements<CollectionProp<TPlain>> {}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface QueryOptions extends BasicQueryOptions {
  content_type?: string
  include?: number
  select?: string
}

export interface BasicQueryOptions {
  skip?: number
  limit?: number
  [key: string]: any
}

export interface BasicCursorPaginationOptions {
  prev?: string
  next?: string
}

export type KeyValueMap = Record<string, any>

export interface Adapter {
  makeRequest(options: {
    entityType: 'Space'
    action: 'get'
    params: GetSpaceParams
  }): Promise<SpaceProps>
  makeRequest(options: {
    entityType: 'Space'
    action: 'getMany'
    params: QueryParams
  }): Promise<CollectionProp<SpaceProps>>
  makeRequest(options: {
    entityType: 'Space'
    action: 'create'
    params: { organizationId?: string }
    payload: Omit<SpaceProps, 'sys'>
    headers?: Record<string, unknown>
  }): Promise<any>
  makeRequest(options: {
    entityType: 'Space'
    action: 'update'
    payload: SpaceProps
    params: GetSpaceParams
    headers?: Record<string, unknown>
  }): Promise<SpaceProps>
  makeRequest(options: {
    entityType: 'Space'
    action: 'delete'
    params: GetSpaceParams
  }): Promise<any>
  // makeRequest<R = unknown>(options: MakeRequestOptions): Promise<R>
}

// TODO: Infer type from overloading
// type MakeRequestOptions = Parameters<Adapter['makeRequest']>[0]
export interface MakeRequestOptions {
  entityType: string
  action: string
  params?: Record<string, unknown>
  payload?: Record<string, unknown>
  headers?: Record<string, unknown>
}
