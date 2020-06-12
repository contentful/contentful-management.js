import { AxiosInstance } from 'axios';
import { TeamMembershipProps } from './entities/team-membership';
import { TeamProps } from './entities/team';
import { OrganizationInvitationProps } from './entities/organization-invitation';
import { QueryOptions, DefaultElements } from './common-types';
import { OrganizationProp } from './entities/organization';
import { AppDefinitionProps } from './entities/app-definition';
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
        update: () => Promise<import("./entities/app-definition").AppDefinition>;
        delete: () => Promise<void>;
    } & AppDefinitionProps & {
        toPlainObject(): AppDefinitionProps;
    }>;
    getAppDefinitions: (query?: QueryOptions) => Promise<{
        items: ({
            update: () => Promise<import("./entities/app-definition").AppDefinition>;
            delete: () => Promise<void>;
        } & AppDefinitionProps & {
            toPlainObject(): AppDefinitionProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
    } & {
        toPlainObject(): {
            items: ({
                update: () => Promise<import("./entities/app-definition").AppDefinition>;
                delete: () => Promise<void>;
            } & AppDefinitionProps & {
                toPlainObject(): AppDefinitionProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
        };
    }>;
    getUser: (id: string) => Promise<import("./entities/user").UserProps & {
        toPlainObject(): import("./entities/user").UserProps;
    }>;
    getUsers: (query?: QueryOptions) => Promise<{
        items: (import("./entities/user").UserProps & {
            toPlainObject(): import("./entities/user").UserProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
    } & {
        toPlainObject(): {
            items: (import("./entities/user").UserProps & {
                toPlainObject(): import("./entities/user").UserProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
        };
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
    getOrganizationMemberships: (query?: QueryOptions) => Promise<{
        items: ({
            update: () => Promise<any & import("./entities/organization-membership").OrganizationMembershipProps & {
                toPlainObject(): import("./entities/organization-membership").OrganizationMembershipProps;
            }>;
            delete: () => Promise<void>;
        } & import("./entities/organization-membership").OrganizationMembershipProps & {
            toPlainObject(): import("./entities/organization-membership").OrganizationMembershipProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
    } & {
        toPlainObject(): {
            items: ({
                update: () => Promise<any & import("./entities/organization-membership").OrganizationMembershipProps & {
                    toPlainObject(): import("./entities/organization-membership").OrganizationMembershipProps;
                }>;
                delete: () => Promise<void>;
            } & import("./entities/organization-membership").OrganizationMembershipProps & {
                toPlainObject(): import("./entities/organization-membership").OrganizationMembershipProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
        };
    }>;
    createTeam: (data: Omit<TeamProps, 'sys'>) => Promise<{
        update: () => Promise<import("./entities/team").Team>;
        delete: () => Promise<void>;
    } & TeamProps & {
        toPlainObject(): TeamProps;
    }>;
    getTeam: (teamId: string) => Promise<{
        update: () => Promise<import("./entities/team").Team>;
        delete: () => Promise<void>;
    } & TeamProps & {
        toPlainObject(): TeamProps;
    }>;
    getTeams: (query?: QueryOptions) => Promise<{
        items: ({
            update: () => Promise<import("./entities/team").Team>;
            delete: () => Promise<void>;
        } & TeamProps & {
            toPlainObject(): TeamProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
    } & {
        toPlainObject(): {
            items: ({
                update: () => Promise<import("./entities/team").Team>;
                delete: () => Promise<void>;
            } & TeamProps & {
                toPlainObject(): TeamProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
        };
    }>;
    createTeamMembership: (teamId: string, data: Omit<TeamMembershipProps, 'sys'>) => Promise<{
        update: () => Promise<any & TeamMembershipProps & {
            toPlainObject(): TeamMembershipProps;
        }>;
        delete: () => Promise<void>;
    } & TeamMembershipProps & {
        toPlainObject(): TeamMembershipProps;
    }>;
    getTeamMembership: (teamId: string, teamMembershipId: string) => Promise<{
        update: () => Promise<any & TeamMembershipProps & {
            toPlainObject(): TeamMembershipProps;
        }>;
        delete: () => Promise<void>;
    } & TeamMembershipProps & {
        toPlainObject(): TeamMembershipProps;
    }>;
    getTeamMemberships: (opts?: {
        teamId?: string;
        query?: QueryOptions;
    }) => Promise<{
        items: ({
            update: () => Promise<any & TeamMembershipProps & {
                toPlainObject(): TeamMembershipProps;
            }>;
            delete: () => Promise<void>;
        } & TeamMembershipProps & {
            toPlainObject(): TeamMembershipProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
    } & {
        toPlainObject(): {
            items: ({
                update: () => Promise<any & TeamMembershipProps & {
                    toPlainObject(): TeamMembershipProps;
                }>;
                delete: () => Promise<void>;
            } & TeamMembershipProps & {
                toPlainObject(): TeamMembershipProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
        };
    }>;
    getTeamSpaceMemberships: (opts?: {
        teamId?: string;
        query?: QueryOptions;
    }) => Promise<{
        items: ({
            update: () => Promise<any & import("./entities/team-space-membership").TeamSpaceMembershipProps & {
                toPlainObject(): import("./entities/team-space-membership").TeamSpaceMembershipProps;
            }>;
            delete: () => Promise<void>;
        } & import("./entities/team-space-membership").TeamSpaceMembershipProps & {
            toPlainObject(): import("./entities/team-space-membership").TeamSpaceMembershipProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
    } & {
        toPlainObject(): {
            items: ({
                update: () => Promise<any & import("./entities/team-space-membership").TeamSpaceMembershipProps & {
                    toPlainObject(): import("./entities/team-space-membership").TeamSpaceMembershipProps;
                }>;
                delete: () => Promise<void>;
            } & import("./entities/team-space-membership").TeamSpaceMembershipProps & {
                toPlainObject(): import("./entities/team-space-membership").TeamSpaceMembershipProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
        };
    }>;
    getTeamSpaceMembership: (teamSpaceMembershipId: string) => Promise<{
        update: () => Promise<any & import("./entities/team-space-membership").TeamSpaceMembershipProps & {
            toPlainObject(): import("./entities/team-space-membership").TeamSpaceMembershipProps;
        }>;
        delete: () => Promise<void>;
    } & import("./entities/team-space-membership").TeamSpaceMembershipProps & {
        toPlainObject(): import("./entities/team-space-membership").TeamSpaceMembershipProps;
    }>;
    getOrganizationSpaceMembership: (id: string) => Promise<{
        update: () => Promise<import("./entities/space-membership").SpaceMembership>;
        delete: () => Promise<void>;
    } & import("./entities/space-membership").SpaceMembershipProps & {
        toPlainObject(): import("./entities/space-membership").SpaceMembershipProps;
    }>;
    getOrganizationSpaceMemberships: (query?: QueryOptions) => Promise<{
        items: ({
            update: () => Promise<import("./entities/space-membership").SpaceMembership>;
            delete: () => Promise<void>;
        } & import("./entities/space-membership").SpaceMembershipProps & {
            toPlainObject(): import("./entities/space-membership").SpaceMembershipProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
    } & {
        toPlainObject(): {
            items: ({
                update: () => Promise<import("./entities/space-membership").SpaceMembership>;
                delete: () => Promise<void>;
            } & import("./entities/space-membership").SpaceMembershipProps & {
                toPlainObject(): import("./entities/space-membership").SpaceMembershipProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
        };
    }>;
    getOrganizationInvitation: (invitationId: string) => Promise<OrganizationInvitationProps & {
        toPlainObject(): OrganizationInvitationProps;
    }>;
    createOrganizationInvitation: (data: Omit<OrganizationInvitationProps, 'sys'>) => Promise<OrganizationInvitationProps & {
        toPlainObject(): OrganizationInvitationProps;
    }>;
};
export {};
