import { AxiosInstance } from 'axios';
import { MetaSysProps, DefaultElements, CollectionProp } from '../common-types';
export declare type SnapshotProps<T> = {
    sys: MetaSysProps & {
        snapshotType: string;
        snapshotEntityType: string;
    };
    snapshot: T;
};
export interface Snapshot<T> extends SnapshotProps<T>, DefaultElements<SnapshotProps<T>> {
}
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw snapshot data
 * @return Wrapped snapshot data
 */
export declare function wrapSnapshot<T>(_http: AxiosInstance, data: SnapshotProps<T>): SnapshotProps<T> & {
    toPlainObject(): SnapshotProps<T>;
};
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw snapshot collection data
 * @return Wrapped snapshot collection data
 */
export declare function wrapSnapshotCollection<T>(http: AxiosInstance, data: CollectionProp<SnapshotProps<T>>): {
    items: (SnapshotProps<T> & {
        toPlainObject(): SnapshotProps<T>;
    })[];
    sys: {
        type: "Array";
    };
    total: number;
    skip: number;
    limit: number;
} & {
    toPlainObject(): {
        items: (SnapshotProps<T> & {
            toPlainObject(): SnapshotProps<T>;
        })[];
        sys: {
            type: "Array";
        };
        total: number;
        skip: number;
        limit: number;
    };
};
