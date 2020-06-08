import { AxiosInstance } from 'axios';
import { MetaLinkProps, DefaultElements } from '../common-types';
export declare type OrganizationInvitationProps = {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
};
export interface OrganizationInvitation extends OrganizationInvitationProps, DefaultElements<OrganizationInvitationProps> {
    organizationMembership: {
        sys: MetaLinkProps;
    };
    user: Record<string, any> | null;
    invitationUrl: string;
}
/**
 * @memberof OrganizationInvitation
 * @typedef OrganizationInvitation
 * @prop {Meta.Sys} sys - System metadata
 * @prop {function(): Object} toPlainObject() - Returns this Organization Invitation as a plain JS object
 */
/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw invitation data
 * @return {OrganizationInvitation} Wrapped Inviation data
 */
export declare function wrapOrganizationInvitation(http: AxiosInstance, data: OrganizationInvitationProps): OrganizationInvitationProps & {
    toPlainObject(): OrganizationInvitationProps;
};
