/**
 * @module
 * @category Entities
 */
import copy from 'fast-copy'
import { toPlainObject } from 'contentful-sdk-core'
import type { DefaultElements, MakeRequest } from '../common-types'

/** Properties of a Contentful asset key for signing URLs. */
export type AssetKeyProps = {
  /** A JWT describing a policy; needs to be attached to signed URLs */
  policy: string
  /** A secret key to be used for signing URLs */
  secret: string
}

/** Properties required to create a new asset key. */
export type CreateAssetKeyProps = {
  /** (required) UNIX timestamp in the future (but not more than 48 hours from now) */
  expiresAt: number
}

/** A Contentful asset key used for signing protected asset URLs. */
export interface AssetKey extends AssetKeyProps, DefaultElements<AssetKeyProps> {}

/**
 * @internal
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw asset key data
 * @returns Wrapped asset key data
 */
export function wrapAssetKey(_makeRequest: MakeRequest, data: AssetKeyProps): AssetKey {
  const assetKey = toPlainObject(copy(data))
  return assetKey
}
