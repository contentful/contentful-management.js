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
 * @param  {Object} http - HTTP client instance
 * @param  {Object} data - API response for a Organization
 * @return {Organization}
 */
export declare function wrapOrganization(http: AxiosInstance, data: OrganizationProp): any;
/**
 * This method normalizes each organization in a collection.
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw organization collection data
 * @return {OrganizationCollection} Normalized organization collection data
 */
export declare function wrapOrganizationCollection(http: AxiosInstance, data: CollectionProp<OrganizationProp>): CollectionProp<OrganizationProp> & {
    toPlainObject(): CollectionProp<OrganizationProp>;
};
