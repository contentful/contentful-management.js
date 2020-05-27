import { MetaSys, MetaSysProps, MetaLinkProps, DefaultElements } from './generated/common-types'

export interface SpaceMembershipProps {
  name: string
  admin: boolean
  roles: MetaLinkProps[]
}

export interface SpaceMembership
  extends MetaSys<MetaSysProps>,
    SpaceMembershipProps,
    DefaultElements<MetaSys<MetaSysProps> & SpaceMembershipProps> {
  delete(): Promise<void>
  update(): Promise<SpaceMembership>
}
