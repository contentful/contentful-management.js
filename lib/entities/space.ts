import { AxiosInstance } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import createSpaceApi, { ContentfulSpaceAPI } from '../create-space-api'
import { BasicMetaSysProps, DefaultElements } from '../common-types'

type SdkHttpClient = AxiosInstance & {
  httpClientParams: Record<string, any>
  cloneWithNewParams: (newParams: Record<string, any>) => SdkHttpClient
}

export type SpaceProps = {
  sys: BasicMetaSysProps & { organisation: { sys: { id: string } } }
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
export function wrapSpace(http: AxiosInstance, data: SpaceProps): Space {
  const sdkHttp = (http as unknown) as SdkHttpClient

  const space = toPlainObject(cloneDeep(data))
  const { hostUpload, defaultHostnameUpload } = sdkHttp.httpClientParams
  const spaceScopedHttpClient = sdkHttp.cloneWithNewParams({
    space: space.sys.id,
  })
  const spaceScopedUploadClient = sdkHttp.cloneWithNewParams({
    space: space.sys.id,
    host: hostUpload || defaultHostnameUpload,
  })
  const spaceApi = createSpaceApi({
    http: spaceScopedHttpClient,
    httpUpload: spaceScopedUploadClient,
  })
  const enhancedSpace = enhanceWithMethods(space, spaceApi)
  return freezeSys(enhancedSpace)
}

/**
 * This method wraps each space in a collection with the space API. See wrapSpace
 * above for more details.
 * @private
 */
export const wrapSpaceCollection = wrapCollection(wrapSpace)
