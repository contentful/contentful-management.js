export interface DefaultElements<TPlainObject extends object = object> {
  toPlainObject(): TPlainObject
}

export interface PaginationQueryOptions {
  skip?: number
  limit?: number
  order?: string
}

export interface QueryOptions extends PaginationQueryOptions {
  content_type?: string
  include?: number
  select?: string
  [key: string]: any
}

export interface BasicMetaSysProps {
  type: string
  id: string
  version: number
  createdBy?: { sys: MetaLinkProps }
  createdAt: string
  updatedBy?: { sys: MetaLinkProps }
  updatedAt: string
}

export interface MetaSysProps extends BasicMetaSysProps {
  space?: { sys: MetaLinkProps }
  status?: { sys: MetaLinkProps }
  publishedVersion?: number
  archivedVersion?: number
  archivedBy?: { sys: MetaLinkProps }
  archivedAt?: string
  deletedVersion?: number
  deletedBy?: { sys: MetaLinkProps }
  deletedAt?: string
}

export interface MetaLinkProps {
  type: string
  linkType: string
  id: string
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
export interface QueryOptions {
  skip?: number
  limit?: number
  order?: string
  content_type?: string
  include?: number
  select?: string
}

export type KeyValueMap = Record<string, any>
