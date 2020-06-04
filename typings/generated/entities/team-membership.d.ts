import { DefaultElements, MetaSysProps, QueryOptions, CollectionProp } from '../common-types';
import { AxiosInstance } from 'axios';
export interface Options {
    teamId?: string;
    query?: QueryOptions;
}
export declare type TeamMembershipProps = {
    /**
     * System metadata
     */
    sys: MetaSysProps;
    /**
     * Is admin
     */
    admin: boolean;
    /**
     * Organization membership id
     */
    organizationMembershipId: string;
};
export interface TeamMembership extends TeamMembershipProps, DefaultElements<TeamMembershipProps> {
    delete(): Promise<void>;
    update(): Promise<TeamMembership>;
}
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw team membership data
 * @return Wrapped team membership data
 */
export declare function wrapTeamMembership(http: AxiosInstance, data: TeamMembershipProps): TeamMembershipProps & {
    toPlainObject(): TeamMembershipProps;
};
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw team membership collection data
 * @return Wrapped team membership collection data
 */
export declare function wrapTeamMembershipCollection(http: AxiosInstance, data: CollectionProp<TeamMembershipProps>): CollectionProp<TeamMembershipProps> & {
    toPlainObject(): CollectionProp<TeamMembershipProps>;
};
