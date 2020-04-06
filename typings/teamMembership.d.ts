import { MetaLinkProps, MetaSys, MetaSysProps } from './meta'
import { DefaultElements } from './defaultElements'

export interface TeamMembershipProps {
  admin: boolean,
  roles: MetaLinkProps[]
}

export interface TeamMembership
  extends MetaSys<MetaSysProps>,
    TeamMembershipProps,
    DefaultElements<MetaSys<MetaSysProps> & TeamMembershipProps> {
  delete(): Promise<void>;
  update(): Promise<TeamMembership>;
}
