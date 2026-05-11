import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { BasicMetaSysProps, DefaultElements, MakeRequest } from '../common-types'
import { wrapCollection, wrapCursorPaginatedCollection } from '../common-utils'
import type { ContentfulSpaceAPI } from '../create-space-api'
import createSpaceApi from '../create-space-api'
import enhanceWithMethods from '../enhance-with-methods'

export type SpaceLicenseProps = {
  sys: {
    type: 'SpaceLicense'
    id: string
  }
  isTrial: boolean
  expiresAt: string
  productId: string
  productName: string
}

export type SpaceProps = {
  sys: BasicMetaSysProps & {
    organization: { sys: { id: string } }
    archivedAt?: string
    license?: { sys: { type: 'Link'; linkType: 'SpaceLicense'; id: string } }
  }
  name: string
}

export type SpaceIncludes = {
  SpaceLicense?: SpaceLicenseProps[]
}

export type SpaceIncludeParam = { include?: 'sys.license' }

export type UnarchiveProps = {
  productId: string
}

export type Space = SpaceProps & DefaultElements<SpaceProps> & ContentfulSpaceAPI

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
export const wrapSpaceCursorPaginatedCollection = wrapCursorPaginatedCollection(wrapSpace)
