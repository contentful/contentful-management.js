import { MetaSys, MetaSysProps, MetaLinkProps } from './generated/types/common-types'

export interface OrganizationInvitationProps {
  firstName: string
  lastName: string
  email: string
  role: string
}

export interface OrganizationInvitation extends MetaSys<MetaSysProps> {
  organizationMembership: { sys: MetaLinkProps }
  user: Record<string, any> | null
  invitationUrl: string
}
