import { AxiosInstance } from 'axios';
import { MetaSysProps, DefaultElements, CollectionProp } from '../common-types';
export declare type RoleProps = {
    sys: MetaSysProps;
    name: string;
    /**
     * Permissions for application sections
     */
    permissions: {
        ContentDelivery: string;
        ContentModel: string[];
        Settings: any[];
    };
    policies: {
        effect: string;
        actions: string;
        constraint: any;
    }[];
};
export interface Role extends RoleProps, DefaultElements<RoleProps> {
    /**
     * Deletes this object on the server.
     * @memberof Role
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getRole('<role_id>'))
     * .then((role) => role.delete())
     * .then((role) => console.log(`role deleted.`))
     * .catch(console.error)
     * ```
     */
    delete(): Promise<void>;
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
     * .then((space) => space.getRole('<roles_id>'))
     * .then((roles) => {
     *   roles.name = 'New role name'
     *   return roles.update()
     * })
     * .then((roles) => console.log(`roles ${roles.sys.id} updated.`))
     * .catch(console.error)
     * ```
     */
    update(): Promise<Role>;
}
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw role data
 * @return Wrapped role data
 */
export declare function wrapRole(http: AxiosInstance, data: RoleProps): RoleProps & {
    toPlainObject(): RoleProps;
};
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw role collection data
 * @return Wrapped role collection data
 */
export declare function wrapRoleCollection(http: AxiosInstance, data: CollectionProp<RoleProps>): CollectionProp<RoleProps> & {
    toPlainObject(): CollectionProp<RoleProps>;
};
