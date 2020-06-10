import { BasicMetaSysProps, MetaLinkProps } from './common-types'

export interface SpaceProps {
  sys: BasicMetaSysProps & { organization: { sys: MetaLinkProps } }
  name: string
}
