import { AxiosInstance } from 'axios';
import { SnapshotProps } from './snapshot';
import { MetaSysProps, MetaLinkProps, DefaultElements, Collection, CollectionProp } from '../common-types';
export interface EntrySys extends MetaSysProps {
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
}
export declare type EntryProp = {
    sys: EntrySys;
    fields: Record<string, any>;
};
declare type EntryApi = {
    archive(): Promise<Entry>;
    delete(): Promise<void>;
    getSnapshot(id: string): Promise<SnapshotProps<EntryProp>>;
    getSnapshots(): Promise<Collection<SnapshotProps<EntryProp>>>;
    isArchived(): boolean;
    isDraft(): boolean;
    isPublished(): boolean;
    isUpdated(): boolean;
    publish(): Promise<Entry>;
    unarchive(): Promise<Entry>;
    unpublish(): Promise<Entry>;
    update(): Promise<Entry>;
};
export interface Entry extends EntryProp, DefaultElements<EntryProp>, EntryApi {
}
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw entry data
 * @return Wrapped entry data
 */
export declare function wrapEntry(http: AxiosInstance, data: EntryProp): EntryProp & {
    toPlainObject(): EntryProp;
};
/**
 * Data is also mixed in with link getters if links exist and includes were requested
 * @private
 * @param http - HTTP client instance
 * @param data - Raw entry collection data
 * @return Wrapped entry collection data
 */
export declare function wrapEntryCollection(http: AxiosInstance, data: CollectionProp<EntryProp>): CollectionProp<EntryProp> & {
    toPlainObject(): CollectionProp<EntryProp>;
};
export {};
