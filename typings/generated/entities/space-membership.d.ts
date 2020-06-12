import { AxiosInstance } from 'axios';
import { MetaSysProps, MetaLinkProps, DefaultElements, CollectionProp } from '../common-types';
export declare type SpaceMembershipProps = {
    sys: MetaSysProps;
    name: string;
    /**
     * User is an admin
     */
    admin: boolean;
    roles: MetaLinkProps[];
};
export interface SpaceMembership extends SpaceMembershipProps, DefaultElements<SpaceMembershipProps> {
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
     * .then((space) => space.getSpaceMembership('<spaceMembership_id>'))
     * .then((spaceMembership) => spaceMembership.delete())
     * .then(() => console.log(`spaceMembership deleted.`))
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
     * .then((space) => space.getSpaceMembership('<spaceMembership_id>'))
     * .then((spaceMembership) => {
     *  spaceMembership.name = 'new space membership name'
     * })
     * .then((spaceMembership) => console.log(`spaceMembership ${spaceMembership.sys.id} updated.`))
     * .catch(console.error)
     * ```
     */
    update(): Promise<SpaceMembership>;
}
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw space membership data
 * @return Wrapped space membership data
 */
export declare function wrapSpaceMembership(http: AxiosInstance, data: SpaceMembershipProps): {
    update: () => Promise<SpaceMembership>;
    delete: () => Promise<void>;
} & SpaceMembershipProps & {
    toPlainObject(): SpaceMembershipProps;
};
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw space membership collection data
 * @return Wrapped space membership collection data
 */
export declare function wrapSpaceMembershipCollection(http: AxiosInstance, data: CollectionProp<SpaceMembershipProps>): {
    items: ({
        update: () => Promise<SpaceMembership>;
        delete: () => Promise<void>;
    } & SpaceMembershipProps & {
        toPlainObject(): SpaceMembershipProps;
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
            update: () => Promise<SpaceMembership>;
            delete: () => Promise<void>;
        } & SpaceMembershipProps & {
            toPlainObject(): SpaceMembershipProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
    };
};
