import { AxiosInstance } from 'axios';
import { MetaSysProps, CollectionProp } from '../common-types';
export declare type OrganizationProp = {
    /**
     * System metadata
     */
    sys: MetaSysProps;
    /**
     * Name
     */
    name: string;
};
/**
 * This method creates the API for the given organization with all the methods for
 * reading and creating other entities. It also passes down a clone of the
 * http client with an organization id, so the base path for requests now has the
 * organization id already set.
 * @private
 * @param http - HTTP client instance
 * @param data - API response for an Organization
 * @return {Organization}
 */
export declare function wrapOrganization(http: AxiosInstance, data: OrganizationProp): {
    getAppDefinition: (id: string) => Promise<{
        update: () => Promise<import("./app-definition").AppDefinition>;
        delete: () => Promise<void>;
    } & import("./app-definition").AppDefinitionProps & {
        toPlainObject(): import("./app-definition").AppDefinitionProps;
    }>;
    getAppDefinitions: (query?: import("../common-types").QueryOptions) => Promise<CollectionProp<import("./app-definition").AppDefinitionProps> & {
        toPlainObject(): CollectionProp<import("./app-definition").AppDefinitionProps>;
    }>;
    getUser: (id: string) => Promise<import("./user").UserProps & {
        toPlainObject(): import("./user").UserProps;
    }>;
    getUsers: (query?: import("../common-types").QueryOptions) => Promise<CollectionProp<import("./user").UserProps> & {
        toPlainObject(): CollectionProp<import("./user").UserProps>;
    }>;
    createAppDefinition: (data: Pick<import("./app-definition").AppDefinitionProps, "name" | "src" | "locations">) => Promise<{
        update: () => Promise<import("./app-definition").AppDefinition>;
        delete: () => Promise<void>;
    } & import("./app-definition").AppDefinitionProps & {
        toPlainObject(): import("./app-definition").AppDefinitionProps;
    }>;
    getOrganizationMembership: (id: string) => Promise<import("./organization-membership").OrganizationMembershipProps & {
        toPlainObject(): import("./organization-membership").OrganizationMembershipProps;
    }>;
    getOrganizationMemberships: (query?: import("../common-types").QueryOptions) => Promise<CollectionProp<import("./organization-membership").OrganizationMembershipProps> & {
        toPlainObject(): CollectionProp<import("./organization-membership").OrganizationMembershipProps>;
    }>;
    createTeam: (data: Pick<import("./team").TeamProps, "description" | "name">) => Promise<import("./team").TeamProps & {
        toPlainObject(): import("./team").TeamProps;
    }>;
    getTeam: (teamId: string) => Promise<import("./team").TeamProps & {
        toPlainObject(): import("./team").TeamProps;
    }>;
    getTeams: (query?: import("../common-types").QueryOptions) => Promise<CollectionProp<import("./team").TeamProps> & {
        toPlainObject(): CollectionProp<import("./team").TeamProps>;
    }>;
    createTeamMembership: (teamId: string, data: Pick<import("./team-membership").TeamMembershipProps, "admin" | "organizationMembershipId">) => Promise<import("./team-membership").TeamMembershipProps & {
        toPlainObject(): import("./team-membership").TeamMembershipProps;
    }>;
    getTeamMembership: (teamId: string, teamMembershipId: string) => Promise<import("./team-membership").TeamMembershipProps & {
        toPlainObject(): import("./team-membership").TeamMembershipProps;
    }>;
    getTeamMemberships: (opts?: {
        teamId?: string | undefined;
        query?: import("../common-types").QueryOptions | undefined;
    }) => Promise<CollectionProp<import("./team-membership").TeamMembershipProps> & {
        toPlainObject(): CollectionProp<import("./team-membership").TeamMembershipProps>;
    }>;
    getTeamSpaceMemberships: (opts?: {
        teamId?: string | undefined;
        query?: import("../common-types").QueryOptions | undefined;
    }) => Promise<CollectionProp<import("./team-space-membership").TeamSpaceMembershipProps> & {
        toPlainObject(): CollectionProp<import("./team-space-membership").TeamSpaceMembershipProps>;
    }>;
    getTeamSpaceMembership: (teamSpaceMembershipId: string) => Promise<import("./team-space-membership").TeamSpaceMembershipProps & {
        toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
    }>;
    getOrganizationSpaceMembership: (id: string) => Promise<import("./space-membership").SpaceMembershipProps & {
        toPlainObject(): import("./space-membership").SpaceMembershipProps;
    }>;
    getOrganizationSpaceMemberships: (query?: import("../common-types").QueryOptions) => Promise<CollectionProp<import("./space-membership").SpaceMembershipProps> & {
        toPlainObject(): CollectionProp<import("./space-membership").SpaceMembershipProps>;
    }>;
    getOrganizationInvitation: (invitationId: string) => Promise<import("./organization-invitation").OrganizationInvitationProps & {
        toPlainObject(): import("./organization-invitation").OrganizationInvitationProps;
    }>;
    createOrganizationInvitation: (data: Pick<import("./organization-invitation").OrganizationInvitationProps, "role" | "firstName" | "lastName" | "email">) => Promise<import("./organization-invitation").OrganizationInvitationProps & {
        toPlainObject(): import("./organization-invitation").OrganizationInvitationProps;
    }>;
} & OrganizationProp & {
    toPlainObject(): OrganizationProp;
};
/**
 * This method normalizes each organization in a collection.
 * @private
 * @param http - HTTP client instance
 * @param data - Raw organization collection data
 * @return {OrganizationCollection} Normalized organization collection data
 */
export declare function wrapOrganizationCollection(http: AxiosInstance, data: CollectionProp<OrganizationProp>): CollectionProp<OrganizationProp> & {
    toPlainObject(): CollectionProp<OrganizationProp>;
};
