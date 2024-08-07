import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import type { ContentfulEnvironmentAPI } from '../create-environment-api'
import createEnvironmentApi from '../create-environment-api'
import { wrapCollection } from '../common-utils'
import type { DefaultElements, SysLink, BasicMetaSysProps, MakeRequest } from '../common-types'

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
   * Name of the environment
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
 * @param makeRequest - function to make requests via an adapter
 * @param data - API response for a Environment
 * @return
 */
export function wrapEnvironment(makeRequest: MakeRequest, data: EnvironmentProps): Environment {
  // do not pollute generated typings
  const environment = toPlainObject(copy(data))
  const environmentApi = createEnvironmentApi(makeRequest)
  const enhancedEnvironment = enhanceWithMethods(environment, environmentApi)
  return freezeSys(enhancedEnvironment)
}

/**
 * This method wraps each environment in a collection with the environment API. See wrapEnvironment
 * above for more details.
 * @private
 */
export const wrapEnvironmentCollection = wrapCollection(wrapEnvironment)
