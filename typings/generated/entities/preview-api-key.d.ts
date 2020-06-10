import { AxiosInstance } from 'axios';
import { MetaSysProps, DefaultElements, CollectionProp } from '../types/common-types';
export declare type PreviewApiKeyProps = {
    sys: MetaSysProps;
    name: string;
    description: string;
};
export interface PreviewApiKey extends PreviewApiKeyProps, DefaultElements<PreviewApiKeyProps> {
}
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw api key data
 * @return Wrapped preview api key data
 */
export declare function wrapPreviewApiKey(_http: AxiosInstance, data: PreviewApiKeyProps): PreviewApiKeyProps & {
    toPlainObject(): PreviewApiKeyProps;
};
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw api key collection data
 * @return Wrapped api key collection data
 */
export declare function wrapPreviewApiKeyCollection(http: AxiosInstance, data: CollectionProp<PreviewApiKeyProps>): CollectionProp<PreviewApiKeyProps> & {
    toPlainObject(): CollectionProp<PreviewApiKeyProps>;
};
