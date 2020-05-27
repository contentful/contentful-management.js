import { MetaSys, MetaSysProps, MetaLinkProps, DefaultElements } from './generated/common-types'

export interface SpaceMemberProps {
  admin: boolean
  roles: MetaLinkProps[]
}

export interface SpaceMember
  extends MetaSys<MetaSysProps>,
    SpaceMemberProps,
    DefaultElements<MetaSys<MetaSysProps> & SpaceMemberProps> {}
