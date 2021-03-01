import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import {
  DefaultElements,
  MakeRequestWithoutUserAgent,
  MetaLinkProps,
  MetaSysProps,
} from '../common-types'

export type OrganizationInvitationProps = {
  sys: MetaSysProps & {
    organizationMembership: { sys: MetaLinkProps }
    user: Record<string, any> | null
    invitationUrl: string
    status: string
  }
  firstName: string
  lastName: string
  email: string
  role: string
}

export type CreateOrganizationInvitationProps = Omit<OrganizationInvitationProps, 'sys'>

export interface OrganizationInvitation
  extends OrganizationInvitationProps,
    DefaultElements<OrganizationInvitationProps> {}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw invitation data
 * @return {OrganizationInvitation} Wrapped Inviation data
 */
export function wrapOrganizationInvitation(
  _makeRequest: MakeRequestWithoutUserAgent,
  data: OrganizationInvitationProps
): OrganizationInvitation {
  const invitation = toPlainObject(copy(data))
  return freezeSys(invitation)
}
