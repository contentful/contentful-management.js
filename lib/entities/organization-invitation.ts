import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import { AxiosInstance } from 'axios'
import { MetaLinkProps, MetaSysProps, DefaultElements } from '../common-types'

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

export interface OrganizationInvitation
  extends OrganizationInvitationProps,
    DefaultElements<OrganizationInvitationProps> {}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw invitation data
 * @return {OrganizationInvitation} Wrapped Inviation data
 */
export function wrapOrganizationInvitation(http: AxiosInstance, data: OrganizationInvitationProps) {
  const invitation = toPlainObject(cloneDeep(data))
  return freezeSys(invitation)
}
