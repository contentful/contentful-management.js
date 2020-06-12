import { AxiosInstance } from 'axios';
import { CollectionProp, DefaultElements, MetaSysProps } from '../common-types';
export declare type TeamProps = {
    /**
     * System metadata
     */
    sys: MetaSysProps;
    /**
     * Name of the team
     */
    name: string;
    /**
     * Description of the team
     */
    description: string;
};
export interface Team extends TeamProps, DefaultElements<TeamProps> {
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
     * client.getOrganization('organization_id')
     * .then(org => org.getOrganizationMembership('organizationMembership_id'))
     * .then((team) => {
     *  team.delete();
     * })
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
     * client.getOrganization('organization_id')
     * .then(org => org.getTeam('team_id'))
     * .then((team) => {
     *  team.description = 'new description';
     *  team.update();
     * })
     * .catch(console.error)
     * ```
     */
    update(): Promise<Team>;
}
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw team data
 * @return Wrapped team data
 */
export declare function wrapTeam(http: AxiosInstance, data: TeamProps): {
    update: () => Promise<Team>;
    delete: () => Promise<void>;
} & TeamProps & {
    toPlainObject(): TeamProps;
};
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw team collection data
 * @return Wrapped team collection data
 */
export declare function wrapTeamCollection(http: AxiosInstance, data: CollectionProp<TeamProps>): {
    items: ({
        update: () => Promise<Team>;
        delete: () => Promise<void>;
    } & TeamProps & {
        toPlainObject(): TeamProps;
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
            update: () => Promise<Team>;
            delete: () => Promise<void>;
        } & TeamProps & {
            toPlainObject(): TeamProps;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
    };
};
