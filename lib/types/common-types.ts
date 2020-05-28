export interface DefaultElements<TPlainObject extends object = object> {
  toPlainObject(): TPlainObject
}

export interface QueryOptions {
  skip?: number
  limit?: number
  order?: string
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
}

export interface MetaSys<
  TType extends MetaSysProps | MetaLinkProps = MetaSysProps | MetaLinkProps
> {
  sys: TType
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
