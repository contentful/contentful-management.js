/**
 * Environment data shapes and legacy wrapper.
 *
 * **Shared (both clients):** `EnvironmentProps`, `CreateEnvironmentProps`
 *
 * **Legacy client only:** `Environment` — combines `EnvironmentProps` with the
 * full `ContentfulEnvironmentAPI` (all `getEntry`, `createAsset`, etc. methods).
 * Plain client users pass `environmentId` directly to each method call and
 * never hold an `Environment` instance.
 * @module
 * @category Shared Types
 */
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

/**
 * A Contentful environment as returned by the legacy chainable client.
 *
 * Combines {@link EnvironmentProps} with the full {@link ContentfulEnvironmentAPI} —
 * all methods for managing entries, assets, content types, locales, and other
 * environment-scoped resources are available directly on this object.
 *
 * **Legacy client only.** If you are using the plain client, you pass
 * `environmentId` directly to each method call and never hold an `Environment` instance.
 *
 * @example
 * ```javascript
 * const space = await client.getSpace('<space_id>')
 * const environment = await space.getEnvironment('master')
 * const entry = await environment.getEntry('<entry_id>')
 * ```
 */
export type Environment = ContentfulEnvironmentAPI &
  EnvironmentProps &
  DefaultElements<EnvironmentProps>

/**
 * This method creates the API for the given environment with all the methods for
 * reading and creating other entities. It also passes down a clone of the
 * http client with a environment id, so the base path for requests now has the
 * environment id already set.
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - API response for a Environment
 * @returns
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
 * @internal
 */
export const wrapEnvironmentCollection = wrapCollection(wrapEnvironment)
