export interface DefaultElements<TPlainObject extends object = object> {
  toPlainObject(): TPlainObject
}

export interface MetaSysProps {
  type: string
  id: string
  space?: { sys: MetaLinkProps }
  status?: { sys: MetaLinkProps }
  version: number
  createdBy?: { sys: MetaLinkProps }
  createdAt: string
  updatedBy?: { sys: MetaLinkProps }
  updatedAt: string
  publishedVersion?: number
  archivedVersion?: number
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

export interface Collection<TObj>
  extends CollectionProp<TObj>,
    DefaultElements<CollectionProp<TObj>> {}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface QueryOptions {
  skip?: number
  limit?: number
  order?: string
  content_type?: string
  include?: number
  [key: string]: any
}
