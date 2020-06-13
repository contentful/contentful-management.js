import { AxiosInstance } from 'axios';
import { toPlainObject } from 'contentful-sdk-core';
import { CollectionProp, Collection } from './common-types';
export declare const wrapCollection: <R, T>(fn: (http: AxiosInstance, entity: T) => R) => (http: AxiosInstance, data: CollectionProp<T>) => Collection<R> & {
    toPlainObject(): CollectionProp<T>;
};
