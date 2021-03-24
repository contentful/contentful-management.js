import { expect } from 'chai'
import { before, describe, it } from 'mocha'
import { getDefaultSpace, getAlternativeSpace } from '../helpers'
import { ValidationError } from '../../lib/entities/asset-key'

export const now = () => Math.floor(Date.now() / 1000)
export const withExpiryIn1Hour = () => now() + 1 * 60 * 60
export const withExpiryIn48Hours = () => now() + 48 * 60 * 60

describe('AssetKey API (createAssetKey)', () => {
  let requestWith

  before(async () => {
    // NOTE: the alternative space is not enabled for Embargoed Assets
    requestWith = async (data, disabledSpace = false) => {
      const space = disabledSpace ? await getAlternativeSpace() : await getDefaultSpace()
      const environment = await space.getEnvironment('master')
      return environment.createAssetKey(data)
    }
  })

  describe('creates AssetKey', () => {
    it('with expiry in 48 hours', async () => {
      await requestWith({ expiresAt: withExpiryIn48Hours() }).then((assetKey) => {
        expect(assetKey.policy, 'policy').to.be.ok
        expect(assetKey.secret, 'secret').to.be.ok
      })
    })

    it('with expiry in 1 hour (testing different lifetimes)', async () => {
      await requestWith({ expiresAt: withExpiryIn1Hour() }).then((assetKey) => {
        expect(assetKey.policy, 'policy').to.be.ok
        expect(assetKey.secret, 'secret').to.be.ok
      })
    })
  })

  describe('does not create AssetKey', () => {
    it('when space is not enabled', async () => {
      await expect(requestWith({ expiresAt: withExpiryIn1Hour() }, true)).to.be.rejected
    })

    it('when expiry is in the past', async () => {
      await expect(requestWith({ expiresAt: now() - 60 })).to.be.rejectedWith(ValidationError)
    })

    it('when expiry is too far in the future (> 48 hours)', async () => {
      await expect(requestWith({ expiresAt: now() + 72 * 60 * 60 })).to.be.rejectedWith(
        ValidationError
      )
    })

    it('when expiry is not a number', async () => {
      await expect(requestWith({ expiresAt: 'not-a-number' })).to.be.rejectedWith(ValidationError)
    })

    it('when payload is not a JSON object', async () => {
      await expect(requestWith('not-a-json-object')).to.be.rejectedWith(ValidationError)
    })

    it('when no payload was given', async () => {
      await expect(requestWith()).to.be.rejectedWith(ValidationError)
    })
  })
})
