import type { RawAxiosRequestHeaders } from 'axios'
import type { AxiosInstance } from 'contentful-sdk-core'
import type {
  CreateOrganizationInvitationProps,
  OrganizationInvitationProps,
} from '../../../entities/organization-invitation.js'
import type { RestEndpoint } from '../types.js'
import * as raw from './raw.js'

const OrganizationUserManagementAlphaHeaders = {
  'x-contentful-enable-alpha-feature': 'organization-user-management-api',
}

const InvitationAlphaHeaders = {
  'x-contentful-enable-alpha-feature': 'pending-org-membership',
}

export const create: RestEndpoint<'OrganizationInvitation', 'create'> = (
  http: AxiosInstance,
  params: { organizationId: string },
  data: CreateOrganizationInvitationProps,
  headers?: RawAxiosRequestHeaders,
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
    },
  )
}

export const get: RestEndpoint<'OrganizationInvitation', 'get'> = (
  http: AxiosInstance,
  params: { organizationId: string; invitationId: string },
  headers?: RawAxiosRequestHeaders,
) => {
  return raw.get<OrganizationInvitationProps>(
    http,
    `/organizations/${params.organizationId}/invitations/${params.invitationId}`,
    {
      headers: {
        ...OrganizationUserManagementAlphaHeaders,
        ...headers,
      },
    },
  )
}
