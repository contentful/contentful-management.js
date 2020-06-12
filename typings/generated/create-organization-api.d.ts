import { AxiosInstance } from 'axios';
import * as appDefinition from './entities/app-definition';
import * as user from './entities/user';
import * as organizationMembership from './entities/organization-membership';
import * as teamMembership from './entities/team-membership';
import * as teamSpaceMembership from './entities/team-space-membership';
import * as team from './entities/team';
import * as spaceMembership from './entities/space-membership';
import * as organizationInvitation from './entities/organization-invitation';
import type { TeamMembershipProps } from './entities/team-membership';
import type { TeamProps } from './entities/team';
import type { OrganizationInvitationProps } from './entities/organization-invitation';
import { QueryOptions, DefaultElements } from './common-types';
import { OrganizationProp } from './entities/organization';
import type { AppDefinitionProps } from './entities/app-definition';
declare type ContentfulOrganizationAPI = ReturnType<typeof createOrganizationApi>;
export interface Organization extends DefaultElements<OrganizationProp>, OrganizationProp, ContentfulOrganizationAPI {
}
/**
 * Creates API object with methods to access the Organization API
 * @private
 */
export default function createOrganizationApi({ http }: {
    http: AxiosInstance;
}): {
    getAppDefinition: (id: string) => Promise<{
        update: () => Promise<appDefinition.AppDefinition>;
        delete: () => Promise<void>;
    } & appDefinition.AppDefinitionProps & {
        toPlainObject(): appDefinition.AppDefinitionProps;
    }>;
    getAppDefinitions: (query?: QueryOptions) => Promise<import("./common-types").CollectionProp<appDefinition.AppDefinitionProps> & {
        toPlainObject(): import("./common-types").CollectionProp<appDefinition.AppDefinitionProps>;
    }>;
    getUser: (id: string) => Promise<user.UserProps & {
        toPlainObject(): user.UserProps;
    }>;
    getUsers: (query?: QueryOptions) => Promise<import("./common-types").CollectionProp<user.UserProps> & {
        toPlainObject(): import("./common-types").CollectionProp<user.UserProps>;
    }>;
    createAppDefinition: (data: Omit<AppDefinitionProps, 'sys'>) => Promise<{
        update: () => Promise<appDefinition.AppDefinition>;
        delete: () => Promise<void>;
    } & appDefinition.AppDefinitionProps & {
        toPlainObject(): appDefinition.AppDefinitionProps;
    }>;
    getOrganizationMembership: (id: string) => Promise<organizationMembership.OrganizationMembershipProps & {
        toPlainObject(): organizationMembership.OrganizationMembershipProps;
    }>;
    getOrganizationMemberships: (query?: QueryOptions) => Promise<import("./common-types").CollectionProp<organizationMembership.OrganizationMembershipProps> & {
        toPlainObject(): import("./common-types").CollectionProp<organizationMembership.OrganizationMembershipProps>;
    }>;
    createTeam: (data: Omit<TeamProps, 'sys'>) => Promise<team.TeamProps & {
        toPlainObject(): team.TeamProps;
    }>;
    getTeam: (teamId: string) => Promise<team.TeamProps & {
        toPlainObject(): team.TeamProps;
    }>;
    getTeams: (query?: QueryOptions) => Promise<import("./common-types").CollectionProp<team.TeamProps> & {
        toPlainObject(): import("./common-types").CollectionProp<team.TeamProps>;
    }>;
    createTeamMembership: (teamId: string, data: Omit<TeamMembershipProps, 'sys'>) => Promise<teamMembership.TeamMembershipProps & {
        toPlainObject(): teamMembership.TeamMembershipProps;
    }>;
    getTeamMembership: (teamId: string, teamMembershipId: string) => Promise<teamMembership.TeamMembershipProps & {
        toPlainObject(): teamMembership.TeamMembershipProps;
    }>;
    getTeamMemberships: (opts?: {
        teamId?: string;
        query?: QueryOptions;
    }) => Promise<import("./common-types").CollectionProp<teamMembership.TeamMembershipProps> & {
        toPlainObject(): import("./common-types").CollectionProp<teamMembership.TeamMembershipProps>;
    }>;
    getTeamSpaceMemberships: (opts?: {
        teamId?: string;
        query?: QueryOptions;
    }) => Promise<import("./common-types").CollectionProp<teamSpaceMembership.TeamSpaceMembershipProps> & {
        toPlainObject(): import("./common-types").CollectionProp<teamSpaceMembership.TeamSpaceMembershipProps>;
    }>;
    getTeamSpaceMembership: (teamSpaceMembershipId: string) => Promise<teamSpaceMembership.TeamSpaceMembershipProps & {
        toPlainObject(): teamSpaceMembership.TeamSpaceMembershipProps;
    }>;
    getOrganizationSpaceMembership: (id: string) => Promise<spaceMembership.SpaceMembershipProps & {
        toPlainObject(): spaceMembership.SpaceMembershipProps;
    }>;
    getOrganizationSpaceMemberships: (query?: QueryOptions) => Promise<import("./common-types").CollectionProp<spaceMembership.SpaceMembershipProps> & {
        toPlainObject(): import("./common-types").CollectionProp<spaceMembership.SpaceMembershipProps>;
    }>;
    getOrganizationInvitation: (invitationId: string) => Promise<organizationInvitation.OrganizationInvitationProps & {
        toPlainObject(): organizationInvitation.OrganizationInvitationProps;
    }>;
    createOrganizationInvitation: (data: Omit<OrganizationInvitationProps, 'sys'>) => Promise<organizationInvitation.OrganizationInvitationProps & {
        toPlainObject(): organizationInvitation.OrganizationInvitationProps;
    }>;
};
export {};
