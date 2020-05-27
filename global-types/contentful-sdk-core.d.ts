declare module 'contentful-sdk-core' {
  import { AxiosInstance, AxiosStatic } from 'axios'

  export const freezeSys: <T>(data: T) => T
  export const toPlainObject: <T = object>(
    obj: T
  ) => T & {
    toPlainObject(): T
  }
  export const createHttpClient: (axios: AxiosStatic, params: Record<string, any>) => AxiosInstance
  export const getUserAgentHeader: (
    sdk: string,
    application?: string,
    integration?: string,
    feature?: string
  ) => string
}
