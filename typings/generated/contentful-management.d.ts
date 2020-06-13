/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 * @packageDocumentation
 */
import { ClientParams } from './create-cma-http-client';
/**
 * Creates API object with methods to access functionality from Contentful's
 * Management API
 */
export declare function createClient(params: ClientParams): {
    getSpaces: (query?: import("./common-types").QueryOptions) => Promise<import("./common-types").Collection<import("./types").Space> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./types").SpaceProps>;
    }>;
    getSpace: (id: string) => Promise<import("./types").Space>;
    createSpace: (data: Pick<import("./types").SpaceProps, "name">, organizationId: string) => Promise<import("./types").Space>;
    getOrganization: (id: string) => Promise<import("./types").Organization>;
    getOrganizations: () => Promise<import("./common-types").Collection<import("./types").Organization> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./types").OrganizationProp>;
    }>;
    getCurrentUser: () => Promise<import("./types").User>;
    createPersonalAccessToken: (data: Pick<import("./types").PersonalAccessTokenProp, "name" | "scopes" | "revokedAt" | "token">) => Promise<import("./types").PersonalAccessToken>;
    getPersonalAccessToken: (tokenId: string) => Promise<import("./types").PersonalAccessToken>;
    getPersonalAccessTokens: () => Promise<import("./common-types").Collection<import("./types").PersonalAccessToken> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./types").PersonalAccessTokenProp>;
    }>;
    getOrganizationUsage: (organizationId: string, query?: import("./common-types").QueryOptions) => Promise<import("./common-types").Collection<import("./types").Usage> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./types").UsageProps>;
    }>;
    getSpaceUsage: (organizationId: string, query?: import("./types").UsageQuery) => Promise<import("./common-types").Collection<import("./types").Usage> & {
        toPlainObject(): import("./common-types").CollectionProp<import("./types").UsageProps>;
    }>;
    rawRequest: (opts: import("axios").AxiosRequestConfig) => Promise<any>;
};
