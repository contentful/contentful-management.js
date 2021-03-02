import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { Adapter, BasicMetaSysProps, DefaultElements } from '../common-types'
import { wrapCollectionWithAdapter } from '../common-utils'
import createSpaceApi, { ContentfulSpaceAPI } from '../create-space-api'
import enhanceWithMethods from '../enhance-with-methods'

export type SpaceProps = {
  sys: BasicMetaSysProps & { organization: { sys: { id: string } } }
  name: string
}

export type Space = SpaceProps & DefaultElements<SpaceProps> & ContentfulSpaceAPI

/**
 * This method creates the API for the given space with all the methods for
 * reading and creating other entities. It also passes down a clone of the
 * http client with a space id, so the base path for requests now has the
 * space id already set.
 * @private
 * @param http - HTTP client instance
 * @param data - API response for a Space
 * @return {Space}
 */
export function wrapSpace(adapter: Adapter, data: SpaceProps, userAgent: string): Space {
  const space = toPlainObject(copy(data))
  const spaceApi = createSpaceApi({
    adapter,
    userAgent,
  })
  const enhancedSpace = enhanceWithMethods(space, spaceApi)
  return freezeSys(enhancedSpace)
}

/**
 * This method wraps each space in a collection with the space API. See wrapSpace
 * above for more details.
 * @private
 */
export const wrapSpaceCollection = wrapCollectionWithAdapter(wrapSpace)
