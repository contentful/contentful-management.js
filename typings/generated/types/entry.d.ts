import { BasicMetaSysProps, MetaLinkProps } from './common-types';
declare type KeyValueMap = Record<string, any>;
export interface EntryProp<TFields = KeyValueMap> {
    fields: TFields;
}
export interface EntryProps<TFields = KeyValueMap> {
    sys: BasicMetaSysProps & {
        space: {
            sys: MetaLinkProps;
        };
        contentType: {
            sys: MetaLinkProps;
        };
        environment: {
            sys: MetaLinkProps;
        };
        publishedBy?: {
            sys: MetaLinkProps;
        };
        publishedVersion?: number;
        publishedAt?: string;
        firstPublishedAt?: string;
        publishedCounter?: number;
    };
    fields: TFields;
}
export declare type CreateEntryProps<TFields = KeyValueMap> = Omit<EntryProps<TFields>, 'sys'>;
export {};
