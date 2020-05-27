import { AxiosInstance } from 'axios';
import { MetaSys, MetaLinkProps, MetaSysProps, Collection } from '../common-types';
export declare type ApiKeyProps = {
    sys: MetaSysProps;
    name: string;
    description: string;
    accessToken: string;
    policies: {
        effect: string;
        action: string;
    }[];
    preview_api_key: MetaSys<MetaLinkProps>;
    environments: MetaSys<MetaLinkProps>[];
};
export declare type CreateApiKeyProps = Pick<ApiKeyProps, 'name' | 'environments'>;
export declare type ApiKey = ReturnType<typeof wrapApiKey>;
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw api key data
 */
export declare function wrapApiKey(http: AxiosInstance, data: ApiKeyProps): {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @return Object returned from the server with updated changes.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getSpace('<space_id>')
     * .then((space) => space.getApiKey(<api-key-id>))
     * .then((apiKey) => {
     *  apiKey.name = 'New name'
     *  return apiKey.update()
     * })
     * .then(apiKey => console.log(apiKey.name))
     * .catch(console.error)
     * ```
     */
    update: () => Promise<any & ApiKeyProps & {
        toPlainObject(): ApiKeyProps;
    }>;
    /**
     * Deletes this object on the server.
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getSpace('<space_id>')
     * .then((space) => space.getApiKey(<api-key-id>))
     * .then((apiKey) => apiKey.delete())
     * .then(() => console.log('apikey deleted'))
     * .catch(console.error)
     * ```
     */
    delete: () => Promise<void>;
} & ApiKeyProps & {
    toPlainObject(): ApiKeyProps;
};
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw api key collection data
 * @return Wrapped api key collection data
 */
export declare function wrapApiKeyCollection(http: AxiosInstance, data: Collection<ApiKeyProps>): {
    items: ({
        /**
         * Sends an update to the server with any changes made to the object's properties
         * @return Object returned from the server with updated changes.
         * @example ```javascript
         * const contentful = require('contentful-management')
         *
         * const client = contentful.createClient({
         *   accessToken: '<content_management_api_key>'
         * })
         * client.getSpace('<space_id>')
         * .then((space) => space.getApiKey(<api-key-id>))
         * .then((apiKey) => {
         *  apiKey.name = 'New name'
         *  return apiKey.update()
         * })
         * .then(apiKey => console.log(apiKey.name))
         * .catch(console.error)
         * ```
         */
        update: () => Promise<any & ApiKeyProps & {
            toPlainObject(): ApiKeyProps;
        }>;
        /**
         * Deletes this object on the server.
         * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
         * @example ```javascript
         * const contentful = require('contentful-management')
         *
         * const client = contentful.createClient({
         *   accessToken: '<content_management_api_key>'
         * })
         * client.getSpace('<space_id>')
         * .then((space) => space.getApiKey(<api-key-id>))
         * .then((apiKey) => apiKey.delete())
         * .then(() => console.log('apikey deleted'))
         * .catch(console.error)
         * ```
         */
        delete: () => Promise<void>;
    } & ApiKeyProps & {
        toPlainObject(): ApiKeyProps;
    })[];
    sys: {
        type: "Array";
    };
    total: number;
    skip: number;
    limit: number;
    toPlainObject: (() => import("../common-types").CollectionProp<ApiKeyProps>) & (() => Collection<ApiKeyProps>);
};
