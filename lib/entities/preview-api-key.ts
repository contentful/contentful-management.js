import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import { AxiosInstance } from 'axios'
import enhanceWithMethods from '../enhance-with-methods'
import { MetaSysProps, DefaultElements, CollectionProp } from '../common-types'

export type PreviewApiKeyProps = {
  sys: MetaSysProps
  name: string
  description: string
}

export interface PreviewApiKey extends PreviewApiKeyProps, DefaultElements<PreviewApiKeyProps> {}

function createPreviewApiKeyApi() {
  return {}
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw api key data
 * @return Wrapped preview api key data
 */
export function wrapPreviewApiKey(_http: AxiosInstance, data: PreviewApiKeyProps) {
  const previewApiKey = toPlainObject(cloneDeep(data))
  const previewApiKeyWithMethods = enhanceWithMethods(previewApiKey, createPreviewApiKeyApi())
  return freezeSys(previewApiKeyWithMethods)
}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw api key collection data
 * @return Wrapped api key collection data
 */
export function wrapPreviewApiKeyCollection(
  http: AxiosInstance,
  data: CollectionProp<PreviewApiKeyProps>
) {
  const previewApiKeys = toPlainObject(cloneDeep(data))
  return freezeSys({
    ...previewApiKeys,
    items: previewApiKeys.items.map((entity) => wrapPreviewApiKey(http, entity)),
  })
}
