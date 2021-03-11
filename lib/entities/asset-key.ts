import copy from 'fast-copy'
import { toPlainObject } from 'contentful-sdk-core'
import type { AxiosInstance } from 'contentful-sdk-core'
import { DefaultElements } from '../common-types'

export type AssetKeyProps = {
  /** A JWT describing a policy; needs to be attached to signed URLs */
  policy: string
  /** A secret key to be used for signing URLs */
  secret: string
}

export type CreateAssetKeyProps = {
  /** (required) UNIX timestamp in the future (but not more than 48 hours from now) */
  expiresAt: number
}

export interface AssetKey extends AssetKeyProps, DefaultElements<AssetKeyProps> {}

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw asset key data
 * @return Wrapped asset key data
 */
export function wrapAssetKey(_http: AxiosInstance, data: AssetKeyProps): AssetKey {
  const assetKey = toPlainObject(copy(data))
  return assetKey
}
