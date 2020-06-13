import { AxiosInstance } from 'axios';
import { TeamMembershipProps } from './entities/team-membership';
import { TeamProps } from './entities/team';
import { OrganizationInvitationProps } from './entities/organization-invitation';
import { QueryOptions } from './common-types';
import { AppDefinitionProps } from './entities/app-definition';
/**
 * Creates API object with methods to access the Organization API
 * @private
 */
export default function createOrganizationApi({ http }: {
    http: AxiosInstance;
}): {
    getAppDefinition: (id: string) => Promise<{
        update: () => Promise<import("./entities/app-definition").AppDefinition>;
        delete: () => Promise<void>;
    } & AppDefinitionProps & {
        toPlainObject(): AppDefinitionProps;
    }>;
    getAppDefinitions: (query?: QueryOptions) => Promise<import("./common-types").Collection<{
        update: () => Promise<import("./entities/app-definition").AppDefinition>;
        delete: () => Promise<void>;
    } & AppDefinitionProps & {
        toPlainObject(): AppDefinitionProps;
    }> & {
        toPlainObject(): import("./common-types").CollectionProp<AppDefinitionProps>;
    }>;
    getUser: (id: string) => Promise<import("./entities/user").User>;
    getUsers: (query?: QueryOptions) => Promise<import("./common-types").Collection<import("./entities/user").User> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./entities/user").UserProps>;
    }>;
    createAppDefinition: (data: Omit<AppDefinitionProps, 'sys'>) => Promise<{
        update: () => Promise<import("./entities/app-definition").AppDefinition>;
        delete: () => Promise<void>;
    } & AppDefinitionProps & {
        toPlainObject(): AppDefinitionProps;
    }>;
    getOrganizationMembership: (id: string) => Promise<{
        update: () => Promise<any & import("./entities/organization-membership").OrganizationMembershipProps & {
            toPlainObject(): import("./entities/organization-membership").OrganizationMembershipProps;
        }>;
        delete: () => Promise<void>;
    } & import("./entities/organization-membership").OrganizationMembershipProps & {
        toPlainObject(): import("./entities/organization-membership").OrganizationMembershipProps;
    }>;
    getOrganizationMemberships: (query?: QueryOptions) => Promise<import("./common-types").Collection<{
        update: () => Promise<any & import("./entities/organization-membership").OrganizationMembershipProps & {
            toPlainObject(): import("./entities/organization-membership").OrganizationMembershipProps;
        }>;
        delete: () => Promise<void>;
    } & import("./entities/organization-membership").OrganizationMembershipProps & {
        toPlainObject(): import("./entities/organization-membership").OrganizationMembershipProps;
    }> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./entities/organization-membership").OrganizationMembershipProps>;
    }>;
    createTeam: (data: Omit<TeamProps, 'sys'>) => Promise<import("./entities/team").Team>;
    getTeam: (teamId: string) => Promise<import("./entities/team").Team>;
    getTeams: (query?: QueryOptions) => Promise<import("./common-types").Collection<import("./entities/team").Team> & {
        toPlainObject(): import("./common-types").CollectionProp<TeamProps>;
    }>;
    createTeamMembership: (teamId: string, data: Omit<TeamMembershipProps, 'sys'>) => Promise<import("./entities/team-membership").TeamMembership>;
    getTeamMembership: (teamId: string, teamMembershipId: string) => Promise<import("./entities/team-membership").TeamMembership>;
    getTeamMemberships: (opts?: {
        teamId?: string;
        query?: QueryOptions;
    }) => Promise<import("./common-types").Collection<import("./entities/team-membership").TeamMembership> & {
        toPlainObject(): import("./common-types").CollectionProp<TeamMembershipProps>;
    }>;
    getTeamSpaceMemberships: (opts?: {
        teamId?: string;
        query?: QueryOptions;
    }) => Promise<import("./common-types").Collection<import("./entities/team-space-membership").TeamSpaceMembership> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./entities/team-space-membership").TeamSpaceMembershipProps>;
    }>;
    getTeamSpaceMembership: (teamSpaceMembershipId: string) => Promise<import("./entities/team-space-membership").TeamSpaceMembership>;
    getOrganizationSpaceMembership: (id: string) => Promise<{
        update: () => Promise<import("./entities/space-membership").SpaceMembership>;
        delete: () => Promise<void>;
    } & import("./entities/space-membership").SpaceMembershipProps & {
        toPlainObject(): import("./entities/space-membership").SpaceMembershipProps;
    }>;
    getOrganizationSpaceMemberships: (query?: QueryOptions) => Promise<import("./common-types").Collection<{
        update: () => Promise<import("./entities/space-membership").SpaceMembership>;
        delete: () => Promise<void>;
    } & import("./entities/space-membership").SpaceMembershipProps & {
        toPlainObject(): import("./entities/space-membership").SpaceMembershipProps;
    }> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./entities/space-membership").SpaceMembershipProps>;
    }>;
    getOrganizationInvitation: (invitationId: string) => Promise<OrganizationInvitationProps & {
        toPlainObject(): OrganizationInvitationProps;
    }>;
    createOrganizationInvitation: (data: Omit<OrganizationInvitationProps, 'sys'>) => Promise<OrganizationInvitationProps & {
        toPlainObject(): OrganizationInvitationProps;
    }>;
};
