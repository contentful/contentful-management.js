import { ContentFields } from './content-fields'
import { BasicMetaSysProps, MetaLinkProps } from './common-types'

export interface ContentTypeProps {
  sys: BasicMetaSysProps & {
    space: MetaLinkProps
    environment: MetaLinkProps
    firstPublishedAt?: string
    publishedCounter?: number
    publishedVersion?: number
  }
  name: string
  description: string
  displayField: string
  fields: ContentFields[]
}
