import cloneDeep from 'lodash/cloneDeep'
import { AxiosInstance } from 'axios'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import { MetaLinkProps, MetaSysProps, DefaultElements } from '../common-types'
import * as endpoints from '../plain/endpoints'

export type ApiKeyProps = {
  sys: MetaSysProps
  name: string
  accessToken: string
  environments: {
    sys: MetaLinkProps
  }[]
  preview_api_key: { sys: MetaLinkProps }
  description?: string
  policies?: { effect: string; action: string }[]
}

export type CreateApiKeyProps = Pick<ApiKeyProps, 'name' | 'environments' | 'description'>

export interface ApiKey extends ApiKeyProps, DefaultElements<ApiKeyProps> {
  /**
   * Deletes this object on the server.
   * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   * client.getSpace('<space_id>')
   * .then((space) => space.getApiKey(<api-key-id>))
   * .then((apiKey) => apiKey.delete())
   * .then(() => console.log('apikey deleted'))
   * .catch(console.error)
   * ```
   */
  delete(): Promise<void>
  /**
   * Sends an update to the server with any changes made to the object's properties
   * @return Object returned from the server with updated changes.
   * @example ```javascript
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   * client.getSpace('<space_id>')
   * .then((space) => space.getApiKey(<api-key-id>))
   * .then((apiKey) => {
   *  apiKey.name = 'New name'
   *  return apiKey.update()
   * })
   * .then(apiKey => console.log(apiKey.name))
   * .catch(console.error)
   * ```
   */
  update(): Promise<ApiKey>
}

function createApiKeyApi(http: AxiosInstance) {
  const getParams = (data: ApiKeyProps) => ({
    spaceId: data.sys.space?.sys.id ?? '',
    apiKeyId: data.sys.id,
  })

  return {
    update: function update() {
      const self = this as ApiKeyProps
      return endpoints.apiKey
        .update(http, getParams(self), self)
        .then((data) => wrapApiKey(http, data))
    },

    delete: function del() {
      const self = this as ApiKeyProps
      return endpoints.apiKey.del(http, getParams(self))
    },
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw api key data
 */
export function wrapApiKey(http: AxiosInstance, data: ApiKeyProps): ApiKey {
  const apiKey = toPlainObject(cloneDeep(data))
  const apiKeyWithMethods = enhanceWithMethods(apiKey, createApiKeyApi(http))
  return freezeSys(apiKeyWithMethods)
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw api key collection data
 * @return Wrapped api key collection data
 */
export const wrapApiKeyCollection = wrapCollection(wrapApiKey)
