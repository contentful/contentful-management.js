import copy from 'fast-copy'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import type { AxiosInstance } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import { wrapCollection } from '../common-utils'
import { MetaSysProps, DefaultElements } from '../common-types'

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
export function wrapPreviewApiKey(_http: AxiosInstance, data: PreviewApiKeyProps): PreviewApiKey {
  const previewApiKey = toPlainObject(copy(data))
  const previewApiKeyWithMethods = enhanceWithMethods(previewApiKey, createPreviewApiKeyApi())
  return freezeSys(previewApiKeyWithMethods)
}

/**
 * @private
 */
export const wrapPreviewApiKeyCollection = wrapCollection(wrapPreviewApiKey)
