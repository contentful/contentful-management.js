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
    getAppDefinitions: (query?: import("../common-types").QueryOptions) => Promise<{
        items: ({
            update: () => Promise<import("./app-definition").AppDefinition>;
            delete: () => Promise<void>;
        } & import("./app-definition").AppDefinitionProps & {
            toPlainObject(): import("./app-definition").AppDefinitionProps;
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
                update: () => Promise<import("./app-definition").AppDefinition>;
                delete: () => Promise<void>;
            } & import("./app-definition").AppDefinitionProps & {
                toPlainObject(): import("./app-definition").AppDefinitionProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
        };
    }>;
    getUser: (id: string) => Promise<import("./user").UserProps & {
        toPlainObject(): import("./user").UserProps;
    }>;
    getUsers: (query?: import("../common-types").QueryOptions) => Promise<{
        items: (import("./user").UserProps & {
            toPlainObject(): import("./user").UserProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
    } & {
        toPlainObject(): {
            items: (import("./user").UserProps & {
                toPlainObject(): import("./user").UserProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
        };
    }>;
    createAppDefinition: (data: Pick<import("./app-definition").AppDefinitionProps, "name" | "src" | "locations">) => Promise<{
        update: () => Promise<import("./app-definition").AppDefinition>;
        delete: () => Promise<void>;
    } & import("./app-definition").AppDefinitionProps & {
        toPlainObject(): import("./app-definition").AppDefinitionProps;
    }>;
    getOrganizationMembership: (id: string) => Promise<{
        update: () => Promise<any & import("./organization-membership").OrganizationMembershipProps & {
            toPlainObject(): import("./organization-membership").OrganizationMembershipProps;
        }>;
        delete: () => Promise<void>;
    } & import("./organization-membership").OrganizationMembershipProps & {
        toPlainObject(): import("./organization-membership").OrganizationMembershipProps;
    }>;
    getOrganizationMemberships: (query?: import("../common-types").QueryOptions) => Promise<{
        items: ({
            update: () => Promise<any & import("./organization-membership").OrganizationMembershipProps & {
                toPlainObject(): import("./organization-membership").OrganizationMembershipProps;
            }>;
            delete: () => Promise<void>;
        } & import("./organization-membership").OrganizationMembershipProps & {
            toPlainObject(): import("./organization-membership").OrganizationMembershipProps;
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
                update: () => Promise<any & import("./organization-membership").OrganizationMembershipProps & {
                    toPlainObject(): import("./organization-membership").OrganizationMembershipProps;
                }>;
                delete: () => Promise<void>;
            } & import("./organization-membership").OrganizationMembershipProps & {
                toPlainObject(): import("./organization-membership").OrganizationMembershipProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
        };
    }>;
    createTeam: (data: Pick<import("./team").TeamProps, "description" | "name">) => Promise<{
        update: () => Promise<import("./team").Team>;
        delete: () => Promise<void>;
    } & import("./team").TeamProps & {
        toPlainObject(): import("./team").TeamProps;
    }>;
    getTeam: (teamId: string) => Promise<{
        update: () => Promise<import("./team").Team>;
        delete: () => Promise<void>;
    } & import("./team").TeamProps & {
        toPlainObject(): import("./team").TeamProps;
    }>;
    getTeams: (query?: import("../common-types").QueryOptions) => Promise<{
        items: ({
            update: () => Promise<import("./team").Team>;
            delete: () => Promise<void>;
        } & import("./team").TeamProps & {
            toPlainObject(): import("./team").TeamProps;
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
                update: () => Promise<import("./team").Team>;
                delete: () => Promise<void>;
            } & import("./team").TeamProps & {
                toPlainObject(): import("./team").TeamProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
        };
    }>;
    createTeamMembership: (teamId: string, data: Pick<import("./team-membership").TeamMembershipProps, "admin" | "organizationMembershipId">) => Promise<{
        update: () => Promise<any & import("./team-membership").TeamMembershipProps & {
            toPlainObject(): import("./team-membership").TeamMembershipProps;
        }>;
        delete: () => Promise<void>;
    } & import("./team-membership").TeamMembershipProps & {
        toPlainObject(): import("./team-membership").TeamMembershipProps;
    }>;
    getTeamMembership: (teamId: string, teamMembershipId: string) => Promise<{
        update: () => Promise<any & import("./team-membership").TeamMembershipProps & {
            toPlainObject(): import("./team-membership").TeamMembershipProps;
        }>;
        delete: () => Promise<void>;
    } & import("./team-membership").TeamMembershipProps & {
        toPlainObject(): import("./team-membership").TeamMembershipProps;
    }>;
    getTeamMemberships: (opts?: {
        teamId?: string | undefined;
        query?: import("../common-types").QueryOptions | undefined;
    }) => Promise<{
        items: ({
            update: () => Promise<any & import("./team-membership").TeamMembershipProps & {
                toPlainObject(): import("./team-membership").TeamMembershipProps;
            }>;
            delete: () => Promise<void>;
        } & import("./team-membership").TeamMembershipProps & {
            toPlainObject(): import("./team-membership").TeamMembershipProps;
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
                update: () => Promise<any & import("./team-membership").TeamMembershipProps & {
                    toPlainObject(): import("./team-membership").TeamMembershipProps;
                }>;
                delete: () => Promise<void>;
            } & import("./team-membership").TeamMembershipProps & {
                toPlainObject(): import("./team-membership").TeamMembershipProps;
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
        teamId?: string | undefined;
        query?: import("../common-types").QueryOptions | undefined;
    }) => Promise<{
        items: ({
            update: () => Promise<any & import("./team-space-membership").TeamSpaceMembershipProps & {
                toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
            }>;
            delete: () => Promise<void>;
        } & import("./team-space-membership").TeamSpaceMembershipProps & {
            toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
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
                update: () => Promise<any & import("./team-space-membership").TeamSpaceMembershipProps & {
                    toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
                }>;
                delete: () => Promise<void>;
            } & import("./team-space-membership").TeamSpaceMembershipProps & {
                toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
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
        update: () => Promise<any & import("./team-space-membership").TeamSpaceMembershipProps & {
            toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
        }>;
        delete: () => Promise<void>;
    } & import("./team-space-membership").TeamSpaceMembershipProps & {
        toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
    }>;
    getOrganizationSpaceMembership: (id: string) => Promise<{
        update: () => Promise<import("./space-membership").SpaceMembership>;
        delete: () => Promise<void>;
    } & import("./space-membership").SpaceMembershipProps & {
        toPlainObject(): import("./space-membership").SpaceMembershipProps;
    }>;
    getOrganizationSpaceMemberships: (query?: import("../common-types").QueryOptions) => Promise<{
        items: ({
            update: () => Promise<import("./space-membership").SpaceMembership>;
            delete: () => Promise<void>;
        } & import("./space-membership").SpaceMembershipProps & {
            toPlainObject(): import("./space-membership").SpaceMembershipProps;
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
                update: () => Promise<import("./space-membership").SpaceMembership>;
                delete: () => Promise<void>;
            } & import("./space-membership").SpaceMembershipProps & {
                toPlainObject(): import("./space-membership").SpaceMembershipProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
        };
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
export declare function wrapOrganizationCollection(http: AxiosInstance, data: CollectionProp<OrganizationProp>): {
    items: ({
        getAppDefinition: (id: string) => Promise<{
            update: () => Promise<import("./app-definition").AppDefinition>;
            delete: () => Promise<void>;
        } & import("./app-definition").AppDefinitionProps & {
            toPlainObject(): import("./app-definition").AppDefinitionProps;
        }>;
        getAppDefinitions: (query?: import("../common-types").QueryOptions) => Promise<{
            items: ({
                update: () => Promise<import("./app-definition").AppDefinition>;
                delete: () => Promise<void>;
            } & import("./app-definition").AppDefinitionProps & {
                toPlainObject(): import("./app-definition").AppDefinitionProps;
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
                    update: () => Promise<import("./app-definition").AppDefinition>;
                    delete: () => Promise<void>;
                } & import("./app-definition").AppDefinitionProps & {
                    toPlainObject(): import("./app-definition").AppDefinitionProps;
                })[];
                sys: {
                    type: "Array";
                };
                total: number;
                skip: number;
                limit: number;
            };
        }>;
        getUser: (id: string) => Promise<import("./user").UserProps & {
            toPlainObject(): import("./user").UserProps;
        }>;
        getUsers: (query?: import("../common-types").QueryOptions) => Promise<{
            items: (import("./user").UserProps & {
                toPlainObject(): import("./user").UserProps;
            })[];
            sys: {
                type: "Array";
            };
            total: number;
            skip: number;
            limit: number;
        } & {
            toPlainObject(): {
                items: (import("./user").UserProps & {
                    toPlainObject(): import("./user").UserProps;
                })[];
                sys: {
                    type: "Array";
                };
                total: number;
                skip: number;
                limit: number;
            };
        }>;
        createAppDefinition: (data: Pick<import("./app-definition").AppDefinitionProps, "name" | "src" | "locations">) => Promise<{
            update: () => Promise<import("./app-definition").AppDefinition>;
            delete: () => Promise<void>;
        } & import("./app-definition").AppDefinitionProps & {
            toPlainObject(): import("./app-definition").AppDefinitionProps;
        }>;
        getOrganizationMembership: (id: string) => Promise<{
            update: () => Promise<any & import("./organization-membership").OrganizationMembershipProps & {
                toPlainObject(): import("./organization-membership").OrganizationMembershipProps;
            }>;
            delete: () => Promise<void>;
        } & import("./organization-membership").OrganizationMembershipProps & {
            toPlainObject(): import("./organization-membership").OrganizationMembershipProps;
        }>;
        getOrganizationMemberships: (query?: import("../common-types").QueryOptions) => Promise<{
            items: ({
                update: () => Promise<any & import("./organization-membership").OrganizationMembershipProps & {
                    toPlainObject(): import("./organization-membership").OrganizationMembershipProps;
                }>;
                delete: () => Promise<void>;
            } & import("./organization-membership").OrganizationMembershipProps & {
                toPlainObject(): import("./organization-membership").OrganizationMembershipProps;
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
                    update: () => Promise<any & import("./organization-membership").OrganizationMembershipProps & {
                        toPlainObject(): import("./organization-membership").OrganizationMembershipProps;
                    }>;
                    delete: () => Promise<void>;
                } & import("./organization-membership").OrganizationMembershipProps & {
                    toPlainObject(): import("./organization-membership").OrganizationMembershipProps;
                })[];
                sys: {
                    type: "Array";
                };
                total: number;
                skip: number;
                limit: number;
            };
        }>;
        createTeam: (data: Pick<import("./team").TeamProps, "description" | "name">) => Promise<{
            update: () => Promise<import("./team").Team>;
            delete: () => Promise<void>;
        } & import("./team").TeamProps & {
            toPlainObject(): import("./team").TeamProps;
        }>;
        getTeam: (teamId: string) => Promise<{
            update: () => Promise<import("./team").Team>;
            delete: () => Promise<void>;
        } & import("./team").TeamProps & {
            toPlainObject(): import("./team").TeamProps;
        }>;
        getTeams: (query?: import("../common-types").QueryOptions) => Promise<{
            items: ({
                update: () => Promise<import("./team").Team>;
                delete: () => Promise<void>;
            } & import("./team").TeamProps & {
                toPlainObject(): import("./team").TeamProps;
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
                    update: () => Promise<import("./team").Team>;
                    delete: () => Promise<void>;
                } & import("./team").TeamProps & {
                    toPlainObject(): import("./team").TeamProps;
                })[];
                sys: {
                    type: "Array";
                };
                total: number;
                skip: number;
                limit: number;
            };
        }>;
        createTeamMembership: (teamId: string, data: Pick<import("./team-membership").TeamMembershipProps, "admin" | "organizationMembershipId">) => Promise<{
            update: () => Promise<any & import("./team-membership").TeamMembershipProps & {
                toPlainObject(): import("./team-membership").TeamMembershipProps;
            }>;
            delete: () => Promise<void>;
        } & import("./team-membership").TeamMembershipProps & {
            toPlainObject(): import("./team-membership").TeamMembershipProps;
        }>;
        getTeamMembership: (teamId: string, teamMembershipId: string) => Promise<{
            update: () => Promise<any & import("./team-membership").TeamMembershipProps & {
                toPlainObject(): import("./team-membership").TeamMembershipProps;
            }>;
            delete: () => Promise<void>;
        } & import("./team-membership").TeamMembershipProps & {
            toPlainObject(): import("./team-membership").TeamMembershipProps;
        }>;
        getTeamMemberships: (opts?: {
            teamId?: string | undefined;
            query?: import("../common-types").QueryOptions | undefined;
        }) => Promise<{
            items: ({
                update: () => Promise<any & import("./team-membership").TeamMembershipProps & {
                    toPlainObject(): import("./team-membership").TeamMembershipProps;
                }>;
                delete: () => Promise<void>;
            } & import("./team-membership").TeamMembershipProps & {
                toPlainObject(): import("./team-membership").TeamMembershipProps;
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
                    update: () => Promise<any & import("./team-membership").TeamMembershipProps & {
                        toPlainObject(): import("./team-membership").TeamMembershipProps;
                    }>;
                    delete: () => Promise<void>;
                } & import("./team-membership").TeamMembershipProps & {
                    toPlainObject(): import("./team-membership").TeamMembershipProps;
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
            teamId?: string | undefined;
            query?: import("../common-types").QueryOptions | undefined;
        }) => Promise<{
            items: ({
                update: () => Promise<any & import("./team-space-membership").TeamSpaceMembershipProps & {
                    toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
                }>;
                delete: () => Promise<void>;
            } & import("./team-space-membership").TeamSpaceMembershipProps & {
                toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
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
                    update: () => Promise<any & import("./team-space-membership").TeamSpaceMembershipProps & {
                        toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
                    }>;
                    delete: () => Promise<void>;
                } & import("./team-space-membership").TeamSpaceMembershipProps & {
                    toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
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
            update: () => Promise<any & import("./team-space-membership").TeamSpaceMembershipProps & {
                toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
            }>;
            delete: () => Promise<void>;
        } & import("./team-space-membership").TeamSpaceMembershipProps & {
            toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
        }>;
        getOrganizationSpaceMembership: (id: string) => Promise<{
            update: () => Promise<import("./space-membership").SpaceMembership>;
            delete: () => Promise<void>;
        } & import("./space-membership").SpaceMembershipProps & {
            toPlainObject(): import("./space-membership").SpaceMembershipProps;
        }>;
        getOrganizationSpaceMemberships: (query?: import("../common-types").QueryOptions) => Promise<{
            items: ({
                update: () => Promise<import("./space-membership").SpaceMembership>;
                delete: () => Promise<void>;
            } & import("./space-membership").SpaceMembershipProps & {
                toPlainObject(): import("./space-membership").SpaceMembershipProps;
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
                    update: () => Promise<import("./space-membership").SpaceMembership>;
                    delete: () => Promise<void>;
                } & import("./space-membership").SpaceMembershipProps & {
                    toPlainObject(): import("./space-membership").SpaceMembershipProps;
                })[];
                sys: {
                    type: "Array";
                };
                total: number;
                skip: number;
                limit: number;
            };
        }>;
        getOrganizationInvitation: (invitationId: string) => Promise<import("./organization-invitation").OrganizationInvitationProps & {
            toPlainObject(): import("./organization-invitation").OrganizationInvitationProps;
        }>;
        createOrganizationInvitation: (data: Pick<import("./organization-invitation").OrganizationInvitationProps, "role" | "firstName" | "lastName" | "email">) => Promise<import("./organization-invitation").OrganizationInvitationProps & {
            toPlainObject(): import("./organization-invitation").OrganizationInvitationProps;
        }>;
    } & OrganizationProp & {
        toPlainObject(): OrganizationProp;
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
            getAppDefinition: (id: string) => Promise<{
                update: () => Promise<import("./app-definition").AppDefinition>;
                delete: () => Promise<void>;
            } & import("./app-definition").AppDefinitionProps & {
                toPlainObject(): import("./app-definition").AppDefinitionProps;
            }>;
            getAppDefinitions: (query?: import("../common-types").QueryOptions) => Promise<{
                items: ({
                    update: () => Promise<import("./app-definition").AppDefinition>;
                    delete: () => Promise<void>;
                } & import("./app-definition").AppDefinitionProps & {
                    toPlainObject(): import("./app-definition").AppDefinitionProps;
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
                        update: () => Promise<import("./app-definition").AppDefinition>;
                        delete: () => Promise<void>;
                    } & import("./app-definition").AppDefinitionProps & {
                        toPlainObject(): import("./app-definition").AppDefinitionProps;
                    })[];
                    sys: {
                        type: "Array";
                    };
                    total: number;
                    skip: number;
                    limit: number;
                };
            }>;
            getUser: (id: string) => Promise<import("./user").UserProps & {
                toPlainObject(): import("./user").UserProps;
            }>;
            getUsers: (query?: import("../common-types").QueryOptions) => Promise<{
                items: (import("./user").UserProps & {
                    toPlainObject(): import("./user").UserProps;
                })[];
                sys: {
                    type: "Array";
                };
                total: number;
                skip: number;
                limit: number;
            } & {
                toPlainObject(): {
                    items: (import("./user").UserProps & {
                        toPlainObject(): import("./user").UserProps;
                    })[];
                    sys: {
                        type: "Array";
                    };
                    total: number;
                    skip: number;
                    limit: number;
                };
            }>;
            createAppDefinition: (data: Pick<import("./app-definition").AppDefinitionProps, "name" | "src" | "locations">) => Promise<{
                update: () => Promise<import("./app-definition").AppDefinition>;
                delete: () => Promise<void>;
            } & import("./app-definition").AppDefinitionProps & {
                toPlainObject(): import("./app-definition").AppDefinitionProps;
            }>;
            getOrganizationMembership: (id: string) => Promise<{
                update: () => Promise<any & import("./organization-membership").OrganizationMembershipProps & {
                    toPlainObject(): import("./organization-membership").OrganizationMembershipProps;
                }>;
                delete: () => Promise<void>;
            } & import("./organization-membership").OrganizationMembershipProps & {
                toPlainObject(): import("./organization-membership").OrganizationMembershipProps;
            }>;
            getOrganizationMemberships: (query?: import("../common-types").QueryOptions) => Promise<{
                items: ({
                    update: () => Promise<any & import("./organization-membership").OrganizationMembershipProps & {
                        toPlainObject(): import("./organization-membership").OrganizationMembershipProps;
                    }>;
                    delete: () => Promise<void>;
                } & import("./organization-membership").OrganizationMembershipProps & {
                    toPlainObject(): import("./organization-membership").OrganizationMembershipProps;
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
                        update: () => Promise<any & import("./organization-membership").OrganizationMembershipProps & {
                            toPlainObject(): import("./organization-membership").OrganizationMembershipProps;
                        }>;
                        delete: () => Promise<void>;
                    } & import("./organization-membership").OrganizationMembershipProps & {
                        toPlainObject(): import("./organization-membership").OrganizationMembershipProps;
                    })[];
                    sys: {
                        type: "Array";
                    };
                    total: number;
                    skip: number;
                    limit: number;
                };
            }>;
            createTeam: (data: Pick<import("./team").TeamProps, "description" | "name">) => Promise<{
                update: () => Promise<import("./team").Team>;
                delete: () => Promise<void>;
            } & import("./team").TeamProps & {
                toPlainObject(): import("./team").TeamProps;
            }>;
            getTeam: (teamId: string) => Promise<{
                update: () => Promise<import("./team").Team>;
                delete: () => Promise<void>;
            } & import("./team").TeamProps & {
                toPlainObject(): import("./team").TeamProps;
            }>;
            getTeams: (query?: import("../common-types").QueryOptions) => Promise<{
                items: ({
                    update: () => Promise<import("./team").Team>;
                    delete: () => Promise<void>;
                } & import("./team").TeamProps & {
                    toPlainObject(): import("./team").TeamProps;
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
                        update: () => Promise<import("./team").Team>;
                        delete: () => Promise<void>;
                    } & import("./team").TeamProps & {
                        toPlainObject(): import("./team").TeamProps;
                    })[];
                    sys: {
                        type: "Array";
                    };
                    total: number;
                    skip: number;
                    limit: number;
                };
            }>;
            createTeamMembership: (teamId: string, data: Pick<import("./team-membership").TeamMembershipProps, "admin" | "organizationMembershipId">) => Promise<{
                update: () => Promise<any & import("./team-membership").TeamMembershipProps & {
                    toPlainObject(): import("./team-membership").TeamMembershipProps;
                }>;
                delete: () => Promise<void>;
            } & import("./team-membership").TeamMembershipProps & {
                toPlainObject(): import("./team-membership").TeamMembershipProps;
            }>;
            getTeamMembership: (teamId: string, teamMembershipId: string) => Promise<{
                update: () => Promise<any & import("./team-membership").TeamMembershipProps & {
                    toPlainObject(): import("./team-membership").TeamMembershipProps;
                }>;
                delete: () => Promise<void>;
            } & import("./team-membership").TeamMembershipProps & {
                toPlainObject(): import("./team-membership").TeamMembershipProps;
            }>;
            getTeamMemberships: (opts?: {
                teamId?: string | undefined;
                query?: import("../common-types").QueryOptions | undefined;
            }) => Promise<{
                items: ({
                    update: () => Promise<any & import("./team-membership").TeamMembershipProps & {
                        toPlainObject(): import("./team-membership").TeamMembershipProps;
                    }>;
                    delete: () => Promise<void>;
                } & import("./team-membership").TeamMembershipProps & {
                    toPlainObject(): import("./team-membership").TeamMembershipProps;
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
                        update: () => Promise<any & import("./team-membership").TeamMembershipProps & {
                            toPlainObject(): import("./team-membership").TeamMembershipProps;
                        }>;
                        delete: () => Promise<void>;
                    } & import("./team-membership").TeamMembershipProps & {
                        toPlainObject(): import("./team-membership").TeamMembershipProps;
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
                teamId?: string | undefined;
                query?: import("../common-types").QueryOptions | undefined;
            }) => Promise<{
                items: ({
                    update: () => Promise<any & import("./team-space-membership").TeamSpaceMembershipProps & {
                        toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
                    }>;
                    delete: () => Promise<void>;
                } & import("./team-space-membership").TeamSpaceMembershipProps & {
                    toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
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
                        update: () => Promise<any & import("./team-space-membership").TeamSpaceMembershipProps & {
                            toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
                        }>;
                        delete: () => Promise<void>;
                    } & import("./team-space-membership").TeamSpaceMembershipProps & {
                        toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
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
                update: () => Promise<any & import("./team-space-membership").TeamSpaceMembershipProps & {
                    toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
                }>;
                delete: () => Promise<void>;
            } & import("./team-space-membership").TeamSpaceMembershipProps & {
                toPlainObject(): import("./team-space-membership").TeamSpaceMembershipProps;
            }>;
            getOrganizationSpaceMembership: (id: string) => Promise<{
                update: () => Promise<import("./space-membership").SpaceMembership>;
                delete: () => Promise<void>;
            } & import("./space-membership").SpaceMembershipProps & {
                toPlainObject(): import("./space-membership").SpaceMembershipProps;
            }>;
            getOrganizationSpaceMemberships: (query?: import("../common-types").QueryOptions) => Promise<{
                items: ({
                    update: () => Promise<import("./space-membership").SpaceMembership>;
                    delete: () => Promise<void>;
                } & import("./space-membership").SpaceMembershipProps & {
                    toPlainObject(): import("./space-membership").SpaceMembershipProps;
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
                        update: () => Promise<import("./space-membership").SpaceMembership>;
                        delete: () => Promise<void>;
                    } & import("./space-membership").SpaceMembershipProps & {
                        toPlainObject(): import("./space-membership").SpaceMembershipProps;
                    })[];
                    sys: {
                        type: "Array";
                    };
                    total: number;
                    skip: number;
                    limit: number;
                };
            }>;
            getOrganizationInvitation: (invitationId: string) => Promise<import("./organization-invitation").OrganizationInvitationProps & {
                toPlainObject(): import("./organization-invitation").OrganizationInvitationProps;
            }>;
            createOrganizationInvitation: (data: Pick<import("./organization-invitation").OrganizationInvitationProps, "role" | "firstName" | "lastName" | "email">) => Promise<import("./organization-invitation").OrganizationInvitationProps & {
                toPlainObject(): import("./organization-invitation").OrganizationInvitationProps;
            }>;
        } & OrganizationProp & {
            toPlainObject(): OrganizationProp;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
    };
};
