import { BasicMetaSysProps } from './common-types';
export interface UserProps {
    sys: BasicMetaSysProps;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    email: string;
    activated: boolean;
    signInCount: number;
    confirmed: boolean;
    '2faEnabled': boolean;
    cookieConsentData: string;
}
