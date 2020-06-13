import { AxiosInstance } from 'axios';
import { CollectionProp, Collection } from './common-types';
export declare const wrapCollection: <R, T>(fn: (http: AxiosInstance, entity: T) => R) => (http: AxiosInstance, data: CollectionProp<T>) => Collection<R, T>;
