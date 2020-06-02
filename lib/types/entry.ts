import { BasicMetaSysProps, MetaLinkProps } from './common-types'

export interface EntryProps {
  sys: BasicMetaSysProps & {
    space: { sys: MetaLinkProps }
    contentType: { sys: MetaLinkProps }
    environment: { sys: MetaLinkProps }
    publishedBy?: { sys: MetaLinkProps }
    publishedVersion?: number
    publishedAt?: string
    firstPublishedAt?: string
    publishedCounter?: number
  }
  fields: {
    [key: string]: any
  }
}
