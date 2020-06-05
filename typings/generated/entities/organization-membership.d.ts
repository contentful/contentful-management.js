import { AxiosInstance } from 'axios';
import { MetaSysProps, QueryOptions, DefaultElements, CollectionProp } from '../common-types';
export interface Options {
    query?: QueryOptions;
}
export declare type OrganizationMembershipProps = {
    /**
     * System metadata
     */
    sys: MetaSysProps;
    /**
     * Role
     */
    role: string;
    /**
     * status
     */
    status: boolean;
};
export interface OrganizationMembership extends OrganizationMembershipProps, DefaultElements<OrganizationMembershipProps> {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof OrganizationMembership
     * @func update
     * @return {Promise<OrganizationMembership>} Object returned from the server with updated changes.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organization_id')
     * .then(org => org.getOrganizationMembership('organizationMembership_id'))
     * .then((organizationMembership) => {
     *  organizationMembership.role = 'member';
     *  organizationMembership.update();
     * })
     * .catch(console.error)
     */
    update(): Promise<OrganizationMembership>;
    /**
     * Deletes this object on the server.
     * @example```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organization_id')
     * .then(org => org.getOrganizationMembership('organizationMembership_id'))
     * .then((organizationMembership) => {
     *  organizationMembership.delete();
     * })
     * .catch(console.error)
     * ```
     */
    delete(): Promise<void>;
}
/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw organization membership data
 * @return {OrganizationMembership} Wrapped organization membership data
 */
export declare function wrapOrganizationMembership(http: AxiosInstance, data: OrganizationMembershipProps): OrganizationMembershipProps & {
    toPlainObject(): OrganizationMembershipProps;
};
/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw organization membership collection data
 * @return {OrganizationMembershipCollection} Wrapped organization membership collection data
 */
export declare function wrapOrganizationMembershipCollection(http: AxiosInstance, data: CollectionProp<OrganizationMembershipProps>): CollectionProp<OrganizationMembershipProps> & {
    toPlainObject(): CollectionProp<OrganizationMembershipProps>;
};
