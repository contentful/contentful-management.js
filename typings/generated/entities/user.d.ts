import { AxiosInstance } from 'axios';
import { CollectionProp, DefaultElements, MetaSysProps } from '../common-types';
export declare type UserProps = {
    /**
     * System metadata
     */
    sys: MetaSysProps;
    /**
     * First name of the user
     */
    firstName: string;
    /**
     * Last name of the user
     */
    lastName: string;
    /**
     * Url to the users avatar
     */
    avatarUrl: string;
    /**
     * Email address of the user
     */
    email: string;
    /**
     * Activation flag
     */
    activated: boolean;
    /**
     * Number of sign ins
     */
    signInCount: number;
    /**
     * User confirmation flag
     */
    confirmed: boolean;
};
export interface User extends UserProps, DefaultElements<UserProps> {
}
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw data
 * @return Normalized user
 */
export declare function wrapUser(http: AxiosInstance, data: UserProps): UserProps & {
    toPlainObject(): UserProps;
};
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw data collection
 * @return Normalized user collection
 */
export declare function wrapUserCollection(http: AxiosInstance, data: CollectionProp<UserProps>): {
    items: (UserProps & {
        toPlainObject(): UserProps;
    })[];
    sys: {
        type: "Array";
    };
    total: number; /**
     * User confirmation flag
     */
    skip: number;
    limit: number;
    toPlainObject(): CollectionProp<UserProps>;
};
