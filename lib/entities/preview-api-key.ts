/**
 * @module
 * @category Entities
 */
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import type { DefaultElements, MakeRequest, MetaSysProps } from '../common-types'
import { wrapCollection } from '../common-utils'
import enhanceWithMethods from '../enhance-with-methods'

export type PreviewApiKeyProps = {
  sys: MetaSysProps
  name: string
  description: string
  accessToken: string
}

export interface PreviewApiKey extends PreviewApiKeyProps, DefaultElements<PreviewApiKeyProps> {}

/**
 * @internal
 */
function createPreviewApiKeyApi() {
  return {}
}

/**
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw api key data
 * @returns Wrapped preview api key data
 */
export function wrapPreviewApiKey(
  _makeRequest: MakeRequest,
  data: PreviewApiKeyProps,
): PreviewApiKey {
  const previewApiKey = toPlainObject(copy(data))
  const previewApiKeyWithMethods = enhanceWithMethods(previewApiKey, createPreviewApiKeyApi())
  return freezeSys(previewApiKeyWithMethods)
}

/**
 * @internal
 */
export const wrapPreviewApiKeyCollection = wrapCollection(wrapPreviewApiKey)
