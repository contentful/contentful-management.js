import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import createEnvironmentApi, { ContentfulEnvironmentAPI } from '../create-environment-api'
import { wrapCollection } from '../common-utils'
import { DefaultElements, MetaLinkProps, MetaSysProps } from '../common-types'
import { AxiosInstance } from 'axios'

type SdkHttpClient = AxiosInstance & {
  httpClientParams: Record<string, any>
  cloneWithNewParams: (newParams: Record<string, any>) => SdkHttpClient
}

export type EnvironmentProps = {
  /**
   * System metadata
   */
  sys: MetaSysProps & {
    space: { sys: MetaLinkProps }
  }
  /**
   * Name of the environmant
   */
  name: string
}

export type Environment = ContentfulEnvironmentAPI &
  EnvironmentProps &
  DefaultElements<EnvironmentProps>

/**
 * This method creates the API for the given environment with all the methods for
 * reading and creating other entities. It also passes down a clone of the
 * http client with a environment id, so the base path for requests now has the
 * environment id already set.
 * @private
 * @param http - HTTP client instance
 * @param data - API response for a Environment
 * @return
 */
export function wrapEnvironment(http: AxiosInstance, data: EnvironmentProps): Environment {
  // do not pollute generated typings
  const sdkHttp = http as SdkHttpClient
  const environment = toPlainObject(cloneDeep(data))
  const { hostUpload, defaultHostnameUpload } = sdkHttp.httpClientParams
  const environmentScopedHttpClient = sdkHttp.cloneWithNewParams({
    baseURL: http.defaults.baseURL + 'environments/' + environment.sys.id,
  })
  const environmentScopedUploadClient = sdkHttp.cloneWithNewParams({
    space: environment.sys.space.sys.id,
    host: hostUpload || defaultHostnameUpload,
  })
  const environmentApi = createEnvironmentApi({
    http: environmentScopedHttpClient,
    httpUpload: environmentScopedUploadClient,
  })
  const enhancedEnvironment = enhanceWithMethods(environment, environmentApi)
  return freezeSys(enhancedEnvironment)
}

/**
 * This method wraps each environment in a collection with the environment API. See wrapEnvironment
 * above for more details.
 * @private
 */
export const wrapEnvironmentCollection = wrapCollection(wrapEnvironment)
