import { AxiosInstance } from 'axios';
import { MetaSysProps, MetaLinkProps, DefaultElements, CollectionProp } from '../common-types';
export declare type AppInstallationProps = {
    sys: MetaSysProps & {
        appDefinition: {
            sys: MetaLinkProps;
        };
    };
    /** App Installation specific configuration variables */
    parameters: {
        [key: string]: string;
    };
};
export interface AppInstallation extends AppInstallationProps, DefaultElements<AppInstallationProps> {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @return Object returned from the server with updated changes.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getAppInstallation('<app_definition_id>'))
     * .then((appInstallation) => {
     *    appInstallation.parameters.someParameter = 'New Value'
     *    return appInstallation.update()
     * })
     * .then((appInstallation) => console.log(`App installation ${appInstallation.sys.id} was updated`))
     * .catch(console.error)
     * ```
     */
    update(): Promise<AppInstallation>;
    /**
     * Deletes this object on the server.
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getAppInstallation('<app_definition_id>'))
     * .then((appInstallation) => appInstallation.delete())
     * .then(() => console.log(`App installation deleted.`))
     * .catch(console.error)
     * ```
     */
    delete(): Promise<void>;
}
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw App Installation data
 * @return Wrapped App installation data
 */
export declare function wrapAppInstallation(http: AxiosInstance, data: AppInstallationProps): {
    update: () => Promise<any & AppInstallationProps & {
        toPlainObject(): AppInstallationProps;
    }>;
    delete: () => Promise<void>;
} & AppInstallationProps & {
    toPlainObject(): AppInstallationProps;
};
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw App installation collection data
 * @return Wrapped App installation collection data
 */
export declare function wrapAppInstallationCollection(http: AxiosInstance, data: CollectionProp<AppInstallationProps>): {
    items: ({
        update: () => Promise<any & AppInstallationProps & {
            toPlainObject(): AppInstallationProps;
        }>;
        delete: () => Promise<void>;
    } & AppInstallationProps & {
        toPlainObject(): AppInstallationProps;
    })[];
    sys: {
        type: "Array";
    };
    total: number;
    skip: number;
    limit: number;
    toPlainObject(): CollectionProp<AppInstallationProps>;
};
