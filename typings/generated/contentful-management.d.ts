/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 * @packageDocumentation
 */
import { ClientAPI } from './create-contentful-api';
import { ClientParams } from './create-cma-http-client';
/**
 * Creates API object with methods to access functionality from Contentful's
 * Management API
 */
export declare function createClient(params: ClientParams): ClientAPI;
