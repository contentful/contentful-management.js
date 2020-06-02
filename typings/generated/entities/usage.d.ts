import { AxiosInstance } from 'axios';
import { CollectionProp, DefaultElements, MetaLinkProps, MetaSysProps, QueryOptions } from '../types/common-types';
export declare type UsageMetricEnum = 'cda' | 'cma' | 'cpa' | 'gql';
export interface UsageQuery extends QueryOptions {
    'metric[in]'?: string;
    'dateRange.startAt'?: string;
    'dateRange.endAt'?: string;
}
interface UsageSysProps extends MetaSysProps {
    organization?: {
        sys: MetaLinkProps;
    };
}
export declare type UsageProps = {
    /**
     * System metadata
     */
    sys: UsageSysProps;
    /**
     * Type of usage
     */
    metric: UsageMetricEnum;
    /**
     * Unit of usage metric
     */
    unitOfMeasure: string;
    /**
     * Range of usage
     */
    dateRange: {
        startAt: string;
        endAt: string;
    };
    /**
     * Value of the usage
     */
    usage: number;
    /**
     * Usage per day
     */
    usagePerDay: {
        [key: string]: number;
    };
};
export interface Usage extends UsageProps, DefaultElements<UsageProps> {
}
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw usage data collection
 * @return Normalized usage collection
 */
export declare function wrapUsageCollection(http: AxiosInstance, data: CollectionProp<UsageProps>): CollectionProp<UsageProps> & {
    toPlainObject(): CollectionProp<UsageProps>;
};
export {};
