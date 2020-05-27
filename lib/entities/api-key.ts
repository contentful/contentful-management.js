import cloneDeep from 'lodash/cloneDeep'
import { AxiosInstance } from 'axios'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { createUpdateEntity, createDeleteEntity } from '../instance-actions'
import { MetaSys, MetaLinkProps, MetaSysProps, Collection } from '../common-types'

export type ApiKeyProps = {
  sys: MetaSysProps
  name: string
  description: string
  accessToken: string
  policies: { effect: string; action: string }[]
  preview_api_key: MetaSys<MetaLinkProps>
  environments: MetaSys<MetaLinkProps>[]
}

export type CreateApiKeyProps = Pick<ApiKeyProps, 'name' | 'environments'>

export type ApiKey = ReturnType<typeof wrapApiKey>

function createApiKeyApi(http: AxiosInstance) {
  return {
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
    update: function update() {
      const self = this as ApiKeyProps
      if ('accessToken' in self) {
        delete self.accessToken
      }
      if ('preview_api_key' in self) {
        delete self.preview_api_key
      }
      if ('policies' in self) {
        delete self.policies
      }
      const update = createUpdateEntity<ApiKey>({
        http: http,
        entityPath: 'api_keys',
        wrapperMethod: wrapApiKey,
      })
      return update.call(self)
    },

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
    delete: createDeleteEntity({
      http: http,
      entityPath: 'api_keys',
    }),
  }
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw api key data
 */
export function wrapApiKey(http: AxiosInstance, data: ApiKeyProps) {
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
export function wrapApiKeyCollection(http: AxiosInstance, data: Collection<ApiKeyProps>) {
  const apiKeys = toPlainObject(cloneDeep(data))
  return freezeSys({
    ...apiKeys,
    items: apiKeys.items.map((entity) => wrapApiKey(http, entity)),
  })
}
