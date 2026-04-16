/**
 * Space data shapes and legacy wrapper.
 *
 * **Shared (both clients):** `SpaceProps`
 *
 * **Legacy client only:** `Space` — combines `SpaceProps` with the full
 * `ContentfulSpaceAPI` (all `getEnvironment`, `createEnvironment`, etc.
 * methods). Plain client users pass `spaceId` directly to each method call
 * and never hold a `Space` instance.
 * @module
 * @category Shared Types
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { BasicMetaSysProps, DefaultElements, MakeRequest } from '../common-types'
import { wrapCollection } from '../common-utils'
import type { ContentfulSpaceAPI } from '../create-space-api'
import createSpaceApi from '../create-space-api'
import enhanceWithMethods from '../enhance-with-methods'

/**
 * Properties of a Contentful space
 *
 * @see {@link Space} for the full space type with methods
 */
export type SpaceProps = {
  sys: BasicMetaSysProps & { organization: { sys: { id: string } }; archivedAt?: string }
  name: string
}

export type UnarchiveProps = {
  productId: string
}

/**
 * A Contentful space with methods to manage environments, memberships, and webhooks
 *
 * @remarks
 * This type is used with the legacy client. For the plain client, use {@link SpaceProps} directly.
 *
 * @see {@link SpaceProps} for the underlying data properties
 */
export interface Space extends SpaceProps, DefaultElements<SpaceProps>, ContentfulSpaceAPI {}

/**
 * This method creates the API for the given space with all the methods for
 * reading and creating other entities. It also passes down a clone of the
 * http client with a space id, so the base path for requests now has the
 * space id already set.
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - API response for a Space
 * @returns {Space}
 */
export function wrapSpace(makeRequest: MakeRequest, data: SpaceProps): Space {
  const space = toPlainObject(copy(data))
  const spaceApi = createSpaceApi(makeRequest)
  const enhancedSpace = enhanceWithMethods(space, spaceApi)
  return freezeSys(enhancedSpace)
}

/**
 * This method wraps each space in a collection with the space API. See wrapSpace
 * above for more details.
 * @internal
 */
export const wrapSpaceCollection = wrapCollection(wrapSpace)
