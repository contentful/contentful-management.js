import { expect, describe, it, beforeAll } from 'vitest'
import { getDefaultSpace, getSpecialSpace } from '../helpers'

import { ValidationError } from '../../lib/adapters/REST/endpoints/asset-key'

export const now = () => Math.floor(Date.now() / 1000)
export const withExpiryIn1Hour = () => now() + 1 * 60 * 60
export const withExpiryIn48Hours = () => now() + 48 * 60 * 60

describe('AssetKey API (createAssetKey)', () => {
  let requestWith: (data: any, disabledSpace?: boolean) => Promise<any>

  beforeAll(async () => {
    // NOTE: the default space is not enabled for Embargoed Assets
    requestWith = async (data, disabledSpace = false) => {
      const space = disabledSpace
        ? await getDefaultSpace()
        : await getSpecialSpace('embargoedAssets')
      const environment = await space.getEnvironment('master')
      return environment.createAssetKey(data)
    }
  })

  describe('creates AssetKey', () => {
    it('with expiry in 48 hours', async () => {
      const assetKey = await requestWith({ expiresAt: withExpiryIn48Hours() })
      expect(assetKey.policy).toBeTruthy()
      expect(assetKey.secret).toBeTruthy()
    })

    it('with expiry in 1 hour (testing different lifetimes)', async () => {
      const assetKey = await requestWith({ expiresAt: withExpiryIn1Hour() })
      expect(assetKey.policy).toBeTruthy()
      expect(assetKey.secret).toBeTruthy()
    })
  })

  describe('does not create AssetKey', () => {
    it('when space is not enabled', async () => {
      await expect(requestWith({ expiresAt: withExpiryIn1Hour() }, true)).rejects.toThrow()
    })

    it('when expiry is in the past', async () => {
      await expect(requestWith({ expiresAt: now() - 60 })).rejects.toThrow(ValidationError)
    })

    it('when expiry is too far in the future (> 48 hours)', async () => {
      await expect(requestWith({ expiresAt: now() + 72 * 60 * 60 })).rejects.toThrow(
        ValidationError
      )
    })

    it('when expiry is not a number', async () => {
      await expect(requestWith({ expiresAt: 'not-a-number' })).rejects.toThrow(ValidationError)
    })

    it('when payload is not a JSON object', async () => {
      await expect(requestWith('not-a-json-object')).rejects.toThrow(ValidationError)
    })

    it('when no payload was given', async () => {
      await expect(requestWith(undefined)).rejects.toThrow(ValidationError)
    })
  })
})
