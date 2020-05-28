import { BasicMetaSysProps, MetaLinkProps } from './common-types'

export interface EnvironmentProps {
  sys: BasicMetaSysProps & { status: { sys: MetaLinkProps }; space: { sys: MetaLinkProps } }
  name: string
}
