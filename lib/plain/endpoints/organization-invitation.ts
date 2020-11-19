import { AxiosInstance } from 'axios'
import * as raw from './raw'
import {
  OrganizationInvitationProps,
  CreateOrganizationInvitationProps,
} from '../../entities/organization-invitation'

const OrganizationUserManagementAlphaHeaders = {
  'x-contentful-enable-alpha-feature': 'organization-user-management-api',
}

const InvitationAlphaHeaders = {
  'x-contentful-enable-alpha-feature': 'pending-org-membership',
}

export const create = (
  http: AxiosInstance,
  params: { organizationId: string },
  data: CreateOrganizationInvitationProps,
  headers?: Record<string, unknown>
) => {
  return raw.post<OrganizationInvitationProps>(
    http,
    `/organizations/${params.organizationId}/invitations`,
    data,
    {
      headers: {
        ...InvitationAlphaHeaders,
        ...headers,
      },
    }
  )
}

export const get = (
  http: AxiosInstance,
  params: { organizationId: string; invitationId: string },
  headers?: Record<string, unknown>
) => {
  return raw.get<OrganizationInvitationProps>(
    http,
    `/organizations/${params.organizationId}/invitations/${params.invitationId}`,
    {
      headers: {
        ...OrganizationUserManagementAlphaHeaders,
        ...headers,
      },
    }
  )
}
