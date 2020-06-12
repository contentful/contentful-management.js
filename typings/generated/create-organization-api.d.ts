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
    getAppDefinitions: (query?: QueryOptions) => Promise<{
        items: ({
            update: () => Promise<appDefinition.AppDefinition>;
            delete: () => Promise<void>;
        } & appDefinition.AppDefinitionProps & {
            toPlainObject(): appDefinition.AppDefinitionProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): import("./common-types").CollectionProp<appDefinition.AppDefinitionProps>;
    }>;
    getUser: (id: string) => Promise<user.UserProps & {
        toPlainObject(): user.UserProps;
    }>;
    getUsers: (query?: QueryOptions) => Promise<{
        items: (user.UserProps & {
            toPlainObject(): user.UserProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): import("./common-types").CollectionProp<user.UserProps>;
    }>;
    createAppDefinition: (data: Omit<AppDefinitionProps, 'sys'>) => Promise<{
        update: () => Promise<appDefinition.AppDefinition>;
        delete: () => Promise<void>;
    } & appDefinition.AppDefinitionProps & {
        toPlainObject(): appDefinition.AppDefinitionProps;
    }>;
    getOrganizationMembership: (id: string) => Promise<{
        update: () => Promise<any & organizationMembership.OrganizationMembershipProps & {
            toPlainObject(): organizationMembership.OrganizationMembershipProps;
        }>;
        delete: () => Promise<void>;
    } & organizationMembership.OrganizationMembershipProps & {
        toPlainObject(): organizationMembership.OrganizationMembershipProps;
    }>;
    getOrganizationMemberships: (query?: QueryOptions) => Promise<{
        items: ({
            update: () => Promise<any & organizationMembership.OrganizationMembershipProps & {
                toPlainObject(): organizationMembership.OrganizationMembershipProps;
            }>;
            delete: () => Promise<void>;
        } & organizationMembership.OrganizationMembershipProps & {
            toPlainObject(): organizationMembership.OrganizationMembershipProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): import("./common-types").CollectionProp<organizationMembership.OrganizationMembershipProps>;
    }>;
    createTeam: (data: Omit<TeamProps, 'sys'>) => Promise<{
        update: () => Promise<team.Team>;
        delete: () => Promise<void>;
    } & team.TeamProps & {
        toPlainObject(): team.TeamProps;
    }>;
    getTeam: (teamId: string) => Promise<{
        update: () => Promise<team.Team>;
        delete: () => Promise<void>;
    } & team.TeamProps & {
        toPlainObject(): team.TeamProps;
    }>;
    getTeams: (query?: QueryOptions) => Promise<{
        items: ({
            update: () => Promise<team.Team>;
            delete: () => Promise<void>;
        } & team.TeamProps & {
            toPlainObject(): team.TeamProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): import("./common-types").CollectionProp<team.TeamProps>;
    }>;
    createTeamMembership: (teamId: string, data: Omit<TeamMembershipProps, 'sys'>) => Promise<{
        update: () => Promise<any & teamMembership.TeamMembershipProps & {
            toPlainObject(): teamMembership.TeamMembershipProps;
        }>;
        delete: () => Promise<void>;
    } & teamMembership.TeamMembershipProps & {
        toPlainObject(): teamMembership.TeamMembershipProps;
    }>;
    getTeamMembership: (teamId: string, teamMembershipId: string) => Promise<{
        update: () => Promise<any & teamMembership.TeamMembershipProps & {
            toPlainObject(): teamMembership.TeamMembershipProps;
        }>;
        delete: () => Promise<void>;
    } & teamMembership.TeamMembershipProps & {
        toPlainObject(): teamMembership.TeamMembershipProps;
    }>;
    getTeamMemberships: (opts?: {
        teamId?: string;
        query?: QueryOptions;
    }) => Promise<{
        items: ({
            update: () => Promise<any & teamMembership.TeamMembershipProps & {
                toPlainObject(): teamMembership.TeamMembershipProps;
            }>;
            delete: () => Promise<void>;
        } & teamMembership.TeamMembershipProps & {
            toPlainObject(): teamMembership.TeamMembershipProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): import("./common-types").CollectionProp<teamMembership.TeamMembershipProps>;
    }>;
    getTeamSpaceMemberships: (opts?: {
        teamId?: string;
        query?: QueryOptions;
    }) => Promise<{
        items: ({
            update: () => Promise<any & teamSpaceMembership.TeamSpaceMembershipProps & {
                toPlainObject(): teamSpaceMembership.TeamSpaceMembershipProps;
            }>; /**
             * Gets a collection of Organization Memberships
             * @param  query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
             * @return Promise for a collection of Organization Memberships
             * @example ```javascript
             * const contentful = require('contentful-management')
             * const client = contentful.createClient({
             *   accessToken: '<content_management_api_key>'
             * })
             *
             * client.getOrganization('organization_id')
             * .then((organization) => organization.getOrganizationMemberships({'limit': 100})) // you can add more queries as 'key': 'value'
             * .then((response) => console.log(response.items))
             * .catch(console.error)
             * ```
             */
            delete: () => Promise<void>;
        } & teamSpaceMembership.TeamSpaceMembershipProps & {
            toPlainObject(): teamSpaceMembership.TeamSpaceMembershipProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
        toPlainObject(): import("./common-types").CollectionProp<teamSpaceMembership.TeamSpaceMembershipProps>;
    }>;
    getTeamSpaceMembership: (teamSpaceMembershipId: string) => Promise<{
        update: () => Promise<any & teamSpaceMembership.TeamSpaceMembershipProps & {
            toPlainObject(): teamSpaceMembership.TeamSpaceMembershipProps;
        }>; /**
         * Gets a collection of Organization Memberships
         * @param  query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
         * @return Promise for a collection of Organization Memberships
         * @example ```javascript
         * const contentful = require('contentful-management')
         * const client = contentful.createClient({
         *   accessToken: '<content_management_api_key>'
         * })
         *
         * client.getOrganization('organization_id')
         * .then((organization) => organization.getOrganizationMemberships({'limit': 100})) // you can add more queries as 'key': 'value'
         * .then((response) => console.log(response.items))
         * .catch(console.error)
         * ```
         */
        delete: () => Promise<void>;
    } & teamSpaceMembership.TeamSpaceMembershipProps & {
        toPlainObject(): teamSpaceMembership.TeamSpaceMembershipProps;
    }>;
    getOrganizationSpaceMembership: (id: string) => Promise<{
        update: () => Promise<spaceMembership.SpaceMembership>;
        delete: () => Promise<void>;
    } & spaceMembership.SpaceMembershipProps & {
        toPlainObject(): spaceMembership.SpaceMembershipProps;
    }>;
    getOrganizationSpaceMemberships: (query?: QueryOptions) => Promise<{
        items: ({
            update: () => Promise<spaceMembership.SpaceMembership>;
            delete: () => Promise<void>;
        } & spaceMembership.SpaceMembershipProps & {
            toPlainObject(): spaceMembership.SpaceMembershipProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
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
