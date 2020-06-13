/**
 * Contentful Management API Client. Contains methods which allow access to
 * any operations that can be performed with a management token.
 */
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { CollectionProp, QueryOptions } from './common-types';
import { OrganizationProp } from './entities/organization';
import { SpaceProps } from './entities/space';
import { PersonalAccessTokenProp } from './entities/personal-access-token';
export declare type ClientAPI = ReturnType<typeof createClientApi>;
/**
 * Creates API object with methods to access functionality from Contentful's
 * Management API
 * @param {Object} params - API initialization params
 * @prop {Object} http - HTTP client instance
 */
export default function createClientApi({ http }: {
    http: AxiosInstance;
}): {
    getSpaces: (query?: QueryOptions) => Promise<import("./common-types").Collection<import("./entities/space").Space> & {
        toPlainObject(): CollectionProp<SpaceProps>;
    }>;
    getSpace: (id: string) => Promise<import("./entities/space").Space>;
    createSpace: (data: Omit<SpaceProps, 'sys'>, organizationId: string) => Promise<import("./entities/space").Space>;
    getOrganization: (id: string) => Promise<import("./entities/organization").Organization>;
    getOrganizations: () => Promise<import("./common-types").Collection<import("./entities/organization").Organization> & {
        toPlainObject(): CollectionProp<OrganizationProp>;
    }>;
    getCurrentUser: () => Promise<import("./entities/user").User>;
    /**
     * Creates a personal access token
     * @param data - personal access token config
     * @return Promise for a Token
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.createPersonalAccessToken(
     *  {
     *    "name": "My Token",
     *    "scope": [
     *      "content_management_manage"
     *    ]
     *  }
     * )
     * .then(personalAccessToken => console.log(personalAccessToken.token))
     * .catch(console.error)
     * ```
     */
    createPersonalAccessToken: (data: Omit<PersonalAccessTokenProp, 'sys'>) => Promise<import("./entities/personal-access-token").PersonalAccessToken>;
    getPersonalAccessToken: (tokenId: string) => Promise<import("./entities/personal-access-token").PersonalAccessToken>;
    getPersonalAccessTokens: () => Promise<import("./common-types").Collection<import("./entities/personal-access-token").PersonalAccessToken> & {
        toPlainObject(): CollectionProp<PersonalAccessTokenProp>;
    }>;
    rawRequest: (opts: AxiosRequestConfig) => Promise<any>;
    getOrganizationUsage: (organizationId: string, query?: QueryOptions) => Promise<CollectionProp<import("./entities/usage").UsageProps> & {
        toPlainObject(): CollectionProp<import("./entities/usage").UsageProps>;
    }>;
    getSpaceUsage: (organizationId: string, query?: QueryOptions) => Promise<CollectionProp<import("./entities/usage").UsageProps> & {
        toPlainObject(): CollectionProp<import("./entities/usage").UsageProps>;
    }>;
};
