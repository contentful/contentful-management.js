/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 */
import { ClientParams } from './create-cma-http-client';
export declare function createClient(params: ClientParams): {
    getSpaces: (query?: import("./common-types").QueryOptions) => Promise<import("./common-types").Collection<import("./entities/space").Space> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./entities/space").SpaceProps>;
    }>;
    getSpace: (id: string) => Promise<import("./entities/space").Space>;
    createSpace: (data: Pick<import("./entities/space").SpaceProps, "name">, organizationId: string) => Promise<import("./entities/space").Space>;
    getOrganization: (id: string) => Promise<import("./entities/organization").Organization>;
    getOrganizations: () => Promise<import("./common-types").Collection<import("./entities/organization").Organization> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./entities/organization").OrganizationProp>;
    }>;
    getCurrentUser: () => Promise<import("./entities/user").User>;
    createPersonalAccessToken: (data: Pick<import("./entities/personal-access-token").PersonalAccessTokenProp, "name" | "scopes" | "revokedAt" | "token">) => Promise<import("./entities/personal-access-token").PersonalAccessToken>;
    getPersonalAccessToken: (tokenId: string) => Promise<import("./entities/personal-access-token").PersonalAccessToken>;
    getPersonalAccessTokens: () => Promise<import("./common-types").Collection<import("./entities/personal-access-token").PersonalAccessToken> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./entities/personal-access-token").PersonalAccessTokenProp>;
    }>;
    rawRequest: (opts: import("axios").AxiosRequestConfig) => Promise<any>;
    getOrganizationUsage: (organizationId: string, query?: import("./common-types").QueryOptions) => Promise<import("./common-types").CollectionProp<import("./entities/usage").UsageProps> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./entities/usage").UsageProps>;
    }>;
    getSpaceUsage: (organizationId: string, query?: import("./common-types").QueryOptions) => Promise<import("./common-types").CollectionProp<import("./entities/usage").UsageProps> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./entities/usage").UsageProps>;
    }>;
};
