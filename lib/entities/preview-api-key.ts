import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import { DefaultElements, MakeRequestWithoutUserAgent, MetaSysProps } from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'

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
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw api key data
 * @return Wrapped preview api key data
 */
export function wrapPreviewApiKey(
  _makeRequest: MakeRequestWithoutUserAgent,
  data: PreviewApiKeyProps
): PreviewApiKey {
  const previewApiKey = toPlainObject(copy(data))
  const previewApiKeyWithMethods = enhanceWithMethods(previewApiKey, createPreviewApiKeyApi())
  return freezeSys(previewApiKeyWithMethods)
}

/**
 * @private
 */
export const wrapPreviewApiKeyCollection = wrapCollection(wrapPreviewApiKey)
