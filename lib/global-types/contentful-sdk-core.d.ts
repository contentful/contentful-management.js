
declare module 'contentful-sdk-core' {

  import { AxiosInstance, AxiosStatic } from "axios";

  export const createHttpClient: (axios: AxiosStatic, params: Object) => AxiosInstance;
  export const getUserAgentHeader: Function;
}
