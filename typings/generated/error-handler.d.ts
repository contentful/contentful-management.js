import { AxiosError } from 'axios';
/**
 * Handles errors received from the server. Parses the error into a more useful
 * format, places it in an exception and throws it.
 * See https://www.contentful.com/developers/docs/references/errors/
 * for more details on the data received on the errorResponse.data property
 * and the expected error codes.
 * @private
 * @param errorResponse - Error received from an axios request
 */
export default function errorHandler(errorResponse: AxiosError): void;
