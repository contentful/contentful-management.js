import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import createEnvironmentApi, { ContentfulEnvironmentAPI } from '../create-environment-api'
import { wrapCollection } from '../common-utils'
import { DefaultElements, SysLink, BasicMetaSysProps } from '../common-types'
import { AxiosInstance } from 'axios'

type EnvironmentMetaSys = BasicMetaSysProps & {
  status: SysLink
  space: SysLink
  aliases?: Array<SysLink>
  aliasedEnvironment?: SysLink
}

export type EnvironmentProps = {
  /**
   * System metadata
   */
  sys: EnvironmentMetaSys
  /**
   * Name of the environmant
   */
  name: string
}

export type CreateEnvironmentProps = Partial<Omit<EnvironmentProps, 'sys'>>

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
  const environment = toPlainObject(cloneDeep(data))
  const environmentApi = createEnvironmentApi({
    http,
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
