import { MetaSys, MetaSysProps, MetaLinkProps, DefaultElements, QueryOptions } from './generated/common-types'

export interface Options {
  teamId?: string
  query?: QueryOptions
}

export interface TeamSpaceMembershipProps {
  admin: boolean
  roles: MetaLinkProps[]
}

export interface TeamSpaceMembership
  extends MetaSys<MetaSysProps>,
    TeamSpaceMembershipProps,
    DefaultElements<MetaSys<MetaSysProps> & TeamSpaceMembershipProps> {
  delete(): Promise<void>
  update(): Promise<TeamSpaceMembership>
}
