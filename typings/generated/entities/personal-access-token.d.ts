import { AxiosInstance } from 'axios';
import { MetaSysProps, DefaultElements, CollectionProp } from '../types/common-types';
export declare type PersonalAccessTokenProp = {
    sys: MetaSysProps;
    name: string;
    scopes: 'content_management_manage'[];
    revokedAt: null | string;
    token?: string;
};
export interface PersonalAccessToken extends PersonalAccessTokenProp, DefaultElements<PersonalAccessTokenProp> {
    /**
     * Revokes a personal access token
     * @return Object the revoked personal access token
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *  accessToken: <content_management_api_key>
     * })
     *
     * client.getPersonalAccessToken('<token-id>')
     *  .then((personalAccessToken) => {
     *    return personalAccessToken.revoke()
     *  })
     *  .catch(console.error)
     * ```
     */
    revoke(): Promise<PersonalAccessToken>;
}
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw  personal access token data
 * @return Wrapped personal access token
 */
export declare function wrapPersonalAccessToken(http: AxiosInstance, data: PersonalAccessTokenProp): PersonalAccessTokenProp & {
    toPlainObject(): PersonalAccessTokenProp;
};
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw personal access collection data
 * @return Wrapped personal access token collection data
 */
export declare function wrapPersonalAccessTokenCollection(http: AxiosInstance, data: CollectionProp<PersonalAccessTokenProp>): CollectionProp<PersonalAccessTokenProp> & {
    toPlainObject(): CollectionProp<PersonalAccessTokenProp>;
};
