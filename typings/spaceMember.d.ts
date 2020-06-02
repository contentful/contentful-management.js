import { MetaSys, MetaSysProps, MetaLinkProps, DefaultElements } from './generated/types/common-types'

export interface SpaceMemberProps {
  admin: boolean
  roles: MetaLinkProps[]
}

export interface SpaceMember
  extends MetaSys<MetaSysProps>,
    SpaceMemberProps,
    DefaultElements<MetaSys<MetaSysProps> & SpaceMemberProps> {}
