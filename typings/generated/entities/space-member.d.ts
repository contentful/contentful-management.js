import { CollectionProp, MetaSysProps, MetaLinkProps, DefaultElements } from '../types/common-types';
import { AxiosInstance } from 'axios';
export declare type SpaceMemberProps = {
    sys: MetaSysProps;
    /**
     * User is an admin
     */
    admin: boolean;
    /**
     * Array of Role Links
     */
    roles: MetaLinkProps[];
};
export interface SpaceMember extends SpaceMemberProps, DefaultElements<SpaceMemberProps> {
}
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw space member data
 * @return Wrapped space member data
 */
export declare function wrapSpaceMember(http: AxiosInstance, data: SpaceMemberProps): SpaceMemberProps & {
    toPlainObject(): SpaceMemberProps; /**
     * User is an admin
     */
};
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw space members collection data
 * @return Wrapped space members collection data
 */
export declare function wrapSpaceMemberCollection(http: AxiosInstance, data: CollectionProp<SpaceMemberProps>): CollectionProp<SpaceMemberProps> & {
    toPlainObject(): CollectionProp<SpaceMemberProps>; /**
     * User is an admin
     */
};
